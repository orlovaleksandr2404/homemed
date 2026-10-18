export interface Medication {
  id: string;
  name: string;
  category: string;
  dosage: string;
  quantity: number;
  unit: string;
  expiryDate: string; // YYYY-MM-DD
  storageConditions: string;
  donateToShelter: boolean;
  notes?: string;
}

export type MedicationFormValues = Omit<Medication, 'id'>;
