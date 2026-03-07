import { useState, useEffect, useCallback } from 'react';
import api from '../api/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import BookingsTable from '../components/BookingsTable';
import AvailabilityBlock from '../components/BlockForm';
import { Plus, Trash, Calendar, Users, DollarSign, Clock, LayoutDashboard, CalendarDays, BookOpen, Sparkles, LogOut, ChevronRight, Briefcase } from 'lucide-react';

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
            const dateTime = new Date(`${newClass.date}T${newClass.time}`);
            await api.post('/training-sessions', {
                ...newClass,
                date: dateTime
            });
            toast.success('Academy class scheduled');
            fetchData();
            setNewClass({ title: '', date: '', time: '', duration: 180, price: '', capacity: 5 });
        } catch (error) {
            toast.error('Failed to schedule class');
        }
    };

    const handleDeleteClass = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this class?')) return;
        try {
            await api.delete(`/training-sessions/${id}`);
            toast.success('Class removed');
            fetchData();
        } catch (error) {
            toast.error('Failed to remove class');
        }
    };

    const handleCreateService = async (e) => {
        e.preventDefault();
        try {
            const serviceData = {
                ...newService,
                price: parseFloat(newService.price),
                image: newService.image.trim() || undefined
            };
            await api.post('/services', serviceData);
            toast.success('New service curated');
            fetchData();
            setNewService({ name: '', price: '', description: '', image: '' });
        } catch (error) {
            toast.error('Failed to add service');
        }
    };

    const handleDeleteService = async (id) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;
        try {
            await api.delete(`/services/${id}`);
            toast.success('Service retired');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete service');
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-rose-100 border-t-rose-600 rounded-full animate-spin"></div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Opening Vault...</p>
            </div>
        </div>
    );

    const tabs = [
        { id: 'bookings', label: 'Inquiries', icon: CalendarDays },
        { id: 'availability', label: 'Schedule', icon: Clock },
        { id: 'classes', label: 'Academy', icon: BookOpen },
        { id: 'services', label: 'Boutique', icon: Briefcase },
    ];

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col lg:flex-row">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-80 bg-white border-r border-gray-100 p-8 flex flex-col relative z-20">
                <div className="flex items-center gap-3 mb-16">
                    <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center text-white shadow-lg">
                        <LayoutDashboard size={20} />
                    </div>
                    <div>
                        <h1 className="text-xl font-serif font-bold text-gray-900">Sarah <span className="text-rose-600 italic">Sims</span></h1>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Admin Control</p>
                    </div>
                </div>

                <nav className="flex-grow space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${activeTab === tab.id
                                    ? 'bg-rose-50 text-rose-600 shadow-sm'
                                    : 'text-gray-400 hover:bg-slate-50 hover:text-gray-600'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <tab.icon size={20} className={activeTab === tab.id ? 'text-rose-600' : 'group-hover:text-gray-600'} />
                                <span className="font-bold text-sm tracking-tight">{tab.label}</span>
                            </div>
                            {activeTab === tab.id && <ChevronRight size={16} />}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-8 border-t border-gray-50">
                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            navigate('/admin/login');
                        }}
                        className="w-full flex items-center gap-3 p-4 rounded-2xl text-gray-400 hover:bg-rose-50 hover:text-rose-600 transition-all group font-bold text-sm"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow p-6 lg:p-12 relative z-10 overflow-y-auto max-h-screen custom-scrollbar">
                {/* Background Sparkles */}
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-rose-100/20 rounded-full blur-[120px] -z-10"></div>

                <header className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full border border-rose-100">Sarah's Workspace</span>
                            <h2 className="text-4xl font-serif font-bold text-gray-900 mt-4 capitalize">
                                {tabs.find(t => t.id === activeTab)?.label} <span className="text-rose-600 italic">Management</span>
                            </h2>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-rose-600">
                                <Calendar size={18} />
                            </div>
                            <div className="pr-4">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current Session</p>
                                <p className="text-sm font-bold text-gray-900">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="animate-fade-in">
                    {activeTab === 'bookings' && <BookingsTable bookings={bookings} onUpdate={fetchData} />}

                    {activeTab === 'availability' && (
                        <div className="max-w-4xl">
                            <AvailabilityBlock token={token} onBlockAdded={fetchData} />
                        </div>
                    )}

                    {activeTab === 'classes' && (
                        <div className="space-y-12">
                            {/* Create Class Section */}
                            <div className="glass-card p-10 border-none shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-40 h-40 premium-gradient opacity-[0.03] rounded-bl-full"></div>
                                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8 flex items-center gap-3">
                                    <Plus className="text-rose-600" /> Schedule Academy Session
                                </h3>
                                <form onSubmit={handleCreateClass} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Session Program</label>
                                        <select
                                            value={newClass.title}
                                            onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
                                            className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 px-4 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all font-medium appearance-none cursor-pointer"
                                            required
                                        >
                                            <option value="">Choose Masterclass...</option>
                                            <option value="1-on-1 Self Mastery">1-on-1 Self Mastery</option>
                                            <option value="Aspiring MUA Intensive">Aspiring MUA Intensive</option>
                                            <option value="Pro Skill Refresher">Pro Skill Refresher</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Session Date</label>
                                        <input
                                            type="date"
                                            value={newClass.date}
                                            onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
                                            className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 px-4 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all font-medium"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Starting Time</label>
                                        <input
                                            type="time"
                                            value={newClass.time}
                                            onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                                            className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 px-4 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all font-medium"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Investment ($)</label>
                                        <input
                                            type="number"
                                            value={newClass.price}
                                            onChange={(e) => setNewClass({ ...newClass, price: e.target.value })}
                                            className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 px-4 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all font-medium"
                                            placeholder="299"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Artist Capacity</label>
                                        <input
                                            type="number"
                                            value={newClass.capacity}
                                            onChange={(e) => setNewClass({ ...newClass, capacity: e.target.value })}
                                            className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 px-4 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all font-medium"
                                            placeholder="5"
                                            required
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <button type="submit" className="premium-gradient text-white font-bold py-4 px-8 rounded-2xl w-full flex items-center justify-center gap-2 shadow-xl hover:-translate-y-1 transition-all active:scale-95">
                                            Schedule Class <Sparkles size={16} />
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Classes List */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {trainingSessions.map(session => (
                                    <div key={session._id} className="bg-white border border-gray-100 rounded-3xl p-6 flex justify-between items-center group hover:shadow-xl transition-all duration-500">
                                        <div className="flex gap-5 items-center">
                                            <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-all duration-500">
                                                <BookOpen size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-serif font-bold text-gray-900 text-lg">{session.title}</h4>
                                                <div className="flex flex-wrap gap-4 text-[11px] font-bold uppercase tracking-widest text-gray-400 mt-2">
                                                    <span className="flex items-center gap-1.5"><Calendar size={12} className="text-rose-400" /> {new Date(session.date).toLocaleDateString()}</span>
                                                    <span className="flex items-center gap-1.5"><Clock size={12} className="text-rose-400" /> {new Date(session.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    <span className="flex items-center gap-1.5 text-rose-600 font-black"><DollarSign size={12} /> {session.price}</span>
                                                    <span className="flex items-center gap-1.5"><Users size={12} className="text-rose-400" /> {session.enrolled} / {session.capacity}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteClass(session._id)}
                                            className="w-11 h-11 rounded-xl bg-slate-50 text-slate-300 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition-all group-hover:border group-hover:border-rose-100"
                                            title="Cancel Class"
                                        >
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {trainingSessions.length === 0 && (
                                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                                    <p className="text-gray-400 font-medium">No academy sessions currently scheduled.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'services' && (
                        <div className="space-y-12">
                            {/* Add Service Section */}
                            <div className="glass-card p-10 border-none shadow-2xl relative overflow-hidden">
                                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8 flex items-center gap-3">
                                    <Plus className="text-rose-600" /> Curate Boutique Service
                                </h3>
                                <form onSubmit={handleCreateService} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Internal Name</label>
                                        <input
                                            type="text"
                                            value={newService.name}
                                            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                                            className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 px-4 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all font-medium"
                                            placeholder="e.g. Cinematic Gala Glam"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Boutique Price ($)</label>
                                        <input
                                            type="number"
                                            value={newService.price}
                                            onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                                            className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 px-4 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all font-medium"
                                            placeholder="120"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Luxe Description</label>
                                        <textarea
                                            value={newService.description}
                                            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                                            className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 px-4 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all font-medium resize-none"
                                            rows="3"
                                            placeholder="Describe the premium experience..."
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Visual Asset URL (Optional)</label>
                                        <input
                                            type="text"
                                            value={newService.image}
                                            onChange={(e) => setNewService({ ...newService, image: e.target.value })}
                                            className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 px-4 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all font-medium"
                                            placeholder="https://images.unsplash.com/..."
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <button type="submit" className="premium-gradient text-white font-bold py-5 px-12 rounded-2xl shadow-xl hover:-translate-y-1 transition-all active:scale-95">
                                            Curate Service
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Services Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {services.map(service => (
                                    <div key={service._id} className="bg-white border border-gray-100 rounded-[2.5rem] p-4 flex flex-col group hover:shadow-2xl transition-all duration-700">
                                        <div className="relative h-48 rounded-[2rem] overflow-hidden mb-6">
                                            <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                            <div className="absolute top-4 right-4 h-10 px-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white font-black text-sm">
                                                ${service.price}
                                            </div>
                                        </div>
                                        <div className="px-4 pb-4">
                                            <h4 className="font-serif font-bold text-gray-900 text-xl mb-6">{service.name}</h4>
                                            <button
                                                onClick={() => handleDeleteService(service._id)}
                                                className="w-full py-4 rounded-2xl bg-rose-50 text-rose-600 font-bold flex items-center justify-center gap-2 hover:bg-rose-600 hover:text-white transition-all duration-300"
                                            >
                                                <Trash size={18} /> Retire Service
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {services.length === 0 && (
                                    <div className="md:col-span-2 lg:col-span-3 text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                                        <p className="text-gray-400 font-medium">No services currently curated.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;

