module.exports = {
  root: true,
  extends: 'react-native-wcandillon',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['.'],
        alias: {
          '@/src/assets': './src/assets',
          '@/src/components': './src/components',
          '@/src/navigator': './src/navigator',
          '@/src/screens': './src/screens',
          '@/src/styles': './src/styles',
          '@/src/utils': './src/utils',
          '@/src/contexts': './src/contexts',
        },
      },
    },
  },
  rules: {
    semi: 0,
    'react/jsx-filename-extension': ['error', {extensions: ['.js', '.jsx']}],
    'import/order': ['error', {'newlines-between': 'ignore'}],
    'dot-notation': 0,
    camelcase: ['error', {properties: 'never'}],
    'no-nested-ternary': 0,
  },
};
