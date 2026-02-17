import React from "react";
import { HelpCircle, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SummaryView({ companies }) {
    const navigate = useNavigate();
    return (
        <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
            {/* Summary Sub-header */}
            <div className="h-12 flex items-center justify-between px-6 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 uppercase font-medium">Synchronised NC - 0/0</span>
                    <button className="px-2 py-0.5 bg-gray-100 text-[9px] text-gray-500 rounded border border-gray-200">
                        Synchronised
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-xs text-gray-600 font-medium tracking-tight">Companies in the report</p>
                    <button
                        onClick={() => navigate("/projecCompanies", { replace: true })}
                        className="px-4 py-1.5 text-xs border border-gray-300 text-gray-700 rounded-md font-bold uppercase hover:bg-gray-50 transition-colors"
                    >
                        Change companies
                    </button>
                    <HelpCircle size={18} className="text-gray-400" />
                </div>
            </div>

            {/* Company Cards List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {companies.map((company, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-10 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className={`p-2 rounded-full ${index === 0 ? "bg-amber-500 text-white" : "text-gray-300"}`}>
                                <AlertTriangle size={36} />
                            </div>
                            <div>
                                <h3 className={`text-lg font-bold tracking-tight ${index === 0 ? "text-gray-800 uppercase" : "text-gray-300 uppercase italic"}`}>
                                    {company}
                                </h3>
                                <p className={`text-[11px] mt-1 line-clamp-1 uppercase tracking-wide font-medium ${index === 0 ? "text-gray-400" : "text-gray-200"}`}>
                                    ● General project status ● Labour, building and works cleaning ● Installations and plasterboarding ● Painting and finishes
                                </p>
                            </div>
                        </div>
                        <button
                            disabled={index !== 0}
                            onClick={() => navigate("/projecCompanies/report", { replace: true })}
                            className={`px-10 py-3 rounded-md font-bold text-xs uppercase border transition-all ${index === 0
                                ? "border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
                                : "border-gray-200 text-gray-200 cursor-not-allowed"
                                }`}
                        >
                            Complete
                        </button>
                    </div>
                ))}
            </div>

            {/* Bottom Actions Bar */}
            <div className="h-16 flex items-center justify-center gap-4 px-6 border-t border-gray-300 bg-white">
                <button className="px-6 py-2.5 border border-blue-600 text-blue-600 text-[11px] font-bold rounded hover:bg-blue-50 transition-colors">
                    Create Non-liste...in the project NC
                </button>
                <button className="px-6 py-2.5 border border-blue-600 text-blue-600 text-[11px] font-bold rounded hover:bg-blue-50 transition-colors">
                    Create Document NC
                </button>
                <button className="px-6 py-2.5 border border-blue-600 text-blue-600 text-[11px] font-bold rounded hover:bg-blue-50 transition-colors">
                    See Non-conformities
                </button>
            </div>
        </div>
    );
}
