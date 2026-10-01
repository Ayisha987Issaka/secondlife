import React, { useEffect, useRef, useState } from 'react';
import { Camera, RefreshCw, X, AlertCircle } from 'lucide-react';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageDataUrl: string) => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    setIsLoading(true);
    setError(null);
    stopCamera();

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setError('Unable to access device camera. Please grant camera permission or upload a photo instead.');
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      stopCamera();
      onCapture(dataUrl);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div id="camera-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div id="camera-modal-content" className="relative w-full max-w-lg bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-stone-950/80 border-b border-stone-800 text-stone-100">
          <div className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-base text-stone-100">Snap Your Unwanted Item</h3>
          </div>
          <button
            id="camera-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
            aria-label="Close camera"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Preview */}
        <div className="relative bg-black aspect-[4/3] flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="p-6 text-center text-stone-300 max-w-sm">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-stone-200 mb-2">{error}</p>
              <button
                onClick={startCamera}
                className="mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold"
              >
                Retry Camera Access
              </button>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* Viewfinder Target Overlay */}
              <div className="absolute inset-8 pointer-events-none border-2 border-emerald-400/40 rounded-xl border-dashed flex items-center justify-center">
                <span className="text-xs font-medium text-emerald-300/80 bg-stone-950/70 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  Center item in frame
                </span>
              </div>
            </>
          )}

          {isLoading && (
            <div className="absolute inset-0 bg-stone-950/60 flex items-center justify-center">
              <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-5 bg-stone-950 flex items-center justify-between">
          <button
            id="camera-flip-btn"
            type="button"
            onClick={toggleFacingMode}
            className="flex items-center space-x-2 px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Flip Camera</span>
          </button>

          <button
            id="camera-snap-action-btn"
            type="button"
            disabled={Boolean(error) || isLoading}
            onClick={capturePhoto}
            className="flex items-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-stone-950 rounded-full font-bold text-sm shadow-lg shadow-emerald-950/50 transition-all transform active:scale-95"
          >
            <Camera className="w-5 h-5" />
            <span>Take Photo</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 text-stone-400 hover:text-stone-200 text-xs font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
