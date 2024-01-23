export interface User {
  email: string;
  password: string;
  name?: string;
  avatar?: string;
  phone?: string;
  status: boolean;
  create_time: Date;
  update_time: Date;
}
