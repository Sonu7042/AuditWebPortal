import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const WorkPage = () => {

  const { sectionId, questionId } = useParams();
  const navigate = useNavigate();
  const { auditSections, updateQuestionStatus } = useContext(AppContext);

  const section = auditSections.find(s => s.id === Number(sectionId));
  if (!section) return <div>Section Not Found</div>;

  const question = section.questions.find(q => q.id === Number(questionId));
  if (!question) return <div>Question Not Found</div>;

  const [selected, setSelected] = useState(null);
  const [image, setImage] = useState(null);

  const handleBack = () => {

    if (selected === "up") {
      if (!window.confirm("Confirm UP?")) return;

      updateQuestionStatus(
        Number(sectionId),
        Number(questionId),
        "up",
        {
          descriptionImage: image,
          correctiveImage: null,
          description: ""
        }
      );
    }

    navigate("/audit-checklist");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h2 className="mb-6 font-semibold">{question.question}</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSelected("up")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          UP
        </button>

        <button
          onClick={() =>
            navigate(`/work-recurring/${sectionId}/${questionId}/down`)
          }
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          DOWN
        </button>
      </div>

      {selected === "up" && (
        <div>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
      )}

      <button
        onClick={handleBack}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Back
      </button>

    </div>
  );
};

export default WorkPage;
