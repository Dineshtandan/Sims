const About = () => {
    return (
        <div className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                            alt="Makeup Artist"
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                    <div className="md:w-1/2">
                        <h1 className="text-4xl font-serif font-bold text-gray-800 mb-6">About Me</h1>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Welcome to Sims Makeup, where artistry meets passion. I'm Sarah, the lead artist and founder.
                            With over 7 years of experience in the beauty industry, I specialize in creating timeless,
                            elegant looks that enhance your natural features.
                        </p>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            My journey began in theatrical makeup, but I soon fell in love with the personal connection of
                            bridal and event styling. I believe that makeup isn't about masking who you are, but celebrating it.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            In addition to services, I offer professional training courses designed to empower the next
                            generation of artists with the skills and confidence they need to succeed in this dynamic industry.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
