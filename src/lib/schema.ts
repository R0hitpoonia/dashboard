// import { TypeOf, z } from "zod";

export interface adminSchema {
  // uid: number;
  name: string;
  email: string;
  password: string;
  profilePhoto: string;
  role: "admin" | "user";
}

export interface getUserResponse {
  status: number;
  message: string;
  adminData: adminSchema;
}

export interface authResponse {
  status: number;
  message: string;
  token: string;
}

export interface loginUserRequest {
  email: string;
  password: string;
}

export interface registerUserRequest {
  name: string;
  email: string;
  password: string;
}
