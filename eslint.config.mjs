import next from "eslint-config-next/core-web-vitals";

export default [
  ...next,
  { ignores: ["out/**", ".next/**", "node_modules/**", "next-env.d.ts"] },
  { rules: {
    // Static export uses explicit responsive image variants, not an image server.
    "@next/next/no-img-element": "off",
    "react-hooks/set-state-in-effect": "off",
    "react-hooks/refs": "off",
  } },
];
