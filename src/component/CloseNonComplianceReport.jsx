import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Info, X } from "lucide-react";

export default function CloseNonConformity() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [reason, setReason] = useState("");
  const [images, setImages] = useState([]);
  const [showBackPopup, setShowBackPopup] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);

  // Open gallery
  const handleAddImageClick = () => {
    fileInputRef.current.click(); // Opens gallery
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imageURLs]);
  };

  // Back button
  const handleBack = () => {
    setShowBackPopup(true);
  };

  // Save button
  const handleSave = () => {
    if (images.length > 0) {
      setShowSavePopup(true);
    }
  };

  return (
    <div className="min-h-screen bg-white relative">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <button onClick={handleBack}>
          <X size={20} />
        </button>

        <h2 className="text-lg font-medium">Close Non-conformity</h2>

        <button
          onClick={handleSave}
          className="px-4 py-1 border rounded-lg text-sm hover:bg-gray-100"
        >
          Save
        </button>
      </div>

      {/* Info Strip */}
      <div className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-sm text-gray-600 border-b">
        <Info size={16} />
        Enter data for closure of the non-conformity
      </div>

      {/* Form Section */}
      <div className="p-6 space-y-6">

        {/* Reason + Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Reason for closure</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Date closed</label>
            <input
              type="text"
              value="11-02-2026"
              disabled
              className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>
        </div>

        {/* Image Upload Section */}
        <div>
          <h3 className="text-sm text-gray-700 mb-3">
            Add an image that shows NC closure
          </h3>

          <div className="border rounded-lg p-4 bg-gray-50">

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />

            {/* Image Preview Area */}
            <div className="flex gap-3 overflow-x-auto">

              {/* Add Image Button */}
              <div
                onClick={handleAddImageClick}
                className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100"
              >
                +
              </div>

              {/* Selected Images */}
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded-lg border"
                />
              ))}
            </div>

            {/* Empty Text */}
            {images.length === 0 && (
              <p className="text-sm text-gray-400 mt-4">
                No images have been added
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Back Confirmation Popup */}
      {showBackPopup && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl w-80 p-6 text-center shadow-xl">
            <h3 className="font-semibold mb-3">Warning</h3>
            <p className="text-sm text-gray-600">
              Closing this screen will take you back. Do you want to continue?
            </p>

            <div className="flex justify-between mt-6 border-t pt-4">
              <button
                onClick={() => setShowBackPopup(false)}
                className="text-blue-500"
              >
                Cancel
              </button>

              <button
                onClick={() => navigate(-1)}
                className="text-blue-500"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Confirmation Popup */}
      {showSavePopup && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl w-80 p-6 text-center shadow-xl">
            <h3 className="font-semibold mb-3">Add More Images?</h3>
            <p className="text-sm text-gray-600">
              Do you want to add more images or finish saving?
            </p>

            <div className="flex justify-between mt-6 border-t pt-4">
              <button
                onClick={() => setShowSavePopup(false)}
                className="text-blue-500"
              >
                Add More
              </button>

              <button
                onClick={() => navigate("/audit-checklist")}
                className="text-blue-500"
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
