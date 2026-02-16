import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import {
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
  Lock
} from "lucide-react";



const AuditChecklist = () => {
  const { auditSections } = useContext(AppContext);
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-700">
          PREVENTIVE MANAGEMENT
        </h1>
        <p className="text-sm text-gray-500">
          Click on the corresponding phase to assess its risks
        </p>
      </div>

      <div className="bg-white">

        {auditSections.map((section) => {
          const upCount = section.questions.filter(q => q.status === "up").length;
          const downCount = section.questions.filter(q => q.status === "down").length;
          const naCount = section.questions.filter(q => q.status === "na").length;

          return (
            <div key={section.id} className="border-b border-gray-200">

              {/* SECTION HEADER */}
              <div
                className="flex items-center justify-between px-6 py-5 hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center text-white font-semibold">
                    {section.id}
                  </div>
                  <h2 className="text-gray-700 font-medium tracking-wide">
                    {section.title}
                  </h2>
                </div>

                <div className="flex items-center gap-8">

                  <div className="flex items-center gap-1 text-green-600">
                    <div className="bg-green-100 p-2 rounded-full">
                      <ThumbsUp size={16} />
                    </div>
                    <span className="text-sm text-gray-600">({upCount})</span>
                  </div>

                  <div className="flex items-center gap-1 text-red-600">
                    <div className="bg-red-100 p-2 rounded-full">
                      <ThumbsDown size={16} />
                    </div>
                    <span className="text-sm text-gray-600">({downCount})</span>
                  </div>

                  <div className="text-right">
                    <p className="text-orange-500 font-semibold text-sm leading-tight">
                      NOT
                    </p>
                    <p className="text-orange-500 font-semibold text-sm leading-tight">
                      APPLICABLE ({naCount})
                    </p>
                  </div>

                  {openSection === section.id ? (
                    <ChevronUp size={20} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-500" />
                  )}
                </div>
              </div>

              {/* QUESTIONS */}
              {openSection === section.id && (
                <div className="bg-gray-50 px-6 py-4 space-y-3">

                  {section.questions.map((question) => (
                    <div
                      key={question.id}
                      className="flex items-center justify-between bg-white border rounded-md px-4 py-3"
                    >
                      <div className="flex items-center gap-3 max-w-3xl">
                        <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          Q
                        </div>
                        <p className="text-sm text-gray-700 font-medium">
                          {question.question}
                        </p>

                        {question.isSynced && (
                          <Lock size={16} className="text-gray-500" />
                        )}
                      </div>

                      <div className="flex items-center gap-4">

                        <button
                          disabled={question.isSynced}
                          onClick={() =>
                            navigate(`/work/${section.id}/${question.id}/up`)
                          }
                          className={`p-2 rounded-full transition ${
                            question.isSynced
                              ? "bg-gray-300 cursor-not-allowed"
                              : question.status === "up"
                              ? "bg-green-500 text-white"
                              : "bg-green-100 text-green-600 hover:bg-green-200"
                          }`}
                        >
                          <ThumbsUp size={16} />
                        </button>

                        <button
                          disabled={question.isSynced}
                          onClick={() =>
                            navigate(`/work/${section.id}/${question.id}/down`)
                          }
                          className={`p-2 rounded-full transition ${
                            question.isSynced
                              ? "bg-gray-300 cursor-not-allowed"
                              : question.status === "down"
                              ? "bg-red-500 text-white"
                              : "bg-red-100 text-red-600 hover:bg-red-200"
                          }`}
                        >
                          <ThumbsDown size={16} />
                        </button>

                        <span className="text-xs font-semibold text-orange-500">
                          {question.status === "na"
                            ? "NOT APPLICABLE"
                            : question.status.toUpperCase()}
                        </span>

                      </div>
                    </div>
                  ))}

                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AuditChecklist;
