import { apiService } from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  token: string;
  message: string;
}

export const authService = {
  login: (credentials: LoginRequest) => 
    apiService.post<AuthResponse>('/auth/login.php', credentials),

  register: (userData: RegisterRequest) => 
    apiService.post<AuthResponse>('/auth/register.php', userData),

  logout: () => apiService.post<{ message: string }>('/auth/logout.php', {}),
};
