"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, PlusIcon, Trash2Icon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@vouch/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@vouch/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@vouch/ui/form";
import { Input } from "@vouch/ui/input";

import { createProject } from "~/actions/create-space";
import { queryQuestions } from "~/utils/create-space-constants";

const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
const logoRegex = /\bhttps?:\/\/[^\s]*\.(?:png|jpg|jpeg|gif|svg|ico|webp)\b/g;

export const formSchema = z.object({
  websiteUrl: z
    .string()
    .url("Please enter a valid website URL")
    .min(1, "Website URL is required")
    .regex(urlRegex, "Please enter a valid website URL"),
  logoUrl: z
    .string()
    .url("Please enter a valid logo URL")
    .regex(logoRegex, "Please enter a valid logo URL")
    .optional(),
  organizationName: z
    .string()
    .min(1, "Organization name or website name is required"),
  headerTitle: z.string().min(1, "Header title is required"),
  customMessage: z.string().min(1, "Custom message is required"),
  questions: z
    .array(
      z
        .object({
          question: z.string().min(1, "Question is required"),
        })
        .optional(),
    )
    .max(5)
    .optional(),
});
export const CreateSpaces = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      questions: queryQuestions,
      websiteUrl: "",
      logoUrl: "",
      organizationName: "",
      headerTitle: `Share Your Experience with  [Products/Services]`,
      customMessage:
        "We'd love to hear how [Products/Services] has made a difference for you. Please take a moment to fill out the form below.",
    },
  });

  const {
    fields: noOfQuestions,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  function addQuestion() {
    const questions = noOfQuestions.length;
    if (questions >= 5) {
      toast.error("You can add only 5 questions");
      return;
    }
    append({ question: "" });
  }

  function removeQuestion(index: number) {
    console.log("remove", index);

    remove(index);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createProject(values);
      toast.success("Successfully created Space");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button asChild>
            <div className="flex items-center">
              <Plus size={20} className="mr-2" /> Create Space
            </div>
          </Button>
        </DialogTrigger>
        <DialogOverlay className="bg-transparent backdrop-blur-sm" />
        <DialogContent className="md:min-w-[1000px]">
          <DialogHeader>
            <DialogTitle>Create Your Space</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mx-auto flex flex-col gap-4 py-3 text-black dark:text-white"
                >
                  <FormField
                    control={form.control}
                    name="websiteUrl"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="">
                          Website Url <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://www.example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="logoUrl"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Logo Url</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://www.example.com/logo.png"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organizationName"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>
                          Organization Name or Website Name{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="headerTitle"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>
                          Header Title <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customMessage"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>
                          Custom message for you users{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="mb-2 flex items-center justify-between">
                    <div className="font-semibold">Questions</div>
                    <Button
                      type="button"
                      onClick={addQuestion}
                      className="text-black dark:text-white"
                    >
                      <PlusIcon size={20} />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {noOfQuestions.map(({ question }, index) => (
                      <div key={question + index}>
                        <FormField
                          control={form.control}
                          name={`questions.${index}.question`}
                          render={({ field }) => (
                            <div className="relative flex flex-col gap-2">
                              <FormItem className="mt-0">
                                <FormControl>
                                  <Input
                                    placeholder={`Question ${index + 1}`}
                                    {...field}
                                  />
                                </FormControl>
                                {/* <FormMessage /> */}
                              </FormItem>
                              <Button
                                variant={"ghost"}
                                onClick={() => removeQuestion(index)}
                                className="absolute right-0 h-full px-3 hover:bg-transparent"
                              >
                                <Trash2Icon size={20} />
                              </Button>
                            </div>
                          )}
                        />
                      </div>
                    ))}
                  </div>

                  <Button type="submit">Create Space</Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
