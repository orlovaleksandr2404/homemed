export type DonationStatus = 'pending' | 'completed';

export interface Donation {
  id: string;
  medicationId: string;
  shelterId: string;
  quantity: number;
  donationDate: string; // YYYY-MM-DD
  status: DonationStatus;
}
