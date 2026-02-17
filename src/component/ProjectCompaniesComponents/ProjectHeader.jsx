import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProjectHeader({
    isReport,
    isSummary,
    isPhases,
    isAudit,
    selectedCompany,
    selectedAudit,
    setShowAttentionModal
}) {
    const navigate = useNavigate();

    return (
        <div className="h-14 flex items-center justify-between px-6 border-b border-gray-300 bg-[#f5f6f7]">
            <ArrowLeft className="text-gray-600 cursor-pointer" size={20} onClick={() => {
                if (isReport) navigate("/dashboard", { replace: true });
                else if (isSummary) navigate("/dashboard", { replace: true });
                else if (isPhases) navigate("/dashboard", { replace: true });
                else navigate("/dashboard");
            }} />
            <h1 className="text-sm tracking-widest font-medium text-gray-700">
                {isReport ? `Company report: ${selectedCompany}` : "TECHNICAL PROJECT REPORT"}
            </h1>
            <button
                onClick={() => {
                    if (isReport) {
                        // Save Logic
                    } else if (isSummary) {
                        // Final Step Logic
                    } else if (isPhases) {
                        navigate("/projecCompanies/summary", { replace: true });
                        setShowAttentionModal(true);
                    } else if (isAudit) {
                        navigate("/projecCompanies/phases", { replace: true });
                    }
                }}
                disabled={!selectedAudit && !isSummary && !isReport && !isPhases}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all duration-300 ${(selectedAudit || isSummary || isReport || isPhases)
                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 active:scale-95"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300"
                    }`}
            >
                {isReport ? "Save" : isSummary ? "Complete Report" : "Next"}
            </button>
        </div>
    );
}
