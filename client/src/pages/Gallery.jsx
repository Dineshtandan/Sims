import { Sparkles, Camera, Instagram, Maximize2 } from 'lucide-react';

const Gallery = () => {
    // Curated high-end makeup images
    const images = [
        { src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", tag: "Editorial" },
        { src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", tag: "Bridal" },
        { src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", tag: "Academy" },
        { src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", tag: "Details" },
        { src: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", tag: "Fashion" },
        { src: "https://images.unsplash.com/photo-1583241744611-3fb34b077a8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", tag: "Glam" },
        { src: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", tag: "Minimal" },
        { src: "https://images.unsplash.com/photo-1503236823255-94308829881f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", tag: "Evening" }
    ];

    return (
        <div className="bg-slate-50 min-h-screen py-32 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-rose-100/30 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-amber-100/20 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative animate-fade-in">
                <div className="text-center mb-20">
                    <div className="mb-4 inline-flex items-center px-4 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold tracking-widest uppercase">
                        <Camera size={14} className="mr-2" />
                        Visual Portfolio
                    </div>
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">Artistry <span className="text-rose-600 italic">Gallery</span></h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        A collection of our finest transformations, showcasing cinematic glamour and timeless elegance.
                    </p>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {images.map((item, idx) => (
                        <div
                            key={idx}
                            className="relative group overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 bg-white"
                        >
                            <img
                                src={item.src}
                                alt={`Gallery ${idx + 1}`}
                                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <div className="absolute top-4 right-4">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                                        <Maximize2 size={18} />
                                    </div>
                                </div>
                                <div className="absolute bottom-8 left-8 right-8">
                                    <span className="inline-block px-3 py-1 mb-3 text-[10px] font-bold tracking-widest text-white uppercase bg-rose-600 rounded-full">
                                        {item.tag}
                                    </span>
                                    <h3 className="text-xl font-serif font-bold text-white uppercase tracking-tight">Sims Signature Look</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Instagram CTA */}
                <div className="mt-24 glass-card p-12 text-center border-none shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-[0.05] rounded-bl-full group-hover:scale-125 transition-transform duration-700"></div>
                    <div className="relative z-10">
                        <Instagram size={48} className="mx-auto text-rose-500 mb-6 group-hover:rotate-12 transition-transform" />
                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Follow the Journey</h2>
                        <p className="text-gray-500 mb-10 max-w-xl mx-auto font-light">
                            Join our community on Instagram for daily inspiration, behind-the-scenes content, and exclusive training tips.
                        </p>
                        <a
                            href="#"
                            className="inline-flex items-center gap-3 premium-gradient text-white font-bold py-4 px-10 rounded-2xl shadow-xl hover:shadow-rose-100 transition-all active:scale-95"
                        >
                            @SimsMakeupArtistry <Sparkles size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;

