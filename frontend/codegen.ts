import type { CodegenConfig } from "@graphql-codegen/cli";

const graphqlUrl = process.env.GRAPHQL_URL ?? "https://localhost:7000/graphql";

const config: CodegenConfig = {
  schema: {
    [graphqlUrl]: {
      headers: {},
    },
  },
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/app/_lib/graphql/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
