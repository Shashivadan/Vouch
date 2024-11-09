"use client";

import React from "react";
import html2canvas from "html2canvas";
import { Archive, CopyIcon, Download, Edit, Share, Trash2 } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@acme/ui/accordion";
import { Button } from "@acme/ui/button";
import { toast } from "@acme/ui/toast";

import type { TestimonialType } from "~/types";
import { addToArchive } from "~/actions/add-to-archive";
import { deleteTestmonial } from "~/actions/delete-testmonial";
import { createSocialCard } from "~/utils/create-testmonial-card";

export default function TestmonialAccordion({
  data,
}: {
  data: TestimonialType;
}) {
  const handleDelete = async () => {
    try {
      await deleteTestmonial(data.id);
      toast.success("Testimonial deleted successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleCopyToClipboard = async () => {
    await navigator.clipboard.writeText(data.message);
    toast.success("Link copied to clipboard");
  };

  const handleArchive = async () => {
    try {
      const result = await addToArchive(data.id);
      toast.success(
        `Testimonial ${result ? "archived" : "unarchived"} successfully`,
      );
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleDownload = async () => {
    try {
      toast.success("Creating card");
      const container = await createSocialCard(data);
      document.body.appendChild(container);

      const canvas = await html2canvas(container, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true, // Enable CORS for images
        allowTaint: true, // Allow cross-origin images
        onclone: (clonedDoc) => {
          // Force all images to be loaded in the cloned document
          const images = clonedDoc.getElementsByTagName("img");
          Array.from(images).forEach((img) => {
            img.crossOrigin = "anonymous";
          });
        },
      });

      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/png");
      });

      const url = URL.createObjectURL(blob as Blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${data.authorName || "social"}-card.png`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      document.body.removeChild(container);
      URL.revokeObjectURL(url);

      toast.success("Creating completed");
    } catch (error) {
      console.error("Error downloading card:", error);
    }
  };
  return (
    <div>
      {" "}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="">Settings</AccordionTrigger>
          <AccordionContent className="flex flex-wrap gap-2 text-base">
            <Button
              onClick={handleDelete}
              variant="outline"
              size="sm"
              className="rounded-sm"
            >
              Delete <Trash2 size={16} className="ml-2" />
            </Button>
            <Button variant="outline" size="sm" className="rounded-sm">
              Edit <Edit size={16} className="ml-2" />
            </Button>
            <Button variant="outline" size="sm" className="rounded-sm">
              share <Share size={16} className="ml-2" />
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              size="sm"
              className="rounded-sm"
            >
              Download <Download size={16} className="ml-2" />
            </Button>
            <Button
              onClick={handleCopyToClipboard}
              variant="outline"
              size="sm"
              className="rounded-sm"
            >
              Copy to clipboard <CopyIcon size={16} className="ml-2" />
            </Button>
            <Button
              onClick={handleArchive}
              variant="outline"
              size="sm"
              className="rounded-sm"
            >
              {data.archive ? "Unarchive" : "Archive"}{" "}
              <Archive size={16} className="ml-2" />
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
