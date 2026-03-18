import API from "../api/axios.js"
import { useState } from "react"
import {useNavigate} from "react-router-dom"
import {UserRound} from "lucide-react"
export default function AdminLogin(){

    const [form,setForm] = useState({
        emailid:"",
        password:""
    })

    const [msg,setMsg]= useState("")
    const [loading,setLoading]= useState(false)
    const navigate = useNavigate()
    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

   
    
    const handleSubmit= async(e)=>{
        e.preventDefault()
        if (!form.emailid || !form.password) {
      setMsg("! All fields are required");
    return;   // yahin stop ho jayega
  }
        try{
             setLoading(true)
              const res = await API.post("/admin/admin_login",form)
              setMsg(res.data.message)
              setTimeout(() => {
                  navigate("/admin/dashboard")
              }, 1000);
        }catch(err){
            setMsg(err.response?.data?.message || 'An error occurred')
        }
        

    }

   return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <div className="bg-white p-8 rounded-md shadow-md w-full max-w-sm ">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full border border-gray-300 mx-auto"><UserRound /></div>
      <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
      {
        msg && (
          <div className="mb-4 text-center text-sm text=blue-500 font-medium">
            {msg}
          </div>
        )
      }
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
        name="emailid"
        type="email"
        placeholder="Enter Email"
        value={form.emailid}
        onChange={handleChange}
        className="w-full px-3 py-2 border-gray-300 rounded-md  focus:outline-blue-500"
      
        />
        <input
        name="password"
        type="password"
        placeholder="password"
        value={form.password}
        onChange={handleChange}
        className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-blue-500"
        
        />
      <button
disabled={loading}
type="submit"
className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer"
>
{loading ? "Logging in..." : "Login"}
</button>
      
    </form>
    </div>

    

    
  </div>
)
}
