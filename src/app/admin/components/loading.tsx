import { Loader } from "lucide-react";

export default function LoadingSpinner({ classes }: { classes?: string }) {
  return (
    <div className="relative">
      <Loader className={`text-white animate-spin ${classes}`} />
    </div>
  );
}
