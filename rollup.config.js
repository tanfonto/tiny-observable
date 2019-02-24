import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
// import del from 'rollup-plugin-delete'

export default {
  input: 'src/index.ts',
  output: {
    cache: true,
    name: 'TinyO',
    format: 'iife',
    sourcemap: true,
    file: 'dist/lib.js'
  },
  plugins: [
    // del({
    //   verbose: true, 
    //   targets: [ 'dist/*' ]
    // }),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'ES2015'
          // declaration: false
        }
      }
    }),
    resolve({
      only: [ 'ramda' ]
    }),
    uglify(),
    sourcemaps(),
  ]
}