import pool from "../../config/pool.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

// ----- USER REGISTER -----
export const UserRegister = async (req, res) => {
  const { name, email, password } = req.body;

  // ---- Basic validation ----
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // ---- Check if user already exists ----
    pool.query(
      "SELECT * FROM users WHERE email=?",
      [email],
      async function (error, result) {
        if (error) {
          console.log("DB SELECT Error:", error.sqlMessage);
          return res.status(500).json({ message: "Database error", error: error.sqlMessage });
        }

        if (result.length > 0) {
          return res.status(400).json({ message: "Email already registered" });
        }

        // ---- Hash password ----
        const hashedPassword = await bcrypt.hash(password, 10);

        // ---- Insert new user ----
        pool.query(
          "INSERT INTO users (name,email,password) VALUES (?,?,?)",
          [name, email, hashedPassword],
          function (error, result) {
            if (error) {
              console.log("SQL Insert Error:", error.sqlMessage);
              console.log("Payload:", name, email, hashedPassword);
              return res.status(500).json({ message: "Insert failed", error: error.sqlMessage });
            }

            console.log("User inserted with ID:", result.insertId);
            return res.status(201).json({ message: "User registered successfully" });
          }
        );
      }
    );
  } catch (error) {
    console.log("Unexpected error:", error);
    return res.status(500).json({ message: "Unexpected error", error: error.message });
  }
};

// ----- USER LOGIN -----
export const UserLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password required" });
  }

  pool.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async function (error, result) {
      if (error) {
        console.log("DB SELECT Error:", error.sqlMessage);
        return res.status(500).json({ message: "Database error", error: error.sqlMessage });
      }

      if (result.length === 0) {
        return res.status(400).json({ message: "Invalid Email" });
      }

      const user = result[0];

      // ---- Compare password ----
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      // ---- Generate JWT token ----
      const token = JWT.sign({ id: user.user_id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // ---- Set cookie ----
      res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

      return res.status(200).json({
        message: "Login Successful",
        token,
        user: { id: user.user_id, name: user.name, email: user.email },
      });
    }
  );
};


export const EventDetail = (req, res) => {

  const id = req.params.id;

  pool.query(
    "SELECT * FROM events WHERE eventid = ?",
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json({ message: "Error fetching event" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.json(result[0]); // clicked event ka data
    }
  );

}

export const UserProfile = (req, res) => {
   
  const userId = req.user.id;

  pool.query(
    "SELECT user_id, name, email FROM users WHERE user_id = ?",
    [userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching profile" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        id: result[0].user_id,
        name: result[0].name,
        email: result[0].email
      });
    }
  );
};



export const verifyToken = (req, res, next) => {
    
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    

    req.user = decoded;

    next();

  } catch (error) {
    console.log("Token Error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};