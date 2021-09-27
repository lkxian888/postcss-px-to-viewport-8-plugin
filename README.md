# postcss-px-to-viewport-8-plugin

使用 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 控制台报以下代码

```js
postcss-px-to-viewport: postcss.plugin was deprecated. Migration guide: https://evilmartians.com/chronicles/postcss-8-plugin-migration
```

# 解决

postcss-px-to-viewport 换 postcss-px-to-viewport-8-plugin

## 对应库版本

```js
  "postcss": "^8.3.8", // 8.0.0版本都不会转单位
  "postcss-loader": "^6.1.1",
```

## Usage

```js

$ npm install postcss-px-to-viewport-8-plugin -D

$ yarn add postcss-px-to-viewport-8-plugin -D
```

author: "lkx",
