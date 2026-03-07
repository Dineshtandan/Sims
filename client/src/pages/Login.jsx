import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import { Lock, Mail, Sparkles, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await api.post('/users/login', {
                email,
                password
            });

            localStorage.setItem('token', res.data.token);
            toast.success('Access Granted, Sarah');
            navigate('/admin');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden px-6">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-rose-50/30 -z-10"></div>
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-rose-200/20 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-amber-100/20 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-xl w-full relative animate-fade-in">
                <Link to="/" className="inline-flex items-center text-gray-400 hover:text-rose-600 transition-colors mb-8 group">
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Return to Boutique</span>
                </Link>

                <div className="glass-card p-10 md:p-16 border-none shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-[0.03] rounded-bl-full"></div>

                    <div className="text-center mb-12">
                        <div className="w-16 h-16 rounded-2xl premium-gradient flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-rose-200 rotate-6 hover:rotate-0 transition-transform duration-500">
                            <Lock size={28} />
                        </div>
                        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Admin <span className="text-rose-600 italic">Vault</span></h1>
                        <p className="text-gray-500 font-light">Enter your credentials to manage your artistry empire.</p>
                    </div>

                    <form className="space-y-8" onSubmit={handleLogin}>
                        <div className="space-y-6">
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-rose-500 transition-colors">
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-white/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all font-medium placeholder:text-gray-300 placeholder:font-light"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-rose-500 transition-colors">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full bg-white/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all font-medium placeholder:text-gray-300 placeholder:font-light"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full premium-gradient text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-rose-100 hover:shadow-rose-200 hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50 disabled:translate-y-0"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>Access Dashboard <Sparkles size={18} /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-gray-100/50 text-center">
                        <p className="text-xs font-bold text-gray-300 uppercase tracking-[0.2em] mb-4">Credentials Reminder</p>
                        <div className="inline-flex items-center gap-4 bg-rose-50/50 px-6 py-3 rounded-full border border-rose-100">
                            <span className="text-xs font-bold text-rose-600">Sarah's Access:</span>
                            <span className="text-xs font-medium text-gray-500">sima@website.com / Sima</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

