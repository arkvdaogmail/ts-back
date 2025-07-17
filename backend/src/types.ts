export type ServiceType =
  | 'Car Accident'
  | 'Rental Contract'
  | 'Personal Loan'
  | 'Creative Proof'
  | 'Logistics POD'
  | 'Other';

export interface PendingRecordIn {
  email: string;
  service_type: ServiceType;
  public_hash: string; // hex
}

export interface RecordRow extends PendingRecordIn {
  id: number;
  stripe_pi_id: string | null;
  tx_hash: string | null;
  block_time: string | null;
  created_at: string;
}
