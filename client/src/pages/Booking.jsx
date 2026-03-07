import React, { useState, useEffect, useRef, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import BookingModal from '../components/BookingModal';
import api from '../api/api';
import toast from 'react-hot-toast';
import { Calendar as CalendarIcon, Users, Clock, Info } from 'lucide-react';

const Booking = () => {
    const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' or 'classes'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [events, setEvents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [view, setView] = useState('timeGridWeek');

    // For booking a specific class or service
    const [selectedClass, setSelectedClass] = useState(null);
    const [prefilledServiceName, setPrefilledServiceName] = useState('');

    const calendarRef = useRef(null);

    // Responsive view handling
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setView('timeGridDay');
            } else {
                setView('timeGridWeek');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleBookClass = useCallback((trainingSession) => {
        setSelectedSlot({
            date: new Date(trainingSession.date),
            startStr: new Date(trainingSession.date).toISOString() // mimic FullCalendar arg
        });
        setSelectedClass(trainingSession);
        setIsModalOpen(true);
    }, []);

    const fetchAvailability = useCallback(async () => {
        try {
            const res = await api.get('/bookings/availability');
            setEvents(res.data);

            // Handle service pre-selection from query params
            const params = new URLSearchParams(window.location.search);
            const serviceName = params.get('service');
            if (serviceName) {
                setPrefilledServiceName(serviceName);
            }
        } catch (error) {
            console.error("Failed to fetch availability", error);
            toast.error("Could not load availability");
        }
    }, []);

    const fetchClasses = useCallback(async () => {
        try {
            const res = await api.get('/training-sessions');
            setClasses(res.data);

            // Handle query params for specific classes
            const params = new URLSearchParams(window.location.search);
            const type = params.get('type');
            const classId = params.get('id');

            if (type === 'class' || type === 'training') {
                setActiveTab('classes');
            }

            if (classId && res.data.length > 0) {
                const found = res.data.find(c => c._id === classId);
                if (found) {
                    handleBookClass(found);
                }
            }
        } catch (error) {
            console.error("Failed to fetch classes", error);
        }
    }, [handleBookClass]);

    useEffect(() => {
        fetchAvailability();
        fetchClasses();
    }, [fetchAvailability, fetchClasses]);

    const handleDateClick = (arg) => {
        if (arg.date < new Date()) {
            toast.error("Cannot book past dates!");
            return;
        }
        setSelectedSlot(arg);
        setSelectedClass(null); // Clear selected class
        setIsModalOpen(true);
    };

    return (
        <div className="py-20 min-h-screen relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-rose-100/50 to-transparent -z-10"></div>
            <div className="absolute top-40 right-[-10%] w-72 h-72 bg-rose-200/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-20 left-[-5%] w-60 h-60 bg-amber-100/30 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-16 animate-fade-in">
                    <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-rose-600 uppercase bg-rose-50 rounded-full border border-rose-100">
                        Reservations
                    </span>
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
                        Experience the <span className="text-rose-600">Luxury</span>
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Secure your transformation with Sims Makeup. Select a slot for an appointment or join our professional artist community.
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <div className="bg-white/50 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-white/50 inline-flex">
                        <button
                            onClick={() => setActiveTab('appointments')}
                            className={`flex items-center px-8 py-3.5 rounded-xl transition-all duration-500 ${activeTab === 'appointments'
                                ? 'bg-rose-600 text-white font-bold shadow-xl transform scale-105'
                                : 'text-gray-500 hover:text-rose-600 hover:bg-rose-50/50'
                                }`}
                        >
                            <CalendarIcon size={18} className="mr-2" />
                            Appointments
                        </button>
                        <button
                            onClick={() => setActiveTab('classes')}
                            className={`flex items-center px-8 py-3.5 rounded-xl transition-all duration-500 ${activeTab === 'classes'
                                ? 'bg-rose-600 text-white font-bold shadow-xl transform scale-105'
                                : 'text-gray-500 hover:text-rose-600 hover:bg-rose-50/50'
                                }`}
                        >
                            <Users size={18} className="mr-2" />
                            Masterclasses
                        </button>
                    </div>
                </div>

                {/* Appointments Tab */}
                {activeTab === 'appointments' && (
                    <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="glass-card overflow-hidden">
                            <div className="p-6 md:p-10">
                                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                                    <div className="flex items-center text-rose-600 bg-rose-50 px-4 py-2 rounded-full border border-rose-100">
                                        <Info size={16} className="mr-2" />
                                        <span className="text-sm font-semibold tracking-wide uppercase">Select a slot to request booking</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-gray-400">
                                        <div className="flex items-center">
                                            <span className="w-3 h-3 bg-gray-100 border border-gray-200 rounded-sm mr-2"></span>
                                            Unavailable
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-3 h-3 bg-rose-500 rounded-sm mr-2"></span>
                                            Pending/Booked
                                        </div>
                                    </div>
                                </div>

                                <div className="calendar-container">
                                    <FullCalendar
                                        ref={calendarRef}
                                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                                        initialView={view}
                                        headerToolbar={{
                                            left: 'prev,next today',
                                            center: 'title',
                                            right: 'timeGridWeek,timeGridDay,listWeek'
                                        }}
                                        slotMinTime="09:00:00"
                                        slotMaxTime="18:00:00"
                                        allDaySlot={false}
                                        selectable={true}
                                        selectMirror={true}
                                        dayMaxEvents={true}
                                        weekends={true}
                                        events={events}
                                        dateClick={handleDateClick}
                                        height="auto"
                                        eventContent={(eventInfo) => (
                                            <div className="fc-event-main">
                                                {eventInfo.event.title}
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Classes Tab */}
                {activeTab === 'classes' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        {classes.length === 0 ? (
                            <div className="col-span-full py-20 glass-card text-center">
                                <Users size={48} className="mx-auto text-rose-200 mb-4" />
                                <p className="text-gray-500 text-xl font-medium">No upcoming classes scheduled</p>
                                <p className="text-gray-400 mt-2">Check back later for new professional training opportunities.</p>
                            </div>
                        ) : (
                            classes.map((session, index) => (
                                <div
                                    key={session._id}
                                    className="glass-card hover:shadow-2xl transition-all duration-500 border-none group transform hover:-translate-y-2"
                                    style={{ animationDelay: `${0.1 * (index + 3)}s` }}
                                >
                                    <div className="h-3 premium-gradient"></div>
                                    <div className="p-8">
                                        <div className="flex justify-between items-start mb-6">
                                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-rose-600 transition-colors">{session.title}</h3>
                                            <div className="premium-gradient text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                                                ${session.price}
                                            </div>
                                        </div>

                                        <div className="space-y-4 mb-8">
                                            <div className="flex items-center text-gray-600">
                                                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center mr-4 group-hover:bg-rose-100 transition-colors">
                                                    <CalendarIcon size={18} className="text-rose-500" />
                                                </div>
                                                <span className="font-medium">{new Date(session.date).toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center mr-4 group-hover:bg-rose-100 transition-colors">
                                                    <Clock size={18} className="text-rose-500" />
                                                </div>
                                                <span className="font-medium">{new Date(session.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({session.duration}m)</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center mr-4 group-hover:bg-rose-100 transition-colors">
                                                    <Users size={18} className="text-rose-500" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-xs font-bold text-gray-400 uppercase">Availability</span>
                                                        <span className="text-xs font-bold text-rose-500">{session.enrolled}/{session.capacity}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                                        <div
                                                            className="premium-gradient h-full transition-all duration-1000"
                                                            style={{ width: `${(session.enrolled / session.capacity) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleBookClass(session)}
                                            className="w-full py-4 rounded-xl font-bold text-white shadow-lg premium-gradient hover:shadow-2xl transition-all duration-300 transform active:scale-95"
                                        >
                                            Secure My Spot
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedDate={selectedSlot}
                refetchEvents={fetchAvailability}
                prefilledService={selectedClass ? selectedClass.title : prefilledServiceName}
                lockService={!!selectedClass}
            />
        </div>
    );
};

export default Booking;

