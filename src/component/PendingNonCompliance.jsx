import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Info, RotateCcw, Check } from "lucide-react";

export default function PendingNonCompliance() {
  const navigate = useNavigate();
  const location = useLocation();

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

  const [completedTasks, setCompletedTasks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // ✅ Mark completed task when coming back from Close page
  useEffect(() => {
    if (location.state?.completedId) {
      const id = location.state.completedId;
      setCompletedTasks((prev) =>
        prev.includes(id) ? prev : [...prev, id]
      );
    }
  }, [location.state]);

  // Row Actions
  const handleRecurring = (id) => {
    navigate(`/close-nc-recurring/${id}`);
  };

  const handleCloseRow = (id) => {
    navigate(`/close-nc/${id}`);
  };

  // Header Close logic
  const handleHeaderClose = () => {
    if (completedTasks.length < nonComplianceList.length) {
      setShowPopup(true);
      return;
    }
    navigate("/audit-checklist");
  };

  const isAnyTaskCompleted = completedTasks.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 relative">

      {/* Top Header */}
      <div className="flex justify-center items-center py-4 border-b relative">
        <h2 className="text-xl font-semibold text-gray-800">
          Pending Non-conformities
        </h2>

        <button
          onClick={handleHeaderClose}
          disabled={!isAnyTaskCompleted}
          className={`absolute right-6 top-3 border px-4 py-1 rounded-lg text-sm transition
            ${
              isAnyTaskCompleted
                ? "border-gray-300 text-gray-700 hover:bg-gray-100"
                : "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
            }`}
        >
          Close
        </button>
      </div>

      {/* Info Strip */}
      <div className="flex justify-center items-center gap-2 py-3 text-lg text-gray-600 bg-gray-100 border-b">
        <Info size={20} />
        List of Non-conformities
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-7 text-lg text-gray-500 px-6 py-3 border-b font-medium">
        <div>ID</div>
        <div>Worker/resource</div>
        <div>Project phase</div>
        <div>D. of incident</div>
        <div>NC type</div>
        <div className="text-center">Recurring</div>
        <div className="text-center">Closure</div>
      </div>

      {/* Table Rows */}
      {nonComplianceList.map((item) => {
        const isCompleted = completedTasks.includes(item.id);
        const rowBg = isCompleted ? "bg-green-100" : "bg-red-100";

        return (
          <div
            key={item.id}
            className={`grid grid-cols-7 px-6 py-5 text-lg border-b transition-all ${rowBg}`}
          >
            <div>{item.id}</div>
            <div className="text-gray-700">{item.worker}</div>
            <div className="text-gray-700">{item.phase}</div>
            <div className="text-gray-700">{item.date}</div>

            <div>
              <p className="font-semibold text-gray-800">{item.title}</p>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                DOES NOT COMPLY:
                <br />
                {item.description}
              </p>
            </div>

            {/* Recurring Button */}
            <div className="flex justify-center items-center">
              <button
                onClick={() => handleRecurring(item.id)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition"
              >
                <RotateCcw size={18} className="text-white" />
              </button>
            </div>

            {/* Close Button */}
            <div className="flex justify-center items-center">
              <button
                onClick={() => handleCloseRow(item.id)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 transition"
              >
                <Check size={18} className="text-white" />
              </button>
            </div>
          </div>
        );
      })}

      {/* Finish Popup */}
      {showPopup && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-gray-700 text-white rounded-xl w-96 p-6 text-center shadow-xl">
            <h3 className="font-semibold mb-3">Warning</h3>
            <p className="text-sm text-gray-200 leading-relaxed">
              All NCs must be marked completed before finishing the report.
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
                  // ✅ Force complete all tasks
                  setCompletedTasks(nonComplianceList.map((item) => item.id));
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
