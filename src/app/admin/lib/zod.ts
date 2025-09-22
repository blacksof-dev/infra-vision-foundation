"use client";
import { z } from "zod";

export const emailSchema = z
  .string()
  .nonempty({ message: "Email required" })
  .email({
    message: "Invalid email address",
  });

export const telephoneSchema = z
  .string()
  .nonempty({ message: "Telephone required" })
  .regex(/^\+?[1-9](\d|\s){1,14}\d$/, "Invalid telephone number");

export const textSchema = z.string().nonempty({ message: "Required" });

export const testPasswordSchema = z
  .string()
  .nonempty({ message: "Required" })
  .min(6, { message: "Password must have at least 6 characters" });

export const urlSchema = z.string().nonempty({ message: "URL required" }).url();

export const passwordSchema = z
  .string()
  .nonempty({ message: "Required" })
  .min(6, { message: "Password must be at least 6 characters long" })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character",
  });

export const generalSchema = (message: string) => {
  return z.string().nonempty({ message });
};

export const fileSchema = z.union([z.string(), z.instanceof(FileList)]);
