import { Mail, Phone, MapPin, Send, Sparkles, Clock } from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-32 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-rose-100/30 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-amber-100/20 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 animate-fade-in">
                <div className="text-center mb-20">
                    <div className="mb-4 inline-flex items-center px-4 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold tracking-widest uppercase">
                        <Sparkles size={14} className="mr-2" />
                        Get In Touch
                    </div>
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">Contact <span className="text-rose-600 italic">Us</span></h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Whether you're booking a transformation or inquiring about our academy, we're here to provide a premium experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Contact Form */}
                    <div className="glass-card p-10 lg:p-12 border-none shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-[0.03] rounded-bl-full transition-transform duration-700 group-hover:scale-150"></div>

                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Send a Message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full bg-white/50 border border-gray-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all placeholder:text-gray-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="email@example.com"
                                        className="w-full bg-white/50 border border-gray-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all placeholder:text-gray-300"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Inquiry Type</label>
                                <select className="w-full bg-white/50 border border-gray-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all appearance-none cursor-pointer">
                                    <option>Bespoke Service Booking</option>
                                    <option>Academy Enrollment</option>
                                    <option>Bridal Consultation</option>
                                    <option>General Inquiry</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Your Message</label>
                                <textarea
                                    rows={5}
                                    placeholder="Tell us how we can help you..."
                                    className="w-full bg-white/50 border border-gray-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all placeholder:text-gray-300 resize-none"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full premium-gradient text-white py-5 px-8 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl hover:shadow-rose-100 hover:-translate-y-1 active:scale-95 transition-all group/btn"
                            >
                                Send Inquiry <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>

                    {/* Info & Map */}
                    <div className="space-y-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                            {[
                                { icon: Mail, title: "Email Us", val: "contact@simsmakeup.com", color: "rose" },
                                { icon: Phone, title: "Call Us", val: "+977 98XXXXXXX", color: "amber" },
                                { icon: MapPin, title: "Studio", val: "Butwal, Nepal", color: "rose" },
                                { icon: Clock, title: "Hours", val: "Mon-Sat: 10AM - 7PM", color: "amber" }
                            ].map((info, idx) => (
                                <div key={idx} className="glass-card p-6 border-none flex items-center gap-6 group hover:bg-white transition-all duration-300">
                                    <div className={`w-14 h-14 rounded-2xl bg-${info.color}-50 flex items-center justify-center text-${info.color}-600 group-hover:bg-${info.color}-600 group-hover:text-white transition-all duration-500`}>
                                        <info.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">{info.title}</h3>
                                        <p className="text-lg font-bold text-gray-900">{info.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="glass-card h-80 rounded-[2rem] overflow-hidden border-none relative group shadow-xl">
                            <div className="absolute inset-0 bg-gray-200">
                                {/* Simulating a map look */}
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i12!2i2391!3i1612!2m3!1e0!2sm!3i606240228!3m8!2sen!3sus!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!5f2')] bg-cover"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-transparent transition-colors">
                                <div className="glass-card py-4 px-8 border-none flex items-center gap-3 shadow-2xl scale-100 group-hover:scale-110 transition-transform">
                                    <MapPin size={20} className="text-rose-600" />
                                    <span className="font-bold text-gray-900">Visit Our Studio</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

