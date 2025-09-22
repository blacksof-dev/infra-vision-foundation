"use client";
import React, { useEffect, useMemo, useState } from "react";
import SectionHeading from "../../components/sectionHeading";
import { Button } from "../../components/button";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { getData } from "../../lib/utils";
import axios from "axios";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../components/input/textInput";
import { toast } from "react-toastify";

type Sector = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

interface FormStateType {
  isFormOpen: boolean;
  editItem: Sector | null;
  items: Sector[];
}

const sectorSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type SectorForm = z.infer<typeof sectorSchema>;

export default function SectorsManager() {
  const { data: session } = useSession();
  const [formState, setFormState] = useState<FormStateType>({
    isFormOpen: false,
    editItem: null,
    items: [],
  });
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);

  async function loadSectors() {
    try {
      setIsLoadingList(true);
      const data = (await getData("/knowledge/sectors", session)) as Sector[];
      setFormState((s) => ({ ...s, items: data }));
    } catch (e) {
      toast.error("Failed to load sectors");
    } finally {
      setIsLoadingList(false);
    }
  }

  useEffect(() => {
    loadSectors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function deleteSector(id: string) {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge/sectors/${id}`,
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      );
      if (res.status >= 200 && res.status < 300) {
        toast.success("Deleted successfully");
        setFormState((s) => ({
          ...s,
          items: s.items.filter((x) => x.id !== id),
        }));
      } else {
        toast.error("Delete failed");
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Delete failed");
    }
  }

  return (
    <section className="blade-top-padding">
      <SectionHeading
        heading="Section - 02 (Sectors)"
        ctaText="Add new"
        cta
        handleClick={() =>
          setFormState((s) => ({ ...s, isFormOpen: true, editItem: null }))
        }
      />

      <div className="mt-6 grid gap-3">
        {formState.items.map((s) => (
          <article key={s.id} className="border border-gray/50 rounded-md p-4">
            <div className="flex justify-between gap-4">
              <div>
                <h6 className="text-base font-medium">{s.name}</h6>
                {/* Slug hidden intentionally */}
                {/* Description, Active label, and datetime intentionally hidden */}
              </div>
              <div className="flex gap-2">
                <Button
                  text="Edit"
                  theme="pink"
                  size="small"
                  onClick={() =>
                    setFormState((st) => ({
                      ...st,
                      isFormOpen: true,
                      editItem: s,
                    }))
                  }
                />
                <Button
                  text="Delete"
                  theme="transparentGray"
                  size="small"
                  onClick={() => deleteSector(s.id)}
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      {formState.isFormOpen && (
        <SectorFormModal
          initalData={formState.editItem}
          onClose={async () => {
            setFormState((s) => ({ ...s, isFormOpen: false, editItem: null }));
            await loadSectors();
          }}
        />
      )}
    </section>
  );
}

function SectorFormModal({
  initalData,
  onClose,
}: {
  initalData: Sector | null;
  onClose: () => void;
}) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultValues: SectorForm = useMemo(() => {
    if (!initalData) {
      return {
        name: "",
      } as SectorForm;
    }
    return {
      name: initalData.name,
    } as SectorForm;
  }, [initalData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SectorForm>({
    resolver: zodResolver(sectorSchema),
    defaultValues,
  });

  const submitHandler: SubmitHandler<SectorForm> = async (data) => {
    try {
      setIsLoading(true);
      const urlBase = `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge/sectors`;
      // derive slug from name
      const slugFromName = data.name
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      const res = await axios.request({
        url: initalData?.id ? `${urlBase}/${initalData.id}` : urlBase,
        method: initalData?.id ? "patch" : "post",
        data: { name: data.name, slug: slugFromName, active: true },
        headers: { Authorization: `Bearer ${session?.accessToken}` },
      });
      if (res.status === 200 || res.status === 201) {
        toast.success(
          initalData ? "Updated successfully" : "Created successfully"
        );
        onClose();
      } else {
        toast.error("Save failed");
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Save failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex justify-center items-center ">
      <div className="w-[28rem] relative blade-top-padding-s bg-white rounded-md shadow-2xl h-auto max-h-[85vh] overflow-auto overflow-x-hidden">
        <form className="h-full" onSubmit={handleSubmit(submitHandler)}>
          <div className="flex justify-end sticky top-2 px-1 z-[999]">
            <button
              type="button"
              aria-label="close modal"
              className="rounded-full ring-1 scale-75 hover:scale-90 transition-all duration-300 cursor-pointer"
              onClick={onClose}
            >
              <X />
            </button>
          </div>

          <div className="flex flex-col gap-y-6 h-full p-8 pt-1">
            <TextInput
              label="Name"
              errors={errors.name}
              placeholder="Enter name"
              register={register}
              registerer="name"
              tooltip="Name is required"
            />
            {/* Description and Active inputs removed as per requirement */}

            <div className="mt-auto">
              <Button
                type="submit"
                theme="pink"
                size="large"
                className="w-full"
                text={initalData ? "Update" : "Create"}
                isLoading={isLoading}
                isDisabled={isLoading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
