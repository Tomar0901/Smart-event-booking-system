
import pool from "../../config/pool.js"
import JWT from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


export const Admin = async (req, res) => {
    const { emailid, password } = req.body
    try {
        pool.query("select *from admins where emailid=? and password=? ", [emailid, password], (error, result) => {
            if (error) {
                return res.status(500).json({
                    message: "Database error", error
                })
            }
            if (result.length === 0) {
                return res.status(401).json({
                    message: "Invalid Credentials"
                })
            }

            const admin = result[0]
            var sk = process.env.JWT_SECRET
            const token = JWT.sign({ adminid: admin.emailid }, sk, { expiresIn: "1h" })
            res.cookie("token", token)

            return res.status(200).json({
                message: "login successfully",
                name:admin.admin_name
            });

        })

    } catch (error) {
        res.status(500).json({ message: "Admin is required to login", error })
    }
}




export const adminProfile = (req,res)=>{

 try{

   const token = req.cookies.token

   if(!token){
     return res.status(401).json({message:"Unauthorized"})
   }

   const decoded = JWT.verify(token,process.env.JWT_SECRET)

   pool.query(
    "select admin_name,emailid from admins where emailid=?",
    [decoded.adminid],
    (error,result)=>{

     if(error){
      return res.status(500).json({message:"Database error"})
     }

     res.status(200).json({
      name:result[0].admin_name,
      email:result[0].emailid
     })

    }
   )

 }catch(error){
  res.status(401).json({message:"Invalid token"})
 }

}

//create event

export const createEvent = async (req, res) => {
  const { title, description, location, date, total_seats, avl_seats, price } = req.body;

  try {
    const img = req.files?.img?.[0]?.filename || null;
    const Banner = req.files?.Banner?.[0]?.filename || null;

    pool.query(
      "INSERT INTO events(title, description, location, date, total_seats, avl_seats, price, img, Banner) VALUES(?,?,?,?,?,?,?,?,?)",
      [title, description, location, date, total_seats, avl_seats, price, img, Banner],
      function (error, result) {
        if (error) {
          console.log(error); // 🔥 IMPORTANT
          return res.status(500).json({ message: "Error creating event" });
        } else {
          res.json({ message: "Event created successfully" });
        }
      }
    );

  } catch (err) {
    console.log(err); // 🔥 IMPORTANT
    res.status(500).json({ message: "Server error", err });
  }
};
// count events

export const getEventCount = (req,res)=>{
    pool.query(
        "select count(*) as totalEvents from events",
        (error,result)=>{
            if(error){
                return res.status(500).json({message:"Database error"})
            }

            res.json({
                totalEvents: result[0].totalEvents
            })
        }
    )
}

//Read all events

export const getAllEvents=async(req,res)=>{
    pool.query("select *from events order by date desc",function(err,result){
        if(err){
            res.status(500).json({message:"Database error"})

        }
        res.json(result)
    })
}

// Delete events based on id 

export const deleteEvent = async(req,res)=>{
    const {id}= req.params
    pool.query("delete from events where eventid=?",[id],function(err,result){
        if(err){
           return res.status(500).json({message:"Database Error",err})
        }
        res.json({ message: "Event deleted successfully" });
    })
}

// update the event

export const updateEvent = (req, res) => {

  const { id } = req.params;
  const { title, description, location, date, total_seats, avl_seats, price } = req.body;

  const img = req.files?.img?.[0]?.filename || null;
  const banner = req.files?.Banner?.[0]?.filename || null;

  let query;
  let values;

  if (img || banner) {

    query = `
    UPDATE events 
    SET title=?,description=?,location=?,date=?,total_seats=?,avl_seats=?,price=?,
    img = COALESCE(?, img),
    Banner = COALESCE(?, Banner)
    WHERE eventid=?`;

    values = [
      title,
      description,
      location,
      date,
      total_seats,
      avl_seats,
      price,
      img,
      banner,
      id
    ];

  } else {

    query = `
    UPDATE events 
    SET title=?,description=?,location=?,date=?,total_seats=?,avl_seats=?,price=? 
    WHERE eventid=?`;

    values = [
      title,
      description,
      location,
      date,
      total_seats,
      avl_seats,
      price,
      id
    ];
  }

  pool.query(query, values, (error, result) => {

    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ message: "Event updated successfully" });

  });
};