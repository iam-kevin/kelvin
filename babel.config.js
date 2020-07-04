module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  env: {
    production: {},
  },
  plugins: [
    "optional-require",
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    ["@babel/plugin-proposal-optional-catch-binding"],
  ],
}
