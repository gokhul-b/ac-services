import { Loader2 } from "lucide-react";
const Icons = {
  spinner: Loader2,
};

export const Spinner = () => {
  return <Icons.spinner className="h-4 w-4 animate-spin" />;
};

export default function Loading() {
  return (
    <div className="fixed backdrop-blur-sm flex items-center justify-center  right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="flex gap-3 items-center justify-center">
        <Spinner /> {"Loading"}
      </div>
    </div>
  );
}
