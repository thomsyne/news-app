module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.ts", "./projects/**/*.html", "./projects/**/*.ts"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  // tslint:disable-next-line: object-literal-sort-keys
  plugins: [
    require("@tailwindcss/ui"),
  ],
 };
