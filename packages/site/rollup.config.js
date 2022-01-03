import summary from 'rollup-plugin-summary';
import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

const plugins = [
    replace({'Reflect.decorate': 'undefined', 'preventAssignment': true}),
    resolve(),
    terser({
        ecma: 2017,
        module: true,
        warnings: true,
        mangle: {
        properties: {
            regex: /^__/,
        },
        },
    }),
    summary(),
];

export default [
    {
        input: 'src/index.js',
        output: {
            file: 'dest/index.bundle.js',
            format: 'esm',
        },
        plugins: plugins
    }
]
;



/*
[
  {
    input: 'main-a.js',
    output: {
      file: 'dist/bundle-a.js',
      format: 'cjs'
    }
  },
  {
    input: 'main-b.js',
    output: [
      {
        file: 'dist/bundle-b1.js',
        format: 'cjs'
      },
      {
        file: 'dist/bundle-b2.js',
        format: 'es'
      }
    ]
  }
]
*/