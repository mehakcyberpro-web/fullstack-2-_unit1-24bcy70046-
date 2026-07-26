import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export const loginUser = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    `${API_URL}/auth/login`,
    credentials
  );

  return response.data;
};