import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@vouch/ui/avatar";

import {
  getQuestionsDetails,
  getSpaceDetailsPublic,
} from "~/actions/get-space-testimonials-details";
import NotFound from "~/components/404-not-found";
import RequestTestimonial from "~/components/pages/request-testimonial";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: { orgName: string };
}) {
  const { orgName } = params;
  const data = await getSpaceDetailsPublic(orgName);

  if (!data || typeof data === "string") return <NotFound />;

  const questions = await getQuestionsDetails(data.id);

  if (typeof questions === "string") return <NotFound />;

  return (
    <div className="mx-auto h-svh max-w-screen-2xl p-6">
      <div className="relative h-80 w-full">
        <Image
          src={
            "https://github.com/Shashivadan/walls/blob/main/0192.jpg?raw=true"
          }
          alt={"img"}
          width={1000}
          height={1000}
          className="h-full w-full rounded-3xl object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl bg-black/30 backdrop-blur-3xl">
          <Avatar className="h-24 w-24">
            <AvatarImage src={data.logo ?? ""} alt={data.organizationName} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center gap-5 text-white">
            <h1 className="text-2xl font-bold">{data.organizationName}</h1>
            <div className="text-sm">{data.headerTitle}</div>
            <RequestTestimonial data={data} />
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold">Questions</div>
          <div className="relative mt-4 h-[350px] w-full gap-4 rounded-3xl">
            <video
              autoPlay
              muted
              loop
              playsInline
              crossOrigin="anonymous"
              className="h-full w-full rounded-3xl object-cover"
            >
              <source
                src="https://videos.pexels.com/video-files/7670835/7670835-uhd_2560_1440_30fps.mp4"
                type="video/mp4"
              ></source>
            </video>
            <div className="absolute inset-0 flex flex-col items-center gap-3 rounded-3xl p-6 backdrop-blur-3xl">
              <div className="flex flex-col gap-3">
                {questions.map((question, idx) => (
                  <div
                    key={question.id}
                    className="rounded-2xl bg-zinc-100/10 px-3 py-4 text-sm italic text-white backdrop-blur-[300px] dark:bg-black/30"
                  >
                    {" "}
                    {idx + 1}. {question.question}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
