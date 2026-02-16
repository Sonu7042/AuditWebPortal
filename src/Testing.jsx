import React, { useState } from "react";
import {
  Wrench,
  Hammer,
  Paintbrush,
  HardHat,
  Building2,
  Truck,
  Ruler,
  Brush
} from "lucide-react";

const services = [
  { title: "General Projects", icon: <Wrench size={28} /> },
  { title: "Demolitions", icon: <Hammer size={28} /> },
  { title: "Earthworks and Special Foundations", icon: <Truck size={28} /> },
  { title: "Structures", icon: <Building2 size={28} /> },
  { title: "Labour, Building and Works Cleaning", icon: <HardHat size={28} /> },
  { title: "Installation and Plasterboard", icon: <Ruler size={28} /> },
  { title: "Woodwork (Furniture) / Metalwork", icon: <Brush size={28} /> },
  { title: "Painting and Finishes", icon: <Paintbrush size={28} /> },
  { title: "Auxiliary Services (End-of-Works Cleanup)", icon: <HardHat size={28} /> }
];

export default function Testing(){

  const [clickedIndex, setClickedIndex] = useState(null);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="grid gap-6 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          max-w-6xl w-full">
        
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => {
              setClickedIndex(index);
              setTimeout(() => setClickedIndex(null), 600);
            }}
            className="relative bg-white rounded-xl shadow-md 
                       p-8 text-center cursor-pointer 
                       transition-all duration-300 
                       hover:shadow-xl hover:-translate-y-2"
          >
            {/* Green badge */}
            <div className="absolute top-4 left-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
              ✓
            </div>

            {/* Ripple Effect */}
            {clickedIndex === index && (
              <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="w-24 h-24 bg-green-400 rounded-full animate-ping opacity-30"></span>
              </span>
            )}

            {/* Icon */}
            <div className="text-gray-600 mb-4 flex justify-center">
              {service.icon}
            </div>

            {/* Title */}
            <h3 className="text-gray-700 font-medium text-sm md:text-base leading-relaxed">
              {service.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

