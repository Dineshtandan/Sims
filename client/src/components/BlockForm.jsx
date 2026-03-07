import { useForm } from 'react-hook-form';
import api from '../api/api';
import toast from 'react-hot-toast';
import { CalendarClock, ShieldAlert, Sparkles, Clock } from 'lucide-react';

const BlockForm = ({ token, onBlockAdded }) => {
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
            await api.post('/availability/block', data);
            toast.success('Time block secured');
            reset();
            onBlockAdded?.();
        } catch (error) {
            toast.error('Failed to reserve time');
            console.error(error);
        }
    };

    return (
        <div className="glass-card p-8 md:p-12 border-none shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-[0.03] rounded-bl-full transition-transform duration-700 group-hover:scale-150"></div>

            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                    <CalendarClock size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 leading-tight">Block Availability</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Reserve private time slots</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Start Date & Time</label>
                        <div className="relative group/input">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-rose-500 transition-colors" size={18} />
                            <input
                                type="datetime-local"
                                {...register('start', { required: true })}
                                className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all font-medium text-gray-900"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">End Date & Time</label>
                        <div className="relative group/input">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-rose-500 transition-colors" size={18} />
                            <input
                                type="datetime-local"
                                {...register('end', { required: true })}
                                className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all font-medium text-gray-900"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Reservation Reason</label>
                    <div className="relative group/input">
                        <ShieldAlert className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-rose-500 transition-colors" size={18} />
                        <input
                            type="text"
                            {...register('reason')}
                            className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all font-medium text-gray-900 placeholder:text-gray-300"
                            placeholder="e.g. Masterclass, Private Event, Holiday"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full premium-gradient text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl hover:shadow-rose-100 hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50 disabled:translate-y-0"
                >
                    {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>Reserve Time Block <Sparkles size={18} /></>
                    )}
                </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100 flex items-start gap-4 text-gray-400">
                <Info size={16} className="mt-0.5" />
                <p className="text-xs leading-relaxed">
                    Time blocks will hide corresponding slots in the public booking calendar. Existing bookings within these blocks will remain but new inquiries will be disabled.
                </p>
            </div>
        </div>
    );
};

export default BlockForm;

