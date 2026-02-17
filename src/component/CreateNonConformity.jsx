import React, { useContext, useState } from "react";
import {
  ArrowLeft,
  Globe,
  Home,
  HelpCircle,
  ImagePlus,
  MessageSquare,
  CalendarDays,
  Wrench,
} from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";


export default function CreateNonConformity() {
  const { formData, setFormData, savedMachinery, setSavedMachinery } =
    useContext(AppContext);


    const navigate = useNavigate();

  // ✅ HANDLE TEXT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ HANDLE IMAGE UPLOAD
  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [field]: file,
      }));
    }
  };

  // ✅ CHECK IF ALL FIELDS FILLED
  const isFormValid =
    formData.subcontractedCompany.trim() !== "" &&
    formData.machinery.trim() !== "" &&
    formData.description.trim() !== "" &&
    formData.correctiveMeasure.trim() !== "" &&
    formData.descriptionImage !== null &&
    formData.correctiveImage !== null;

 const handleSave = () => {
  if (!isFormValid) return;

  setSavedMachinery((prev) => [...prev, formData]);

  setFormData({
    subcontractedCompany: "",
    machinery: "",
    description: "",
    correctiveMeasure: "",
    descriptionImage: null,
    correctiveImage: null,
  });

  // ✅ Redirect
  navigate("/machine");
};

  const handleSync = () => {
    if (!isFormValid) return;
    console.log("Synced Data:", formData);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex flex-col">
      {/* ================= HEADER ================= */}
      <div className="bg-white border-b">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <ArrowLeft size={20} className="text-gray-600 cursor-pointer" />
            <h1 className="text-sm font-medium text-gray-700">
              Create Non-conformity
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSync}
              disabled={!isFormValid}
              className={`border px-4 py-1 rounded-md text-sm ${
                isFormValid
                  ? "border-gray-400 text-gray-700"
                  : "border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Synchronise
            </button>

            <button
              onClick={handleSave}
              disabled={!isFormValid}
              className={`border px-4 py-1 rounded-md text-sm ${
                isFormValid
                  ? "border-blue-500 text-blue-600"
                  : "border-blue-200 text-blue-300 cursor-not-allowed"
              }`}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-white border-b">
        <div className="flex flex-wrap lg:flex-nowrap items-center px-6 py-4 text-sm text-gray-600">
          {/* Visit */}
          <div className="flex items-start gap-3 pr-8 border-r min-w-[180px]">
            <CalendarDays size={18} className="text-gray-400 mt-1" />
            <div>
              <p className="text-gray-400 text-xs">Visit</p>
              <p className="text-gray-700">11-02-2026</p>
            </div>
          </div>

          {/* Promoter */}
          <div className="flex items-start gap-3 px-8 border-r min-w-[280px]">
            <div>
              <p className="text-gray-400 text-xs">Promoter</p>
              <p className="text-gray-700">
                INDITEX TRENT RETAIL INDIA PRIVATE, LTD.
              </p>
            </div>
          </div>

          {/* Project */}
          <div className="flex flex-col px-8 border-r min-w-[320px]">
            <p className="text-gray-400 text-xs">Project</p>
            <p className="text-gray-800 text-2xl font-light leading-tight">
              Bershka
            </p>
            <p className="text-gray-500 text-xs mt-1">
              BANGALORE - SANJEEVINI NAGAR - YES - BERSHKA - MALL OF ASIA -
              INITIAL PROJECT 0
            </p>
          </div>

          {/* Market */}
          <div className="flex items-start gap-3 px-8 min-w-[200px]">
            <Globe size={18} className="text-gray-400 mt-1" />
            <div>
              <p className="text-gray-400 text-xs">Project market</p>
              <p className="text-gray-700">INDIA</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#f3f4f6] border-b">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Center Text with Icon */}
          <div className="flex items-center gap-2 text-gray-600 text-sm mx-auto">
            <Wrench size={16} className="text-gray-400" />
            <span>Enter data for unauthorised machinery</span>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 text-gray-500 absolute right-6">
            <Home size={18} className="cursor-pointer hover:text-gray-700" />
            <HelpCircle
              size={18}
              className="cursor-pointer hover:text-gray-700"
            />
          </div>
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div className="flex-1 px-6 py-6">
        {/* Top Form Row */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* LEFT INPUT AREA */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Subcontracted Company (Input instead of dropdown) */}
            <div>
              <label className="text-xs text-gray-500">
                Select the subcontracted company
              </label>
              <input
                type="text"
                name="subcontractedCompany"
                value={formData.subcontractedCompany}
                onChange={handleChange}
                className="w-full border bg-white mt-1 px-3 py-2 text-sm"
              />
            </div>

            {/* Machinery */}
            <div>
              <label className="text-xs text-gray-500">Machinery*</label>
              <input
                type="text"
                name="machinery"
                value={formData.machinery}
                onChange={handleChange}
                className="w-full border bg-white mt-1 px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* STATUS BOX */}
          <div className="w-full lg:w-[220px] border bg-white flex items-center justify-center gap-3 py-6">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-orange-500 text-lg">⏳</span>
            </div>
            <span className="text-orange-500 font-medium text-sm">Pending</span>
          </div>
        </div>

        {/* Description + Corrective Row */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* DESCRIPTION */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
              <MessageSquare size={16} />
              Description of the non-conformity
            </div>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="bg-[#111827] text-white text-xs px-3 py-3 w-[90%] resize-none"
              rows={4}
            />

            <div className="mt-6 w-[140px] h-[100px] border-2 border-dashed flex items-center justify-center text-gray-400 relative">
              <ImagePlus size={24} />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleImageUpload(e, "descriptionImage")}
              />
            </div>
          </div>

          {/* CORRECTIVE */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
              <MessageSquare size={16} />
              Corrective measure
            </div>

            <textarea
              name="correctiveMeasure"
              value={formData.correctiveMeasure}
              onChange={handleChange}
              className="bg-[#111827] text-white text-xs px-3 py-3 w-[90%] resize-none"
              rows={4}
            />

            <div className="mt-6 w-[140px] h-[100px] border-2 border-dashed flex items-center justify-center text-gray-400 relative">
              <ImagePlus size={24} />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleImageUpload(e, "correctiveImage")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
