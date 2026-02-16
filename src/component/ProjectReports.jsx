import React, { useState } from "react";
import { Trash2, Info, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProjectReports() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([
    {
      id: 23,
      brand: "Bershka",
      location:
        "BANGALORE - SANJEEVINI NAGAR - YES - BERSHKA - MALL OF ASIA - INITIAL PROJECT 0",
      visitDate: "06-02-2026",
      closedDate: "06-02-2026",
      syncDate: "06-02-2026",
      status: "Closed",
      nonConformities: 11,
    },
    {
      id: 22,
      brand: "Bershka",
      location:
        "BANGALORE - SANJEEVINI NAGAR - YES - BERSHKA - MALL OF ASIA - INITIAL PROJECT 0",
      visitDate: "03-02-2026",
      closedDate: "03-02-2026",
      syncDate: "03-02-2026",
      status: "Closed",
      nonConformities: 9,
    },
    {
      id: 21,
      brand: "Bershka",
      location:
        "BANGALORE - SANJEEVINI NAGAR - YES - BERSHKA - MALL OF ASIA - INITIAL PROJECT 0",
      visitDate: "31-01-2026",
      closedDate: "31-01-2026",
      syncDate: "31-01-2026",
      status: "Closed",
      nonConformities: 10,
    },
  ]);

  // ✅ SAME DELETE LOGIC
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (confirmDelete) {
      setReports((prevReports) =>
        prevReports.filter((report) => report.id !== id)
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= HEADER ================= */}
      <div className="bg-white border-b border-gray-300 px-6 py-4 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-4">
          <ArrowLeft
            className="cursor-pointer text-gray-600"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-lg font-semibold text-gray-800">
            List of Project Reports
          </h1>
        </div>

        {/* Right Info */}
        <Info className="text-gray-500" size={20} />
      </div>

      {/* ================= REPORT LIST ================= */}
      <div className="p-6 space-y-6">

        {reports.length === 0 ? (
          <p className="text-center text-gray-500">
            No reports available.
          </p>
        ) : (
          reports.map((report) => (
            <div
              key={report.id}
              className="flex bg-white border border-gray-300 rounded-2xl shadow-sm overflow-hidden"
            >

              {/* LEFT ID PANEL */}
              <div className="w-40 border-r border-gray-300 flex flex-col items-center justify-center p-6 bg-gray-50">
                <div className="w-14 h-14 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-semibold">
                  Nº {report.id}
                </div>
              </div>

              {/* CENTER CONTENT */}
              <div className="flex-1 p-6">

                <div className="flex justify-between items-start">

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {report.brand}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {report.location}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(report.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={20} />
                  </button>

                </div>

                {/* DETAILS GRID */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-6 text-sm">

                  <div>
                    <p className="text-gray-400">Visit date</p>
                    <p className="font-medium text-gray-800">
                      {report.visitDate}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Date closed</p>
                    <p className="font-medium text-gray-800">
                      {report.closedDate}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Synchronisation</p>
                    <p className="font-medium text-gray-800">
                      {report.syncDate}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Status</p>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      {report.status}
                    </span>
                  </div>

                  <div>
                    <p className="text-gray-400">Non-conformities</p>
                    <p className="font-semibold text-gray-800">
                      {report.nonConformities}
                    </p>
                  </div>

                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
