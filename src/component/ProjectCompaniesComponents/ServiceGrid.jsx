import React from "react";

export default function ServiceGrid({ services, checkedServices, setCheckedServices, setActiveServiceIndex, setShowModal }) {
    return (
        <div className="flex-1 overflow-y-auto p-6">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl w-full">
                {services.map((service, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            if (service.title === "") {
                                setActiveServiceIndex(index);
                                setShowModal(true);
                            } else {
                                if (!checkedServices.includes(index)) {
                                    setCheckedServices((prev) => [...prev, index]);
                                }
                            }
                        }}
                        className="relative bg-white rounded-xl shadow-sm p-8 text-center cursor-pointer transition-all duration-300  "
                    >
                        {checkedServices.includes(index) && (
                            <div className="absolute top-4 left-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                                ✓
                            </div>
                        )}

                        <div className="text-gray-600 mb-4 flex justify-center">
                            {service.icon}
                        </div>

                        <h3 className="text-gray-700 font-medium text-sm md:text-base leading-relaxed">
                            {service.title}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
