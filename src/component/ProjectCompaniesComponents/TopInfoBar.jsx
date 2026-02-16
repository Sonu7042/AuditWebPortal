import React from "react";
import { Calendar, Building2, Globe } from "lucide-react";

export default function TopInfoBar() {
    return (
        <div className="flex items-center border-b border-gray-300 bg-white h-16 text-sm text-gray-600 min-h-[64px]">
            <div className="flex items-center gap-2 px-6 border-r border-gray-200 h-full">
                <Calendar size={18} className="text-gray-400" />
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-medium">Visit</p>
                    <p className="font-semibold text-gray-700 text-[13px]">11-02-2026</p>
                </div>
            </div>

            <div className="flex items-center gap-2 px-6 border-r border-gray-200 h-full">
                <Building2 size={18} className="text-gray-400" />
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-medium">Promoter</p>
                    <p className="font-semibold text-gray-700 text-[13px]">INDITEX TRENT RETAIL INDIA PRIVATE, LTD.</p>
                </div>
            </div>

            <div className="flex flex-col justify-center px-6 border-r border-gray-200 h-full min-w-[120px]">
                <p className="text-[10px] text-gray-400 uppercase font-medium">Project</p>
                <p className="text-lg font-bold text-gray-800 leading-none">Bershka</p>
            </div>

            <div className="hidden lg:flex flex-col justify-center px-6 border-r border-gray-200 h-full flex-1 min-w-[200px]">
                <p className="text-[10px] text-gray-400 line-clamp-2 uppercase">
                    BANGALORE - SANJEEVINI NAGAR - YES - BERSHKA - MALL OF ASIA - INITIAL PROJECT 0
                </p>
            </div>

            <div className="flex items-center gap-2 px-6 h-full">
                <Globe size={18} className="text-gray-400" />
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-medium">Project market</p>
                    <p className="font-semibold text-gray-700 text-[13px]">INDIA</p>
                </div>
            </div>
        </div>
    );
}
