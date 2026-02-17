import React from "react";
import { HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CompanySelection({ companies, selectedCompany, setSelectedCompany, setSelectedAudit, selectedAudit, checkedServices, services }) {
    const navigate = useNavigate();
    return (
        <div className="w-1/2 border-r border-gray-300 flex flex-col bg-white">
            <div className="h-12 flex items-center justify-between px-6 border-b border-gray-200 bg-[#f9fafb]">
                <p className="text-sm font-medium text-gray-700">
                    Select companies in project
                </p>
                <HelpCircle size={16} className="text-gray-500" />
            </div>

            {companies.map((company, index) => (
                <React.Fragment key={index}>
                    <div
                        onClick={selectedAudit ? null : () => {
                            setSelectedCompany(company);
                            setSelectedAudit(null);
                            navigate("/projecCompanies", { replace: true });
                        }}
                        className={`px-6 py-4 border-b border-gray-200 transition-all ${selectedCompany === company
                                ? "bg-blue-50 font-medium cursor-default"
                                : selectedAudit
                                    ? "opacity-40 cursor-not-allowed select-none"
                                    : "hover:bg-gray-50 cursor-pointer"
                            }`}
                    >
                        {company}
                    </div>
                    {selectedCompany === company && (
                        <div className="px-8 py-4 bg-gray-50/50 border-b border-gray-200 space-y-4">
                            {selectedAudit && (
                                <div className="space-y-1">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Selected Audit</p>
                                    <p className="text-[11px] text-gray-600 font-medium lowercase first-letter:uppercase">
                                        ● {selectedAudit}
                                    </p>
                                </div>
                            )}

                            {checkedServices && checkedServices.length > 0 && (
                                <div className="space-y-1.5">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Project Phases</p>
                                    <div className="flex flex-wrap gap-1">
                                        {checkedServices.map((serviceIdx, sIndex) => (
                                            <span key={sIndex} className="text-[10px] text-gray-600 bg-white border border-gray-200 px-2 py-0.5 rounded shadow-sm lowercase first-letter:uppercase">
                                                ● {services[serviceIdx]?.title}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
