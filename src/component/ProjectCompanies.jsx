import React, { useState, useEffect } from "react";
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
  const [submitted, setSubmitted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showAttentionModal, setShowAttentionModal] = useState(false);
  const [showCompanyReport, setShowCompanyReport] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);

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
    "SAFETY AUDIT",
    "ELECTRICAL AUDIT",
    "FIRE SAFETY AUDIT",
    "EHS AUDIT",
    "ENERGY AUDIT",
    "QUALITY AUDIT",
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
    link: "#"
  },
];



  

  return (
    <div className="h-screen bg-[#f5f6f7] flex flex-col relative overflow-hidden">
      <ProjectHeader
        showCompanyReport={showCompanyReport}
        setShowCompanyReport={setShowCompanyReport}
        showSummary={showSummary}
        setShowSummary={setShowSummary}
        submitted={submitted}
        setSubmitted={setSubmitted}
        selectedCompany={selectedCompany}
        selectedAudit={selectedAudit}
        setShowAttentionModal={setShowAttentionModal}
      />

      <TopInfoBar />

      {showCompanyReport ? (
        <CompanyReportView reportSections={reportSections} />
      ) : showSummary ? (
        <SummaryView
          companies={companies}
          setShowSummary={setShowSummary}
          setShowCompanyReport={setShowCompanyReport}
        />
      ) : (
        <div className="flex flex-1">
          <CompanySelection
            companies={companies}
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
            setSelectedAudit={setSelectedAudit}
            setSubmitted={setSubmitted}
          />
          <div className="w-1/2 flex flex-col bg-white">
            <div className="h-12 flex items-center justify-between px-6 border-b border-gray-200 bg-[#f9fafb]">
              <p className="text-sm font-medium text-gray-700">
                {submitted ? `Add project phases to ${selectedCompany}` : "Phases selected by the supplier"}
              </p>
              <FileSearch size={16} className="text-gray-500" />
            </div>

            {!selectedCompany ? (
              <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                Select a company
              </div>
            ) : !submitted ? (
              <AuditGrid
                audits={audits}
                selectedAudit={selectedAudit}
                setSelectedAudit={setSelectedAudit}
              />
            ) : (
              <ServiceGrid
                services={services}
                checkedServices={checkedServices}
                setCheckedServices={setCheckedServices}
                setActiveServiceIndex={setActiveServiceIndex}
                setShowModal={setShowModal}
              />
            )}
          </div>
        </div>
      )}

      {showModal && (
        <CopyModal
          setSubmitted={setSubmitted}
          setShowSummary={setShowSummary}
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
