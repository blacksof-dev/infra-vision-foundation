"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, CheckCircle2 } from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import { Button } from "../../components/button";
import { Input } from "@/_components/ui/input";

const zodSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirm: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

type FormSchema = z.infer<typeof zodSchema>;

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get("token");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);
  const [tokenValid, setTokenValid] = useState<boolean>(true);
  const pathname = usePathname();
  const queryName = useSearchParams();
 

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const password = watch("password");

  // Check password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    setPasswordStrength(strength);
  }, [password]);

  // Validate token on mount

  // useEffect(() => {
  //   if (!token) {
  //     setTokenValid(false);
  //     toast.error("Invalid or missing reset token");
  //   }
  // }, [token]);

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 3) return "Medium";
    return "Strong";
  };

  const submitHandler = async (data: FormSchema) => {
    // if (!token) {
    //   toast.error("Invalid reset token");
    //   return;
    // }

    const tokenID = pathname.split("/").pop();

    if (!tokenID) {
      setTokenValid(false);
      toast.error("Invalid or missing reset token");
    }

    try {
      setIsSubmitting(true);
      // TODO: Replace with your actual API endpoint
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/auth/reset-password`,
        {
          token: tokenParam,
          newPassword: data.passwordConfirm,
        },
      );

      toast.success("Password reset successfully!");
      setResetSuccess(true);
      reset();

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/admin/login");
      }, 3000);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success State
  if (resetSuccess) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br  ">
        <div className="w-full max-w-md mx-4 p-8 sm:p-10 rounded-2xl shadow-2xl border-lightgray/10 bg-lightgray/10">
          <div className="flex flex-col items-center space-y-6">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-pink/10 flex items-center justify-center  ">
              <CheckCircle2
                strokeWidth={1.5}
                className="w-12 h-12 text-pink"
              />
            </div>

            
            <div className="text-center space-y-3">
              <h1 className="text-2xl font-semibold text-gray-800">
                Password Reset Successful!
              </h1>
              <p className="text-gray-600 leading-relaxed text-lg">
                Your password has been successfully reset. You can now log in
                with your new password.
              </p>
              <p className="text-sm text-gray-500 pt-2">
                Redirecting to login page...
              </p>
            </div>

            {/* Action */}

            <Button
              text="Go to Login"
              theme="pink"
              size="base"
              type="button"
              role="link"
              link="/admin/login"
              className="w-full py-3"
            ></Button>
          </div>
        </div>
      </div>
    );
  }

  // // Invalid Token State
  // if (!tokenValid || !token) {
  //   return (
  //     <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50">
  //       <div className="w-full max-w-md mx-4 p-8 sm:p-10 rounded-2xl shadow-2xl bg-white border border-red-100">
  //         <div className="flex flex-col items-center space-y-6">
  //           {/* Error Icon */}
  //           <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
  //             <XCircle strokeWidth={1.5} className="w-10 h-10 text-red-600" />
  //           </div>

  //           {/* Logo */}
  //           {/* <div className="flex items-center">
  //               <Image className="w-32" src={logo} alt="kheyti logo" priority />
  //             </div> */}

  //           {/* Error Message */}
  //           <div className="text-center space-y-3">
  //             <h1 className="text-2xl font-semibold text-gray-800">
  //               Invalid Reset Link
  //             </h1>
  //             <p className="text-gray-600 leading-relaxed text-base">
  //               This password reset link is invalid or has expired. Please
  //               request a new password reset link.
  //             </p>
  //           </div>

  //           {/* Actions */}
  //           <div className="w-full space-y-3">
  //             <ButtonAdmin
  //               text="Request New Link"
  //               theme="green"
  //               size="base"
  //               onClick={() => router.push("/admin/forgot-password")}
  //               className="w-full py-3"
  //             />
  //             <Link
  //               href="/admin/login"
  //               className="block text-center text-sm text-gray-600 hover:text-green-600 transition-colors font-medium"
  //             >
  //               Back to Login
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br ">
      <div className="w-full max-w-md mx-4 p-8 sm:p-10 rounded-2xl shadow-2xl border-lightgray/10 bg-lightgray/10">
        <div className="flex flex-col items-center space-y-6">
      
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-pink/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-pink" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Reset Your Password
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Enter your new password below. Make sure it's strong and secure.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="w-full space-y-5 pt-2"
          >
            {/* New Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  {...register("password")}
                  className={`h-12 pr-10 transition-all ${
                    errors.password
                      ? "border-red-500 ring-2 ring-red-200"
                      : "hover:border-pink/30"
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Password strength:</span>
                    <span
                      className={`font-medium ${
                        passwordStrength <= 1
                          ? "text-red-500"
                          : passwordStrength <= 3
                            ? "text-yellow-500"
                            : "text-green-500"
                      }`}
                    >
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {errors.password && (
                <p className="text-sm font-medium text-red-500 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label
                htmlFor="passwordConfirm"
                className="text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="passwordConfirm"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  {...register("passwordConfirm")}
                  className={`h-12 pr-10 transition-all ${
                    errors.passwordConfirm
                      ? "border-red-500 ring-2 ring-red-200"
                      : "hover:border-pink/30"
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.passwordConfirm && (
                <p className="text-sm font-medium text-red-500 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                  {errors.passwordConfirm.message}
                </p>
              )}
            </div>

             

            <Button
              text={isSubmitting ? "Resetting..." : "Reset Password"}
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
