import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ChevronLeft } from "lucide-react";
import { FaThumbsUp, FaThumbsDown, FaPlus } from "react-icons/fa";

const WorkPage = () => {
  const { sectionId, subId, questionId } = useParams();
  const navigate = useNavigate();
  const { auditSections, updateQuestionStatus } =
    useContext(AppContext);

  const section = auditSections.find(
    (s) => s.id === Number(sectionId)
  );
  if (!section) return <div>Section Not Found</div>;

  const subSection = section.subSections.find(
    (sub) => sub.id === Number(subId)
  );
  if (!subSection) return <div>SubSection Not Found</div>;

  const question = subSection.questions.find(
    (q) => q.id === Number(questionId)
  );
  if (!question) return <div>Question Not Found</div>;

  const [selected, setSelected] = useState(null);
  const [image, setImage] = useState(null);
  const [extraImages, setExtraImages] = useState([]);
  const [footerInput, setFooterInput] = useState("");

  const addImageBlock = () => {
    setExtraImages([...extraImages, null]);
  };

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
          description: "",
        }
      );
    }

    navigate("/audit-checklist");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* 🔹 TOP HEADER */}
      <div className="border-b px-4 py-3 flex items-center justify-between">
        <ChevronLeft
          size={26}
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-sm font-semibold text-center flex-1">
          SPECIFIC RISK ASSESSMENT - INDERJEET BROS PROJECTS PVT. LTD.
        </h1>
        <div className="w-6"></div>
      </div>

      {/* 🔹 SECOND LINE */}
      <div className="border-b px-4 py-2 text-xs text-gray-600 text-center">
        PREVENTIVE MANAGEMENT - {section.title}
      </div>

      {/* 🔹 MAIN CONTENT */}
      <div className="flex-1 p-4">

        {/* QUESTION BOX */}
        <div className="border rounded p-4 mb-4">
          <p className="text-xs text-gray-500 mb-2">
            {subSection.title}
          </p>
          <p className="text-sm font-medium">
            {subId}.0{question.id} - {question.question}
          </p>
        </div>

        {/* IMAGE SECTION (ONLY WHEN UP SELECTED) */}
        {selected === "up" && (
          <div className="border rounded p-4">

            <p className="text-sm text-gray-600 mb-3">
              Add photos of correct assessment
            </p>

            {/* MAIN IMAGE */}
            <div className="mb-4">
              <input
                type="file"
                onChange={(e) =>
                  setImage(e.target.files[0])
                }
              />
            </div>

            {/* EXTRA IMAGES */}
            {extraImages.map((_, index) => (
              <div key={index} className="mb-4">
                <input type="file" />
              </div>
            ))}

            {/* ADD MORE BUTTON */}
            <button
              onClick={addImageBlock}
              className="flex items-center gap-2 text-green-600 text-sm"
            >
              <FaPlus />
              Add more photos
            </button>
          </div>
        )}
      </div>

      {/* 🔹 FIXED FOOTER */}
      <div className="border-t p-3 flex items-center gap-3">

        {/* UP */}
        <button
          onClick={() => setSelected("up")}
          className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center"
        >
          <FaThumbsUp />
        </button>

        {/* DOWN */}
        <button
          onClick={() =>
            navigate(
              `/work-recurring/${sectionId}/${subId}/${questionId}/down`
            )
          }
          className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center"
        >
          <FaThumbsDown />
        </button>

        {/* FULL WIDTH INPUT */}
        <input
          type="text"
          value={footerInput}
          onChange={(e) => setFooterInput(e.target.value)}
          placeholder="Click on the corresponding button to register a correct or incorrect process"
          className="flex-1 border rounded px-3 py-2 text-sm"
        />

        {/* SAVE BUTTON */}
        <button
          onClick={handleBack}
          className="bg-green-600 text-white px-4 py-2 rounded text-sm"
        >
          Save
        </button>
      </div>

    </div>
  );
};

export default WorkPage;
