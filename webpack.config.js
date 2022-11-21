const path = require('path')

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/js/script.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    }
}