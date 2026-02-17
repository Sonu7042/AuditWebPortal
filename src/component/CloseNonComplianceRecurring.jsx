import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Info, X } from "lucide-react";

export default function CloseNonConformity() {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [reason, setReason] = useState("");
  const [images, setImages] = useState([]);
  const [showBackPopup, setShowBackPopup] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);

  const handleAddImageClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imageURLs]);
  };

  const handleBack = () => setShowBackPopup(true);

  const handleSave = () => {
    if (images.length > 0) setShowSavePopup(true);
  };

  const handleFinish = () => {
    navigate("/pendingNonCompliance", { state: { completedId: Number(id) } });
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
        <button
          onClick={handleBack}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800">Close Non-Conformity</h2>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Save
          </button>
        </div>
      </div>

      {/* Info Strip */}
      <div className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-gray-700 text-base border-b">
        <Info size={18} />
        Enter data for closure of the non-conformity
      </div>

      {/* Form Section */}
      <div className="p-6 space-y-6">

        {/* Reason + Date */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Reason for closure
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select reason</option>
              <option value="closeConfirmed">Close Confirmed</option>
              <option value="closeNotConfirmed">Close Not Confirmed</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Date closed</label>
            <input
              type="text"
              value="11-02-2026"
              disabled
              className="w-full border rounded-lg px-4 py-2 bg-gray-100 text-gray-600"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <h3 className="text-gray-700 font-medium mb-3">
            Add an image that shows NC closure
          </h3>
          <div className="flex flex-col border rounded-lg bg-white p-4 shadow-sm min-h-[400px]">
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />

            <div className="flex gap-3 overflow-x-auto mb-3">
              <div
                onClick={handleAddImageClick}
                className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 text-2xl font-bold"
              >
                +
              </div>

              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              ))}
            </div>

            {images.length === 0 && (
              <p className="text-gray-400 mt-auto">No images have been added</p>
            )}
          </div>
        </div>
      </div>

      {/* Back Confirmation Popup */}
      {showBackPopup && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-xl w-80 p-6 text-center shadow-lg">
            <h3 className="font-semibold mb-3 text-gray-800">Warning</h3>
            <p className="text-gray-600 mb-6">
              Closing this screen will take you back. Do you want to continue?
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => setShowBackPopup(false)}
                className="px-4 py-2 rounded-lg text-blue-500 hover:bg-blue-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Confirmation Popup */}
      {showSavePopup && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-xl w-80 p-6 text-center shadow-lg">
            <h3 className="font-semibold mb-3 text-gray-800">Add More Images?</h3>
            <p className="text-gray-600 mb-6">
              Do you want to add more images or finish saving?
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => setShowSavePopup(false)}
                className="px-4 py-2 rounded-lg text-blue-500 hover:bg-blue-50 transition"
              >
                Add More
              </button>
              <button
                onClick={handleFinish}
                className="px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 transition"
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
