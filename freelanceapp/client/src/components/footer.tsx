import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* --- Brand Section --- */}
        <div>
          <h2 className="text-2xl font-bold text-white">Workify</h2>
          <p className="mt-2 text-gray-400 text-sm">
            Empowering freelancers and clients to connect, collaborate, 
            and create amazing work — anytime, anywhere.
          </p>
        </div>

        {/* --- Navigation Links --- */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/gigs" className="hover:text-white">Explore Gigs</Link></li>
            <li><Link to="/create-gig" className="hover:text-white">Post a Gig</Link></li>
            <li><Link to="/auth/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/auth/register" className="hover:text-white">Register</Link></li>
          </ul>
        </div>

        {/* --- Socials --- */}
        <div>
          <h3 className="text-white font-semibold mb-3">Connect with us</h3>
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" className="hover:text-white"><Github size={20} /></a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-white"><Linkedin size={20} /></a>
            <a href="https://twitter.com" target="_blank" className="hover:text-white"><Twitter size={20} /></a>
          </div>
          <p className="text-gray-500 text-sm mt-4">support@workify.com</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Workify. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
