const Gallery = () => {
    // Placeholder images from Unsplash
    const images = [
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1596462502278-27bfdd403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1583241744611-3fb34b077a8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ];

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-serif text-center font-bold text-gray-800 mb-12">Gallery</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {images.map((src, idx) => (
                        <div key={idx} className="relative group overflow-hidden rounded-lg shadow-sm">
                            <img
                                src={src}
                                alt={`Gallery ${idx + 1}`}
                                className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
