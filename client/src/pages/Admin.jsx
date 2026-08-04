import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Activity } from 'lucide-react';
import api from '../api/axiosClient';

export default function Admin() {
    const [tab, setTab] = useState('overview');
    const [predictions, setPredictions] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get('/api/predictions').then((r) => setPredictions(r.data));
        api.get('/api/users').then((r) => setUsers(r.data));
    }, []);

    const delPred = async (id) => { await api.delete(`/api/predictions/${id}`); setPredictions(predictions.filter((p) => p._id !== id)); };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-6xl mx-auto px-6">
                <h1 className="font-display text-3xl font-bold mb-1">Admin Panel</h1>
                <p className="text-gray-500 mb-8">Platform management & analytics</p>
                <div className="flex gap-2 mb-6">
                    <button onClick={() => setTab('overview')} className={`px-4 py-2 rounded-xl ${tab === 'overview' ? 'bg-green-700 text-white' : 'bg-white border'}`}>Overview</button>
                    <button onClick={() => setTab('predictions')} className={`px-4 py-2 rounded-xl ${tab === 'predictions' ? 'bg-green-700 text-white' : 'bg-white border'}`}>Predictions</button>
                    <button onClick={() => setTab('users')} className={`px-4 py-2 rounded-xl ${tab === 'users' ? 'bg-green-700 text-white' : 'bg-white border'}`}>Users</button>
                </div>
                {tab === 'overview' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card icon={<Users className="w-5 h-5" />} label="Total Users" value={users.length} />
                        <Card icon={<Activity className="w-5 h-5" />} label="Total Scans" value={predictions.length} />
                        <Card icon={<Activity className="w-5 h-5" />} label="Healthy" value={predictions.filter((p) => p.is_healthy).length} />
                        <Card icon={<Activity className="w-5 h-5" />} label="Diseased" value={predictions.filter((p) => !p.is_healthy).length} />
                    </div>
                )}
                {tab === 'predictions' && (
                    <div className="bg-white rounded-2xl border border-green-100 overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-green-50 text-gray-500"><tr><th className="p-3 text-left">Crop</th><th className="p-3 text-left">Disease</th><th className="p-3 text-left">Confidence</th><th className="p-3 text-left">Date</th><th></th></tr></thead>
                            <tbody>
                                {predictions.map((p) => (
                                    <tr key={p._id} className="border-t"><td className="p-3">{p.crop}</td><td className="p-3">{p.disease}</td><td className="p-3">{p.confidence ? Math.round(p.confidence * 100) + '%' : '-'}</td><td className="p-3">{new Date(p.createdAt).toLocaleDateString()}</td><td className="p-3"><button onClick={() => delPred(p._id)} className="text-red-500 text-xs">Delete</button></td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {tab === 'users' && (
                    <div className="bg-white rounded-2xl border border-green-100 overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-green-50 text-gray-500"><tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Role</th><th className="p-3 text-left">Joined</th></tr></thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u._id} className="border-t"><td className="p-3">{u.full_name || '-'}</td><td className="p-3">{u.email}</td><td className="p-3">{u.role}</td><td className="p-3">{new Date(u.createdAt).toLocaleDateString()}</td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
function Card({ icon, label, value }) {
    return (
        <div className="bg-white rounded-2xl border border-green-100 p-5">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-700 mb-3">{icon}</div>
            <div className="text-2xl font-bold">{value}</div><div className="text-xs text-gray-500">{label}</div>
        </div>
    );
}