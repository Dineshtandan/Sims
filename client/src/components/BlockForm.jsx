import { useForm } from 'react-hook-form';
import api from '../api/api';
import toast from 'react-hot-toast';

const BlockForm = ({ token, onBlockAdded }) => {
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
            await api.post('/availability/block', data);
            toast.success('Time block added successfully');
            reset();
            onBlockAdded?.();
        } catch (error) {
            toast.error('Failed to add time block');
            console.error(error);
        }
    };

    return (
        <div className="bg-white shadow sm:rounded-lg p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Block Availability</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Date/Time</label>
                        <input
                            type="datetime-local"
                            {...register('start', { required: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 border p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Date/Time</label>
                        <input
                            type="datetime-local"
                            {...register('end', { required: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 border p-2"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Reason (Optional)</label>
                    <input
                        type="text"
                        {...register('reason')}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 border p-2"
                        placeholder="e.g. Holiday, Unavailable"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Blocking...' : 'Block Time'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BlockForm;
