import React from "react";
import { useNavigate } from "react-router-dom";

export default function CopyModal({ setSubmitted, setShowAttentionModal, setShowModal }) {
    const navigate = useNavigate();
    const handleAction = () => {
        if (setSubmitted) setSubmitted(true);
        navigate("/projecCompanies/summary", { replace: true });
        setShowAttentionModal(true);
        setShowModal(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-300">
            <div className="bg-[#5a5a5b] rounded-xl w-[320px] overflow-hidden shadow-2xl scale-in group">
                <div className="p-8 pb-6">
                    <p className="text-center text-white text-[13px] font-medium leading-relaxed">
                        Do you want to copy the workers and resources marked as present
                        in the previous report?
                    </p>
                </div>

                <div className="flex border-t border-white/10">
                    <button
                        onClick={handleAction}
                        className="w-1/2 py-4 text-sky-400 font-bold hover:bg-white/5 transition-colors border-r border-white/10 text-sm uppercase"
                    >
                        Yes
                    </button>

                    <button
                        onClick={handleAction}
                        className="w-1/2 py-4 text-sky-400 font-bold hover:bg-white/5 transition-colors text-sm uppercase"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
