import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import samplePDF from "../assets/pdf/sample.pdf";
import backgroundImage from "../assets/images/login-background.avif";
import logo from "../assets/Bexex-logo.png";

export default function Login() {
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [pinLogin, setPinLogin] = useState(false);
  const [setupPin, setSetupPin] = useState(false);
  const [pin, setPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const navigate = useNavigate();

  // ✅ CHECK SESSION + PIN
  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    const savedPin = localStorage.getItem("user_pin");

    if (isAuth && savedPin) {
      setPinLogin(true);
    } else {
      setPinLogin(false);
    }
  }, []);

  const triggerShake = () => {
    setShake(true);
    if (navigator.vibrate) navigator.vibrate(200); // Haptic feedback
    setTimeout(() => setShake(false), 500);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ PIN LOGIN
    if (pinLogin) {
      const savedPin = localStorage.getItem("user_pin");

      if (pin === savedPin) {
        navigate("/dashboard", { replace: true });
      } else {
        triggerShake();
        setErrorModal(true);
        setPin("");
      }
      return;
    }

    // ✅ SETUP PIN
    if (setupPin) {
      if (newPin !== confirmPin) {
        triggerShake();
        alert("PINs do not match");
        return;
      }
      if (newPin.length < 4) {
        triggerShake();
        alert("PIN must be at least 4 digits");
        return;
      }

      setLoading(true);
      setTimeout(() => {
        localStorage.setItem("user_pin", newPin);
        localStorage.setItem("isAuthenticated", "true");
        setLoading(false);
        navigate("/dashboard", { replace: true });
      }, 1500);
      return;
    }

    // ✅ NORMAL LOGIN
    if (!checked || loading) return;

    if (username !== "Auditor01" || password !== "123456789") {
      triggerShake();
      setErrorModal(true);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const savedPin = localStorage.getItem("user_pin");
      if (!savedPin) {
        setSetupPin(true);
      } else {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard", { replace: true });
      }
    }, 2000);
  };

  const openPDF = () => {
    window.open(samplePDF, "_blank");
  };

  const handleErrorClose = () => {
    setErrorModal(false);
    setUsername("");
    setPassword("");
    setPin("");
    setNewPin("");
    setConfirmPin("");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={backgroundImage}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Login Card */}
      <div className={`bg-white/95 p-10 w-150 rounded-md relative z-10 ${shake ? "animate-shake" : ""}`}>

        <img src={logo} alt="Logo" className="w-1/4 mx-auto mb-6" />

        <form onSubmit={handleLogin} className="space-y-5">

          {/* ✅ RENDER LOGIC */}
          {pinLogin ? (
            <input
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) setPin(val);
              }}
              className="w-full border-b border-gray-400 outline-none py-2 bg-transparent text-center tracking-[0.5em] text-2xl font-bold placeholder:tracking-normal placeholder:text-base placeholder:font-normal"
              required
            />
          ) : setupPin ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-6">
                Set Security PIN
              </h2>

              <input
                type="password"
                placeholder="Enter PIN"
                value={newPin}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) setNewPin(val);
                }}
                className="w-full border-b border-gray-400 outline-none py-2 mb-6 text-center tracking-widest font-bold text-xl"
                required
              />

              <input
                type="password"
                placeholder="Re-enter PIN"
                value={confirmPin}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) setConfirmPin(val);
                }}
                className="w-full border-b border-gray-400 outline-none py-2 mb-6 text-center tracking-widest font-bold text-xl"
                required
              />
            </div>
          ) : (
            <>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-b border-gray-400 outline-none py-2 bg-transparent"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-400 outline-none py-2 bg-transparent"
                required
              />

              <div className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  className="cursor-pointer"
                />
                <span
                  onClick={openPDF}
                  className="cursor-pointer text-blue-600 hover:underline"
                >
                  I have read and accept the conditions
                </span>
              </div>

              <div className="text-[1rem] text-gray-600 mt-2 leading-relaxed">
                The information accessed by this means is confidential and, in the case that it contains personal data, it will be subject to the security and secrecy requirements established in the personal data protection legislation currently in force.
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={!pinLogin && !setupPin && (!checked || loading)}
            className={`w-full py-3 rounded-md transition duration-300 flex items-center justify-center
              ${pinLogin || setupPin || (checked && !loading)
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-red-300 text-white cursor-not-allowed"
              }`}
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              pinLogin ? "Unlock" : setupPin ? "Set PIN" : "Log In"
            )}
          </button>
        </form>
      </div>

      {/* Bottom Left */}
      <div
        onClick={() => setShowModal(true)}
        className="absolute bottom-6 left-6 text-sm text-white font-semibold cursor-pointer hover:underline z-10"
      >
        Contact support
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-6 right-6 text-sm font-semibold text-white z-10">
        V1.0.27.064
      </div>

      {/* Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-125 rounded shadow-xl overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3 bg-gray-100">
              <button
                onClick={() => setShowModal(false)}
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
                onClick={openPDF}
                className="p-4 cursor-pointer hover:bg-gray-100"
              >
                Mail
              </div>

              <div
                onClick={openPDF}
                className="p-4 cursor-pointer hover:bg-gray-100"
              >
                MS Outlook
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {errorModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-black/60 pt-6 rounded shadow-xl text-center w-87.5">
            <h2 className="text-2xl text-white font-semibold mb-2">
              Attention
            </h2>
            <h2 className="text-sm font-light text-white mb-8">
              Wrong username, password or PIN
            </h2>
            <button
              onClick={handleErrorClose}
              className="bg-red-500 w-full text-white px-6 py-2 rounded hover:bg-red-600"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      ` }} />
    </div>
  );
}
