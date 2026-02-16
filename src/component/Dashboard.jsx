import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/Bexex-logo.png";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMailUnreadOutline } from "react-icons/io5";
import { BiLogOutCircle } from "react-icons/bi";

export default function Dashboard() {
  const navigate = useNavigate();

  const [showNotification, setShowNotification] = useState(false);
  const [showMainPopup, setShowMainPopup] = useState(false);
  const [showMailPopup, setShowMailPopup] = useState(false);

  // ✅ NEW PIN STATES
  const [showPinPopup, setShowPinPopup] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  // 🔔 NEW: Pending Update Count
  const [pendingUpdates, setPendingUpdates] = useState(0);

  // ✅ CHECK IF PIN EXISTS
  useEffect(() => {
    const savedPin = localStorage.getItem("user_pin");
    if (!savedPin) {
      setShowPinPopup(true);
    }
  }, []);

  // 🔔 CHECK PENDING UPDATES (from ListofProject)
  useEffect(() => {
    const updateCount = () => {
      const count = localStorage.getItem("pendingUpdates");
      setPendingUpdates(Number(count) || 0);
    };

    updateCount();

    window.addEventListener("focus", updateCount);

    return () => {
      window.removeEventListener("focus", updateCount);
    };
  }, []);

  // ✅ SAVE PIN FUNCTION
  const handleSavePin = () => {
    if (newPin.length < 4) {
      alert("PIN must be at least 4 digits");
      return;
    }
    if (newPin.length > 4) {
      alert("PIN must be no more than 4 digits");
      return;
    }

    if (newPin !== confirmPin) {
      alert("PIN does not match");
      return;
    }

    localStorage.setItem("user_pin", newPin);
    setShowPinPopup(false);
  };

  // ✅ FIX: Prevent Layout Shift
  useEffect(() => {
    const isAnyPopupOpen =
      showPinPopup || showNotification || showMainPopup || showMailPopup;

    if (isAnyPopupOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = scrollBarWidth + "px";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [showPinPopup, showNotification, showMainPopup, showMailPopup]);

  // ✅ LOGOUT (RESET PIN)
  const handleLogout = () => {
    localStorage.removeItem("user_pin");
    navigate("/");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center font-sans relative"
      style={{
        backgroundImage:
          "url('https://images.squarespace-cdn.com/content/v1/58586fa5ebbd1a60e7d76d3e/1496131726712-SIG568IE1NPN4EQG8QT5/image-asset.jpeg')",
      }}
    >
      {/* ================= HEADER ================= */}
      <div className="w-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-between px-6 py-3">

        <div className="flex items-center gap-4">
          <button>
            <BiLogOutCircle
              onClick={handleLogout}
              className="text-2xl text-gray-700 hover:text-gray-900 transition cursor-pointer"
            />
          </button>
          <span className="font-semibold text-gray-700">
            Auditor01
          </span>
        </div>

        <div>
          <img src={logo} alt="Logo" className="h-10 mx-auto" />
        </div>

        <div className="flex items-center gap-4">

          <button
            onClick={() => setShowNotification(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 hover:bg-gray-100 transition cursor-pointer"
          >
            <IoIosNotificationsOutline className="text-xl text-gray-700" />
          </button>

          <button
            onClick={() => setShowMainPopup(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 hover:bg-gray-100 transition cursor-pointer"
          >
            <IoMailUnreadOutline className="text-xl text-gray-700" />
          </button>

        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex items-center justify-center min-h-[85vh]">

        <div className="bg-white/70 backdrop-blur-md shadow-2xl rounded-xl p-10 w-125 text-center border border-white/20">

          <h1 className="text-3xl font-semibold tracking-widest text-gray-800">
            BEXEXGLOBAL
          </h1>
          <p className="text-xs text-gray-500 mt-2 uppercase tracking-tight">
            Report management V.1.0.27.0r64
          </p>

          <div className="mt-10 space-y-4">

            <button onClick={() => navigate("/createReport")} className="w-full py-4 bg-blue-900/90 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-800 transition duration-300 active:scale-95 cursor-pointer">
              NEW REPORT
            </button>

            <button onClick={() => navigate("/projectReports")} className="w-full py-4 bg-blue-900/90 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition duration-300 cursor-pointer">
              REPORTS
            </button>

            <button onClick={()=> navigate("/ProductSync")} className="w-full py-4 bg-blue-900/90 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-800 transition duration-300 active:scale-95 cursor-pointer">
              PENDING SYNCHRONISATION
            </button>

            {/* 🔔 UPDATE BUTTON WITH BADGE */}
            <div className="relative">
              {pendingUpdates > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {pendingUpdates}
                </div>
              )}

              <button
                onClick={() => navigate("/ListofProject")}
                className="w-full py-4 bg-blue-900/90 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-800 transition duration-300 active:scale-95 cursor-pointer"
              >
                UPDATE PROJECT DATA
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ================= PIN SET POPUP ================= */}
      {showPinPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-100 rounded shadow-2xl p-8 text-center">

            <h2 className="text-xl font-semibold mb-6">
              Set Security PIN
            </h2>

            <input
              type="password"
              placeholder="Enter PIN"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              className="w-full border-b border-gray-400 outline-none py-2 mb-6 text-center tracking-widest"
            />

            <input
              type="password"
              placeholder="Re-enter PIN"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              className="w-full border-b border-gray-400 outline-none py-2 mb-6 text-center tracking-widest"
            />

            <button
              onClick={handleSavePin}
              className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition w-full"
            >
              Save PIN
            </button>
          </div>
        </div>
      )}

      {/* ================= NOTIFICATION POPUP ================= */}
      {showNotification && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-150 rounded shadow-2xl p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Important Notification
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              The information accessed through this application is confidential.
              Any misuse, unauthorized distribution, or access without permission
              is strictly prohibited and may result in disciplinary and legal action.
              Please ensure that all project data is handled according to company
              policies and data protection regulations.
            </p>

            <div className="text-right">
              <button
                onClick={() => setShowNotification(false)}
                className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= MAIL OPTION POPUP ================= */}
      {showMainPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-125 rounded shadow-xl overflow-hidden">

            <div className="flex justify-between items-center px-4 py-3 bg-gray-100">
              <button
                onClick={() => setShowMainPopup(false)}
                className="text-gray-600 hover:text-black"
              >
                Cancel
              </button>

              <h2 className="font-semibold text-gray-700">
                Select an option
              </h2>

              <div></div>
            </div>

            <div className="divide-y">

              <div
                onClick={() => {
                  setShowMainPopup(false);
                  setShowMailPopup(true);
                }}
                className="p-4 cursor-pointer hover:bg-gray-100"
              >
                Mail
              </div>

              <div
                onClick={() => {
                  setShowMainPopup(false);
                  setShowMailPopup(true);
                }}
                className="p-4 cursor-pointer hover:bg-gray-100"
              >
                MS Outlook
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ================= MAIL POPUP ================= */}
      {showMailPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-112.5 rounded shadow-xl p-6 text-center">

            <h2 className="text-lg font-semibold mb-4">
              Contact Support
            </h2>

            <p className="text-gray-600 mb-6">
              support@example.com
            </p>

            <button
              onClick={() => setShowMailPopup(false)}
              className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
            >
              Close
            </button>

          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
        .font-sans { font-family: 'Outfit', sans-serif; }
      ` }} />
    </div>
  );
}
