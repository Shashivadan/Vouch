import baseConfig, { restrictEnvAccess } from "@vouch/eslint-config/base";
import nextjsConfig from "@vouch/eslint-config/nextjs";
import reactConfig from "@vouch/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    rules: {
      "require-await": "off",
      "@typescript-eslint/require-await": "error",
    },
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
