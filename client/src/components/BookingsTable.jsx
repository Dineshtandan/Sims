import api from '../api/api';
import toast from 'react-hot-toast';
import { Check, X, Trash2 } from 'lucide-react';

const BookingsTable = ({ bookings = [], onUpdate }) => {

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/bookings/${id}`, { status });
            toast.success(`Booking ${status}`);
            onUpdate?.();
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const deleteBooking = async (id) => {
        if (!window.confirm("Are you sure you want to delete this booking?")) return;
        try {
            await api.delete(`/bookings/${id}`);
            toast.success("Booking deleted");
            onUpdate?.();
        } catch (error) {
            toast.error("Failed to delete booking");
        }
    };

    if (bookings.length === 0) return <div className="text-center py-10 text-gray-500">No bookings yet.</div>;

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Booking Requests</h3>
            </div>
            <div className="border-t border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(booking.date).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                                        <div className="text-sm text-gray-500">{booking.email}</div>
                                        <div className="text-sm text-gray-500">{booking.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {booking.service?.name || (typeof booking.service === 'string' ? booking.service : 'Unknown')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    booking.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                        'bg-gray-100 text-gray-800'}`}>
                                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        {booking.status === 'pending' && (
                                            <>
                                                <button onClick={() => updateStatus(booking._id, 'confirmed')} className="text-green-600 hover:text-green-900" title="Approve">
                                                    <Check size={18} />
                                                </button>
                                                <button onClick={() => updateStatus(booking._id, 'rejected')} className="text-red-600 hover:text-red-900" title="Reject">
                                                    <X size={18} />
                                                </button>
                                            </>
                                        )}
                                        <button onClick={() => deleteBooking(booking._id)} className="text-gray-400 hover:text-gray-600" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BookingsTable;
