import React, { useState, useEffect, useRef, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import BookingModal from '../components/BookingModal';
import api from '../api/api';
import toast from 'react-hot-toast';
import { Calendar as CalendarIcon, Users } from 'lucide-react';

const Booking = () => {
    const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' or 'classes'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [events, setEvents] = useState([]);
    const [classes, setClasses] = useState([]);


    // For booking a specific class or service
    const [selectedClass, setSelectedClass] = useState(null);
    const [prefilledServiceName, setPrefilledServiceName] = useState('');

    const calendarRef = useRef(null);

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
        <div className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">Book Online</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Choose between personal makeup appointments or professional training classes.
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1 rounded-lg shadow-sm inline-flex">
                        <button
                            onClick={() => setActiveTab('appointments')}
                            className={`flex items-center px-6 py-3 rounded-md transition-all ${activeTab === 'appointments'
                                ? 'bg-rose-100 text-rose-700 font-bold shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <CalendarIcon size={20} className="mr-2" />
                            Appointments
                        </button>
                        <button
                            onClick={() => setActiveTab('classes')}
                            className={`flex items-center px-6 py-3 rounded-md transition-all ${activeTab === 'classes'
                                ? 'bg-rose-100 text-rose-700 font-bold shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <Users size={20} className="mr-2" />
                            Upcoming Classes
                        </button>
                    </div>

                </div>

                {/* Appointments Tab */}
                {activeTab === 'appointments' && (
                    <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in">
                        <div className="mb-4 text-center">
                            <p className="text-sm text-rose-500 font-bold">Select a time slot below to request your booking.</p>
                            <p className="text-xs text-gray-400">Note: Gray/Red slots are unavailable.</p>
                        </div>
                        <FullCalendar
                            ref={calendarRef}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView="timeGridWeek"
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay'
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
                                <div className="text-xs p-1 font-semibold">
                                    {eventInfo.event.title}
                                </div>
                            )}
                        />
                    </div>
                )}

                {/* Classes Tab */}
                {activeTab === 'classes' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                        {classes.length === 0 ? (
                            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
                                <p className="text-gray-500 text-lg">No upcoming classes scheduled at the moment.</p>
                                <p className="text-gray-400">Please check back later or contact us for private sessions.</p>
                            </div>
                        ) : (
                            classes.map((session) => (
                                <div key={session._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
                                    <div className="bg-rose-600 h-2"></div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold text-gray-900">{session.title}</h3>
                                            <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2 py-1 rounded-full">
                                                ${session.price}
                                            </span>
                                        </div>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center text-gray-600">
                                                <CalendarIcon size={18} className="mr-3 text-rose-400" />
                                                <span>{new Date(session.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                {/* Using a clock icon surrogate since I didn't import Clock */}
                                                <span className="font-bold mr-3 text-rose-400 text-lg">⏰</span>
                                                <span>{new Date(session.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({session.duration} mins)</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Users size={18} className="mr-3 text-rose-400" />
                                                <span>{session.enrolled} / {session.capacity} Enrolled</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleBookClass(session)}
                                            className="w-full bg-gray-900 text-white font-bold py-2 rounded-md hover:bg-gray-800 transition-colors"
                                        >
                                            Book This Class
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
