import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t mt-auto">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-xl font-serif text-rose-600 font-bold">Sims Makeup</span>
                        <p className="text-sm text-gray-500 mt-1">Professional Makeup & Training</p>
                    </div>
                    <div className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} Sims Makeup. All rights reserved.
                        <Link to="/admin/login" className="ml-4 hover:text-rose-500 transition-colors">Admin Login</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
