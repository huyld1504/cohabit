/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1890ff',
        warning: '#faad14',
        success: '#52c41a',
        error: '#f5222d',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind's reset để không conflict với Ant Design
  },
};
