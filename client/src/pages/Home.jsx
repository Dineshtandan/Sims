import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { Star, ArrowRight, Check, Instagram } from 'lucide-react';

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
            <section className="relative h-[80vh] bg-rose-900/10 flex items-center justify-center">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
                        filter: 'brightness(0.6)'
                    }}
                />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Sims Makeup</h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                        Professional Makeup Artistry & Training Services.
                        Enhancing your natural beauty for every special occasion.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/booking"
                            className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
                        >
                            Book Appointment
                        </Link>
                        <Link
                            to="/services"
                            className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
                        >
                            View Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services Preview Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">Our Services</h2>
                        <div className="w-24 h-1 bg-rose-500 mx-auto mb-6"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto align-middle">
                            From walking down the aisle to learning the art yourself, we offer a range of professional services tailored to you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {loading ? (
                            <div className="col-span-3 text-center py-10">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-rose-600 mx-auto"></div>
                            </div>
                        ) : services.length > 0 ? (
                            services.map((service, index) => (
                                <div key={service._id} className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                                        <h3 className="text-2xl font-serif font-bold text-white mb-2">{service.name}</h3>
                                        <p className="text-gray-200 mb-4 line-clamp-2">{service.description}</p>
                                        <Link to="/services" className="text-white font-bold flex items-center hover:underline">
                                            Learn More <ArrowRight size={16} className="ml-2" />
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                                <p className="text-gray-500">No services found. Add some in the Admin Dashboard!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Sims Makeup Academy Section */}
            <section className="py-20 bg-rose-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 relative">
                            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-rose-400 rounded-lg transform translate-x-4 translate-y-4"></div>
                            <img
                                src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                alt="Makeup Academy"
                                className="relative rounded-lg shadow-xl z-10"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                                Sims Makeup Academy
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Have you always wanted to learn how to apply makeup like a pro?
                                Or perhaps you're aspiring to start your own career in the beauty industry?
                            </p>
                            <p className="text-gray-600 mb-8">
                                Our academy offers tailored courses ranging from 1-on-1 self-application lessons
                                to intensive professional certification programs.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center text-gray-700">
                                    <Check className="text-rose-500 mr-3" /> 1-on-1 Personalized Lessons
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <Check className="text-rose-500 mr-3" /> Professional Certification Checks
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <Check className="text-rose-500 mr-3" /> Hands-on Practice
                                </li>
                            </ul>
                            <Link
                                to="/training"
                                className="inline-block bg-gray-900 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors"
                            >
                                Explore Courses
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Preview Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                            Meet Your Artist
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Hi, I'm Sarah! With over 8 years of experience in the beauty industry,
                            I have dedicated my career to making people feel like the best version of themselves.
                        </p>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            My signature style focuses on enhancing natural features while ensuring longevity
                            and photogenic results. Whether it's your wedding day or a simple lesson,
                            I bring passion and perfectionism to every appointment.
                        </p>
                        <Link
                            to="/about"
                            className="text-rose-600 font-bold text-lg hover:text-rose-700 underline decoration-2 underline-offset-4"
                        >
                            Read More About Me
                        </Link>
                    </div>
                    <div className="md:w-1/2">
                        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                            <img
                                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                                alt="Makeup Artist"
                                className="w-full h-full object-cover rounded-full shadow-xl border-4 border-rose-100"
                            />
                            <div className="absolute bottom-0 right-0 bg-white p-3 rounded-full shadow-lg border border-gray-100">
                                <Star className="text-yellow-400 fill-current" size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-rose-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Client Love</h2>
                        <div className="w-24 h-1 bg-rose-400 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-rose-800/50 p-8 rounded-lg backdrop-blur-sm">
                            <div className="flex text-yellow-400 mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="mb-6 italic">"Sarah made me feel absolutely beautiful on my wedding day. The makeup lasted all night through tears and dancing!"</p>
                            <h4 className="font-bold font-serif">— Emily R.</h4>
                        </div>
                        <div className="bg-rose-800/50 p-8 rounded-lg backdrop-blur-sm">
                            <div className="flex text-yellow-400 mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="mb-6 italic">"The 1-on-1 lesson was a game changer. I finally know how to do a winged liner properly!"</p>
                            <h4 className="font-bold font-serif">— Jessica M.</h4>
                        </div>
                        <div className="bg-rose-800/50 p-8 rounded-lg backdrop-blur-sm">
                            <div className="flex text-yellow-400 mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="mb-6 italic">"Highly professional and so talented. I wouldn't trust anyone else with my face for special events."</p>
                            <h4 className="font-bold font-serif">— Amanda K.</h4>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-24 bg-rose-50 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                        Ready to Glow?
                    </h2>
                    <p className="text-xl text-gray-600 mb-10">
                        Book your appointment today and let us bring out your inner beauty.
                    </p>
                    <Link
                        to="/booking"
                        className="bg-rose-600 hover:bg-rose-700 text-white text-lg font-bold py-4 px-10 rounded-full transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                    >
                        Book Now
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
