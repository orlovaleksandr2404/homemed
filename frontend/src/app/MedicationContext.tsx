import React, { createContext, useContext, useState } from 'react';
import dayjs from 'dayjs';
import type { Medication, MedicationFormValues } from '../entities/medication/types';
import type { Shelter } from '../entities/shelter/types';
import type { Donation } from '../entities/donation/types';
import { mockMedications, mockShelters } from '../shared/mock/mockData';

export type DemoMode = 'normal' | 'loading' | 'error' | 'empty';

interface MedicationContextType {
  medications: Medication[];
  shelters: Shelter[];
  donations: Donation[];
  demoMode: DemoMode;
  setDemoMode: (mode: DemoMode) => void;
  addMedication: (values: MedicationFormValues) => void;
  donateMedication: (id: string) => void;
  toggleShelterFlag: (id: string) => void;
  deleteMedication: (id: string) => void;
}

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

export const MedicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [medications, setMedications] = useState<Medication[]>(mockMedications);
  const [shelters] = useState<Shelter[]>(mockShelters);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [demoMode, setDemoMode] = useState<DemoMode>('normal');

  const addMedication = (values: MedicationFormValues) => {
    const newMed: Medication = {
      ...values,
      id: String(Date.now()),
    };
    setMedications((prev) => [newMed, ...prev]);
  };

  const donateMedication = (id: string) => {
    const target = medications.find((item) => item.id === id);
    if (target) {
      const newDonation: Donation = {
        id: String(Date.now()),
        medicationId: target.id,
        shelterId: shelters[0]?.id ?? 's1',
        quantity: target.quantity,
        donationDate: dayjs().format('YYYY-MM-DD'),
        status: 'completed',
      };
      setDonations((prev) => [newDonation, ...prev]);
    }
    setMedications((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleShelterFlag = (id: string) => {
    setMedications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, donateToShelter: !item.donateToShelter } : item
      )
    );
  };

  const deleteMedication = (id: string) => {
    setMedications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MedicationContext.Provider
      value={{
        medications: demoMode === 'empty' ? [] : medications,
        shelters: demoMode === 'empty' ? [] : shelters,
        donations: demoMode === 'empty' ? [] : donations,
        demoMode,
        setDemoMode,
        addMedication,
        donateMedication,
        toggleShelterFlag,
        deleteMedication,
      }}
    >
      {children}
    </MedicationContext.Provider>
  );
};

export const useMedications = (): MedicationContextType => {
  const ctx = useContext(MedicationContext);
  if (!ctx) {
    throw new Error('useMedications must be used within MedicationProvider');
  }
  return ctx;
};
