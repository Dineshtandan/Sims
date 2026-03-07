import api from '../api/api';
import toast from 'react-hot-toast';
import { Check, X, Trash2, Calendar, User, ShoppingBag, Info, Phone, Mail } from 'lucide-react';

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

    if (bookings.length === 0) {
        return (
            <div className="text-center py-20 bg-rose-50/30 rounded-[2rem] border-2 border-dashed border-rose-100">
                <Info size={40} className="mx-auto text-rose-300 mb-4" />
                <p className="text-gray-400 font-medium">No booking requests found.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar rounded-2xl border border-gray-100 shadow-sm">
                <table className="min-w-full divide-y divide-gray-100 bg-white/50 backdrop-blur-sm">
                    <thead>
                        <tr className="bg-slate-50">
                            <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} /> Schedule
                                </div>
                            </th>
                            <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
                                <div className="flex items-center gap-2">
                                    <User size={14} /> Client Details
                                </div>
                            </th>
                            <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
                                <div className="flex items-center gap-2">
                                    <ShoppingBag size={14} /> Service
                                </div>
                            </th>
                            <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Status</th>
                            <th className="px-8 py-5 text-right text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Management</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-rose-50/30 transition-colors group">
                                <td className="px-8 py-6 whitespace-nowrap">
                                    <div className="text-sm font-bold text-gray-900">
                                        {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <div className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
                                        <ShoppingBag size={12} /> {new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </td>
                                <td className="px-8 py-6 whitespace-nowrap">
                                    <div className="text-sm font-bold text-gray-900 mb-1">{booking.name}</div>
                                    <div className="flex flex-col gap-1">
                                        <div className="text-[11px] text-gray-400 flex items-center gap-1.5 font-medium">
                                            <Mail size={10} className="text-gray-300" /> {booking.email}
                                        </div>
                                        <div className="text-[11px] text-gray-400 flex items-center gap-1.5 font-medium">
                                            <Phone size={10} className="text-gray-300" /> {booking.phone}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 whitespace-nowrap">
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold uppercase tracking-wider">
                                        {booking.service?.name || (typeof booking.service === 'string' ? booking.service : 'Custom Service')}
                                    </div>
                                </td>
                                <td className="px-8 py-6 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full 
                                        ${booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                                            booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                booking.status === 'rejected' ? 'bg-rose-100 text-rose-700' :
                                                    'bg-gray-100 text-gray-700'}`}>
                                        <span className="w-1.5 h-1.5 rounded-full mr-2 animate-pulse bg-current opacity-70"></span>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-8 py-6 whitespace-nowrap text-right space-x-2">
                                    {booking.status === 'pending' && (
                                        <div className="inline-flex gap-2">
                                            <button
                                                onClick={() => updateStatus(booking._id, 'confirmed')}
                                                className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-90"
                                                title="Approve"
                                            >
                                                <Check size={18} />
                                            </button>
                                            <button
                                                onClick={() => updateStatus(booking._id, 'rejected')}
                                                className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-90"
                                                title="Reject"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => deleteBooking(booking._id)}
                                        className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all opacity-40 hover:opacity-100 shadow-sm active:scale-90"
                                        title="Delete Permanently"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex items-center justify-between px-2">
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                    Total Inquiries: <span className="text-gray-900">{bookings.length}</span>
                </p>
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                </div>
            </div>
        </div>
    );
};

export default BookingsTable;

