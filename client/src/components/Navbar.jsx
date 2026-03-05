import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Training', path: '/training' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-serif text-rose-600 font-bold">
                            Sims Makeup
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`transition-colors ${location.pathname === link.path
                                    ? 'text-rose-600 font-bold border-b-2 border-rose-600'
                                    : 'text-gray-600 hover:text-rose-500'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <Link
                            to="/booking"
                            className="bg-rose-600 text-white px-6 py-2 rounded-full hover:bg-rose-700 transition-all transform hover:scale-105 shadow-md font-medium"
                        >
                            Book Now
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-rose-500 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`block px-3 py-2 rounded-md ${location.pathname === link.path
                                    ? 'bg-rose-50 text-rose-600 font-bold'
                                    : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50'
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <Link
                            to="/booking"
                            className="block w-full text-center bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 mt-4"
                            onClick={() => setIsOpen(false)}
                        >
                            Book Now
                        </Link>

                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;


