/* eslint-disable @typescript-eslint/no-require-imports */
const { preset } = require('@sk-web-gui/core');

module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/layouts/**/*.tsx',
    './node_modules/@sk-web-gui/*/dist/**/*.js',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'small-phone': '320px',
        'small-phone-min': '320px',
        'small-phone-max': '375px',
        phone: '375px',
        'phone-min': '375px',
        'phone-max': '479px',
      },
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
          DEFAULT: 'var(--sk-colors-primary-DEFAULT)',
          hover: 'var(--sk-colors-primary-hover)',
          light: 'var(--sk-colors-primary-light)',
        },
        secondary: {
          DEFAULT: 'var(--sk-colors-secondary-DEFAULT)',
        },
        black: 'var(--sk-colors-black)',
        'black-light': 'var(--sk-colors-black-light)',
        white: 'var(--sk-colors-white)',
        green: {
          DEFAULT: 'var(--sk-colors-green-DEFAULT)',
          middle: 'var(--sk-colors-green-middle)',
          light: 'var(--sk-colors-green-light)',
          background: 'var(--sk-colors-green-background)',
        },
        red: {
          DEFAULT: 'var(--sk-colors-red-DEFAULT)',
        },
        blue: {
          DEFAULT: 'var(--sk-colors-blue-DEFAULT)',
          light: 'var(--sk-colors-blue-light)',
        },
        label: {
          DEFAULT: 'var(--sk-colors-label-DEFAULT)',
        },
        error: {
          DEFAULT: 'var(--sk-colors-error-DEFAULT)',
        },
        divider: 'var(--sk-colors-divider)',
        'border-color': 'var(--sk-colors-boder-color)',
        disabled: 'var(--sk-colors-disabled)',
        'background-gray': 'var(--sk-colors-background-gray)',
        'dark-disabled': 'var(--sk-colors-dark-disabled)',

        //Static colors, these colors dont have support for different colorschemes
        'static-white-header': '#FCFCFC',
        'static-white': '#FFFFFF'
      },
    },
  },
  presets: [preset()],
};
