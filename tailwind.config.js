/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['Space Grotesk', 'sans-serif'],
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            colors: {
                accent: '#7c3aed',
                'accent-cyan': '#06b6d4',
                'accent-purple': '#a855f7',
                'dark-bg': '#06060f',
                'dark-surface': '#0d0d1a',
            },
            screens: {
                xs: '475px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            },
            animation: {
                'spin-slow': 'spin 6s linear infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            }
        },
    },
    plugins: [],
}
