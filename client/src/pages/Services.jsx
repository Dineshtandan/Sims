import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api/api';

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

    if (loading) return <div className="text-center py-20">Loading services...</div>;

    return (
        <div className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">Makeup Services</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Enhancing your natural beauty with premium products and expert techniques.
                        For professional training courses, please visit our <Link to="/training" className="text-rose-600 underline">Academy page</Link>.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row h-full md:h-64">
                            <div className="md:w-1/2 h-48 md:h-full relative">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6 md:w-1/2 flex flex-col justify-center">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                                    <span className="text-rose-600 font-bold">${service.price}</span>
                                </div>
                                <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                                <Link
                                    to={`/booking?service=${encodeURIComponent(service.name)}`}
                                    className="inline-block bg-rose-600 text-white font-bold py-2 px-6 rounded-full hover:bg-rose-700 transition-colors text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    Book Now
                                </Link>
                            </div>
                        </div>
                    ))}
                    {services.length === 0 && (
                        <div className="col-span-full py-12 text-center bg-white rounded-lg border-2 border-dashed border-gray-200">
                            <p className="text-gray-500">No services available at the moment. Please check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Services;
