import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api/api';
import { Sparkles, ArrowRight } from 'lucide-react';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await api.get('/services');
                setServices(res.data);
            } catch (error) {
                console.error("Failed to fetch services", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
        </div>
    );

    return (
        <div className="py-24 min-h-screen relative overflow-hidden bg-slate-50">
            {/* Background accents */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-rose-100/30 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-amber-100/20 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative animate-fade-in">
                <div className="text-center mb-20">
                    <div className="mb-4 inline-flex items-center px-4 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold tracking-widest uppercase">
                        <Sparkles size={14} className="mr-2" />
                        Signature Collections
                    </div>
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">Our Services</h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Meticulously curated beauty experiences using the world's finest products and most advanced techniques.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="glass-card group flex flex-col lg:flex-row overflow-hidden border-none hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="lg:w-1/2 aspect-[4/3] lg:aspect-auto relative overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                            </div>
                            <div className="p-8 lg:w-1/2 flex flex-col justify-center bg-white/40">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-rose-600 transition-colors uppercase tracking-tight">{service.name}</h3>
                                    <div className="text-rose-600 font-bold text-xl">${service.price}</div>
                                </div>
                                <p className="text-gray-500 mb-8 leading-relaxed font-light">{service.description}</p>
                                <Link
                                    to={`/booking?service=${encodeURIComponent(service.name)}`}
                                    className="inline-flex items-center justify-center premium-gradient text-white font-bold py-4 px-8 rounded-2xl hover:shadow-xl hover:shadow-rose-100 transition-all active:scale-95 group/btn"
                                >
                                    Experience Now <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}

                    {services.length === 0 && (
                        <div className="col-span-full py-32 text-center glass-card">
                            <Sparkles size={48} className="mx-auto text-rose-200 mb-6" />
                            <p className="text-gray-400 text-xl font-light">New bespoke services are being curated.</p>
                            <p className="text-gray-500 mt-2">Please contact us for custom requests.</p>
                        </div>
                    )}
                </div>

                <div className="mt-24 text-center glass-card p-12 lg:p-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full premium-gradient opacity-[0.03] -skew-x-12"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">Aspiring Artist?</h2>
                        <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
                            Join our prestigious academy and master the art of transformative makeup.
                        </p>
                        <Link
                            to="/training"
                            className="text-rose-600 font-bold text-lg hover:underline underline-offset-8 transition-all"
                        >
                            Explore Academy Curriculums
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;

