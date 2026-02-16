import React from "react";
import { HelpCircle } from "lucide-react";

export default function CompanySelection({ companies, selectedCompany, setSelectedCompany, setSelectedAudit, setSubmitted }) {
    return (
        <div className="w-1/2 border-r border-gray-300 flex flex-col bg-white">
            <div className="h-12 flex items-center justify-between px-6 border-b border-gray-200 bg-[#f9fafb]">
                <p className="text-sm font-medium text-gray-700">
                    Select companies in project
                </p>
                <HelpCircle size={16} className="text-gray-500" />
            </div>

            {companies.map((company, index) => (
                <div
                    key={index}
                    onClick={() => {
                        setSelectedCompany(company);
                        setSelectedAudit(null);
                        setSubmitted(false);
                    }}
                    className={`px-6 py-4 border-b border-gray-200 cursor-pointer ${selectedCompany === company
                        ? "bg-blue-50 font-medium"
                        : "hover:bg-gray-50"
                        }`}
                >
                    {company}
                </div>
            ))}
        </div>
    );
}
