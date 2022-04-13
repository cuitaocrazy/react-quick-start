# 创建项目react+typescript+webpack+tailwindcss+eslint+jest

## dev env

```bash
mkdir myapp
cd myapp

# npm porject init
npm init -y
npm i -D typescript \
  eslint \
  jest \
  ts-jest \
  @types/jest \
  webpack-cli \
  ts-loader \
  style-loader \
  css-loader \
  tailwindcss \
  postcss \
  postcss-loader \
  autoprefixer \
  @types/react \
  @types/react-dom

# patch
npm i -D eslint@latest eslint-plugin-promise@latest eslint-config-standard@next 

npx tsc --init
npx eslint --init
npm tailwindcss init

cat << EOF > postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
EOF

cat << EOF > jest.config.js
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset         : 'ts-jest',
  testEnvironment: 'node',
}
EOF

mkdir src

cat << EOF > src/sytels.css
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

npm i react react-dom

```

## 修改配置

`.eslintrc.js`:

- `env`追加`jest:true`
- `extends`追加`"plugin:react/jsx-runtime"`

`tsconfig.json`:

- 追加`"jsx": "react-jsx"`

`tailwind.config.js`:

- `content`追加`"src/**/*.{ts,tsx}"]`

`webpack.config.js`:

```js
const path = require('path')

module.exports = {
  entry : './src/index.tsx',
  // devtool: 'source-map',
  output: {
    path    : path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean   : true,
  },
  module: {
    rules: [
      // tsc相关
      {
        test   : /\.tsx?$/,
        use    : 'ts-loader',
        exclude: /node_modules/,
      },
      // 模块css
      {
        test: /\.css$/,
        use : [
          'style-loader',
          {
            loader : 'css-loader',
            options: {
              modules      : true,
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
        include: /\.module\.css$/,
      },
      // 全局css
      {
        test   : /\.css$/i,
        use    : ['style-loader', 'css-loader', 'postcss-loader'],
        exclude: /\.module\.css$/,
      },
      // 如果用到了文件资源
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
  }
}
```

## 使typescript支持css模块化导入

```typescript
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}
```

## 测试页面

```html
<html>
  <body>
    <div id="root"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

注意：这个文件放在public目录，如果放其他需要配置webpack dev server，默认是在public目录下。

