import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const WorkPageRecurring = () => {

  const { sectionId, subId, questionId } = useParams();
  const navigate = useNavigate();
  const { auditSections, updateQuestionStatus, synchroniseQuestion } =
    useContext(AppContext);

  // 🔥 Find Section
  const section = auditSections.find(
    (s) => s.id === Number(sectionId)
  );
  if (!section) return <div>Section Not Found</div>;

  // 🔥 Find SubSection
  const subSection = section.subSections.find(
    (sub) => sub.id === Number(subId)
  );
  if (!subSection) return <div>SubSection Not Found</div>;

  // 🔥 Find Question
  const question = subSection.questions.find(
    (q) => q.id === Number(questionId)
  );
  if (!question) return <div>Question Not Found</div>;

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const isClosed = image1 || image2;

  const handleSave = () => {
    if (!window.confirm("Save changes?")) return;

    updateQuestionStatus(
      Number(sectionId),
      Number(questionId),
      "down",
      {
        descriptionImage: image1,
        correctiveImage: image2,
        description: ""
      }
    );

    navigate("/audit-checklist");
  };

  const handleSync = () => {
    if (!window.confirm("Synchronise and Lock?")) return;

    updateQuestionStatus(
      Number(sectionId),
      Number(questionId),
      "down",
      {
        descriptionImage: image1,
        correctiveImage: image2,
        description: ""
      }
    );

    synchroniseQuestion(
      Number(sectionId),
      Number(questionId)
    );

    navigate("/audit-checklist");
  };

  return (
    <div className="p-6">
      <h2 className="mb-6 font-semibold">{question.question}</h2>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <textarea
            className="w-full border p-2 mb-4"
            placeholder="Description"
          />
          <input
            type="file"
            onChange={(e) => setImage1(e.target.files[0])}
          />
        </div>

        <div>
          <textarea
            className="w-full border p-2 mb-4"
            placeholder="Corrective Measure"
          />
          <input
            type="file"
            onChange={(e) => setImage2(e.target.files[0])}
          />
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>

        <button
          disabled={!isClosed}
          onClick={handleSync}
          className={`px-4 py-2 rounded ${
            isClosed ? "bg-green-600 text-white" : "bg-gray-300"
          }`}
        >
          Synchronise
        </button>
      </div>
    </div>
  );
};

export default WorkPageRecurring;
