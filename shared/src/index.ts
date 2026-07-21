import { z } from 'zod';

export const userRoles = ['user', 'admin'] as const;
export type UserRole = (typeof userRoles)[number];

export const userStatuses = ['active', 'disabled'] as const;
export type UserStatus = (typeof userStatuses)[number];

export const productCategories = [
  'figurines',
  'plant-pots',
  'vases',
  'planters',
  'indoor-decor',
  'outdoor-decor',
  'garden-accessories',
  'other',
] as const;
export type ProductCategory = (typeof productCategories)[number];

export const productEnvironments = ['indoor', 'outdoor', 'both'] as const;
export type ProductEnvironment = (typeof productEnvironments)[number];

export const inquiryTypes = [
  'product-inquiry',
  'commercial-order',
  'ai-landscape-design',
  'custom-software',
  'technical-support',
  'partnership',
  'general',
] as const;
export type InquiryType = (typeof inquiryTypes)[number];

export const inquiryStatuses = ['new', 'in-progress', 'resolved', 'archived'] as const;
export type InquiryStatus = (typeof inquiryStatuses)[number];

export const emailDeliveryStatuses = ['pending', 'sent', 'failed', 'skipped'] as const;
export type EmailDeliveryStatus = (typeof emailDeliveryStatuses)[number];

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  figurines: 'Figurines',
  'plant-pots': 'Plant Pots',
  vases: 'Vases',
  planters: 'Planters',
  'indoor-decor': 'Indoor Décor',
  'outdoor-decor': 'Outdoor Décor',
  'garden-accessories': 'Garden Accessories',
  other: 'Other',
};

export const INQUIRY_TYPE_LABELS: Record<InquiryType, string> = {
  'product-inquiry': 'Product inquiry',
  'commercial-order': 'Commercial order',
  'ai-landscape-design': 'AI landscape design',
  'custom-software': 'Custom software development',
  'technical-support': 'Technical support',
  partnership: 'Partnership',
  general: 'General inquiry',
};

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be at most 128 characters')
  .regex(/[A-Z]/, 'Password must include an uppercase letter')
  .regex(/[a-z]/, 'Password must include a lowercase letter')
  .regex(/[0-9]/, 'Password must include a number');

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().trim().email('Enter a valid email').max(254).toLowerCase(),
    password: passwordSchema,
    confirmPassword: z.string(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms of use' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email').max(254).toLowerCase(),
  password: z.string().min(1, 'Password is required').max(128),
  rememberMe: z.boolean().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email('Enter a valid email').max(254).toLowerCase(),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Enter a valid email').max(254).toLowerCase(),
  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .or(z.literal(''))
    .transform((v) => (v === '' ? undefined : v)),
  company: z
    .string()
    .trim()
    .max(120)
    .optional()
    .or(z.literal(''))
    .transform((v) => (v === '' ? undefined : v)),
  inquiryType: z.enum(inquiryTypes),
  subject: z.string().trim().min(3, 'Subject must be at least 3 characters').max(200),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be at most 5000 characters'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Consent is required to submit this form' }),
  }),
  // Honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal('')),
});

export const productDimensionsSchema = z
  .object({
    length: z.string().max(50).optional(),
    width: z.string().max(50).optional(),
    height: z.string().max(50).optional(),
    unit: z.string().max(20).optional(),
    notes: z.string().max(200).optional(),
  })
  .optional();

export const productCreateSchema = z.object({
  name: z.string().trim().min(2).max(150),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case')
    .optional(),
  shortDescription: z.string().trim().min(10).max(300),
  description: z.string().trim().min(20).max(10000),
  category: z.enum(productCategories),
  materials: z.array(z.string().trim().min(1).max(80)).max(20).default([]),
  environment: z.enum(productEnvironments),
  dimensions: productDimensionsSchema,
  colors: z.array(z.string().trim().min(1).max(50)).max(20).default([]),
  images: z
    .array(
      z.object({
        url: z.string().min(1).max(500),
        alt: z.string().min(1).max(200),
        sortOrder: z.number().int().min(0).optional(),
      }),
    )
    .max(20)
    .default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  archived: z.boolean().default(false),
  seoTitle: z.string().trim().max(70).optional(),
  seoDescription: z.string().trim().max(160).optional(),
});

export const productUpdateSchema = productCreateSchema.partial();

export const contactAdminUpdateSchema = z.object({
  status: z.enum(inquiryStatuses).optional(),
  internalNotes: z.string().max(5000).optional(),
});

export const adminUserStatusSchema = z.object({
  status: z.enum(userStatuses),
});

export const adminUserRoleSchema = z.object({
  role: z.enum(userRoles),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;
