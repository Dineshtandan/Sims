import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Training', path: '/training' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled
                ? 'bg-white/80 backdrop-blur-lg shadow-lg py-2'
                : 'bg-transparent py-4'
            }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="group flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-300">
                                <Sparkles size={20} />
                            </div>
                            <span className={`text-2xl font-serif font-bold tracking-tight transition-colors duration-300 ${scrolled || location.pathname !== '/' ? 'text-gray-900' : 'text-white'
                                }`}>
                                Sims <span className="text-rose-500 italic">Makeup</span>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-10">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:text-rose-500 relative group ${(scrolled || location.pathname !== '/') ? 'text-gray-600' : 'text-gray-200'
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''
                                    }`}></span>
                            </Link>
                        ))}

                        <Link
                            to="/booking"
                            className="premium-gradient text-white px-8 py-3 rounded-full hover:shadow-xl hover:shadow-rose-200 transition-all transform hover:-translate-y-0.5 active:scale-95 font-bold text-sm tracking-widest uppercase"
                        >
                            Book Now
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-xl transition-colors ${isOpen ? 'bg-rose-50 text-rose-600' : (scrolled || location.pathname !== '/' ? 'text-gray-600' : 'text-white')
                                }`}
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden fixed inset-0 top-[72px] bg-white transition-all duration-500 ease-in-out transform ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                }`}>
                <div className="p-8 space-y-6">
                    {links.map((link, idx) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`block text-3xl font-serif font-bold transition-all duration-300 ${location.pathname === link.path ? 'text-rose-600 translate-x-4' : 'text-gray-900'
                                }`}
                            onClick={() => setIsOpen(false)}
                            style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="pt-8">
                        <Link
                            to="/booking"
                            className="block w-full text-center premium-gradient text-white px-4 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-rose-100"
                            onClick={() => setIsOpen(false)}
                        >
                            Book Your Session
                        </Link>
                    </div>

                    <div className="pt-12 text-center">
                        <p className="text-gray-400 text-sm font-medium tracking-[0.2em] uppercase mb-4">Follow My Art</p>
                        <div className="flex justify-center gap-6">
                            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-gray-400 hover:text-rose-500 transition-colors">
                                <Instagram size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;



