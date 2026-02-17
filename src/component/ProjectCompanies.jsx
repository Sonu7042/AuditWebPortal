import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  Wrench,
  Hammer,
  Paintbrush,
  Building2,
  HardHat,
  Truck,
  Ruler,
  Brush,
  ClipboardCheck,
  Package,
  Users,
  Settings,
  ShieldCheck,
  FlaskConical,
  FileSearch,
} from "lucide-react";

// Sub-components
import ProjectHeader from "./ProjectCompaniesComponents/ProjectHeader";
import TopInfoBar from "./ProjectCompaniesComponents/TopInfoBar";
import CompanySelection from "./ProjectCompaniesComponents/CompanySelection";
import AuditGrid from "./ProjectCompaniesComponents/AuditGrid";
import ServiceGrid from "./ProjectCompaniesComponents/ServiceGrid";
import SummaryView from "./ProjectCompaniesComponents/SummaryView";
import CompanyReportView from "./ProjectCompaniesComponents/CompanyReportView";
import CopyModal from "./ProjectCompaniesComponents/CopyModal";
import AttentionModal from "./ProjectCompaniesComponents/AttentionModal";

export default function ProjectCompanies() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [showAttentionModal, setShowAttentionModal] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Determine current view from URL
  const isSummary = location.pathname.includes("/summary");
  const isReport = location.pathname.includes("/report");
  const isPhases = location.pathname.includes("/phases");
  const isAudit = !isSummary && !isReport && !isPhases;

  // ✅ Countdown Timer Logic
  const [secondsLeft, setSecondsLeft] = useState(24 * 60 * 60 - 60);

  useEffect(() => {
    let interval;
    if (showAttentionModal && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showAttentionModal, secondsLeft]);

  const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h} hours ${m} minutes ${s} seconds`;
  };

  const [showModal, setShowModal] = useState(false);
  const [activeServiceIndex, setActiveServiceIndex] = useState(null);
  const [checkedServices, setCheckedServices] = useState([]);

  const companies = [
    "INDERJEET BROS PROJECTS PVT. LTD.",
    "KIMAK SYSTEMS & DESIGN, S.L.U.",
    "LIGHTSOUND BUSINESS S.L",
  ];

  const audits = [
    "SAFETY AUDIT(IS 14489)",
    "ELETRICAL AUDIT",
    "FIRE SAFETY AUDIT",
    "EHS AUDIT",
    "WEEKLY GEMBA WALK",
    "ENERGY AUDIT",
    "QUALITY AUDIT",
    "LEGAL COMPLIANCE AUDIT",
    "OISD AUDIT",
    "ISO INTERNAL AUDIT (ISO 9001, ISO 14001, & ISO 45001)",
    "ISO GAP ANALYSIS (ISO 9001, ISO 14001, & ISO 45001)",
    "MACHINE AUDIT (ISO 12100)",
  ];

  const services = [
    { title: "General Projects", icon: <Wrench size={28} /> },
    { title: "Demolitions", icon: <Hammer size={28} /> },
    { title: "Earthworks", icon: <Truck size={28} /> },
    { title: "Structures", icon: <Building2 size={28} /> },
    { title: "Labour & Cleaning", icon: <HardHat size={28} /> },
    { title: "Installation", icon: <Ruler size={28} /> },
    { title: "Woodwork / Metalwork", icon: <Brush size={28} /> },
    { title: "Painting & Finishes", icon: <Paintbrush size={28} /> },
  ];

  const reportSections = [
    {
      title: "PREVENTIVE MANAGEMENT",
      icon: <ShieldCheck size={40} />,
      badge: "1",
      link: "/pendingNonCompliance"
    },
    {
      title: "PREVENTIVE PLAN",
      icon: <ClipboardCheck size={40} />,
      link: "#"
    },
    {
      title: "WORKERS",
      icon: <Users size={40} />,
      link: "/workers"
    },
    {
      title: "MACHINERY",
      icon: <Settings size={40} />,
      link: "/machine"
    },
    {
      title: "ANCILLARY MEASURES",
      icon: <Package size={40} />,
      link: "/ancillary"
    },
    {
      title: "CHEMICAL PRODUCTS",
      icon: <FlaskConical size={40} />,
      link: "/chemicalProducts"
    },
    {
      title: "VISIT SHEET",
      icon: <FileSearch size={40} />,
      link: "/visitSheet"
    },
  ];

  return (
    <div className="h-screen bg-[#f5f6f7] flex flex-col relative overflow-hidden">
      <ProjectHeader
        isReport={isReport}
        isSummary={isSummary}
        isPhases={isPhases}
        isAudit={isAudit}
        selectedCompany={selectedCompany}
        selectedAudit={selectedAudit}
        setShowAttentionModal={setShowAttentionModal}
      />

      <TopInfoBar />

      <Routes>
        <Route path="report" element={<CompanyReportView reportSections={reportSections} />} />
        <Route path="summary" element={
          <SummaryView
            companies={companies}
          />
        } />
        <Route path="/*" element={
          <div className="flex flex-1">
            <CompanySelection
              companies={companies}
              selectedCompany={selectedCompany}
              setSelectedCompany={setSelectedCompany}
              setSelectedAudit={setSelectedAudit}
              selectedAudit={selectedAudit}
              checkedServices={checkedServices}
              services={services}
            />
            <div className="w-1/2 flex flex-col bg-white">
              <div className="h-12 flex items-center justify-between px-6 border-b border-gray-200 bg-[#f9fafb]">
                <p className="text-sm font-medium text-gray-700">
                  {isPhases ? `Add project phases to ${selectedCompany}` : "Phases selected by the supplier"}
                </p>
                <FileSearch size={16} className="text-gray-500" />
              </div>

              {!selectedCompany ? (
                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                  Select a company
                </div>
              ) : (
                <Routes>
                  <Route path="phases" element={
                    <ServiceGrid
                      services={services}
                      checkedServices={checkedServices}
                      setCheckedServices={setCheckedServices}
                      setActiveServiceIndex={setActiveServiceIndex}
                      setShowModal={setShowModal}
                    />
                  } />
                  <Route path="/" element={
                    <AuditGrid
                      audits={audits}
                      selectedAudit={selectedAudit}
                      setSelectedAudit={setSelectedAudit}
                    />
                  } />
                </Routes>
              )}
            </div>
          </div>
        } />
      </Routes>

      {showModal && (
        <CopyModal
          setShowAttentionModal={setShowAttentionModal}
          setShowModal={setShowModal}
        />
      )}

      {showAttentionModal && (
        <AttentionModal
          formatTime={formatTime}
          secondsLeft={secondsLeft}
          setShowAttentionModal={setShowAttentionModal}
        />
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .scale-in {
          animation: scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      ` }} />
    </div>
  );
}
