export interface User {
  _id: string;
  guid: string;
  isActive: boolean;
  balance: string;
  picture: string;
  age: number;
  eyeColor: string;
  name: {
    first: string;
    last: string;
  };
  company: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UpdateBalanceDto {
  userId: string;
  newBalance: string;
}

export interface UpdateUserDto {
  name?: {
    first?: string;
    last?: string;
  };
  age?: number;
  email?: string;
  phone?: string;
  address?: string;
  company?: string;
}
