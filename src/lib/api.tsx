import axios, { AxiosRequestConfig } from "axios";

export async function getFetch<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
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
