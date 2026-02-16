import React from "react";

export default function AttentionModal({ formatTime, secondsLeft, setShowAttentionModal }) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60] animate-in fade-in duration-200">
            <div className="bg-[#5a5a5b] rounded-xl w-[280px] overflow-hidden shadow-2xl scale-in">
                <div className="p-6 text-center">
                    <h3 className="text-white font-bold text-[15px] mb-2 uppercase">Attention</h3>
                    <p className="text-white/90 text-xs font-medium leading-relaxed">
                        You have {formatTime(secondsLeft)} to finalize the report.
                    </p>
                </div>
                <button
                    onClick={() => setShowAttentionModal(false)}
                    className="w-full py-3.5 border-t border-white/10 text-sky-400 font-bold text-sm hover:bg-white/5 transition-colors uppercase"
                >
                    Accept
                </button>
            </div>
        </div>
    );
}
