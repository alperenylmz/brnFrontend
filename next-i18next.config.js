const path = require('path')

module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'fr', 'tr'], // Add more locales as needed
    },
    localePath: path.resolve('./public/locales'), // Specify the path to your translation files
}