import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeftIcon, InformationCircleIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { ChevronLeft, Info, HelpCircle, RefreshCw, AlertTriangle, CheckCircle, X } from "lucide-react";

export default function SynchronisationPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
            <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100 rounded-full border-2 border-gray-300 transition-colors" >
              <ChevronLeft size={24} />
            </button>
          <h1 className="text-lg font-medium text-gray-800">
            Synchronisation of reports
          </h1>
        </div>
        <QuestionMarkCircleIcon className="w-6 h-6 text-gray-400 cursor-pointer" />
      </div>

      {/* Sub Header */}
      <div className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-sm text-gray-600 border-b border-gray-200">
        <InformationCircleIcon className="w-5 h-5 text-gray-500" />
        <span>List of completed reports pending synchronisation</span>
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center">
              <InformationCircleIcon className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <h2 className="text-lg font-medium text-gray-700">
            There are no project reports to synchronise
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            The user does not have any closed project reports to synchronise.
          </p>
        </div>
      </div>
    </div>
  );
}
