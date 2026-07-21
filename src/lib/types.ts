import type {
  InquiryStatus,
  InquiryType,
  ProductCategory,
  ProductEnvironment,
  UserRole,
  UserStatus,
} from '@krasidge/shared';

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Paginated<T> {
  items: T[];
  pagination: Pagination;
}

export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  sortOrder: number;
}

export interface ProductDimensions {
  length?: string;
  width?: string;
  height?: string;
  unit?: string;
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: ProductCategory;
  materials: string[];
  environment: ProductEnvironment;
  dimensions?: ProductDimensions;
  colors: string[];
  images: ProductImage[];
  featured: boolean;
  published: boolean;
  archived: boolean;
  isSample: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  inquiryType: InquiryType;
  subject: string;
  message: string;
  consent: boolean;
  status: InquiryStatus;
  internalNotes?: string;
  emailDeliveryStatus?: string;
  emailDeliveryError?: string;
  confirmationEmailStatus?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductStats {
  total: number;
  published: number;
  featured: number;
  sample: number;
}

export interface UserStats {
  total: number;
  active: number;
  admins: number;
}

export interface ContactStats {
  total: number;
  new: number;
  inProgress: number;
  resolved: number;
  recent: ContactInquiry[];
}

export interface AdminDashboardStats {
  products: ProductStats;
  users: UserStats;
  contact: ContactStats;
}
