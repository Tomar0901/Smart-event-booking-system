import ticketpng from "../../public/images/ticket.png";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 mt-10">

      <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={ticketpng} className="w-7" />
            <h2 className="text-xl font-semibold text-white">
              Eventify
            </h2>
          </div>

          <p className="text-sm">
            Discover and book amazing events near you.
            Concerts, movies, tech events and more.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-medium mb-3">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Events</li>
            <li className="hover:text-white cursor-pointer">Categories</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-medium mb-3">
            Event Categories
          </h3>

          <ul className="space-y-2 text-sm">
            <li>Movies</li>
            <li>Music</li>
            <li>Theatre</li>
            <li>Tech</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-medium mb-3">
            Follow Us
          </h3>

          <div className="flex gap-4">
            <Facebook className="cursor-pointer hover:text-white"/>
            <Instagram className="cursor-pointer hover:text-white"/>
            <Twitter className="cursor-pointer hover:text-white"/>
            <Youtube className="cursor-pointer hover:text-white"/>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Eventify. All Rights Reserved.
      </div>

    </footer>
  );
}