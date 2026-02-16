import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ArrowLeft } from "lucide-react";

const WorkPage = () => {
  const { sectionId, questionId, status } = useParams();
  const navigate = useNavigate();

  const {
    formData,
    setFormData,
    updateQuestionStatus,
    synchroniseQuestion
  } = useContext(AppContext);

  useEffect(() => {
    setFormData({
      subcontractedCompany: "",
      machinery: "",
      description: "",
      correctiveMeasure: "",
      descriptionImage: null,
      correctiveImage: null,
    });
  }, []);

  // ✅ Required validation
  const isValid =
    formData.subcontractedCompany.trim() !== "" &&
    formData.machinery.trim() !== "" &&
    formData.description.trim() !== "" &&
    formData.correctiveMeasure.trim() !== "";

  const handleSave = () => {
    if (!isValid) return;

    updateQuestionStatus(
  Number(sectionId),
  Number(questionId),
  status,   // ✅ up ya down
  formData
);


    navigate(-1);
  };

  const handleSynchronise = () => {
    if (!isValid) return;

    updateQuestionStatus(
  Number(sectionId),
  Number(questionId),
  status,   // ✅ up ya down
  formData
);

    synchroniseQuestion(
      Number(sectionId),
      Number(questionId)
    );

    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center bg-white px-6 py-4 border-b">

        <div className="flex items-center gap-4">
          <button
            disabled={!isValid}
            onClick={() => navigate(-1)}
            className={`p-2 rounded ${
              isValid
                ? "hover:bg-gray-200"
                : "opacity-40 cursor-not-allowed"
            }`}
          >
            <ArrowLeft size={22} />
          </button>

          <h1 className="text-lg font-semibold">
            Create Non-conformity
          </h1>
        </div>

        <div className="flex gap-3">
          <button
            disabled={!isValid}
            onClick={handleSynchronise}
            className={`px-4 py-2 rounded border ${
              isValid
                ? "hover:bg-gray-100"
                : "opacity-40 cursor-not-allowed"
            }`}
          >
            Synchronise
          </button>

          <button
            disabled={!isValid}
            onClick={handleSave}
            className={`px-4 py-2 rounded ${
              isValid
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-300 text-white cursor-not-allowed"
            }`}
          >
            Save
          </button>
        </div>
      </div>

      {/* ================= PROJECT INFO BAR ================= */}
      <div className="bg-white border-b px-6 py-6 grid grid-cols-4 gap-6 text-sm">

        <div>
          <p className="text-gray-500">Visit</p>
          <p className="font-medium">11-02-2026</p>
        </div>

        <div>
          <p className="text-gray-500">Promoter</p>
          <p className="font-medium">
            INDITEX TRENT RETAIL INDIA PRIVATE, LTD.
          </p>
        </div>

        <div>
          <p className="text-gray-500">Project</p>
          <p className="font-medium text-lg">Bershka</p>
          <p className="text-gray-500 text-xs">
            BANGALORE - SANJEEVINI NAGAR - YES - BERSHKA - MALL OF ASIA
          </p>
        </div>

        <div>
          <p className="text-gray-500">Project market</p>
          <p className="font-medium">INDIA</p>
        </div>
      </div>

      {/* ================= FORM ================= */}
      <div className="p-6">

        {/* Subcontracted Company */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">
            Select the subcontracted company
          </label>
          <input
            type="text"
            className="w-full border mt-1 p-2"
            value={formData.subcontractedCompany}
            onChange={(e) =>
              setFormData({
                ...formData,
                subcontractedCompany: e.target.value,
              })
            }
          />
        </div>

        {/* Machinery */}
        <div className="mb-6">
          <label className="text-sm text-gray-600">
            Machinery*
          </label>
          <input
            type="text"
            className="w-full border mt-1 p-2"
            value={formData.machinery}
            onChange={(e) =>
              setFormData({
                ...formData,
                machinery: e.target.value,
              })
            }
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-10">

          {/* LEFT SIDE */}
          <div>
            <label className="text-sm text-gray-600">
              Description of the non-conformity
            </label>

            <textarea
              rows="6"
              className="w-full mt-2 bg-[#0b1220] text-white p-4"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />

            <div className="mt-6 border-2 border-dashed p-10 flex justify-center text-gray-400">
              <input
                type="file"
                className="hidden"
                id="descImg"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    descriptionImage: e.target.files[0],
                  })
                }
              />
              <label htmlFor="descImg" className="cursor-pointer">
                📷
              </label>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <label className="text-sm text-gray-600">
              Corrective measure
            </label>

            <textarea
              rows="6"
              className="w-full mt-2 bg-[#0b1220] text-white p-4"
              value={formData.correctiveMeasure}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  correctiveMeasure: e.target.value,
                })
              }
            />

            <div className="mt-6 border-2 border-dashed p-10 flex justify-center text-gray-400">
              <input
                type="file"
                className="hidden"
                id="corrImg"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    correctiveImage: e.target.files[0],
                  })
                }
              />
              <label htmlFor="corrImg" className="cursor-pointer">
                📷
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WorkPage;
