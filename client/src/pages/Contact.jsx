import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <div className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-serif text-center font-bold text-gray-800 mb-12">Contact Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 border p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 border p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 border p-2"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 transition-colors font-bold">
                                Send Message
                            </button>
                        </form>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-start space-x-4">
                            <div className="bg-rose-100 p-3 rounded-full text-rose-600">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Email</h3>
                                <p className="text-gray-600">contact@*****.com</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-rose-100 p-3 rounded-full text-rose-600">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Phone</h3>
                                <p className="text-gray-600">+977 ******</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-rose-100 p-3 rounded-full text-rose-600">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Studio Location</h3>
                                <p className="text-gray-600">Butwal, Nepal</p>
                            </div>
                        </div>

                        <div className="h-64 bg-gray-200 rounded-lg overflow-hidden relative">
                            {/* Map placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                Map Integration Placeholder
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
