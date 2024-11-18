"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@acme/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@acme/ui/form";
import { Input } from "@acme/ui/input";

import type { OrganizationQuestionsType } from "~/types";
import { editSpace } from "~/actions/edit-space";

const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
const logoRegex = /\bhttps?:\/\/[^\s]*\.(?:png|jpg|jpeg|gif|svg|ico)\b/g;
export const editFormSchema = z.object({
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
export default function EditSpace({
  data,
}: {
  data: OrganizationQuestionsType;
}) {
  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    values: {
      websiteUrl: data.website,
      logoUrl: data.logo ?? "",
      organizationName: data.organizationName,
      headerTitle: data.headerTitle,
      customMessage: data.customMessage,
      questions: data.questions,
    },
  });

  async function onSubmit(values: z.infer<typeof editFormSchema>) {
    try {
      const newData = {
        ...values,
        questions: values.questions?.map((question, index) => ({
          question: question?.question,
          id: data.questions[index]?.id,
        })),
      };
      await editSpace(newData, data.id);

      toast.success(`Successfully Edited Space`);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  const { fields: noOfQuestions } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  return (
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
                <Input placeholder="https://www.example.com" {...field} />
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
                  </div>
                )}
              />
            </div>
          ))}
        </div>

        <Button type="submit" className="w-60 self-end">
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
