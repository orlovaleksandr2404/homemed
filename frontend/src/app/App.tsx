import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MedicationProvider } from './MedicationContext';
import { AppLayout } from '../shared/ui/AppLayout';
import { MedicationsPage } from '../pages/MedicationsPage';
import { ShelterDonationsPage } from '../pages/ShelterDonationsPage';
import { AddMedicationPage } from '../pages/AddMedicationPage';
import { SheltersDirectoryPage } from '../pages/SheltersDirectoryPage';

export const App: React.FC = () => {
  return (
    <MedicationProvider>
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
    </MedicationProvider>
  );
};

export default App;
