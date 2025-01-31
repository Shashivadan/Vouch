"use client";

import React, { useState } from "react";

import { Button } from "@vouch/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@vouch/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@vouch/ui/tabs";

const HighlightedCode = ({ code }: { code: string }) => (
  <pre className="overflow-x-auto rounded-md bg-zinc-800 p-4 text-blue-200">
    <code>{code}</code>
  </pre>
);

export default function Embedding({ website }: { website: string }) {
  const [showEmbed, setShowEmbed] = useState<boolean>(true);

  const embedCode = `<iframe
  src="https://vouch-qifm.vercel.app/m/${website}"
  width="1000px"
  height="500px"
  style={{
    border: "none",
    borderRadius: "10px",
    backgroundColor: "white",
  }}
/>`;
  return (
    <div className="w-full p-4">
      <Card>
        <CardHeader>
          <CardTitle>Testimonial Embed Demo</CardTitle>
          <CardDescription>
            See how to embed testimonials in your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="preview">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Live Preview</h3>
                <Button onClick={() => setShowEmbed(!showEmbed)}>
                  {showEmbed ? "Hide Embed" : "Show Embed"}
                </Button>
              </div>
              {showEmbed && (
                <iframe
                  src={`https://vouch-qifm.vercel.app/m/${website}`}
                  width="100%"
                  height="610px"
                  style={{
                    border: "none",
                    borderRadius: "15px",
                    backgroundColor: "white",
                  }}
                />
              )}
            </TabsContent>
            <TabsContent value="code" className="space-y-4">
              <h3 className="text-lg font-semibold">Embed Code</h3>
              <HighlightedCode code={embedCode} />
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold">How to use:</h4>
                <ol className="list-inside list-decimal space-y-1">
                  <li>Copy the code above</li>
                  <li>
                    Paste it into your HTML where you want the testimonials to
                    appear
                  </li>
                  <li>Adjust the width and height as needed</li>
                </ol>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
