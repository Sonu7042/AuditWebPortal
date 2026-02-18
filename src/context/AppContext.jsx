import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 🔹 WORK PAGE FORM DATA
  const [formData, setFormData] = useState({
    subcontractedCompany: "",
    machinery: "",
    description: "",
    correctiveMeasure: "",
    descriptionImage: null,
    correctiveImage: null,
  });

  const [savedMachinery, setSavedMachinery] = useState([]);

  const [visitedSections, setVisitedSections] = useState([]);


  // 🔹 AUDIT SECTIONS DATA
  const [auditSections, setAuditSections] = useState([
    {
      id: 1,
      title: "GENERAL PROJECT STATUS",
      questions: [
        {
          id: 1,
          question:
            "Is project scope clearly defined as per ISO 9001 requirements?",
          status: "na",
          isSynced: false,
          images: [],
          description: "",
        },
        {
          id: 2,
          question:
            "Are risk assessments conducted before starting site activities?",
          status: "na",
          isSynced: false,
          images: [],
          description: "",
        },
        {
          id: 3,
          question:
            "Is documented information properly controlled and updated?",
          status: "na",
          isSynced: false,
          images: [],
          description: "",
        },
        {
          id: 4,
          question: "Are internal audits conducted periodically?",
          status: "na",
          isSynced: false,
          images: [],
          description: "",
        },
        {
          id: 5,
          question: "Is management review performed as per ISO standards?",
          status: "na",
          isSynced: false,
          images: [],
          description: "",
        },
      ],
    },

    {
      id: 2,
      title: "STRUCTURES",
      questions: [
        {
          id: 1,
          question: "Are structural drawings approved before execution?",
          status: "na",
          isSynced: false,
          images: [],
          description: "",
        },
        {
          id: 2,
          question: "Is reinforcement work inspected before concreting?",
          status: "na",
          isSynced: false,
          images: [],
          description: "",
        },
        {
          id: 3,
          question: "Are materials tested as per quality standards?",
          status: "na",
          isSynced: false,
          images: [],
          description: "",
        },
        {
          id: 4,
          question: "Is curing process followed as per procedure?",
          status: "na",
          isSynced: false,
          images: [],
          description: "",
        },
      ],
    },

    {
      id: 3,
      title: "LABOUR, BUILDING AND WORKS CLEANING",
      questions: [
        {
          id: 1,
          question: "Are workers provided with proper PPE?",
          status: "na",
          isSynced: false,
          images: [],
          description: "",
        },
        {
          id: 2,
          question: "Is housekeeping maintained at the construction site?",
          status: "na",
          isSynced: false,
          images: [],
          description: "",
        },
      ],
    },

    {
      id: 4,
      title: "INSTALLATIONS AND PLASTERBOARDING",
      questions: [
        {
          id: 1,
          question: "Are electrical installations tested before handover?",
          status: "na",
          isSynced: false,
          images: [],
          description: "",
        },
      ],
    },

    {
      id: 5,
      title: "WOODWORK (FURNITURE)/ METALWORK",
      questions: [
        {
          id: 1,
          question: "Are welding procedures approved and documented?",
          status: "na",
          isSynced: false,
          images: [],
          description: "",
        },
      ],
    },

    {
      id: 6,
      title: "PAINTING AND FINISHES",
      questions: [
        {
          id: 1,
          question: "Is surface preparation done before painting?",
          status: "na",
          isSynced: false,
          images: [],
          description: "",
        },
      ],
    },
  ]);

  // 🔥 SAVE (Editable)
  const updateQuestionStatus = (sectionId, questionId, status, data) => {
    setAuditSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map((q) =>
                q.id === questionId
                  ? {
                      ...q,
                      status,
                      images: [data.descriptionImage, data.correctiveImage],
                      description: data.description,
                    }
                  : q,
              ),
            }
          : section,
      ),
    );
  };

  // 🔥 SYNCHRONISE (Lock)
  // 🔒 SYNCHRONISE (LOCK QUESTION)
  const synchroniseQuestion = (sectionId, questionId) => {
    setAuditSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map((q) =>
                q.id === questionId ? { ...q, isSynced: true } : q,
              ),
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
        formData,
        setFormData,
        savedMachinery,
        setSavedMachinery,
        auditSections,
        updateQuestionStatus,
        synchroniseQuestion,
        visitedSections,
        setVisitedSections,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};