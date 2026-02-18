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
  const [checkedServices, setCheckedServices] = useState([]);
  const [showAttentionModal, setShowAttentionModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(86400);

  const navigate = useNavigate();
  const location = useLocation();

  const isSummary = location.pathname.includes("/summary");
  const isReport = location.pathname.includes("/report");
  const isPhases = location.pathname.includes("/phases");
  const isAudit = !isSummary && !isReport && !isPhases;

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
      link: "/audit-checklist",
    },
    { title: "PREVENTIVE PLAN", icon: <ClipboardCheck size={40} />, link: "#" },
    { title: "WORKERS", icon: <Users size={40} />, link: "/workers" },
    { title: "MACHINERY", icon: <Settings size={40} />, link: "/machine" },
    // {
    //   title: "ANCILLARY MEASURES",
    //   icon: <Package size={40} />,
    //   link: "/ancillary",
    // },
    {
      title: "CHEMICAL PRODUCTS",
      icon: <FlaskConical size={40} />,
      link: "/chemicalProducts",
    },
    {
      title: "VISIT SHEET",
      icon: <FileSearch size={40} />,
      link: "/visitSheet",
    },
  ];

  // 🔥 SAVE / MERGE INTO reportData
  const saveProjectCompanyData = (company, audit, serviceIndexes = []) => {
    const existingData = JSON.parse(localStorage.getItem("reportData")) || {};

    const serviceTitles = serviceIndexes.map((index) => services[index]?.title);

    const updatedData = {
      ...existingData,
      company: company ?? existingData.company ?? null,
      auditType: audit ?? existingData.auditType ?? null,
      services:
        serviceTitles.length > 0
          ? serviceTitles
          : (existingData.services ?? []),
    };

    localStorage.setItem("reportData", JSON.stringify(updatedData));
  };

  // 🔥 HANDLERS
  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setSelectedAudit(null);
    setCheckedServices([]);
    saveProjectCompanyData(company, null, []);
  };

  const handleAuditSelect = (audit) => {
    setSelectedAudit(audit);
    saveProjectCompanyData(selectedCompany, audit, checkedServices);
  };

  // 🔥 Auto save when services change
  useEffect(() => {
    if (selectedCompany) {
      saveProjectCompanyData(selectedCompany, selectedAudit, checkedServices);
    }
  }, [checkedServices]);

  // 24 hours = 86400 seconds

  // Format HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowAttentionModal(false); // auto close
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
        <Route
          path="report"
          element={<CompanyReportView reportSections={reportSections} />}
        />

        <Route
          path="summary"
          element={
            <SummaryView
              companies={companies}
              secondsLeft={secondsLeft}
              formatTime={formatTime}
            />
          }
        />

        <Route
          path="/*"
          element={
            <div className="flex flex-1">
              <CompanySelection
                companies={companies}
                selectedCompany={selectedCompany}
                setSelectedCompany={handleCompanySelect}
                selectedAudit={selectedAudit}
                checkedServices={checkedServices}
                services={services}
              />

              <div className="w-1/2 flex flex-col bg-white">
                {!selectedCompany ? (
                  <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                    Select a company
                  </div>
                ) : (
                  <Routes>
                    <Route
                      path="phases"
                      element={
                        <ServiceGrid
                          services={services}
                          checkedServices={checkedServices}
                          setCheckedServices={setCheckedServices}
                          setShowModal={setShowModal}
                        />
                      }
                    />

                    <Route
                      path="/"
                      element={
                        <AuditGrid
                          audits={audits}
                          selectedAudit={selectedAudit}
                          setSelectedAudit={handleAuditSelect}
                        />
                      }
                    />
                  </Routes>
                )}
              </div>
            </div>
          }
        />
      </Routes>

      {showModal && (
        <CopyModal
          setShowAttentionModal={setShowAttentionModal}
          setShowModal={setShowModal}
        />
      )}

      {showAttentionModal && (
        <AttentionModal
          secondsLeft={secondsLeft}
          formatTime={formatTime}
          setShowAttentionModal={setShowAttentionModal}
        />
      )}
    </div>
  );
}
