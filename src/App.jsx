import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import ListofProject from "./component/ListofProject";
import ProjectReports from "./component/ProjectReports";
import TechnicalProjectReport from "./component/TechnicalProjectReport";
import ProjectCompanies from "./component/ProjectCompanies";
import SynchronisationPage from "./component/ProductSync.jsx";
import MachineryPage from "./component/MachineryPage.jsx";
import WorkersPage from "./component/WorkersPage.jsx";
import AncilaryMeasurePage from "./component/AncilaryMeasurePage.jsx";
import ChemicalProducts from "./component/ChemicalProducts.jsx";
import NonConformitiesPage from "./component/NonConformitiesPage.jsx";
import CreateNonConformity from "./component/CreateNonConformity.jsx";
import PendingNonCompliance from "./component/PendingNonCompliance.jsx";
import CloseNonComplianceReport from "./component/CloseNonComplianceReport.jsx";
import AuditChecklist from "./component/AuditChecklist.jsx";
import WorkPage from "./component/WorkPage.jsx";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ListofProject" element={<ListofProject />} />
          <Route path="/projectReports" element={<ProjectReports />} />
          <Route path="/createReport" element={<TechnicalProjectReport />} />
          <Route path="/projecCompanies/*" element={<ProjectCompanies />} />
          <Route path="/pendingNonCompliance" element={<PendingNonCompliance />} />
          <Route path="/close-nc/:id" element={<CloseNonComplianceReport />} />

          {/* 🔥 Audit Routes */}
          <Route path="/audit-checklist" element={<AuditChecklist />} />
          <Route path="/work/:sectionId/:questionId/:status" element={<WorkPage />} />
          <Route path="/ProductSync" element={<SynchronisationPage />} />
          <Route path="/machine" element={<MachineryPage />} />
          <Route path="/workers" element={<WorkersPage />} />
          <Route path="/ancillary" element={<AncilaryMeasurePage />} />
          <Route path="/chemicalProducts" element={<ChemicalProducts />} />
          <Route path="/nonConformities" element={<NonConformitiesPage />} />
          <Route path="/createNonConformity" element={<CreateNonConformity />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
