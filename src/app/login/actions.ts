'use server';

export type LoginData = {
  email?: string;
  password?: string;
};

export async function login(data: LoginData) {
  console.log(data);
  return 'ok';
}
