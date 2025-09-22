"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/button";
import { getData } from "../../lib/utils";
import { useSession } from "next-auth/react";
import { Input } from "@/_components/ui/input";
import { deleteAdmin } from "../../lib/utils";
import { toast } from "react-toastify";
import AddNewAdmin from "./addnewAdmin";

type adminsType = {
  id: string;
  name: string;
  role: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export default function Page() {
  const [admins, setAdmins] = useState<adminsType[]>([]);
  const [password, setPassword] = useState<string>("");
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [addAdminOpen, setAddAdminOpen] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (addAdminOpen) return;
    async function fetchAdminList() {
      const data = await getData("/admin", session);
      console.log(data);
      setAdmins(data);
    }
    fetchAdminList();
  }, [session, addAdminOpen]);

  async function handleDeleteSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!deletingId) return;
    if (!password || password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    try {
      setIsDeleting(true);
      const result = await deleteAdmin(
        `/admin/${deletingId}`,
        session,
        password
      );
      if (result.success) {
        setAdmins((prev) => prev.filter((a) => a.id !== deletingId));
        toast.success("Admin deleted successfully");
        setIsDeleteOpen(false);
        setPassword("");
        setDeletingId("");
      } else {
        toast.error(result.errorMessage);
      }
    } catch (err: any) {
      toast.error("Delete failed");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <section>
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => !isDeleting && setIsDeleteOpen(false)}
          ></div>
          <div className="relative w-[22rem] p-6 flex flex-col border border-gray/20 bg-white shadow-2xl rounded-md">
            <h4 className="text-lg font-medium text-center">
              Confirm Deletion
            </h4>
            <p className="text-sm text-black text-center mt-2">
              Enter super admin password to delete this admin.
            </p>
            <form className="mt-4 space-y-4" onSubmit={handleDeleteSubmit}>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="********"
                className="h-10"
              />
              <div className="flex gap-x-4 justify-center pt-2">
                <Button
                  text="Delete"
                  theme="pink"
                  size="base"
                  type="submit"
                  isDisabled={isDeleting}
                  isLoading={isDeleting}
                />
                <Button
                  text="Cancel"
                  theme="transparentPink"
                  size="base"
                  type="button"
                  isDisabled={isDeleting}
                  onClick={() => setIsDeleteOpen(false)}
                />
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="border-b-1 border-b-gray/30">
        <h3 className="">Admins</h3>
      </div>
      <div className="">
        <div className="grid grid-cols-4 h-16 bg-gray/20 items-center px-4 mt-8 border-b border-b-gray/30">
          <div className="h-fit ">
            <span className="text-lg font-medium">Name</span>
          </div>
          <div className="h-fit ">
            <span className="text-lg font-medium">Email</span>
          </div>
          <div className="h-fit ">
            <span className="text-lg font-medium">Role</span>
          </div>
          <div className="h-fit w-40 ">
            <span className="text-lg font-medium">Action</span>
          </div>
        </div>
        {admins.map((admin: adminsType, index: number) => {
          return (
            <div
              key={index}
              className="grid grid-cols-4 h-16 items-center px-4  border-b border-b-gray/30"
            >
              <div className="h-fit ">
                <span className="text-base font-normal">{admin.name}</span>
              </div>
              <div className="h-fit ">
                <span className="text-base font-normal">{admin.email}</span>
              </div>
              <div className="h-fit ">
                <span className="text-base font-normal">{admin.role}</span>
              </div>
              <div className="h-fit flex gap-3 w-40">
                <Button
                  theme="transparentPink"
                  text="delete"
                  size="base"
                  role="button"
                  className="px-2 py-1"
                  onClick={() => {
                    setDeletingId(admin.id);
                    setIsDeleteOpen(true);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end blade-top-margin">
        <Button
          theme="pink"
          text="Add new admin"
          size="large"
          role="button"
          className="text-base"
          onClick={() => setAddAdminOpen(true)}
        />
      </div>
      {addAdminOpen && <AddNewAdmin close={() => setAddAdminOpen(false)} />}
    </section>
  );
}
