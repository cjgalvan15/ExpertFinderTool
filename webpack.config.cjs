import { resolve } from 'path';

export const entry = 'index.js';
export const output = {
    path: resolve(__dirname, 'build'),
    filename: 'bundle.js' // The name of the bundled file
};
export const mode = 'development'; // The build mode (development or production)

// const path = require('path');

// module.exports = {
//     entry: './src/index.js', // The entry point for your application
//     output: {
//       path: path.resolve(__dirname, 'dist'), // The output directory for your bundled code
//       filename: 'bundle.js' // The name of the bundled file
//     },
//     mode: 'development' // The build mode (development or production)
//   };
  