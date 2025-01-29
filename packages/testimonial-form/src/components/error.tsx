import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

export const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <span className="mb-4 text-6xl" role="img" aria-label="Error">
        ❌
      </span>
      <h2 className="mb-2 text-2xl font-bold">Oops! Something Went Wrong</h2>
      <p className="mb-6 text-zinc-300">
        We couldn't submit your review. Please try again later or contact
        support if the issue persists.
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
