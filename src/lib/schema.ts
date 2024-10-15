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

export interface Product {
  name: string;
  desc: string;
  categories: string;
  subCategories: string;
  status: "draft" | "active" | "deactive";
  stock: number;
  price: number;
  totalSales: number;
  images: string;
  createdAt: string;
  modifiedAt: string;
}

export interface Order {
  id: string;
  date: string;
  customer: string;
  email: string;
  phone: string;
  status: "Order Placed" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled";
  lastUpdated: string;
  orderDetails: OrderDetail[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentId?: string;
  shippingAddress: ShippingAddress;
}

export interface OrderDetail {
  product: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}
