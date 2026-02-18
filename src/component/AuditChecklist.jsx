import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaChevronDown,
  FaChevronRight,
  FaArrowLeft,
  FaHome,
  FaQuestionCircle,
  FaBuilding,
  FaHardHat,
  FaBroom,
  FaTools,
  FaShieldAlt,
  FaIndustry,
} from "react-icons/fa";
import { ChevronLeft } from "lucide-react";

const AuditChecklist = () => {
  const { auditSections } = useContext(AppContext);
  const navigate = useNavigate();

  const [openMain, setOpenMain] = useState(null);
  const [openSub, setOpenSub] = useState(null);

  const getCounts = (questions) => {
    const up = questions.filter((q) => q.status === "up").length;
    const down = questions.filter((q) => q.status === "down").length;
    const na = questions.length - up - down;
    return { up, down, na };
  };

  // 🔥 Different Icons for Each Main
  const sectionIcons = [
    FaBuilding,
    FaHardHat,
    FaBroom,
    FaTools,
    FaShieldAlt,
    FaIndustry,
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ================= TOP HEADER ================= */}
      <div className="bg-white border-b h-24 flex items-center justify-between px-6">

        <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <ChevronLeft size={30} />
            </button>

        <h1 className="text-[22px] font-semibold tracking-wide text-gray-800">
          INDERJEET BROS PROJECTS PVT. LTD.
        </h1>

        <div className="w-5"></div>
      </div>

      {/* ================= PREVENTIVE BAR ================= */}
      <div className="bg-gray-100 border-b h-18 flex items-center justify-between px-6 text-sm">
        <div className="flex items-center gap-4">
        <div className="font-medium text-gray-700 text-[20px] leading-tight">
          PREVENTIVE MANAGEMENT
        </div>
        <div className="text-gray-600 text-md">
          Click on corrosponding phase to assets its risks
        </div>
        </div>

        <div className="flex items-center gap-6 text-gray-600">
          <FaHome size={26} className="cursor-pointer" />
          <FaQuestionCircle size={26} className="cursor-pointer" />
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="bg-white">

        {auditSections.map((section, index) => {
          const mainCounts = getCounts(section.questions);

          const mid = Math.ceil(section.questions.length / 2);
          const subGroups = [
            {
              id: 1,
              title: "01. RISKS RELATED TO PROJECT IMPLEMENTATION",
              questions: section.questions.slice(0, mid),
            },
            {
              id: 2,
              title: "02. ADDITIONAL RISK CHECKS",
              questions: section.questions.slice(mid),
            },
          ];

          const IconComponent =
            sectionIcons[index % sectionIcons.length];

          return (
            <div key={section.id} className="border-b">

              {/* ================= MAIN ================= */}
              <div
                onClick={() =>
                  setOpenMain(openMain === section.id ? null : section.id)
                }
                className="flex justify-between items-center px-8 py-7 cursor-pointer"
              >
                <div className="flex items-center gap-4">

                  <div className="bg-green-600 text-white p-2 rounded-full">
                    <IconComponent size={24} />
                  </div>

                  {openMain === section.id ? (
                    <FaChevronDown size={18} />
                  ) : (
                    <FaChevronRight size={18} />
                  )}

                  <h2 className="text-base font-semibold text-gray-800 uppercase">
                    {section.title || "GENERAL PROJECT STATUS"}
                  </h2>
                </div>

                <div className="flex items-center gap-6 text-sm font-medium">
                  <div className="flex items-center gap-1 text-green-600">
                    <FaThumbsUp size={14} />
                    ({mainCounts.up})
                  </div>

                  <div className="flex items-center gap-1 text-red-600">
                    <FaThumbsDown size={14} />
                    ({mainCounts.down})
                  </div>

                  <div className="text-orange-500">
                    NOT APPLICABLE ({mainCounts.na})
                  </div>
                </div>
              </div>

              {/* ================= SUB MAIN ================= */}
              {openMain === section.id &&
                subGroups.map((sub, subIndex) => {
                  const subCounts = getCounts(sub.questions);

                  return (
                    <div key={sub.id} className="border-t">

                      <div
                        onClick={() =>
                          setOpenSub(
                            openSub === `${section.id}-${sub.id}`
                              ? null
                              : `${section.id}-${sub.id}`
                          )
                        }
                        className="flex justify-between items-center px-14 py-3 bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">

                          <div className="w-3 h-3 bg-green-600"></div>

                          {openSub === `${section.id}-${sub.id}` ? (
                            <FaChevronDown size={12} />
                          ) : (
                            <FaChevronRight size={12} />
                          )}

                          <h3 className="text-sm font-medium text-gray-700">
                            {sub.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-6 text-xs">
                          <span className="text-green-600 flex items-center gap-1">
                            <FaThumbsUp size={12} />
                            ({subCounts.up})
                          </span>

                          <span className="text-red-600 flex items-center gap-1">
                            <FaThumbsDown size={12} />
                            ({subCounts.down})
                          </span>

                          <span className="text-orange-500">
                            NOT APPLICABLE ({subCounts.na})
                          </span>
                        </div>
                      </div>

                      {/* ================= QUESTIONS ================= */}
                      {openSub === `${section.id}-${sub.id}` &&
                        sub.questions.map((q, qIndex) => {
                          const questionNumber = `01.${String(
                            subIndex * mid + qIndex + 1
                          ).padStart(2, "0")}`;

                          return (
                            <div
                              key={q.id}
                              className="flex justify-between items-center px-20 py-3 border-t text-sm hover:bg-gray-50"
                            >
                              <div className="flex gap-3 text-gray-700">
                                <span className="font-medium">
                                  {questionNumber}
                                </span>
                                <span>{q.question}</span>
                              </div>

                              <div className="flex items-center gap-6 text-xs">

                                <div className="text-green-600 flex items-center gap-1">
                                  <FaThumbsUp size={12} />
                                  {q.status === "up" ? 1 : 0}
                                </div>

                                <div className="text-red-600 flex items-center gap-1">
                                  <FaThumbsDown size={12} />
                                  {q.status === "down" ? 1 : 0}
                                </div>

                                {q.status === "na" && (
                                  <span className="text-orange-500">
                                    NOT APPLICABLE
                                  </span>
                                )}

                                <button
                                  disabled={q.isSynced}
                                  onClick={() =>
                                    navigate(
                                      `/work/${section.id}/${q.id}/${q.status}`
                                    )
                                  }
                                  className="text-blue-600 underline"
                                >
                                  Edit
                                </button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AuditChecklist;
