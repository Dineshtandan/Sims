import { Sparkles, Heart, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-rose-50/50 -z-10"></div>
                <div className="absolute top-20 right-[-10%] w-96 h-96 bg-rose-200/20 rounded-full blur-[100px] -z-10"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative animate-fade-in">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <div className="lg:w-1/2 relative">
                            <div className="absolute -inset-4 premium-gradient rounded-[2.5rem] opacity-20 blur-2xl"></div>
                            <div className="relative group overflow-hidden rounded-[2rem] shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                    alt="Sarah - Lead Artist"
                                    className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                                    <p className="text-white text-lg font-serif italic">"Artistry is the celebration of individual essence."</p>
                                </div>
                            </div>

                            {/* Floating Stats */}
                            <div className="absolute -bottom-10 -right-10 glass-card p-6 shadow-2xl hidden md:block border-none">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl premium-gradient flex items-center justify-center text-white">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">7+ Years</div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Professional Exp.</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2">
                            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-rose-600 uppercase bg-rose-100/50 rounded-full border border-rose-200">
                                The Artist Behind the Vision
                            </span>
                            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-8 leading-tight">
                                Meet Sarah <span className="text-rose-600 italic">Sims</span>
                            </h1>
                            <div className="space-y-6 text-gray-500 text-lg leading-relaxed font-light">
                                <p>
                                    Welcome to Sims Makeup, where artistry meets passion. I'm Sarah, the lead artist and founder. With over 7 years of experience in the beauty industry, I specialize in creating timeless, elegant looks that enhance your natural features.
                                </p>
                                <p>
                                    My journey began in theatrical makeup, where I learned the power of transformation. However, I soon fell in love with the deeply personal connection of bridal and event styling. I believe that makeup isn't about masking who you are, but celebrating it.
                                </p>
                                <p>
                                    Each brushstroke is intentional, aimed at bringing out the most radiant version of you. My philosophy is simple: bespoke beauty tailored to your unique story.
                                </p>
                            </div>

                            <div className="mt-12 flex flex-wrap gap-8">
                                <Link to="/booking" className="premium-gradient text-white font-bold py-4 px-10 rounded-2xl shadow-xl hover:shadow-rose-100 transition-all active:scale-95">
                                    Book a Consultation
                                </Link>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-rose-600">
                                        <Heart size={20} />
                                    </div>
                                    <span className="font-bold text-gray-900 uppercase tracking-widest text-xs">Passion for Excellence</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {[
                            {
                                icon: Sparkles,
                                title: "Artistic Precision",
                                desc: "Every look is a masterpiece, crafted with meticulous attention to detail and professional-grade products."
                            },
                            {
                                icon: Users,
                                title: "Empowerment",
                                desc: "Through our Academy, we nurture the next generation of artists, giving them the tools to master their craft."
                            },
                            {
                                icon: Award,
                                title: "Timeless Quality",
                                desc: "We focus on looks that transcend trends, ensuring you feel sophisticated and beautiful for years to come."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="glass-card p-10 hover:shadow-2xl transition-all duration-500 border-none group">
                                <div className="w-16 h-16 rounded-3xl bg-rose-50 flex items-center justify-center mx-auto mb-8 group-hover:bg-rose-600 group-hover:text-white transition-all duration-500">
                                    <item.icon size={32} className="text-rose-600 group-hover:text-white" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">{item.title}</h3>
                                <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Academy CTA */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-900 -z-10"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full premium-gradient opacity-10 -skew-x-12"></div>

                <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">Ready to Master the Craft?</h2>
                    <p className="text-xl text-gray-400 mb-12 font-light leading-relaxed">
                        Join our prestigious academy and start your journey toward becoming a professional makeup artist today.
                    </p>
                    <Link
                        to="/training"
                        className="inline-block premium-gradient text-white font-bold py-5 px-12 rounded-2xl shadow-2xl hover:shadow-rose-500/20 transition-all hover:scale-105 active:scale-95 text-xl"
                    >
                        Explore Training Programs
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;

