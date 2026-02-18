import React from "react";

export default function AuditGrid({
  audits,
  selectedAudit,
  setSelectedAudit,
}) {    
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="grid grid-cols-2 gap-4">
        {audits.map((audit, index) => (
          <div
            key={index}
            onClick={() => setSelectedAudit(audit)}
            className={`p-4 rounded-lg border cursor-pointer ${
              selectedAudit === audit
                ? "bg-black text-white border-black"
                : "bg-white hover:shadow-md"
            }`}
          >
            {audit}
          </div>
        ))}
      </div>
    </div>
  );
}
