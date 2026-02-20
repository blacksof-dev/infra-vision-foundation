"use client";
import axios from "axios";
import { Session } from "next-auth";

export async function getData(url: string, session: Session | null) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST_URL}${url}`,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );

  return response.data;
}

type ApiResult<T> =
  | { success: true; data: T; status: number }
  | { success: false; errorMessage: string; status?: number };

function extractAxiosErrorMessage(error: unknown): {
  message: string;
  status?: number;
} {
  // Prefer backend message array or string, fallback to generic
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const err: any = error;
  const status = err?.response?.status;
  const data = err?.response?.data;
  const msgFromArray = Array.isArray(data?.message)
    ? data.message.join(", ")
    : undefined;
  const message =
    msgFromArray || data?.message || err?.message || "Request failed";
  return { message, status };
}

export async function deleteAdmin(
  url: string,
  session: Session | null,
  superAdminPassword: string,
): Promise<ApiResult<unknown>> {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_HOST_URL}${url}`,
      {
        data: { superAdminPassword },
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    console.log(error);

    const { message, status } = extractAxiosErrorMessage(error);
    return { success: false, errorMessage: message, status };
  }
}

export async function createAdmin(
  url: string,
  session: Session | null,
  body: { name: string; email: string; password: string },
): Promise<ApiResult<unknown>> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_URL}${url}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    const { message, status } = extractAxiosErrorMessage(error);
    return { success: false, errorMessage: message, status };
  }
}

export async function uploadImage(
  file: File,
  session: Session | null,
  filename?: string,
): Promise<ApiResult<{ url: string }>> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    if (filename) {
      formData.append("filename", filename);
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_URL}/uploads/image`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    const { message, status } = extractAxiosErrorMessage(error);
    return { success: false, errorMessage: message, status };
  }
}

export async function updateContent(
  url: string,
  session: Session | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any,
): Promise<ApiResult<unknown>> {
  try {
    console.log(formData);
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_HOST_URL}${url}`,
      { data: formData },
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    const { message, status } = extractAxiosErrorMessage(error);
    return { success: false, errorMessage: message, status };
  }
}

export async function deleteFile(
  type: string,
  filename: string,
  session: Session | null,
): Promise<ApiResult<unknown>> {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_HOST_URL}/uploads/${type}/${filename}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    const { message, status } = extractAxiosErrorMessage(error);
    return { success: false, errorMessage: message, status };
  }
}
