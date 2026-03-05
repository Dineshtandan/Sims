import { useState, useEffect } from 'react';
import { Check, Star, HelpCircle, BookOpen, Calendar, Clock, DollarSign, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Training = () => {
    const [upcomingClasses, setUpcomingClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/training-sessions');
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
            answer: "For the Self Mastery course, we recommend bringing your own makeup bag so we can teach you how to use what you already have. We will supplement with our professional kit. for Pro courses, all materials are provided."
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
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative py-20 bg-rose-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                            Sims Makeup Academy
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Elevate your skills with professional makeup training.
                            Whether you want to master your own daily look or dream of becoming a professional makeup artist,
                            our tailored courses provide the knowledge and confidence you need.
                        </p>
                        <Link
                            to="/contact"
                            className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg"
                        >
                            Inquire Now
                        </Link>
                    </div>
                    <div className="md:w-1/2 md:pl-10">
                        <img
                            src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                            alt="Makeup Training"
                            className="rounded-lg shadow-2xl"
                        />
                    </div>
                </div>
            </section>

            {/* Upcoming Classes Section - Dynamic */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Upcoming Classes</h2>
                        <div className="w-24 h-1 bg-rose-500 mx-auto mb-4"></div>
                        <p className="text-gray-600">Join our scheduled group sessions or book a private lesson.</p>
                    </div>

                    {loading ? (
                        <div className="text-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto"></div>
                        </div>
                    ) : upcomingClasses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                            {upcomingClasses.map((session) => (
                                <div key={session._id} className="bg-white border border-rose-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col relative">
                                    <div className="absolute top-4 right-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                        Upcoming
                                    </div>
                                    <div className="p-8 flex-grow">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{session.title}</h3>
                                        <div className="flex items-center text-rose-600 font-bold text-xl mb-6">
                                            ${session.price}
                                        </div>

                                        <div className="space-y-4 mb-8">
                                            <div className="flex items-start text-gray-600">
                                                <Calendar className="w-5 h-5 mr-3 text-rose-500 flex-shrink-0" />
                                                <span>{new Date(session.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Clock className="w-5 h-5 mr-3 text-rose-500 flex-shrink-0" />
                                                <span>{new Date(session.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({session.duration / 60} hours)</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Users className="w-5 h-5 mr-3 text-rose-500 flex-shrink-0" />
                                                <span>{session.capacity - session.enrolled} spots remaining</span>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/booking?type=class&id=${session._id}`}
                                            className="block w-full bg-gray-900 text-white text-center font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors"
                                        >
                                            Book This Class
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300 mb-20">
                            <p className="text-gray-500 text-lg">No upcoming group classes scheduled at the moment.</p>
                            <p className="text-gray-400 mt-2">Check back later or book a private session below!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Courses Section - Static Info */}
            <section className="py-20 bg-rose-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Our Courses</h2>
                        <div className="w-24 h-1 bg-rose-500 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {courses.map((course, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                                        <span className="bg-rose-100 text-rose-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                                            {course.price}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-500 text-sm mb-4">
                                        <BookOpen size={16} className="mr-2" />
                                        <span>{course.duration}</span>
                                    </div>
                                    <p className="text-gray-600 mb-6 text-sm">{course.description}</p>

                                    <div className="mt-auto">
                                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">What you'll learn:</h4>
                                        <ul className="space-y-2 mb-6">
                                            {course.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start text-sm text-gray-600">
                                                    <Check size={16} className="text-rose-500 mr-2 mt-0.5 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Link
                                            to="/booking?type=training"
                                            className="block w-full text-center border-2 border-rose-600 text-rose-600 font-bold py-2 rounded-lg hover:bg-rose-600 hover:text-white transition-colors"
                                        >
                                            Book Course
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Academy */}
            <section className="bg-gray-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Why Train With Sims Makeup?</h2>
                            <p className="text-gray-300 mb-6 text-lg">
                                We believe in empowering aspiring artists with practical, real-world skills.
                                Our training goes beyond just application; we teach you the industry standards
                                that will set you apart.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="bg-rose-600 p-2 rounded-full mr-4">
                                        <Star size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl">Industry Accredited</h4>
                                        <p className="text-gray-400">Recognized certification to help you get pro discounts and insurance.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-rose-600 p-2 rounded-full mr-4">
                                        <Check size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl">Hands-on Experience</h4>
                                        <p className="text-gray-400">Practice on real models with immediate feedback and guidance.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-rose-600 p-2 rounded-full mr-4">
                                        <Star size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl">Ongoing Support</h4>
                                        <p className="text-gray-400">Join our alumni community for continued mentorship and job opportunities.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-rose-600 rounded-lg transform translate-x-4 translate-y-4 opacity-50"></div>
                            <img
                                src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Makeup Class"
                                className="relative rounded-lg shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-rose-50/50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-600">Got questions about our courses? We've got answers.</p>
                    </div>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                                <div className="flex items-start">
                                    <HelpCircle className="text-rose-500 mr-4 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                                        <p className="text-gray-600">{faq.answer}</p>
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
