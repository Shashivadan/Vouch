import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";

import {
  getQuestionsDetails,
  getSpaceDetailsPublic,
} from "~/actions/get-space-testimonials-details";
import NotFound from "~/components/404-not-found";

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
      <div className="relative h-72 w-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          crossOrigin="anonymous"
          className="h-full w-full rounded-3xl object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/7670836/7670836-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          ></source>
        </video>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl bg-white/10 backdrop-blur-3xl dark:bg-black/30">
          <Avatar className="h-24 w-24">
            <AvatarImage src={data.logo ?? ""} alt={data.organizationName} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center gap-3 text-white">
            <h1 className="text-2xl font-bold">{data.organizationName}</h1>
            <div className="text-sm">{data.headerTitle}</div>
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
                {questions.map((question) => (
                  <div
                    key={question.id}
                    className="rounded-2xl bg-zinc-100/10 px-3 py-4 text-sm italic backdrop-blur-[300px] dark:bg-black/30"
                  >
                    {" "}
                    {question.question}
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
