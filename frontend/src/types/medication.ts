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

export interface Shelter {
  id: string;
  name: string;
  address: string;
  phone: string;
  neededCategories: string[];
}
