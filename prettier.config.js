/** @type {import("prettier").Config} */
module.exports = {
  bracketSpacing: true,
  printWidth: 80,
  singleQuote: false,
  trailingComma: "all",
  semi: true,
  tabWidth: 2,
  endOfLine: "auto",
  arrowParens: "always",
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};
