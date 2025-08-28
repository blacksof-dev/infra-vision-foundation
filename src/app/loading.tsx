import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader className="h-14 w-14 animate-spin text-[#C82249]" />
    </div>
  );
}