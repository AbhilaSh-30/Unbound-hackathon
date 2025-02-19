import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../assets/favicon.svg";
import { navLinks } from "./navlinks.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-7 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <img src={Logo} alt="PSG TECH Logo" width={40} height={40} />
            <div className="text-xl text-black font-bold">CHAT AI</div>
          </div>
          <div className="hidden lg:flex space-x-6">
            {navLinks.slice(1).map(({ text, link }) => (
              <a 
                key={text} 
                href={link} 
                onClick={() => setActive(text)}
                className={`relative px-3 py-2 font-medium rounded-full transition-all duration-300 ${active === text ? 'bg-purple-500 text-white' : 'text-black hover:bg-purple-500 hover:text-white'}`}
              >
                {text}
              </a>
            ))}
          </div>
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              {isOpen ? <X size={28} className="text-black"/> : <Menu size={28} className="text-black"/>}
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} lg:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-2 bg-white shadow-md">
          {navLinks.slice(1).map(({ text, link }) => (
            <a 
              key={text} 
              href={link} 
              onClick={() => { setActive(text); setIsOpen(false); }}
              className={`block px-3 py-2 rounded-md font-medium transition-all duration-300 ${active === text ? 'bg-purple-500 text-white' : 'text-black hover:bg-purple-500 hover:text-white'}`}
            >
              {text}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
