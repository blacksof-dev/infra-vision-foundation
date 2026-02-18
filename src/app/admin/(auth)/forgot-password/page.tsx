"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/_components/ui/input";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import logo from "@/../public/kheyti-logo-green.png";
import { Button } from "../../components/button";

const zodSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormSchema = z.infer<typeof zodSchema>;

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      email: "",
    },
  });

  const submitHandler = async (data: FormSchema) => {
    try {
      setIsSubmitting(true);

      // TODO: Replace with your actual API endpoint
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/auth/forgot-password`,
        { email: data.email },
      );

      setSubmittedEmail(data.email);
      setEmailSent(true);
      toast.success(res.data?.message);
      reset();
    } catch (error: any) {
  
      toast.error(
        error?.response?.data?.message || "Failed to send reset email",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (emailSent) {
    return (
      <div className="w-full h-full flex items-center justify-center ">
        <div className="w-full max-w-md mx-4 p-8 sm:p-10 rounded-2xl shadow-2xl border-lightgray/10 bg-lightgray/10">
          <div className="flex flex-col items-center space-y-6">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-pink/10 flex items-center justify-center ">
              <CheckCircle2 className="w-12 h-12 text-pink" />
            </div>

            <div className="text-center  ">
              <h1 className="text-2xl font-semibold text-gray-800">
                Check Your Email
              </h1>
              <p className="text-gray-600 leading-relaxed text-lg mt-3">
                We've sent a password reset link to
              </p>
              <p className="text-pink font-medium break-all text-base">
                {submittedEmail}
              </p>
              <p className="text-sm text-gray-500 pt-8">
                Click the link in the email to reset your password. The link
                will expire in 10 minutes.
              </p>
            </div>

            {/* Actions */}
            <div className="w-full space-y-3 pt-4">
              <Button
                text="Back to Login"
                theme="pink"
                size="base"
                type="submit"
                onClick={() => (window.location.href = "/admin/login")}
                className="w-full py-3"
              ></Button>

              <button
                onClick={() => {
                  setEmailSent(false);
                  setSubmittedEmail("");
                }}
                className="w-full text-sm text-gray-600 hover:text-pink transition-colors font-medium"
              >
                Send to a different email
              </button>
            </div>

            {/* Help Text */}
            <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-100 w-full">
              Didn't receive the email? Check your spam folder or contact the
              Kheyti team.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center ">
      <div className="w-full max-w-md mx-4 p-8 sm:p-10 rounded-2xl shadow-2xl border-lightgray/10 bg-lightgray/10">
        <div className="flex flex-col items-center space-y-6">
          {/* Back Button */}
          <Link
            href="/admin/login"
            className="self-start flex items-center gap-2 text-sm text-gray-600 hover:text-pink transition-colors font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </Link>

        
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-pink/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-pink" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Forgot Password?
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              No worries! Enter your email address and we'll send you a link to
              reset your password.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="w-full space-y-5 pt-2"
          >
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                {...register("email")}
                className={`h-12 transition-all ${
                  errors.email
                    ? "border-red-500 ring-2 ring-red-200"
                    : "hover:border-pink/30"
                }`}
              />
              {errors.email && (
                <p className="text-sm font-medium text-red-500 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                  {errors.email.message}
                </p>
              )}
            </div>

            
            <Button
              text={isSubmitting ? "Sending..." : "Send Reset Link"}
              theme="pink"
              size="base"
              type="submit"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              className="w-full mt-6 py-3 font-medium"
            ></Button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-100 w-full">
            Remember your password?{" "}
            <Link
              href="/admin/login"
              className="text-pink/90 hover:text-pink font-medium hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
