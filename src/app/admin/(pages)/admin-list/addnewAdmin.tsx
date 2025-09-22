"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/_components/ui/input";
import { Button } from "../../components/button";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { createAdmin } from "../../lib/utils";
import { X } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function AddNewAdmin({ close }: { close: () => void }) {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    const result = await createAdmin("/admin", session, values);
    if (result.success) {
      toast.success("Admin created successfully");
      reset();
      close();
    } else {
      toast.error(result.errorMessage);
    }
  };

  return (
    <div className="w-screen h-screen bg-black/40 fixed top-0 left-0 flex items-center justify-center shadow-xl">
      <section className="relative w-sm bg-white rounded-md p-6">
        <div className="absolute top-2.5 right-2.5">
          <button
            aria-label="close"
            className="ring-1 rounded-full cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={close}
          >
            <X />
          </button>
        </div>
        <h3 className="text-xl font-medium">Add new admin</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <Input
              placeholder="Full name"
              {...register("name")}
              className={`h-11 ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={`h-11 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`h-11 ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="w-fit mx-auto pt-4">
            <Button
              type="submit"
              theme="pink"
              text={isSubmitting ? "Creating..." : "Create admin"}
              size="base"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              className="py-2.5 px-12"
            />
          </div>
        </form>
      </section>
    </div>
  );
}
