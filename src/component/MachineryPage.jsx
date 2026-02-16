import React, { useState, useContext } from "react";
import { Check, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function MachineryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { savedMachinery } = useContext(AppContext);

  const machineryList = [
    "Electronic Texture Sprayer RTX-2500PC Graco",
    "Hand Cutter Machine GSC-140 Bosch",
    "Hand Drill Machine GSB-10RE Bosch",
    "Hand Drill Machine GSB-600 Bosch",
    "Hand Drill Machine GSB-450 Bosch",
    "Hand Drill Machine GSB-13RE Bosch",
    "Hand Grinder Machine GWS 6-125 Bosch",
    "Hand Grinder Machine GWS 11-125 Bosch",
    "Hand Grinder Machine GWS 14-125 Bosch",
    "Hand Hammer Machine GBH 2-20 Bosch",
    "Hand Hammer Machine GBH 2-26DRE Bosch",
    "Hand Hammer Machine GBH 2-20 Bosch",
    "Hand Hammer Machine GBH 2-24D Bosch",
    "Hand Wood Cutter Machine KBAS KABOO",
    "Pipe Cutter Machine DW871 Dewalt",
  ];

// Combine default list + saved list
const combinedList = [
  ...machineryList,
  ...savedMachinery.map((item) => item.machinery),
];

const filteredList = combinedList.filter((item) =>
  item.toLowerCase().includes(search.toLowerCase())
);


  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          <div>
            <h1 className="text-xl font-semibold text-gray-700">
              MACHINERY
            </h1>
            <p className="text-sm text-gray-500">
              Total: {filteredList.length} (20 present in project and 0 Non-conformities)
            </p>
          </div>

          {/* Search + Home */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Insert text to filter"
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Home Icon */}
            <button
              onClick={() => navigate("/")}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              <Home size={20} className="text-gray-600" />
            </button>

          </div>
        </div>
      </div>

      {/* Project Title */}
      <div className="mb-4">
        <h2 className="text-sm md:text-base font-medium text-gray-700">
          INDERJEET BROS PROJECTS PVT. LTD.: (IN) - Total: {filteredList.length}
          (15 present in project and 0 Non-conformities)
        </h2>
      </div>

      {/* Machinery Grid */}
      <div className="grid gap-6 
                      grid-cols-1 
                      sm:grid-cols-2 
                      md:grid-cols-3 
                      lg:grid-cols-4">

        {filteredList.length > 0 ? (
          filteredList.map((item, index) => (
            <div
              key={index}
              className="bg-green-50 border border-green-200 rounded-xl p-6 relative shadow-sm hover:shadow-lg transition duration-300 min-h-[160px] flex flex-col justify-between"
            >
              {/* Check Icon */}
              <div className="absolute top-4 right-4 text-green-600">
                <Check size={22} />
              </div>

              <h3 className="text-sm font-semibold text-gray-700 leading-tight">
                {item}
              </h3>

              <p className="text-sm font-semibold text-green-600 mt-4">
                VALID
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-10">
            No machinery found
          </div>
        )}
      </div>

      {/* Bottom Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
        <Link to={"/createNonConformity"} className="border border-blue-500 text-blue-500 px-5 py-2 rounded-md hover:bg-blue-50 transition">
          Create Non-conformity
        </Link>

        <Link to={"/nonConformities"} className="border border-gray-400 text-gray-600 px-5 py-2 rounded-md hover:bg-gray-100 transition">
          See Non-conformities
        </Link>
      </div>
    </div>
  );
}
