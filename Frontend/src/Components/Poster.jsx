import { useRef, useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import API from "../api/axios";
import {useNavigate} from "react-router-dom"

export default function Poster(){
const navigate = useNavigate()
const scrollRef = useRef(null);

const [events,setEvents] = useState([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{
fetchEvents();
},[]);

const fetchEvents = async()=>{
try{
setLoading(true);
const res = await API.get("/admin/all_events");
setEvents(res.data);
}catch(err){
console.log(err);
}finally{
setLoading(false);
}
};

const scrollRight = () => {
scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
};

return(

<div className="px-8 mb-30">

{/* Header */}
<div className="flex justify-between items-center mb-4">

<h2 className="text-3xl font-semibold">
Trending Events
</h2>

<p className="text-indigo-600 cursor-pointer">
See All
</p>

</div>

{/* Cards */}

<div className="relative">

<div
ref={scrollRef}
className="flex gap-6 overflow-x-auto scrollbar-hide"
>

{loading || events.length === 0 ? (

  <div className="w-full flex flex-col items-center justify-center py-10">

    <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

    <p className="mt-3 text-gray-600">Loading...</p>

  </div>

) : (

events.map((event)=>(

<div
key={event.eventid}
className="min-w-[220px] bg-white rounded-lg shadow cursor-pointer"
>

<img
src={`http://localhost:5001/images/${event.img}`}
className="w-full h-[300px] object-cover rounded-t-lg"
onClick={() => navigate(`/event/${event.eventid}`)}
/>

<div className="p-3">

<h3 className="font-medium">
{event.title}
</h3>

<p className="text-sm text-gray-500">
📍 {event.location}
</p>

</div>

</div>

))

)}

</div>

{/* Arrow Button */}

<button
onClick={scrollRight}
className="absolute top-1/2 -right-4 bg-black/40 backdrop-blur-sm p-2 rounded-full"
>
<ChevronRight className="text-gray-300 cursor-pointer" />
</button>

</div>

</div>

)
}