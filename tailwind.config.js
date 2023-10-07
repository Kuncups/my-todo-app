/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js,tsx}',
    './components/**/*.{html,js,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 500ms ease-in',
        'fade-out': 'fadeOut 300ms ease-in',
      },
    },
  },
  // ...
}