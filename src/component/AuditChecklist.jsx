import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronRight,
  FaThumbsUp,
  FaThumbsDown,
  FaBuilding,
} from "react-icons/fa";
import { ChevronLeft, Home, HelpCircle } from "lucide-react";

const AuditChecklist = () => {
  const { auditSections, addNewQuestion } = useContext(AppContext);
  const navigate = useNavigate();

  const [openMain, setOpenMain] = useState(null);
  const [openSub, setOpenSub] = useState(null);
  const [newQuestions, setNewQuestions] = useState({});
  const [visitedMains, setVisitedMains] = useState([]);

  // 🔥 LOAD VISITED MAINS
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("visitedMains")) || [];
    setVisitedMains(saved);
  }, []);

  // 🔥 SAVE VISITED MAINS
  useEffect(() => {
    localStorage.setItem("visitedMains", JSON.stringify(visitedMains));
  }, [visitedMains]);

  const handleMainClick = (id) => {
    if (!visitedMains.includes(id)) {
      setVisitedMains([...visitedMains, id]);
    }

    setOpenMain(openMain === id ? null : id);
  };

  const getCounts = (questions) => {
    const up = questions.filter((q) => q.status === "up").length;
    const down = questions.filter((q) => q.status === "down").length;
    const na = questions.length - up - down;
    return { up, down, na };
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <ChevronLeft size={28} className="cursor-pointer" />
        <h1 className="font-semibold text-gray-800 tracking-wide">
          INDERJEET BROS PROJECTS PVT. LTD.
        </h1>
        <div className="w-6"></div>
      </div>

      {/* PREVENTIVE BAR */}
      <div className="bg-gray-50 border-b px-6 py-3 flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-700">
            PREVENTIVE MANAGEMENT
          </p>
          <p className="text-sm text-gray-500">
            Click on the corresponding phase to assess its risks
          </p>
        </div>

        <div className="flex gap-4 text-gray-600">
          <Home size={22} />
          <HelpCircle size={22} />
        </div>
      </div>

      {/* MAIN LIST */}
      <div className="bg-white">

        {auditSections.map((section) => {

          const allQuestions = section.subSections.flatMap(
            (sub) => sub.questions
          );

          const mainCounts = getCounts(allQuestions);

          const isVisited = visitedMains.includes(section.id);

          return (
            <div key={section.id} className="border-b">

              {/* MAIN ROW */}
              <div
                onClick={() => handleMainClick(section.id)}
                className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">

                  {/* 🔥 ICON COLOR FIXED */}
                  <div
                    className={`p-3 rounded-full ${
                      isVisited
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    <FaBuilding size={18} />
                  </div>

                  <span className="font-semibold text-gray-800">
                    {section.title}
                  </span>
                </div>

                <div className="flex items-center gap-6 text-sm">

                  <div className="flex items-center gap-1 text-green-600">
                    <FaThumbsUp />
                    ({mainCounts.up})
                  </div>

                  <div className="flex items-center gap-1 text-red-600">
                    <FaThumbsDown />
                    ({mainCounts.down})
                  </div>

                  <div className="text-orange-500 font-medium">
                    NOT APPLICABLE ({mainCounts.na})
                  </div>

                  {openMain === section.id ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </div>
              </div>

              {/* SUB SECTIONS */}
              {openMain === section.id &&
                section.subSections.map((sub) => {

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
                        className="flex items-center justify-between px-12 py-3 cursor-pointer hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-600"></div>
                          <span className="text-gray-700 font-medium">
                            {sub.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-6 text-sm">

                          <div className="flex items-center gap-1 text-green-600">
                            <FaThumbsUp />
                            ({subCounts.up})
                          </div>

                          <div className="flex items-center gap-1 text-red-600">
                            <FaThumbsDown />
                            ({subCounts.down})
                          </div>

                          <div className="text-orange-500">
                            NOT APPLICABLE ({subCounts.na})
                          </div>

                          {openSub === `${section.id}-${sub.id}` ? (
                            <FaChevronDown size={14} />
                          ) : (
                            <FaChevronRight size={14} />
                          )}
                        </div>
                      </div>

                      {/* QUESTIONS */}
                      {openSub === `${section.id}-${sub.id}` && (
                        <>
                          {sub.questions.map((q, index) => (
                            <div
                              key={q.id}
                              className="flex justify-between items-center px-20 py-3 border-t hover:bg-gray-50"
                            >
                              <span className="text-sm text-gray-700">
                                {sub.id}.{index + 1} - {q.question}
                              </span>

                              <button
                                onClick={() =>
                                  navigate(
                                    `/work/${section.id}/${sub.id}/${q.id}/${q.status}`
                                  )
                                }
                                className="text-blue-600 text-sm underline"
                              >
                                Edit
                              </button>
                            </div>
                          ))}

                          {/* ADD RISK BUTTON */}
                          <div className="px-20 py-4 border-t flex gap-3">
                            <input
                              type="text"
                              value={
                                newQuestions[
                                  `${section.id}-${sub.id}`
                                ] || ""
                              }
                              onChange={(e) =>
                                setNewQuestions({
                                  ...newQuestions,
                                  [`${section.id}-${sub.id}`]:
                                    e.target.value,
                                })
                              }
                              placeholder="Add risk..."
                              className="flex-1 border px-3 py-2 rounded text-sm"
                            />

                            <button
                              onClick={() => {
                                const key = `${section.id}-${sub.id}`;
                                const text = newQuestions[key];

                                addNewQuestion(
                                  section.id,
                                  sub.id,
                                  text
                                );

                                setNewQuestions({
                                  ...newQuestions,
                                  [key]: "",
                                });
                              }}
                              className="border px-4 py-2 rounded text-sm bg-gray-100 hover:bg-gray-200"
                            >
                              Add risk
                            </button>
                          </div>
                        </>
                      )}
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
