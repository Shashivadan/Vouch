import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

export const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <span className="mb-4 text-6xl" role="img" aria-label="Celebration">
        🎉
      </span>
      <h2 className="mb-2 text-2xl font-bold">Thank You!</h2>
      <p className="mb-6 text-zinc-300">
        Your feedback is invaluable to us. We appreciate you taking the time to
        share your thoughts.
      </p>
      <DialogClose asChild>
        <Button
          variant="outline"
          className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800"
        >
          Close
        </Button>
      </DialogClose>
    </div>
  );
};
