"use client";

import {   useState  } from "react";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/_components/ui/input";
import logo from "@/../public/logo.png";
import Image from "next/image";
// import { HeroBtn } from "@/_components/atom/button";
 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
 
import { Button } from "../../components/button";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  async function onSubmit(data: FormValues) {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (response?.ok) {
        toast.success("Logged in successfully!");
        reset();
        router.push("/admin/admin-list");
        return;
      } else {
        setError(
          response?.error || "Login failed. Please check your credentials."
        );
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }
    } catch (error: any) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="w-md  h-fit  p-6 sm:p-10 rounded-lg  font-schibsted  shadow-xl border border-lightgray/10 bg-lightgray/10">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center">
            <Image
              className="w-36"
              src={logo}
              alt="Occult gurukul logo"
            ></Image>
          </div>

          <h1 className="text-xl text-center font-medium">
            Log in to admin panel
          </h1>
          <p className="text-red-500 text-sm -mt-4">{error}</p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-4 pt-6"
          >
            <div className="space-y-1">
              <Input
                id="email"
                placeholder="Email address"
                type="email"
                {...register("email")}
                className={`h-12 ${errors.email ? " border-red-500 " : ""}`}
              />
              {errors.email && (
                <p className="text-sm font-medium text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <div className="relative ">
                <Input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`h-12 pr-10 ${
                    errors.password ? " border-red-500 " : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm font-medium text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* <div className="flex justify-end">
              <Link
                href="#"
                className="text-xs text-darkPurple font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div> */}

            <Button
              text="Login"
              theme="pink"
              size="base"
              type="submit"
              isDisabled={isLoading}
              isLoading={isLoading}
              className="w-full mt-4 py-2.5"
            ></Button>

            {/* <button
              type="submit"
              disabled={isLoading}
              className={`text-white bg-pink w-full py-2 mt-4 rounded-md cursor-pointer ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button> */}
          </form>

          <div className="text-center text-sm mt-5">
            Having login issues? Connect with the TIF team.
          </div>
        </div>
      </div>
    </div>
  );
}
