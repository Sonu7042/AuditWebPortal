import React from "react";
import { ArrowLeft } from "lucide-react";

export default function ProjectHeader({
    showCompanyReport,
    setShowCompanyReport,
    showSummary,
    setShowSummary,
    submitted,
    setSubmitted,
    selectedCompany,
    selectedAudit,
    setShowAttentionModal
}) {
    return (
        <div className="h-14 flex items-center justify-between px-6 border-b border-gray-300 bg-[#f5f6f7]">
            <ArrowLeft className="text-gray-600 cursor-pointer" size={20} onClick={() => {
                if (showCompanyReport) setShowCompanyReport(false);
                else if (showSummary) setShowSummary(false);
                else if (submitted) setSubmitted(false);
            }} />
            <h1 className="text-sm tracking-widest font-medium text-gray-700">
                {showCompanyReport ? `Company report: ${selectedCompany}` : "TECHNICAL PROJECT REPORT"}
            </h1>
            <button
                onClick={() => {
                    if (showCompanyReport) {
                        // Save Logic
                    } else if (showSummary) {
                        // Final Step Logic
                    } else if (submitted) {
                        setShowSummary(true);
                        setShowAttentionModal(true);
                    } else {
                        setSubmitted(true);
                    }
                }}
                disabled={!selectedAudit && !showSummary && !showCompanyReport}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all duration-300 ${(selectedAudit || showSummary || showCompanyReport)
                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 active:scale-95"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300"
                    }`}
            >
                {showCompanyReport ? "Save" : showSummary ? "Complete Report" : "Next"}
            </button>
        </div>
    );
}
