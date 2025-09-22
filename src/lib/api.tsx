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

export async function postFetch<T, B = unknown>(
  url: string,
  body: B,
  options?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}${url}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
        ...options,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteFetch<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}${url}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        ...options,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function patchFetch<T, B = unknown>(
  url: string,
  body?: B,
  options?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}${url}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
        ...options,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
