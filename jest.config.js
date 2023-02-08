// module.exports = {
// moduleNameMapper(memo) {
//   return Object.assign(memo, {
//     '^react$': require.resolve('react'),
//     '^react-dom$': require.resolve('react-dom'),
//   });
// },
// };

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
