// src/services/user.service.ts
import { api } from '../lib/axios';
import { User } from '../types';

export const userService = {
  getUserById: (id: number) =>
    api.get<User>(`/customer-service/api/users/id/${id}`),

  getUserByEmail: (email: string) =>
    api.get<User>(`/customer-service/api/users/email/${email}`),
};
