import { useEffect, useRef, useState } from 'react';
import { Camera, X, AlertCircle } from 'lucide-react';

export default function CameraCapture({ onCapture, onClose }) {
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const [ready, setReady] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' },
                });
                streamRef.current = stream;
                if (videoRef.current) videoRef.current.srcObject = stream;
                setReady(true);
            } catch (e) {
                setError('Camera access denied or unavailable.');
            }
        })();
        return () => {
            streamRef.current?.getTracks().forEach((t) => t.stop());
        };
    }, []);

    const capture = () => {
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
            const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
            onCapture(file);
        }, 'image/jpeg', 0.9);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl overflow-hidden max-w-lg w-full">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-semibold flex items-center gap-2"><Camera className="w-5 h-5 text-green-700" /> Take Photo</h3>
                    <button onClick={onClose}><X className="w-5 h-5" /></button>
                </div>
                <div className="relative">
                    {error ? (
                        <div className="p-8 text-center text-red-600 flex items-center justify-center gap-2">
                            <AlertCircle className="w-5 h-5" /> {error}
                        </div>
                    ) : (
                        <video ref={videoRef} autoPlay playsInline className="w-full aspect-[4/3] object-cover bg-black" />
                    )}
                </div>
                <div className="p-4 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl border">Cancel</button>
                    <button onClick={capture} disabled={!ready} className="flex-1 py-3 rounded-xl bg-green-700 text-white disabled:opacity-50">
                        Capture
                    </button>
                </div>
            </div>
        </div>
    );
}