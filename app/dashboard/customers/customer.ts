export interface CustomerDto {
  id: number;
  created_at: Date;
  updated_at: Date;
  status: boolean;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: number | null;
  balance: number;
}
