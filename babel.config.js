module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  env: {
    production: {},
  },
  plugins: [
    // "optional-require", // UNcomment if you want to opt out to react-native-vector-icons
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    ["@babel/plugin-proposal-optional-catch-binding"],
  ],
}
