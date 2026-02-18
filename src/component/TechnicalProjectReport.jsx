import React, { useState } from "react";
import {
  ArrowLeft,
  HelpCircle,
  Globe,
  Building2,
  MapPin,
  Calendar,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function TechnicalProjectReport() {
  const navigate = useNavigate();
  // ===== Default Current Date =====
  const today = new Date().toISOString().split("T")[0];

  const [market, setMarket] = useState("INDIA");
  const [promoter, setPromoter] = useState(
    "INDITEX TRENT RETAIL INDIA PRIVATE, LTD.",
  );
  const [project, setProject] = useState(
    "BANGALORE - SANJEEVINI NAGAR - YES - BERSHKA - MALL OF ASIA - INITIAL PROJECT 0",
  );
  const [visitDate, setVisitDate] = useState(today);




  const handleCreateReport = () => {
  const reportData = {
    market,
    promoter,
    project,
    visitDate,
    createdAt: new Date().toISOString(),
  };

  // Save to localStorage
  localStorage.setItem("reportData", JSON.stringify(reportData));

  // Navigate
  navigate("/projecCompanies", { replace: true });
};


  return (
    <div className="h-screen bg-[#f5f6f7] flex flex-col">
      {/* ===== Top Header ===== */}
      <div className="h-14 flex items-center justify-center relative border-b border-gray-300 bg-[#f5f6f7]">
        <Link to="/dashboard">
          <ArrowLeft className="absolute left-4 text-gray-600" size={20} />
        </Link>
        <h1 className="text-sm tracking-widest font-medium text-gray-700">
          TECHNICAL PROJECT REPORT
        </h1>
      </div>

      {/* ===== Split Layout ===== */}
      <div className="flex flex-1">
        {/* ===== LEFT SIDE ===== */}
        <div className="w-1/2 border-r border-gray-300 flex flex-col">
          {/* Section Header */}
          <div className="h-12 flex items-center justify-between px-6 border-b border-gray-200">
            <p className="text-xs text-gray-600">
              Select market, promoter and project:
            </p>
            <HelpCircle size={16} className="text-gray-500" />
          </div>

          {/* Item 1 */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <Globe size={20} className="text-gray-400" />
              <div>
                <p className="text-[11px] text-gray-400">
                  Select project market
                </p>
                <p className="text-sm text-gray-700">INDIA</p>
              </div>
            </div>
            <span className="text-gray-500">✓</span>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <Building2 size={20} className="text-gray-400" />
              <div>
                <p className="text-[11px] text-gray-400">
                  Select project promoter
                </p>
                <p className="text-sm text-gray-700">
                  INDITEX TRENT RETAIL INDIA PRIVATE, LTD.
                </p>
              </div>
            </div>
            <span className="text-gray-500">✓</span>
          </div>

          {/* Item 3 */}
          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-4">
              <MapPin size={20} className="text-gray-400" />
              <div>
                <p className="text-[11px] text-gray-400">Select project</p>
                <p className="text-sm text-gray-700 leading-snug">
                  BANGALORE - SANJEEVINI NAGAR - YES - BERSHKA - MALL OF ASIA -
                  INITIAL PROJECT 0
                </p>
              </div>
            </div>
            <span className="text-gray-500">✓</span>
          </div>
        </div>
        {/* ===== RIGHT SIDE ===== */}
        <div className="w-1/2 flex flex-col relative">
          {/* Section Header */}
          <div className="h-12 flex items-center justify-between px-6 border-b border-gray-200">
            <p className="text-xs text-gray-600">Select visit date</p>
            <HelpCircle size={16} className="text-gray-500" />
          </div>

          {/* Center Content */}
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="text-sm text-gray-500 mb-6">
              Project report with visit date
            </p>

            <Calendar size={70} className="text-gray-300 mb-6" />

            <input
              type="date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              className="text-xl text-gray-700 bg-transparent outline-none"
            />
          </div>

          {/* Bottom Button */}
          <div className="absolute bottom-8 right-10">
            <button
              onClick={handleCreateReport}
              className="px-5 py-2 text-sm border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50 transition"
            >
              Create report and continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
