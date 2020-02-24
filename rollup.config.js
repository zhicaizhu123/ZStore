import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";

const isProduction = process.env.ENV === "production";
const isEsm = process.env.METHOD === "esm";

let suffix = isProduction ? ".min" : "";
suffix = isEsm ? ".esm" + suffix : suffix;

const config = {
  input: "src/index.js",
  output: {
    file: `dist/namespaceStore${suffix}.js`,
    format: isEsm ? "es" : "umd",
    name: "namespaceStore",
    globals: {
      zstore: "namespaceStore"
    }
  },
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**" // 只编译我们的源代码
    })
  ]
};

if (isProduction) {
  config.plugins.push(uglify());
}

export default config;
