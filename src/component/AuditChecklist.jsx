import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const AuditChecklist = () => {

  const { auditSections } = useContext(AppContext);
  const navigate = useNavigate();

  const [openMain, setOpenMain] = useState(null);
  const [openSub, setOpenSub] = useState(null);

  const getCounts = (questions) => {
    const up = questions.filter(q => q.status === "up").length;
    const down = questions.filter(q => q.status === "down").length;
    const na = questions.length - up - down;
    return { up, down, na };
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {auditSections.map(section => {

        const mainCounts = getCounts(section.questions);

        // 👇 Split questions into 2 groups (fake submain)
        const mid = Math.ceil(section.questions.length / 2);
        const subGroups = [
          { id: 1, title: "SUB MAIN - A", questions: section.questions.slice(0, mid) },
          { id: 2, title: "SUB MAIN - B", questions: section.questions.slice(mid) }
        ];

        return (
          <div key={section.id} className="bg-white rounded shadow mb-4">

            {/* MAIN */}
            <div
              className="flex justify-between p-4 border-b cursor-pointer"
              onClick={() =>
                setOpenMain(openMain === section.id ? null : section.id)
              }
            >
              <h2 className="font-semibold">{section.title}</h2>
              <div className="flex gap-4 text-sm">
                <span>👍 {mainCounts.up}</span>
                <span>👎 {mainCounts.down}</span>
                <span>NA {mainCounts.na}</span>
              </div>
            </div>

            {openMain === section.id &&
              subGroups.map(sub => {

                const subCounts = getCounts(sub.questions);

                return (
                  <div key={sub.id} className="border-t">

                    {/* SUB MAIN */}
                    <div
                      className="flex justify-between p-4 bg-gray-50 cursor-pointer"
                      onClick={() =>
                        setOpenSub(
                          openSub === `${section.id}-${sub.id}`
                            ? null
                            : `${section.id}-${sub.id}`
                        )
                      }
                    >
                      <h3>{sub.title}</h3>
                      <div className="flex gap-4 text-sm">
                        <span>👍 {subCounts.up}</span>
                        <span>👎 {subCounts.down}</span>
                        <span>NA {subCounts.na}</span>
                      </div>
                    </div>

                    {openSub === `${section.id}-${sub.id}` &&
                      sub.questions.map(q => (
                        <div
                          key={q.id}
                          className="flex justify-between p-4 border-t bg-white"
                        >
                          <span>{q.question}</span>

                          <div className="flex gap-4 items-center">

                            <button
                              disabled={q.isSynced}
                              onClick={() =>
                                navigate(
                                  `/work/${section.id}/${q.id}/${q.status}`
                                )
                              }
                              className="text-blue-600 underline text-sm"
                            >
                              Edit
                            </button>

                            <span>👍 {q.status === "up" ? 1 : 0}</span>
                            <span>👎 {q.status === "down" ? 1 : 0}</span>

                            <span className="text-orange-500 text-sm">
                              {q.status === "na"
                                ? "NOT APPLICABLE"
                                : ""}
                            </span>

                          </div>
                        </div>
                      ))}
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default AuditChecklist;
