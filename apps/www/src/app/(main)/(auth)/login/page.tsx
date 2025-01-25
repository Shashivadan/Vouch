import type { SVGProps } from "react";
import React from "react";
import { redirect } from "next/navigation";

import { signIn } from "@acme/auth";

import { getCurrentUser } from "~/utils/get-current-user";

export default async function Login() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className="p-3 md:p-0">
      <div className="relative z-10 mt-10 flex flex-1 flex-col rounded-3xl border-white/50 bg-zinc-700/30 px-4 py-10 backdrop-blur-2xl sm:justify-center md:flex-none md:px-20 lg:py-24">
        <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
          <h1 className="text-3xl font-semibold tracking-tighter">
            Start collecting <br />
            <span className="">testimonials today</span>
          </h1>
          <p className="mt-4 text-base font-medium">
            Join hundreds of businesses automating their testimonial collection.
          </p>
          <div className="mt-8">
            <form>
              <button
                formAction={async () => {
                  "use server";
                  await signIn("google", {
                    callbackUrl: "/",
                  });
                }}
                aria-label="Sign in with Google"
                className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-zinc-300 px-5 py-3 font-medium duration-200 hover:scale-105 hover:bg-white/50 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-zinc-800"
                type="submit"
              >
                <GoogleIcon className="size-6" />
                <span>Continue with Google</span>
              </button>
            </form>

            <p className="mt-5 text-center text-sm dark:text-zinc-400">
              By loging in, you agree to our{" "}
              <a href="/terms" className="underline hover:text-white">
                Terms
              </a>
              and
              <a href="/privacy" className="underline hover:text-white">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon(props: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg
      height="100"
      viewBox="0 0 48 48"
      width="100"
      x="0px"
      xmlns="http://www.w3.org/2000/svg"
      y="0px "
      {...props}
    >
      <path
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
        fill="#FFC107"
      />
      <path
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
        fill="#FF3D00"
      />
      <path
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
        fill="#4CAF50"
      />
      <path
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
        fill="#1976D2"
      />
    </svg>
  );
}
