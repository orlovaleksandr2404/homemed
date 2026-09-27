import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { MedicationsPage } from './pages/MedicationsPage';
import { ShelterDonationsPage } from './pages/ShelterDonationsPage';
import { AddMedicationPage } from './pages/AddMedicationPage';
import { SheltersDirectoryPage } from './pages/SheltersDirectoryPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<MedicationsPage />} />
          <Route path="shelter-list" element={<ShelterDonationsPage />} />
          <Route path="add" element={<AddMedicationPage />} />
          <Route path="shelters" element={<SheltersDirectoryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
