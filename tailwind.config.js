/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0796B2",
        secendry: "#780000",
        third: "#D3BD88",
        blue: {
          750: "#19bfd3",
          1000: "#0796B2",
          1050: "#211934",
          1010: "#0796B2",
        },
        Indigo: {
          1000: "#2D5B75",
        },
        gray: {
          30: "#f5f8fe",
          150: "#EFF5F6",
          320: "#e9edf7",
          230: "#DDE4E6",
          250: "#DDE4E7",
          550: "#86898A",
        },
        slate: {
          1000: "#1E1E1E",
        },
        neutral: {
          1000: "#0A141A",
        },
        red: {
          250: "#F34F53",
        },

        amber: {
          450: "rgba(243, 176, 67, 1)",
        },
      },
      fontFamily: {
        "peyda-900": "PeydaWeb-Black",
        "peyda-800": "PeydaWeb-ExtraBold",
        "peyda-700": "PeydaWeb-Bold",
        "peyda-600": "PeydaWeb-Semibold",
        "peyda-500": "PeydaWeb-Medium",
        "peyda-400": "PeydaWeb-Regular",
        "peyda-300": "PeydaWeb-Light",
      },
      screens: {
        "4xl": "2060px",
      },
      borderRadius: {
        xsm: "0.25rem",
      },

      padding: {
        4.5: "18px",
      },

      spacing: {
        4.5: "18px",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "&>*");
      addVariant("child-hover", "&>*:hover");
      addVariant("even-child", "&:nth-child(even)");
    },
    require("tailwind-scrollbar"),
  ],
};
