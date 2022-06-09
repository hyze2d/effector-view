import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const external = [
  'react',
  'react-dom',
  'effector',
  'effector-react',
  'effector-react/ssr'
];

const plugins = [
  typescript({
    clean: true
  }),

  babel({
    exclude: 'node_modules/**',

    extensions: ['.js', '.jsx', '.ts', '.tsx'],

    runtimeHelpers: true,

    presets: [
      '@babel/preset-env',
      '@babel/preset-typescript',
      '@babel/preset-react'
    ],

    plugins: [
      '@babel/plugin-transform-runtime',
      [
        'effector/babel-plugin',
        {
          factories: ['src/index.ts', 'src/index.ssr.ts']
        }
      ]
    ]
  }),

  nodeResolve({
    jsnext: true,

    skip: ['effector'],

    extensions: ['.js', '.mjs']
  }),

  commonjs({
    extensions: ['.js', '.mjs']
  }),

  terser()
];

const output = {
  format: 'cjs',

  freeze: false,

  exports: 'named',

  sourcemap: true,

  externalLiveBindings: false
};

export default [
  {
    input: './src/index.ts',

    plugins,

    external,

    output: {
      file: './index.js',
      ...output
    }
  },

  {
    input: './src/index.ssr.ts',

    plugins,

    external,

    output: {
      file: './ssr.js',
      ...output
    }
  }
];
