/** @type {import('prettier').Config} */
const config = {
    tabWidth: 4,
    printWidth: 100,
    trailingComma: "es5",
    importOrder: [
        "^(react/(.*)$)|^(react$)",
        "^(next/(.*)$)|^(next$)",
        "<THIRD_PARTY_MODULES>",
        "",
        "^types$",
        "^@/types/(.*)$",
        "^@/config/(.*)$",
        "^@/lib/(.*)$",
        "^@/utils/(.*)$",
        "^@/hooks/(.*)$",
        "^@/components/ui/(.*)$",
        "^@/components/(.*)$",
        "^@/registry/(.*)$",
        "^@/styles/(.*)$",
        "^@/app/(.*)$",
        "^[./]",
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
    plugins: ["@trivago/prettier-plugin-sort-imports"],
};

export default config;
