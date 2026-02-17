import React from "react";
import {
  ArrowLeft,
  Home,
  HelpCircle,
  Globe,
  Info,
} from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function NonConformitiesPage() {

  const { savedMachinery } = useContext(AppContext);
  
  return (
    <div className="min-h-screen bg-[#f5f6f7] flex flex-col">

      {/* Top Header */}
      <div className="bg-white border-b">

        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <ArrowLeft className="text-gray-600 cursor-pointer" size={20} />
            <h1 className="text-sm font-medium text-gray-700">
              See Non-conformities
            </h1>
          </div>

          <button className="border border-blue-500 text-blue-600 px-4 py-1.5 rounded-md text-sm hover:bg-blue-50 transition">
            Create Non-conformity
          </button>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 py-4 border-t text-sm text-gray-600">

          <div>
            <p className="text-gray-400">Visit</p>
            <p>11-02-2026</p>
          </div>

          <div>
            <p className="text-gray-400">Promoter</p>
            <p>INDITEX TRENT RETAIL INDIA PRIVATE, LTD.</p>
          </div>

          <div>
            <p className="text-gray-400">Project</p>
            <p className="font-medium text-gray-800">Bershka</p>
            <p className="text-xs text-gray-500">
              BANGALORE - SANJEEVINI NAGAR - YES - BERSHKA - MALL OF ASIA - INITIAL PROJECT
            </p>
          </div>

          <div className="flex items-start gap-2">
            <Globe size={18} className="mt-5 text-gray-500" />
            <div>
              <p className="text-gray-400">Project market</p>
              <p>INDIA</p>
            </div>
          </div>
        </div>
      </div>

      {/* List Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Info size={16} />
          <span>List of Non-conformities</span>
        </div>

        <div className="flex items-center gap-4 text-gray-500">
          <Home size={18} className="cursor-pointer" />
          <HelpCircle size={18} className="cursor-pointer" />
        </div>
      </div>

      {/* Table Header */}
      <div className="bg-white border-b px-6 py-3 text-sm text-gray-600 hidden md:grid grid-cols-7">
        <div>ID</div>
        <div>Machinery</div>
        <div>D. of incident</div>
        <div>D. of closure</div>
        <div>Synchronisation</div>
        <div>Recurring</div>
        <div>Delete</div>
      </div>

      {/* 🔥 DATA OR EMPTY STATE */}
      {savedMachinery.length > 0 ? (

        savedMachinery.map((item, index) => (
          <div
            key={index}
            className="bg-white border-b px-6 py-4 text-sm hidden md:grid grid-cols-7 items-center"
          >
            {/* ID */}
            <div>{index + 1}</div>

            {/* Machinery */}
            <div className="font-medium text-gray-800">
              {item.machinery}
            </div>

            {/* Date of Incident */}
            <div>
              {new Date().toLocaleDateString()}
            </div>

            {/* Date of Closure */}
            <div className="text-gray-400">
              -
            </div>

            {/* Synchronisation */}
            <div className="text-orange-500 font-medium">
              Pending
            </div>

            {/* Recurring */}
            <div className="text-gray-400">
              No
            </div>

            {/* Delete */}
            <div className="text-red-500 cursor-pointer">
              Delete
            </div>
          </div>
        ))

      ) : (

        /* 🔹 ORIGINAL EMPTY STATE (UNCHANGED) */
        <div className="flex-1 flex flex-col items-center justify-center text-center bg-white">

          <div className="w-14 h-14 rounded-full border border-gray-400 flex items-center justify-center mb-4">
            <Info size={24} className="text-gray-500" />
          </div>

          <h2 className="text-gray-600 text-sm font-semibold tracking-wide">
            THERE ARE NO NON-CONFORMITIES FOR THIS REPORT
          </h2>

          <p className="text-gray-400 text-xs mt-2">
            The user has not opened any Non-conformities associated with this section
          </p>

        </div>

      )}

    </div>
  );
}
