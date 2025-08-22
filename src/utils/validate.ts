import { z } from 'zod';

export const formSchema = z
  .object({
    picture: z
      .file()
      .min(1, 'Avatar is required')
      .mime(['image/png', 'image/jpeg'], 'Only JPEG and PNG'),
    name: z
      .string()
      .min(1, 'Name is required')
      .refine((name) => name.charAt(0) === name.charAt(0).toUpperCase()),
    age: z
      .union([z.string(), z.number()])
      .transform((val) => (typeof val === 'string' ? parseInt(val) : val))
      .refine((val) => !isNaN(val), 'Age must be a number')
      .refine((val) => val >= 18, 'You must be at least 18 years old')
      .refine((val) => val <= 120, 'Please enter a valid age'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    repeat: z.string().min(1, 'Please repeat your password'),
    gender: z.string().min(1, 'Please select your gender'),
    country: z.string().min(1, 'Please select your country'),
    terms: z
      .string()
      .transform((val) => val === 'on')
      .refine(
        (val) => val === true,
        'You must accept the terms and conditions'
      ),
  })
  .refine((data) => data.password === data.repeat, {
    message: "Passwords don't match",
    path: ['repeat'],
  });

export type TFormSchema = z.infer<typeof formSchema>;
