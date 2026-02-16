import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Info, RotateCcw, Check } from "lucide-react";

export default function PendingNonCompliance() {
  const navigate = useNavigate();

  const [nonComplianceList] = useState([
    {
      id: 242687,
      worker: "Not available",
      phase: "Labour, building and works cleaning",
      date: "06-02-2026",
      title: "04. ELECTRICAL RISK",
      description:
        "Power machinery is double-insulated, has no visible splits or splices and is connected to differential 30 mA or 0.03 A. It is protected against direct electrical contacts.",
    },
  ]);

  const [actionSelected, setActionSelected] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Row Actions
  const handleRecurring = (id) => {
    setActionSelected(true);
    navigate(`/close-nc/${id}`);
  };

  const handleCloseRow = (id) => {
    setActionSelected(true);
    navigate(`/close-nc/${id}`);
  };

  // Header Close Logic
  const handleHeaderClose = () => {
    if (!actionSelected) {
      setShowPopup(true);
      return;
    }
    navigate("/audit-checklist");
  };

  return (
    <div className="min-h-screen bg-white relative">

      {/* Top Header */}
      <div className="flex justify-center items-center py-4 border-b relative">
        <h2 className="text-lg font-medium text-gray-800">
          Pending Non-conformities
        </h2>

        <button
          onClick={handleHeaderClose}
          className="absolute right-6 top-3 border border-gray-300 px-4 py-1 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          Close
        </button>
      </div>

      {/* Info Strip */}
      <div className="flex justify-center items-center gap-2 py-3 text-sm text-gray-600 bg-gray-100 border-b">
        <Info size={16} />
        List of Non-conformities
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-7 text-xs text-gray-500 px-6 py-3 border-b">
        <div>ID</div>
        <div>Worker/resource</div>
        <div>Project phase</div>
        <div>D. of incident</div>
        <div>NC type</div>
        <div className="text-center">Recurring</div>
        <div className="text-center">Closure</div>
      </div>

      {/* Table Row */}
      {nonComplianceList.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-7 px-6 py-5 border-b text-sm"
        >
          <div>{item.id}</div>

          <div className="text-gray-600">{item.worker}</div>

          <div className="text-gray-600">{item.phase}</div>

          <div className="text-gray-600">{item.date}</div>

          <div>
            <p className="font-semibold text-gray-800">{item.title}</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              DOES NOT COMPLY:
              <br />
              {item.description}
            </p>
          </div>

          {/* Recurring Icon */}
          <div className="flex justify-center items-center">
            <button
              onClick={handleRecurring}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition"
            >
              <RotateCcw size={16} className="text-white" />
            </button>
          </div>

          {/* Close Icon */}
          <div className="flex justify-center items-center">
            <button
              onClick={() => handleCloseRow(item.id)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 transition"
            >
              <Check size={16} className="text-white" />
            </button>
          </div>
        </div>
      ))}

      {/* iOS Style Warning Popup */}
      {showPopup && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-gray-700 text-white rounded-xl w-96 p-6 text-center shadow-xl">
            <h3 className="font-semibold mb-3">Warning</h3>

            <p className="text-sm text-gray-200 leading-relaxed">
              An action for all NCs must be marked before the company report
              is created. Closing this screen will take you back to the
              previous screen. Do you wish to continue?
            </p>

            <div className="flex justify-between mt-6 border-t border-gray-500 pt-4">
              <button
                onClick={() => setShowPopup(false)}
                className="text-blue-300 hover:text-blue-400 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowPopup(false);
                  navigate("/audit-checklist");
                }}
                className="text-blue-300 hover:text-blue-400 transition"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
