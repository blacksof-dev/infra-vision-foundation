import axios, { AxiosRequestConfig } from "axios";

export async function getFetch<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axios(`http://142.93.215.57:4000${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
