module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
      'nativewind/babel',
      'react-native-reanimated/plugin',
      ['inline-import', { extensions: ['.sql'] }],
    ],
  };
};
