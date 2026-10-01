import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Image as ImageIcon, Sparkles, X, RefreshCw } from 'lucide-react';
import { CameraCaptureModal } from './CameraCaptureModal';

interface UploadSectionProps {
  onAnalyze: (payload: { imageBase64: string | null; mimeType: string; textPrompt: string }) => void;
  isLoading: boolean;
  resetKey?: number;
  openCameraTrigger?: number;
  openFileTrigger?: number;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  onAnalyze,
  isLoading,
  resetKey = 0,
  openCameraTrigger = 0,
  openFileTrigger = 0,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [textPrompt, setTextPrompt] = useState<string>('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (resetKey > 0) {
      setImagePreview(null);
      setTextPrompt('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [resetKey]);

  useEffect(() => {
    if (openCameraTrigger > 0) {
      setIsCameraOpen(true);
    }
  }, [openCameraTrigger]);

  useEffect(() => {
    if (openFileTrigger > 0) {
      fileInputRef.current?.click();
    }
  }, [openFileTrigger]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, WebP).');
      return;
    }

    setMimeType(file.type || 'image/jpeg');
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (!result) return;

      // Downscale oversized smartphone / high-resolution images to prevent memory and payload stalls
      const img = new Image();
      img.onload = () => {
        const maxDim = 1400;
        if (img.width > maxDim || img.height > maxDim) {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const optimizedBase64 = canvas.toDataURL('image/jpeg', 0.86);
            setImagePreview(optimizedBase64);
            setMimeType('image/jpeg');
            return;
          }
        }
        setImagePreview(result);
      };
      img.onerror = () => {
        setImagePreview(result);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleCameraCapture = (dataUrl: string) => {
    setImagePreview(dataUrl);
    setMimeType('image/jpeg');
  };

  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview && !textPrompt.trim()) {
      alert('Please take a photo, upload an image, or describe the object.');
      return;
    }

    onAnalyze({
      imageBase64: imagePreview,
      mimeType,
      textPrompt,
    });
  };

  return (
    <section id="upload-identify-card" className="bg-white rounded-2xl border border-stone-200 p-5 md:p-6 shadow-xs space-y-4">
      {/* Prominent Heading & Short 1-sentence subtitle */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-600" />
            <span>Upload an Object</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            Take a photo or upload an image to identify materials and circular options.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Dropzone or Preview */}
        {!imagePreview ? (
          <div
            id="drop-zone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-emerald-500 bg-emerald-50/50'
                : 'border-stone-300 hover:border-emerald-400 bg-stone-50/70'
            }`}
          >
            <input
              ref={fileInputRef}
              id="file-upload-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-2.5 shadow-2xs">
              <Upload className="w-6 h-6" />
            </div>

            <p className="text-sm font-bold text-stone-900">
              Drag & drop photo, or <span className="text-emerald-700 underline">browse</span>
            </p>
            <p className="text-xs text-stone-500 mt-0.5">
              Supports JPEG, PNG, or mobile camera photos
            </p>

            {/* Prominent Action Buttons */}
            <div className="mt-4 flex items-center justify-center gap-2.5 flex-wrap" onClick={(e) => e.stopPropagation()}>
              <button
                id="open-camera-btn"
                type="button"
                onClick={() => setIsCameraOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span>Take Photo</span>
              </button>

              <button
                id="browse-btn"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Choose File</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-40 h-36 rounded-xl overflow-hidden border border-stone-200 bg-white shrink-0 shadow-2xs">
              <img
                src={imagePreview}
                alt="Selected item"
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-2 right-2 p-1.5 bg-stone-900/80 hover:bg-rose-600 text-white rounded-full transition-colors"
                title="Remove photo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 w-full text-left space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  Photo Attached
                </span>
                <button
                  type="button"
                  onClick={() => setIsCameraOpen(true)}
                  className="text-xs text-stone-600 hover:text-emerald-700 font-semibold underline inline-flex items-center gap-1"
                >
                  <Camera className="w-3 h-3" /> Retake
                </button>
              </div>

              {/* Optional brief note */}
              <input
                type="text"
                id="optional-item-note"
                placeholder="Optional: Add short note (e.g., broken leg, dirty)..."
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />

              <button
                id="analyze-attached-btn"
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-stone-300 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analysing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                    <span>Analyse Object</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Text-only fallback option if no camera is available */}
        {!imagePreview && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              id="item-description-fallback"
              placeholder="Or describe an unwanted object (e.g., cracked plastic basin)..."
              value={textPrompt}
              onChange={(e) => setTextPrompt(e.target.value)}
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            <button
              id="analyze-text-btn"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading || !textPrompt.trim()}
              className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white text-xs font-bold rounded-xl shrink-0 transition-colors cursor-pointer"
            >
              Analyse
            </button>
          </div>
        )}
      </form>

      {/* Camera Capture Modal */}
      {isCameraOpen && (
        <CameraCaptureModal
          isOpen={isCameraOpen}
          onCapture={handleCameraCapture}
          onClose={() => setIsCameraOpen(false)}
        />
      )}
    </section>
  );
};
