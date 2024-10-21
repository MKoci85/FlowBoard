import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid'; // Importa el ícono de flecha

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-3 bg-white text-black shadow-lg rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-xl active:scale-95 focus:outline-none"
    >
      <ArrowLeftIcon className="w-6 h-6 animate-bounce-arrow" />
    </button>
  );
};

export default BackButton;
