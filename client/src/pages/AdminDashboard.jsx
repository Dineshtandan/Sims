import { useState, useEffect, useCallback } from 'react';
import api from '../api/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import BookingsTable from '../components/BookingsTable';
import AvailabilityBlock from '../components/BlockForm';
import { Plus, Trash, Calendar, Users, DollarSign, Clock } from 'lucide-react';

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [trainingSessions, setTrainingSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('bookings'); // 'bookings', 'availability', 'classes', 'services'
    const [services, setServices] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // New Service Form State
    const [newService, setNewService] = useState({
        name: '',
        price: '',
        description: '',
        image: ''
    });

    // New Class Form State
    const [newClass, setNewClass] = useState({
        title: '',
        date: '',
        time: '',
        duration: 180,
        price: '',
        capacity: 5
    });

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const bookingRes = await api.get('/bookings');
            setBookings(bookingRes.data);

            const trainingRes = await api.get('/training-sessions');
            setTrainingSessions(trainingRes.data);

            const serviceRes = await api.get('/services');
            setServices(serviceRes.data);

        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch data');
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                navigate('/admin/login');
            }
        } finally {
            setLoading(false);
        }
    }, [token, navigate]);

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchData();
    }, [token, navigate, fetchData]);

    const handleCreateClass = async (e) => {
        e.preventDefault();
        try {
            // Combine date and time
            const dateTime = new Date(`${newClass.date}T${newClass.time}`);

            await api.post('/training-sessions', {
                ...newClass,
                date: dateTime
            });

            toast.success('Class created successfully!');
            fetchData(); // Refresh list
            setNewClass({ title: '', date: '', time: '', duration: 180, price: '', capacity: 5 }); // Reset form
        } catch (error) {
            console.error(error);
            toast.error('Failed to create class');
        }
    };

    const handleDeleteClass = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this class?')) return;

        try {
            await api.delete(`/training-sessions/${id}`);
            toast.success('Class cancelled');
            fetchData();
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete class');
        }
    };

    const handleCreateService = async (e) => {
        e.preventDefault();
        try {
            await api.post('/services', newService);
            toast.success('Service added successfully');
            fetchData();
            setNewService({ name: '', price: '', description: '', image: '' });
        } catch (error) {
            console.error(error);
            toast.error('Failed to add service');
        }
    };

    const handleDeleteService = async (id) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;
        try {
            await api.delete(`/services/${id}`);
            toast.success('Service deleted');
            fetchData();
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete service');
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif font-bold text-gray-900">Admin Dashboard</h1>
                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            navigate('/admin/login');
                        }}
                        className="text-red-600 hover:text-red-800 font-bold"
                    >
                        Logout
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 mb-6 border-b border-gray-200">
                    <button
                        className={`pb-2 px-4 transition-colors ${activeTab === 'bookings' ? 'border-b-2 border-rose-600 text-rose-600 font-bold' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('bookings')}
                    >
                        Bookings
                    </button>
                    <button
                        className={`pb-2 px-4 transition-colors ${activeTab === 'availability' ? 'border-b-2 border-rose-600 text-rose-600 font-bold' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('availability')}
                    >
                        Availability
                    </button>
                    <button
                        className={`pb-2 px-4 transition-colors ${activeTab === 'classes' ? 'border-b-2 border-rose-600 text-rose-600 font-bold' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('classes')}
                    >
                        Manage Classes
                    </button>
                    <button
                        className={`pb-2 px-4 transition-colors ${activeTab === 'services' ? 'border-b-2 border-rose-600 text-rose-600 font-bold' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('services')}
                    >
                        Services
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    {activeTab === 'bookings' && <BookingsTable bookings={bookings} onUpdate={fetchData} />}

                    {activeTab === 'availability' && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Manage Availability</h2>
                            <p className="text-gray-600 mb-6">Block out dates or times when you are unavailable for standard makeup appointments.</p>
                            <AvailabilityBlock token={token} onBlockAdded={fetchData} />
                            {/* Ideally list existing blocks here to delete them */}
                        </div>
                    )}

                    {activeTab === 'classes' && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Manage Training Sessions</h2>

                            {/* Create Class Form */}
                            <div className="bg-rose-50 p-6 rounded-lg mb-8">
                                <h3 className="font-bold text-lg mb-4 flex items-center"><Plus size={20} className="mr-2" /> Schedule New Class</h3>
                                <form onSubmit={handleCreateClass} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700">Class Title</label>
                                        <select
                                            value={newClass.title}
                                            onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
                                            className="w-full p-2 border rounded"
                                            required
                                        >
                                            <option value="">Select Class Type...</option>
                                            <option value="1-on-1 Self Mastery">1-on-1 Self Mastery</option>
                                            <option value="Aspiring MUA Intensive">Aspiring MUA Intensive</option>
                                            <option value="Pro Skill Refresher">Pro Skill Refresher</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700">Date</label>
                                        <input
                                            type="date"
                                            value={newClass.date}
                                            onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700">Start Time</label>
                                        <input
                                            type="time"
                                            value={newClass.time}
                                            onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700">Price ($)</label>
                                        <input
                                            type="number"
                                            value={newClass.price}
                                            onChange={(e) => setNewClass({ ...newClass, price: e.target.value })}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700">Capacity</label>
                                        <input
                                            type="number"
                                            value={newClass.capacity}
                                            onChange={(e) => setNewClass({ ...newClass, capacity: e.target.value })}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <button type="submit" className="bg-rose-600 text-white font-bold py-2 px-4 rounded w-full hover:bg-rose-700">
                                            Create Class
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Classes List */}
                            <div className="grid grid-cols-1 gap-4">
                                {trainingSessions.map(session => (
                                    <div key={session._id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50">
                                        <div>
                                            <h4 className="font-bold text-lg text-gray-900">{session.title}</h4>
                                            <div className="flex space-x-4 text-sm text-gray-600 mt-1">
                                                <span className="flex items-center"><Calendar size={14} className="mr-1" /> {new Date(session.date).toLocaleDateString()}</span>
                                                <span className="flex items-center"><Clock size={14} className="mr-1" /> {new Date(session.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                <span className="flex items-center"><DollarSign size={14} className="mr-1" /> {session.price}</span>
                                                <span className="flex items-center"><Users size={14} className="mr-1" /> {session.enrolled} / {session.capacity}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteClass(session._id)}
                                            className="text-red-500 hover:text-red-700 p-2"
                                            title="Cancel Class"
                                        >
                                            <Trash size={20} />
                                        </button>
                                    </div>
                                ))}
                                {trainingSessions.length === 0 && <p className="text-gray-500 text-center py-4">No upcoming classes scheduled.</p>}
                            </div>
                        </div>
                    )}

                    {activeTab === 'services' && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Manage Services</h2>

                            {/* Add Service Form */}
                            <div className="bg-rose-50 p-6 rounded-lg mb-8">
                                <h3 className="font-bold text-lg mb-4 flex items-center"><Plus size={20} className="mr-2" /> Add New Service</h3>
                                <form onSubmit={handleCreateService} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700">Service Name</label>
                                        <input
                                            type="text"
                                            value={newService.name}
                                            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                                            className="w-full p-2 border rounded"
                                            required
                                            placeholder="e.g. Bridal Glam"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700">Price ($)</label>
                                        <input
                                            type="number"
                                            value={newService.price}
                                            onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                                            className="w-full p-2 border rounded"
                                            required
                                            placeholder="85"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700">Description</label>
                                        <textarea
                                            value={newService.description}
                                            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                                            className="w-full p-2 border rounded"
                                            rows="2"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700">Image URL (Optional)</label>
                                        <input
                                            type="text"
                                            value={newService.image}
                                            onChange={(e) => setNewService({ ...newService, image: e.target.value })}
                                            className="w-full p-2 border rounded"
                                            placeholder="https://images.unsplash.com/..."
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <button type="submit" className="bg-rose-600 text-white font-bold py-2 px-6 rounded hover:bg-rose-700 transition-colors">
                                            Add Service
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Services List */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {services.map(service => (
                                    <div key={service._id} className="border border-gray-200 rounded-lg p-4 flex items-center bg-gray-50">
                                        <img src={service.image} alt={service.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                                        <div className="flex-grow">
                                            <h4 className="font-bold text-gray-900">{service.name}</h4>
                                            <p className="text-rose-600 font-bold">${service.price}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteService(service._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash size={20} />
                                        </button>
                                    </div>
                                ))}
                                {services.length === 0 && <p className="text-gray-500 text-center py-4 bg-white md:col-span-2 border rounded-lg">No services added yet.</p>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
