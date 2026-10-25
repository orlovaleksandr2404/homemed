import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { MedicationProvider } from './MedicationContext';
import { AppLayout } from '../shared/ui/AppLayout';
import { ProtectedRoute } from '../shared/ui/ProtectedRoute';
import { MedicationsPage } from '../pages/MedicationsPage';
import { ShelterDonationsPage } from '../pages/ShelterDonationsPage';
import { AddMedicationPage } from '../pages/AddMedicationPage';
import { SheltersDirectoryPage } from '../pages/SheltersDirectoryPage';
import { AuthPage } from '../pages/AuthPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <MedicationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />

            <Route path="/" element={<AppLayout />}>
              {/* Приватные маршруты */}
              <Route
                index
                element={
                  <ProtectedRoute>
                    <MedicationsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="shelter-list"
                element={
                  <ProtectedRoute>
                    <ShelterDonationsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="add"
                element={
                  <ProtectedRoute>
                    <AddMedicationPage />
                  </ProtectedRoute>
                }
              />

              {/* Публичный маршрут */}
              <Route path="shelters" element={<SheltersDirectoryPage />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MedicationProvider>
    </AuthProvider>
  );
};

export default App;
