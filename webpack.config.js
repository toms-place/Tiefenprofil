const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/script.js',
	output: {
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}]
	}
};