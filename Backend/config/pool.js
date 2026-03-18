import mysql from "mysql"

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Lokendra@123",
    database:"smarteventbooking",
    multipleStatements:true,
    connectionLimit:100,
})

export default pool