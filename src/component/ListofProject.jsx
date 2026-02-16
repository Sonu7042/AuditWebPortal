import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  Info,
  HelpCircle,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const defaultProjects = [
  {
    id: 1,
    name: "Bershka",
    details:
      "BANGALORE - SANJEEVINI NAGAR - YES - BERSHKA - MALL OF ASIA - INITIAL PROJECT 0",
    market: "INDIA",
    promoter: "INDITEX TRENT RETAIL INDIA PRIVATE, LTD.",
    lastDownload: "11-02-2026 20:12:56",
    isUpdated: false,
  },
  {
    id: 2,
    name: "Zara",
    details:
      "MUMBAI - PHOENIX MARKETCITY - YES - ZARA - GROUND FLOOR - INITIAL PROJECT 1",
    market: "INDIA",
    promoter: "INDITEX TRENT RETAIL INDIA PRIVATE, LTD.",
    lastDownload: "12-02-2026 10:15:30",
    isUpdated: false,
  },
];

const ListofProject = () => {
  const navigate = useNavigate();

  // ✅ Load from localStorage first
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("projects");
    return savedProjects ? JSON.parse(savedProjects) : defaultProjects;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingProjectId, setUpdatingProjectId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // ✅ Save projects + update count to localStorage
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));

    const pendingCount = projects.filter(
      (project) => !project.isUpdated
    ).length;

    localStorage.setItem("pendingUpdates", pendingCount);
  }, [projects]);

  const handleUpdate = (id) => {
    setUpdatingProjectId(id);
    setIsModalOpen(true);
    setProgress(0);
  };

  const handleHelpClick = () => {
    setShowModal(true);
  };

  const handleOverlayClick = () => {
    setShowModal(false);
  };

  // ✅ Update animation logic (same as your original)
  useEffect(() => {
    if (isModalOpen) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setProjects((prevProjects) =>
                prevProjects.map((project) =>
                  project.id === updatingProjectId
                    ? { ...project, isUpdated: true }
                    : project
                )
              );
              setIsModalOpen(false);
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isModalOpen, updatingProjectId]);

  const currentProject = projects.find(
    (project) => project.id === updatingProjectId
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* ================= HEADER ================= */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <ChevronLeft size={22} />
            </button>
            <h1 className="text-lg font-semibold">List of Projects</h1>
          </div>
        </div>

        {/* Info Bar */}
        <div className="px-4 h-12 flex items-center justify-between border-t text-sm text-gray-500 bg-gray-50">
          <div className="flex items-center gap-2">
            <Info size={16} />
            <span>List of projects</span>
          </div>

          <HelpCircle
            size={20}
            className="text-blue-500 cursor-pointer hover:scale-110 transition"
            onClick={handleHelpClick}
          />
        </div>

        {/* Help Modal */}
        {showModal && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
            onClick={handleOverlayClick}
          >
            <div
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                onClick={() => setShowModal(false)}
              >
                <X size={18} />
              </button>
              <h2 className="text-lg font-semibold mb-2">
                Help Information
              </h2>
              <p className="text-sm text-gray-600">
                This section shows the list of available projects.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ================= PROJECT LIST ================= */}
      <div className="px-4 py-6 space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition flex flex-col md:flex-row overflow-hidden"
          >
            {/* Status */}
            <div className="md:w-40 w-full flex md:flex-col items-center justify-between md:justify-center gap-3 p-4 bg-gray-50 border-b md:border-b-0 md:border-r">
              {project.isUpdated ? (
                <div className="bg-green-100 p-3 rounded-xl">
                  <CheckCircle
                    className="text-green-600"
                    size={28}
                  />
                </div>
              ) : (
                <div className="bg-red-100 p-3 rounded-xl">
                  <AlertTriangle
                    className="text-red-500"
                    size={28}
                  />
                </div>
              )}

              <div className="text-[11px] text-gray-500 text-center">
                <div className="font-semibold">
                  Last download
                </div>
                <div>{project.lastDownload}</div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-base font-semibold mb-1">
                  {project.name}
                </h3>

                <p className="text-xs text-gray-400 mb-2 truncate">
                  {project.details}
                </p>

                <div className="flex flex-wrap gap-6 text-xs text-gray-500">
                  <div>
                    <span className="font-semibold">
                      Market:
                    </span>{" "}
                    {project.market}
                  </div>
                  <div>
                    <span className="font-semibold">
                      Promoter:
                    </span>{" "}
                    {project.promoter}
                  </div>
                </div>
              </div>

              {/* Update Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => handleUpdate(project.id)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className="p-3 border rounded-xl group-hover:bg-blue-50 transition">
                    <RefreshCw
                      size={20}
                      className={`${
                        isModalOpen &&
                        updatingProjectId === project.id
                          ? "animate-spin text-blue-500"
                          : "text-gray-400 group-hover:text-blue-500"
                      }`}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-gray-400 group-hover:text-blue-500">
                    Update
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DOWNLOAD MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b bg-gray-50 text-center font-semibold text-blue-600">
              Download Projects
            </div>

            <div className="p-8 flex flex-col items-center gap-6">
              <RefreshCw
                className="text-blue-500 animate-spin"
                size={40}
              />

              <div className="w-full text-center">
                <div className="text-xs text-gray-500 uppercase mb-4 truncate">
                  Logging in {currentProject?.details}
                </div>

                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${progress}%` }}
                    className="bg-blue-500 h-2 transition-all duration-300"
                  />
                </div>

                <div className="text-xs text-gray-400 mt-2 font-medium">
                  {progress}% Complete
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListofProject;
