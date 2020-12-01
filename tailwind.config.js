const colors = require('tailwindcss/colors')

module.exports = {
    purge: [],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                cyan: colors.cyan,
                blueGray: colors.blueGray,
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
