import React from "react";

import { signOut } from "@vouch/auth";

const SignOutButton = () => {
  return (
    <form>
      <button
        className=""
        formAction={async () => {
          "use server";
          await signOut();
        }}
      >
        Sign-out
      </button>
    </form>
  );
};

export default SignOutButton;
