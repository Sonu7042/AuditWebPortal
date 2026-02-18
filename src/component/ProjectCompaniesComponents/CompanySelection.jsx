import React from "react";
import { HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CompanySelection({
  companies,
  selectedCompany,
  setSelectedCompany,
  selectedAudit,
  checkedServices,
  services,
}) {
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
            onClick={
              selectedAudit
                ? null
                : () => {
                    setSelectedCompany(company);
                    navigate("/projecCompanies", { replace: true });
                  }
            }
            className={`px-6 py-4 border-b border-gray-200 ${
              selectedCompany === company
                ? "bg-blue-50 font-medium"
                : "hover:bg-gray-50 cursor-pointer"
            }`}
          >
            {company}
          </div>

          {selectedCompany === company && (
            <div className="px-8 py-4 bg-gray-50 border-b border-gray-200">
              {selectedAudit && <p>● {selectedAudit}</p>}

              {checkedServices.length > 0 &&
                checkedServices.map((idx, i) => (
                  <p key={i}>● {services[idx]?.title}</p>
                ))}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
