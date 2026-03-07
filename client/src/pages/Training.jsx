import { useState, useEffect } from 'react';
import { Check, Star, HelpCircle, BookOpen, Calendar, Clock, DollarSign, Users, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/api';

const Training = () => {
    const [upcomingClasses, setUpcomingClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await api.get('/training-sessions');
                setUpcomingClasses(res.data);
            } catch (err) {
                console.error("Error fetching classes:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    const courses = [
        {
            title: "1-on-1 Self Mastery",
            price: "$150",
            duration: "3 Hours",
            description: "Learn how to master your own face. Perfect for beginners wanting to elevate their daily look.",
            features: [
                "Skin prep & color matching",
                "Day to night transition",
                "Product recommendations",
                "Brush techniques",
                "Personalized face chart"
            ],
            image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Aspiring MUA Intensive",
            price: "$450",
            duration: "1 Day (6 Hours)",
            description: "Kickstart your career with professional techniques. Covers sanitation, kit building, and client interaction.",
            features: [
                "Health & Hygiene standards",
                "Color theory & face shapes",
                "Full bridal look demonstration",
                "Hands-on practice on model",
                "Business & social media basics"
            ],
            image: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Pro Skill Refresher",
            price: "$250",
            duration: "4 Hours",
            description: "For existing artists looking to update their skills or learn a specific trending technique.",
            features: [
                "Focus on specific areas (e.g., Cut Crease)",
                "Advanced contouring & highlighting",
                "Speed techniques",
                "Product knowledge update",
                "Portfolio building tips"
            ],
            image: "https://images.unsplash.com/photo-1503236823255-94308829881f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
    ];

    const faqs = [
        {
            question: "Do I need to bring my own makeup?",
            answer: "For the Self Mastery course, we recommend bringing your own makeup bag so we can teach you how to use what you already have. We will supplement with our professional kit. For Pro courses, all materials are provided."
        },
        {
            question: "Do I receive a certificate?",
            answer: "Yes! All professional courses (Aspiring MUA & Pro Refresher) come with a Sims Makeup Academy Certificate of Completion."
        },
        {
            question: "Is there a deposit required?",
            answer: "A 50% non-refundable deposit is required to secure your training date. The remaining balance is due on the day of the course."
        },
        {
            question: "Can I bring a model?",
            answer: "For professional courses, you will need a model for the hands-on portion. We can help provide one if needed for an additional fee."
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-rose-50/50 -z-10"></div>
                <div className="absolute top-20 right-[-10%] w-96 h-96 bg-rose-200/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 animate-fade-in">
                            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-rose-600 uppercase bg-rose-100/50 rounded-full border border-rose-200">
                                Education & Artistry
                            </span>
                            <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-8 leading-tight">
                                Sims Makeup <span className="text-rose-600 italic">Academy</span>
                            </h1>
                            <p className="text-xl text-gray-500 mb-10 leading-relaxed font-light">
                                Elevate your skills with professional makeup training. From mastering your daily look to launching a professional career, we provide the prestigious guidance you deserve.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <Link
                                    to="/contact"
                                    className="premium-gradient text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-xl hover:shadow-rose-200 hover:-translate-y-1 active:scale-95 text-center"
                                >
                                    Inquire for Enrollment
                                </Link>
                                <a
                                    href="#courses"
                                    className="bg-white text-gray-900 font-bold py-4 px-10 rounded-2xl transition-all border border-gray-100 shadow-lg hover:bg-gray-50 text-center"
                                >
                                    View Curriculum
                                </a>
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <div className="absolute -inset-4 premium-gradient rounded-[2.5rem] opacity-20 blur-2xl"></div>
                            <img
                                src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                alt="Makeup Training"
                                className="relative rounded-[2rem] shadow-2xl z-10"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Upcoming Classes Section - Dynamic */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative animate-fade-in">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Upcoming Masterclasses</h2>
                        <div className="w-24 h-1.5 premium-gradient mx-auto mb-8 rounded-full"></div>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Intensive group sessions designed for collaborative learning and practical expertise.
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center py-20 glass-card">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600 mx-auto"></div>
                        </div>
                    ) : upcomingClasses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {upcomingClasses.map((session, index) => (
                                <div key={session._id} className="glass-card group border-none hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="h-3 premium-gradient"></div>
                                    <div className="p-10">
                                        <div className="flex justify-between items-start mb-6">
                                            <h3 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-rose-600 transition-colors uppercase tracking-tight">{session.title}</h3>
                                            <div className="premium-gradient text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                                                ${session.price}
                                            </div>
                                        </div>

                                        <div className="space-y-5 mb-10">
                                            <div className="flex items-center text-gray-600">
                                                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center mr-4 group-hover:bg-rose-600 group-hover:text-white transition-all">
                                                    <Calendar size={18} />
                                                </div>
                                                <span className="font-medium">{new Date(session.date).toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center mr-4 group-hover:bg-rose-600 group-hover:text-white transition-all">
                                                    <Clock size={18} />
                                                </div>
                                                <span className="font-medium">{new Date(session.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({session.duration / 60}h)</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center mr-4 group-hover:bg-rose-600 group-hover:text-white transition-all">
                                                    <Users size={18} />
                                                </div>
                                                <span className="font-medium text-rose-500 font-bold tracking-tight">{session.capacity - session.enrolled} Slots Left</span>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/booking?type=class&id=${session._id}`}
                                            className="block w-full premium-gradient text-white text-center font-bold py-4 rounded-2xl hover:shadow-xl hover:shadow-rose-100 transition-all active:scale-95"
                                        >
                                            Secure Seat Now
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-24 glass-card text-center border-dashed border-2 border-gray-200">
                            <Users size={48} className="mx-auto text-rose-200 mb-6" />
                            <p className="text-gray-400 text-xl font-light">New masterclasses are currently being scheduled.</p>
                            <p className="text-gray-500 mt-2">Private sessions remain available for booking.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Courses Section - Static Info */}
            <section id="courses" className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 animate-fade-in">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Expert Curriculum</h2>
                        <div className="w-24 h-1.5 premium-gradient mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {courses.map((course, index) => (
                            <div key={index} className="glass-card group flex flex-col border-none hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
                                <div className="h-64 overflow-hidden relative">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 premium-gradient text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                                        {course.price}
                                    </div>
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4 group-hover:text-rose-600 transition-colors uppercase tracking-tight">{course.title}</h3>
                                    <div className="flex items-center text-gray-400 text-xs font-bold tracking-widest uppercase mb-6">
                                        <BookOpen size={14} className="mr-2 text-rose-500" />
                                        <span>{course.duration} SESSION</span>
                                    </div>
                                    <p className="text-gray-500 mb-8 leading-relaxed font-light">{course.description}</p>

                                    <div className="mt-auto">
                                        <h4 className="font-bold text-gray-900 mb-4 text-xs uppercase tracking-[0.2em] flex items-center before:w-6 before:h-px before:bg-rose-500 before:mr-3">Curriculum Focus</h4>
                                        <ul className="space-y-3 mb-8">
                                            {course.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start text-sm text-gray-600 group/item">
                                                    <div className="w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center mr-3 mt-0.5 group-hover/item:bg-rose-600 group-hover/item:text-white transition-all">
                                                        <Check size={12} />
                                                    </div>
                                                    <span className="font-medium">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Academy */}
            <section className="bg-gray-900 text-white py-32 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-600 rounded-full blur-[150px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2">
                            <span className="text-rose-400 font-bold uppercase tracking-[0.2em] text-sm mb-6 block">The Sims Advantage</span>
                            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-10 leading-tight">Elite Training for <span className="text-rose-400 italic">Elite Artists</span></h2>
                            <p className="text-gray-300 mb-12 text-xl font-light leading-relaxed">
                                We empower our students with prestige techniques and real-world business acumen. Practice on professional models and launch your career with confidence.
                            </p>
                            <div className="space-y-8">
                                {[
                                    { title: "Industry Accredited", desc: "Recognized certification valid for professional pro-discounts and insurance.", icon: Star },
                                    { title: "Portfolio Development", desc: "Leave with high-end imagery of your work for your professional launch.", icon: Sparkles },
                                    { title: "Artist Alumni Network", desc: "Lifetime access to our exclusive community and career mentorship.", icon: Users }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start group">
                                        <div className="bg-rose-600 p-3 rounded-2xl mr-6 group-hover:rotate-12 transition-all">
                                            <item.icon size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                                            <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="absolute -inset-4 premium-gradient rounded-[2.5rem] opacity-30 blur-2xl -z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Makeup Class"
                                className="relative rounded-[2rem] shadow-2xl border border-white/10"
                            />
                            <div className="absolute bottom-10 left-[-20px] glass-card p-8 shadow-2xl z-20 hidden md:block border-none bg-rose-600 text-white">
                                <div className="text-3xl font-bold mb-1 italic">Certification</div>
                                <div className="text-xs font-bold uppercase tracking-widest opacity-80">Included in all Pro courses</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-32 bg-slate-50 relative">
                <div className="max-w-4xl mx-auto px-6 lg:px-12 animate-fade-in">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Common Inquiries</h2>
                        <div className="w-24 h-1.5 premium-gradient mx-auto rounded-full"></div>
                    </div>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="glass-card p-8 hover:bg-white transition-all duration-300 border-none group cursor-pointer shadow-lg hover:shadow-xl">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center mr-6 group-hover:bg-rose-600 group-hover:text-white transition-all flex-shrink-0">
                                        <HelpCircle size={24} className="text-rose-500 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                                        <p className="text-gray-500 leading-relaxed font-light">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Training;

