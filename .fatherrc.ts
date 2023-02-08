import { defineConfig } from 'father';

export default defineConfig({
  cjs: {
    output: 'lib',
    platform: 'node',
    transformer: 'babel',
  },
});

// export default [
//   {
//     target: 'node',
//     cjs: {
//       output: 'lib',
//       platform: 'node',
//       transformer: 'babel',
//     },
//     disableTypeCheck: false,
//   },
// ];
// export default [
//   {
//     target: 'node',
//     cjs: { type: 'babel', lazy: true },
//     disableTypeCheck: false,
//   },
// ];
