import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [auditSections, setAuditSections] = useState([
  {
    id: 1,
    title: "GENERAL PROJECT STATUS",
    subSections: [
      {
        id: 1,
        title: "01. RISKS RELATED TO PROJECT IMPLEMENTATION",
        questions: [
          {
            id: 1,
            question: "Is project scope clearly defined?",
            status: "na",
            isSynced: false,
            images: [],
            description: "",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "STRUCTURES",
    subSections: [
      {
        id: 1,
        title: "01. STRUCTURAL EXECUTION",
        questions: [
          {
            id: 1,
            question: "Are structural drawings approved?",
            status: "na",
            isSynced: false,
            images: [],
            description: "",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "LABOUR, BUILDING AND WORKS CLEANING",
    subSections: [
      {
        id: 1,
        title: "01. SAFETY & HOUSEKEEPING",
        questions: [
          {
            id: 1,
            question: "Are workers provided PPE?",
            status: "na",
            isSynced: false,
            images: [],
            description: "",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "INSTALLATIONS AND PLASTERBOARDING",
    subSections: [
      {
        id: 1,
        title: "01. ELECTRICAL INSTALLATION",
        questions: [
          {
            id: 1,
            question: "Are electrical systems tested?",
            status: "na",
            isSynced: false,
            images: [],
            description: "",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "WOODWORK / METALWORK",
    subSections: [
      {
        id: 1,
        title: "01. FABRICATION",
        questions: [
          {
            id: 1,
            question: "Are welding procedures approved?",
            status: "na",
            isSynced: false,
            images: [],
            description: "",
          },
        ],
      },
      {
        id: 2,
        title: "02. FABRICATION wood work",
        questions: [
          {
            id: 1,
            question: "Are woodwork fabrication procedures approved?",
            status: "na",
            isSynced: false,
            images: [],
            description: "",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "PAINTING AND FINISHES",
    subSections: [
      {
        id: 1,
        title: "01. SURFACE PREPARATION",
        questions: [
          {
            id: 1,
            question: "Is surface preparation done?",
            status: "na",
            isSynced: false,
            images: [],
            description: "",
          },
        ],
      },
    ],
  },
]);


  // 🔥 LOAD FROM LOCAL STORAGE (SAFE)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("reportData")) || {};
    if (saved.auditSections) {
      setAuditSections(saved.auditSections);
    }
  }, []);

  // 🔥 AUTO SAVE INTO reportData (SAFE MERGE)
  useEffect(() => {
    const existing =
      JSON.parse(localStorage.getItem("reportData")) || {};

    const updated = {
      ...existing,
      auditSections,
    };

    localStorage.setItem("reportData", JSON.stringify(updated));
  }, [auditSections]);

  // 🔥 UPDATE QUESTION STATUS
  const updateQuestionStatus = (sectionId, questionId, status, data) => {
    setAuditSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              subSections: section.subSections.map((sub) => ({
                ...sub,
                questions: sub.questions.map((q) =>
                  q.id === questionId
                    ? {
                        ...q,
                        status,
                        images: [
                          data.descriptionImage,
                          data.correctiveImage,
                        ],
                        description: data.description,
                      }
                    : q
                ),
              })),
            }
          : section
      )
    );
  };

  // 🔥 SYNCHRONISE
  const synchroniseQuestion = (sectionId, questionId) => {
    setAuditSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              subSections: section.subSections.map((sub) => ({
                ...sub,
                questions: sub.questions.map((q) =>
                  q.id === questionId
                    ? { ...q, isSynced: true }
                    : q
                ),
              })),
            }
          : section
      )
    );
  };

  // 🔥 ADD NEW QUESTION
  const addNewQuestion = (sectionId, subId, questionText) => {
    if (!questionText.trim()) {
      alert("Please enter a question");
      return;
    }

    setAuditSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              subSections: section.subSections.map((sub) =>
                sub.id === subId
                  ? {
                      ...sub,
                      questions: [
                        ...sub.questions,
                        {
                          id:
                            sub.questions.length > 0
                              ? Math.max(...sub.questions.map(q => q.id)) + 1
                              : 1,
                          question: questionText,
                          status: "na",
                          isSynced: false,
                          images: [],
                          description: "",
                        },
                      ],
                    }
                  : sub
              ),
            }
          : section
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        auditSections,
        updateQuestionStatus,
        synchroniseQuestion,
        addNewQuestion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
