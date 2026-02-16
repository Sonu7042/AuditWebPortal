import React from "react";
import { Info, FileText, MessageSquare, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function CompanyReportView({ reportSections }) {
    console.log(reportSections, "sonu")
    return (
        <div className="flex-1 flex flex-col bg-[#f5f6f7] overflow-hidden">
            <div className="bg-white border-b border-gray-200 divide-y divide-gray-100">
                <div className="flex h-14 items-center">
                    <div className="w-[200px] h-full flex items-center px-6 gap-3 bg-gray-50/50 border-r border-gray-200">
                        <FileText size={18} className="text-gray-400" />
                        <p className="text-[10px] text-gray-500 font-bold uppercase leading-tight">Technical description of the report</p>
                    </div>
                    <div className="flex-1 px-6"></div>
                </div>
                <div className="flex h-14 items-center">
                    <div className="w-[200px] h-full flex items-center px-6 gap-3 bg-gray-50/50 border-r border-gray-200">
                        <MessageSquare size={18} className="text-gray-400" />
                        <p className="text-[10px] text-gray-500 font-bold uppercase leading-tight">Observations</p>
                    </div>
                    <div className="flex-1 px-6"></div>
                </div>
            </div>

            <div className="h-10 px-4 flex items-center justify-center gap-2 bg-[#eaebec] border-b border-gray-300">
                <Info size={14} className="text-gray-500" />
                <p className="text-[11px] text-gray-500 font-medium">Assess the sections by clicking on each one</p>
                <HelpCircle size={16} className="text-sky-600 ml-auto mr-6 cursor-pointer" />
            </div>

            <div className="flex-1 bg-white grid grid-cols-4 divide-x divide-y divide-gray-600 border-b border-gray-200">
                {reportSections.map((sec, i) => (
                    <Link to={sec.link} key={i} className="flex flex-col items-center justify-center p-12 hover:bg-gray-50 cursor-pointer group relative">
                        {sec.badge && (
                            <div className="absolute top-8 left-8 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-[11px] font-bold shadow-sm">
                                {sec.badge}
                            </div>
                        )}
                        <div className="text-gray-400  group-hover:text-sky-600 transition-colors mb-4">
                            {sec.icon}
                        </div>
                        <h3 className="text-[11px] font-bold text-gray-600 text-center uppercase tracking-tight leading-relaxed max-w-[120px]">
                            {sec.title}
                        </h3>
                    </Link>
                ))}
                <div className="bg-gray-50/20"></div> {/* Placeholder for grid */}
            </div>
        </div>
    );
}
