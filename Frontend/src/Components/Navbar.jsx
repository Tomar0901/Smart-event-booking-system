import { Bell, LogOut, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
export default function AdminNavbar({adminname}){
const navigate = useNavigate()
const handleLogout = ()=>{
document.cookie = "token=; Max-Age=0"
navigate("/admin_login")
}
return(

<div className="flex items-center justify-between bg-white shadow px-6 py-3">

{/* Left */}

<h2 className="text-lg font-semibold text-gray-700">
Admin Dashboard
</h2>


{/* Right */}

<div className="flex items-center gap-5">

{/* Notification */}

<button className="relative text-gray-600 hover:text-blue-500">
<Bell size={20}/>
<span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
</button>


{/* Admin Profile */}

<div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">

<div className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full">
<User size={16}/>
</div>

<span className="text-sm font-medium">
{adminname}
</span>

</div>


{/* Logout */}


<button
onClick={handleLogout}
className="flex items-center gap-1 text-red-500 hover:text-red-600 cursor-pointer"
>
<LogOut size={18}/> Logout
</button>

</div>

</div>

)

}