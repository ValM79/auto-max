import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, RotateCw, Star, Trash2 } from 'lucide-react';

export default function ImageViewer({ photos, initialIndex, onClose, onSetCover, onRotate, onDelete }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [rotation, setRotation] = useState(photos[initialIndex]?.rotation || 0);

  const goNext = () => {
    const next = (currentIndex + 1) % photos.length;
    setCurrentIndex(next);
    setRotation(photos[next]?.rotation || 0);
  };

  const goPrev = () => {
    const prev = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(prev);
    setRotation(photos[prev]?.rotation || 0);
  };

  const handleRotate = () => {
    const newRotation = (rotation + 90) % 360;
    setRotation(newRotation);
    onRotate(currentIndex, newRotation);
  };

  const handleDelete = () => {
    onDelete(currentIndex);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center">
      <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors">
        <X className="w-7 h-7" />
      </button>

      <div className="relative w-full max-w-3xl h-[70vh] flex items-center justify-center">
        <button onClick={goPrev} className="absolute left-4 text-white hover:text-gray-300">
          <ChevronLeft className="w-10 h-10" />
        </button>
        <img
          src={photos[currentIndex]?.preview}
          alt=""
          className="max-h-full max-w-full object-contain transition-transform"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
        <button onClick={goNext} className="absolute right-4 text-white hover:text-gray-300">
          <ChevronRight className="w-10 h-10" />
        </button>
      </div>

      <div className="flex items-center gap-4 mt-4 bg-black/50 px-6 py-3 rounded-xl">
        <button
          onClick={() => onSetCover(currentIndex)}
          className="flex items-center gap-2 text-white text-sm hover:text-yellow-400 transition-colors"
        >
          <Star className="w-4 h-4" /> Set as Cover
        </button>
        <button onClick={handleRotate} className="flex items-center gap-2 text-white text-sm hover:text-blue-400 transition-colors">
          <RotateCw className="w-4 h-4" /> Rotate
        </button>
        <button onClick={handleDelete} className="flex items-center gap-2 text-white text-sm hover:text-red-400 transition-colors">
          <Trash2 className="w-4 h-4" /> Delete
        </button>
        <span className="text-white/60 text-sm">{currentIndex + 1} / {photos.length}</span>
      </div>
    </div>
  );
}