export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Bean {
  id: string;
  name: string;
  roaster: string;
  roastLevel?: string;
  process?: string;
  origin?: string;
  variety?: string;
  tastingNotes?: string[];
  purchaseDate?: string;
  grinder?: string;
  rating?: number;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateBeanPayload = Omit<Bean, 'id' | 'owner' | 'createdAt' | 'updatedAt'>;
export type UpdateBeanPayload = Partial<CreateBeanPayload>;
