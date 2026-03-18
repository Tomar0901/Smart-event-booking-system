import EventSlider from "../Components/EventSlider"
import Footer from "../Components/Footer"
import Poster from "../Components/Poster"
import UserNav from "../Components/UserNav"

export default function UserDashboard(){
return(
    <div>
        <UserNav/>
        
        <div className="bg-gray-100 min-h-screen">
<EventSlider/>
<Poster/>
<Footer/>
        </div>
    </div>
    
)
}