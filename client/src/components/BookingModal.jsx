import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import api from '../api/api';
import toast from 'react-hot-toast';
import { useUser } from '../context/UserContext';
import { useEffect, useState } from 'react';

const BookingModal = ({ isOpen, onClose, selectedDate, refetchEvents, prefilledService = '', lockService = false }) => {
    const { user } = useUser();
    const [services, setServices] = useState([]);
    const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            service: ''
        }
    });

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await api.get('/services');
                setServices(res.data);
                if (prefilledService) {
                    const found = res.data.find(s => s.name === prefilledService);
                    if (found) setValue('service', found._id);
                }
            } catch (error) {
                console.error("Failed to fetch services", error);
            }
        };
        fetchServices();
    }, [prefilledService, setValue]);

    // Update form when user is logged in
    useEffect(() => {
        if (user) {
            setValue('name', user.name);
            setValue('email', user.email);
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        try {
            const bookingDate = selectedDate.startStr || selectedDate.start || selectedDate.date || selectedDate;
            await api.post('/bookings', {
                name: data.name,
                email: data.email,
                phone: data.phone,
                service: data.service,
                date: new Date(bookingDate).toISOString(),
                notes: data.notes
            });
            toast.success('Booking Request Sent! We will confirm shortly.');
            reset();
            onClose();
            refetchEvents();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit booking. Please try again.');
            console.error(error);
        }
    };

    if (!isOpen) return null;

    const dateToDisplay = selectedDate?.start || selectedDate?.date || selectedDate?.startStr || new Date();
    const formattedDate = new Date(dateToDisplay).toLocaleString([], {
        dateStyle: 'full',
        timeStyle: 'short'
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>

                <div className="bg-rose-600 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">Request Booking</h2>
                    <p className="text-rose-100 text-sm mt-1">{formattedDate}</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Service</label>
                        <select
                            {...register('service', { required: 'Service is required' })}
                            disabled={lockService}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 border p-2 ${lockService ? 'bg-gray-100' : ''}`}
                        >
                            <option value="">Select a service...</option>
                            {services.map(s => (
                                <option key={s._id} value={s._id}>{s.name} - ${s.price}</option>
                            ))}
                        </select>
                        {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 border p-2"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 border p-2"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="tel"
                            {...register('phone', { required: 'Phone is required' })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 border p-2"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                        <textarea
                            {...register('notes')}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 border p-2"
                        ></textarea>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-rose-600 text-white font-bold py-2 px-4 rounded-md hover:bg-rose-700 transition-colors disabled:bg-rose-400"
                        >
                            {isSubmitting ? 'Submitting...' : 'Request Appointment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
