import { cache } from "react";

import { auth } from "@vouch/auth";

export const getCurrentUser = cache(async () => {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return {
    ...session.user,
    name: session.user.name,
    image: session.user.image,
  };
});
