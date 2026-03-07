import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { Star, ArrowRight, Check, Instagram, Sparkles } from 'lucide-react';

const Home = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await api.get('/services');
                setServices(res.data.slice(0, 3)); // Only show first 3
            } catch (error) {
                console.error("Failed to fetch services", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
                        filter: 'brightness(0.4) contrast(1.1)'
                    }}
                />

                {/* Decorative Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-0"></div>

                <div className="relative z-10 text-center text-white px-6 max-w-5xl animate-fade-in">
                    <div className="mb-6 flex justify-center">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-[0.2em] uppercase">
                            <Sparkles size={14} className="mr-2 text-rose-400" />
                            Artistry in every touch
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-tight tracking-tight">
                        Sims <span className="text-rose-400 italic">Makeup</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light leading-relaxed text-gray-200">
                        Professional Makeup Artistry & Training Services.
                        Enhancing your natural radiance for life's most precious moments.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            to="/booking"
                            className="premium-gradient text-white font-bold py-4 px-10 rounded-full transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 text-lg"
                        >
                            Book Appointment
                        </Link>
                        <Link
                            to="/services"
                            className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold py-4 px-10 rounded-full transition-all hover:bg-white hover:text-gray-900 shadow-xl hover:scale-105 active:scale-95 text-lg"
                        >
                            View Services
                        </Link>
                    </div>
                </div>

                {/* Bottom transition gradient */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent z-10"></div>
            </section>

            {/* Services Preview Section */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-24 animate-fade-in">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Bespoke Services</h2>
                        <div className="w-24 h-1.5 premium-gradient mx-auto mb-8 rounded-full"></div>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Meticulously crafted beauty experiences designed to showcase your unique personality and elegance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {loading ? (
                            [1, 2, 3].map(i => (
                                <div key={i} className="h-[450px] rounded-3xl bg-gray-100 animate-pulse"></div>
                            ))
                        ) : services.length > 0 ? (
                            services.map((service, index) => (
                                <div
                                    key={service._id}
                                    className="group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 hover:-translate-y-3 aspect-[3/4]"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <h3 className="text-3xl font-serif font-bold text-white mb-3">{service.name}</h3>
                                            <p className="text-gray-300 mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{service.description}</p>
                                            <Link
                                                to="/services"
                                                className="inline-flex items-center text-rose-400 font-bold hover:text-rose-300 transition-colors"
                                            >
                                                Explore Detail <ArrowRight size={18} className="ml-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-20 glass-card">
                                <p className="text-gray-500 text-xl">Our signature collections are coming soon.</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-16 text-center">
                        <Link to="/services" className="text-rose-600 font-bold hover:underline underline-offset-8 transition-all">
                            View All Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* Sims Makeup Academy Section */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="lg:w-1/2">
                            <div className="relative">
                                <div className="absolute -inset-4 premium-gradient rounded-[2rem] opacity-20 blur-xl"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                    alt="Makeup Academy"
                                    className="relative rounded-[2rem] shadow-2xl z-10 aspect-square object-cover"
                                />
                                <div className="absolute -bottom-6 -right-6 glass-card p-6 shadow-2xl z-20 max-w-[200px]">
                                    <div className="text-4xl font-bold text-rose-600 mb-1">8yr+</div>
                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Industry Expertise</div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <span className="text-rose-600 font-bold track-widest uppercase text-sm mb-4 block">Education & Mentorship</span>
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-8 leading-tight">
                                Sims Makeup <span className="text-rose-600 italic">Academy</span>
                            </h2>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light">
                                Elevate your skills with our professional training programs. Whether you're a beginner or an aspiring professional, we pave your path to excellence.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                                {[
                                    "1-on-1 Personalized Lessons",
                                    "Professional Certification",
                                    "Portfolio Development",
                                    "Business Mentorship"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                                            <Check size={20} />
                                        </div>
                                        <span className="font-semibold text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <Link
                                to="/training"
                                className="inline-flex items-center bg-gray-900 text-white font-bold py-4 px-10 rounded-full hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                            >
                                Explore Academy <ArrowRight size={20} className="ml-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-32 bg-gray-900 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-600 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600 rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Client Stories</h2>
                        <div className="w-24 h-1.5 bg-rose-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { name: "Emily R.", text: "Sarah made me feel absolutely beautiful on my wedding day. The makeup lasted all night through tears and dancing!" },
                            { name: "Jessica M.", text: "The 1-on-1 lesson was a game changer. I finally know how to do a winged liner properly!" },
                            { name: "Amanda K.", text: "Highly professional and so talented. I wouldn't trust anyone else with my face for special events." }
                        ].map((t, idx) => (
                            <div key={idx} className="bg-white/5 backdrop-blur-xl p-10 rounded-[2rem] border border-white/10 relative shadow-2xl transition-all duration-500 hover:bg-white/10 hover:-translate-y-2">
                                <div className="text-6xl text-rose-500/30 font-serif absolute top-4 left-6">"</div>
                                <div className="flex text-amber-400 mb-8 relative z-10">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                                </div>
                                <p className="mb-8 text-gray-300 leading-relaxed italic text-lg relative z-10">"{t.text}"</p>
                                <h4 className="font-bold font-serif text-white tracking-wider flex items-center before:w-8 before:h-px before:bg-rose-500 before:mr-4 uppercase text-sm">— {t.name}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-40 bg-slate-50 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10 animate-fade-in">
                    <h2 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-8 tracking-tight">
                        Your Journey to <span className="text-rose-600">Radiance</span> Starts Here.
                    </h2>
                    <p className="text-2xl text-gray-500 mb-12 font-light max-w-2xl mx-auto">
                        Limited availability for peak seasons. Book your consultation today.
                    </p>
                    <Link
                        to="/booking"
                        className="inline-flex items-center bg-rose-600 hover:bg-rose-700 text-white text-xl font-bold py-5 px-14 rounded-full transition-all shadow-2xl hover:shadow-rose-300 transform hover:-translate-y-1 active:scale-95"
                    >
                        Secure Your Date <Sparkles size={24} className="ml-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;

