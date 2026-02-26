import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
    eslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    {
        rules: {
            "max-lines": ["warn", { max: 1000, skipBlankLines: true, skipComments: true }],
            "max-lines-per-function": ["warn", { max: 50, skipBlankLines: true, skipComments: true }],
        },
    },
    {
        ignores: ["**/node_modules/", "**/dist/", "**/generated/"],
    }
);
