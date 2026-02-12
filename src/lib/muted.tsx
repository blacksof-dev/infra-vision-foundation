import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useContactFormMutation<T>(url: string) {
  return useMutation({
    mutationFn: async (data: T) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}${url}`,
        data,
      );
      return res.data;
    },
  });
}
