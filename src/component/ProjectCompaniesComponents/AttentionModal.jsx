import React, { useEffect, useState } from "react";

export default function AttentionModal({ setShowAttentionModal, secondsLeft, formatTime }) {

   
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]">
            <div className="bg-[#5a5a5b] rounded-xl w-[300px] overflow-hidden shadow-2xl">
                
                <div className="p-6 text-center">
                    <h3 className="text-white font-bold text-[15px] mb-3 uppercase">
                        Attention
                    </h3>

                    <p className="text-white/90 text-sm font-medium mb-2">
                        You have 24 hours to finalize the report
                    </p>

                    <p className="text-red-400 text-xl font-bold tracking-wider">
                        {formatTime(secondsLeft)}
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
