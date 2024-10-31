import React from "react";
import { FolderPlus } from "lucide-react";

import { Button } from "@acme/ui/button";

export const CreateSpaces = () => {
  return (
    <div className={"flex flex-col items-center gap-6 p-6"}>
      <FolderPlus size={64} />
      <h2 className={"text-2xl font-medium"}>Create Spaces</h2>
      <p className={"text-md text-center font-normal text-opacity-35"}>
        Start your journey by gathering valuable feedback from your community.
      </p>
      <Button variant="primary"> create you space</Button>
    </div>
  );
};
