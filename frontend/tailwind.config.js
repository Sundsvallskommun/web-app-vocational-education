module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './node_modules/@sk-web-gui/*/dist/**/*.js',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    /* screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },*/
    screens: {
      mobile: { max: '376px' },
      'to-tablet': { max: '768px' },

      xs: '375px',
      // => @media (min-width: 375px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      //'2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      borderWidth: {
        DEFAULT: '.1rem',
      },
      maxWidth: {
        content: '116rem', // default in core is based on screens
      },
      fontFamily: {
        mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;",
      },
      spacing: {
        sm: '10px',
        md: '20px',
        lg: '30px',
        xl: '40px',
        '2xl': '50px',
        '3xl': '100px',
      },
      fontSize: {
        tiny: '1rem',
        xs: '1.2rem',
        sm: '1.4rem',
        base: '1.6rem',
        lg: '1.8rem',
        xl: '2.0rem',
        '2xl': '2.4rem',
        '3xl': '3.2rem',
        '4xl': '4.0rem',
        '5xl': '5.2rem',
        h1: '2.7rem',
        'h1-lg': '5.2rem',
        'h1-md': '5.2rem',
        'h1-sm': '2.7rem',
        h2: '1.9rem',
        'h2-lg': '2.6rem',
        'h2-md': '2.6rem',
        'h2-sm': '1.9rem',
        h3: '1.7rem',
        'h3-lg': '2.1rem',
        'h3-md': '2.1rem',
        'h3-sm': '1.7rem',
        h4: '1.5rem',
        'h4-lg': '1.8rem',
        'h4-md': '1.8rem',
        'h4-sm': '1.5rem',
      },
      borderRadius: {
        DEFAULT: '15px',
        half: '50%',
        'button-lg': '2.5rem',
        'button-md': '2.5rem',
      },
      colors: {
        primary: {
          DEFAULT: '#655afc',
          hover: '#655afc',
          light: '#655afc',
        },
        secondary: {
          DEFAULT: '#208357',
        },
        black: {
          DEFAULT: '#000',
          light: '#333',
        },
        'black-light': '#333',
        green: {
          DEFAULT: '#208357',
          middle: '#219561',
          light: '#f3fcf8',
        },
        red: {
          DEFAULT: '#da2f40',
        },
        blue: {
          DEFAULT: '#655afc',
          light: '#f0f4f7',
        },
        label: {
          DEFAULT: '#5a5a5a',
        },
        error: {
          DEFAULT: '#DA2F40',
        },
        divider: '#8C8C8C',
        'border-color': '#16262d',
        disabled: '#bababa', // FIXME: NOT WCAG <-> #FFF
        'background-gray': '#919191',
        'dark-disabled': '#D9D9D9',
      },
    },
  },
  presets: [require('@sk-web-gui/core').preset],
};
