import { z } from 'zod';
import { countries, Genders } from '../constants.ts';
import type { Gender } from '../components/types.ts';

export const formSchema = z
  .object({
    picture: z
      .file()
      .min(1, { message: 'avatar is required' })
      .mime(['image/png', 'image/jpeg'], { message: 'Only JPEG and PNG' }),
    name: z
      .string()
      .min(1, { message: 'name is required' })
      .refine((name) => name.charAt(0) === name.charAt(0).toUpperCase(), {
        message: 'first uppercased letter',
      }),
    age: z
      .union([z.string(), z.number()])
      .refine((val) => typeof Number(val), { message: 'should be number' })
      .transform((val) => (typeof val === 'number' ? val : parseInt(val)))
      .refine((val) => val >= 0, { message: 'no negative values' }),
    email: z.email({ message: 'enter a valid email' }),
    password: z
      .string()
      .min(1, 'Password is required')
      .regex(/^(?:[^\s\t]+)?$/, { message: 'No spaces allowed' })
      .regex(/[a-z]/, { message: 'Must contain a lowercase letter' })
      .regex(/[A-Z]/, { message: 'Must contain a uppercase letter,' })
      .regex(/[0-9]/, { message: 'Must contain a number' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'Must contain special character',
      }),
    repeat: z.string().min(1, {
      message: 'repeat your password',
    }),
    gender: z.string().refine(
      (val): val is Gender => {
        return Genders.includes(val as Gender);
      },
      {
        message: 'Please select your gender',
      }
    ),
    country: z
      .string()
      .min(1, 'select your country')
      .refine((c) => countries.includes(c), {
        message: 'Country not found',
      }),
  })
  .superRefine(({ password, repeat }, ctx) => {
    if (repeat !== password) {
      ctx.addIssue({
        code: 'custom',
        path: ['repeat'],
        message: 'should match the password',
      });
      return;
    }
  });

export type TFormSchema = z.infer<typeof formSchema>;
