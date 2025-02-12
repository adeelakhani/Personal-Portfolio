import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,

  // Disable ESLint during build
  process.env.NEXT_PUBLIC_ESLINT_DISABLED === "true"
    ? { rules: {} }
    : {},
];
