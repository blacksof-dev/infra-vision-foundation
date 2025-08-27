export async function getData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  } catch (error: any) {
    console.error("Fetch error:", error.message);
    throw error;
  }
}
