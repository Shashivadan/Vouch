import React from "react";
import { FolderPlus } from 'lucide-react';
import { Button } from "@acme/ui/button";
export const CreateSpaces = () => {
  return <div className={"p-6 flex gap-6 flex-col items-center"}>
    <FolderPlus size={64} />
    <h2 className={" text-2xl font-medium"}>Create Spaces</h2>
    <p className={" text-opacity-35 text-md text-center font-normal"}>Start your journey by gathering valuable feedback from your community.</p>
    <Button variant="primary" > create you space</Button>
  </div>;
}