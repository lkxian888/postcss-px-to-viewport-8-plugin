# postcss-px-to-viewport-design

将 px 单位转换为视口单位的 (vw, vh, vmin, vmax) 的 [PostCSS](https://github.com/postcss/postcss) 插件.

## 扩展

基于[postcss-px-to-viewport-8-plugin](https://github.com/qqlcx5/postcss-px-to-viewport-8-plugin.git)插件的基础上，添加横屏和竖屏在不同设计稿尺寸UI库解决方案。

```js
// postcss.config.js
const px2viewport = require('postcss-px-to-viewport-design')
const path = require('path')
const normalSize = (file) => path.join(file).includes(path.join('node_modules', 'vant'))

module.exports = {
  plugins: [
    px2viewport({
      unitToConvert: 'px', //需要转换的单位，默认为"px"
      viewportWidth: normalSize(file) ? 375 : 750, // 视窗的宽度，对应设计稿的宽度
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用 rem
      fontViewportUnit: 'vw', // 字体使用的视口单位
      unitPrecision: 13, // 指定`px`转换为视窗单位值的小数后 x位数
      propList: ['*'], // 能转化为 rem的属性列表
      selectorBlackList: [], //指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换
      replace: true, //是否直接更换属性值，而不添加备用属性
      exclude: /node_modules\/(?!(element-plus|vant))/, //忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
      // exclude: /node_modules/, //忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
      landscape: true, //是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
      landscapeUnit: 'vw', //横屏时使用的单位
      landscapeWidth: normalSize(file) ? 667 : 1334 //横屏时使用的视口宽度
    })
  ]
}
```

## 源码

```ts
// index.ts 123行修改
if (opts.landscape && params && params.indexOf('landscape') !== -1) {
  unit = opts.landscapeUnit;
  if (typeof opts.viewportWidth === 'function') {
    // @ts-ignore default number
    size = opts.landscapeWidth(file);
  } else {
    size = opts.landscapeWidth;
  }
} else {
  unit = getUnit(decl.prop, opts);
  if (typeof opts.viewportWidth === 'function') {
    // @ts-ignore default number
    size = opts.viewportWidth(file);
  } else {
    size = opts.viewportWidth;
  }
}
```

## 问题

使用 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 控制台报以下代码

```js
postcss-px-to-viewport: postcss.plugin was deprecated. Migration guide: https://evilmartians.com/chronicles/postcss-8-plugin-migration

```

## 解决

**postcss-px-to-viewport 替换 postcss-px-to-viewport-design**

**注意对应库版本**

```js
  "postcss": "^8.3.8", // 8.0.0版本都不会转单位
  "postcss-loader": "^6.1.1",
```

## 简介

如果你的样式需要做根据视口大小来调整宽度，这个脚本可以将你 CSS 中的 px 单位转化为 vw，1vw 等于 1/100 视口宽度。

## 输入

```css
.class {
  margin: -10px 0.5vh;
  padding: 5vmin 9.5px 1px;
  border: 3px solid black;
  border-bottom-width: 1px;
  font-size: 14px;
  line-height: 20px;
}

.class2 {
  padding-top: 10px; /* px-to-viewport-ignore */
  /* px-to-viewport-ignore-next */
  padding-bottom: 10px;
  /* Any other comment */
  border: 1px solid black;
  margin-bottom: 1px;
  font-size: 20px;
  line-height: 30px;
}

@media (min-width: 750px) {
  .class3 {
    font-size: 16px;
    line-height: 22px;
  }
}
```

## 输出

```css
.class {
  margin: -3.125vw 0.5vh;
  padding: 5vmin 2.96875vw 1px;
  border: 0.9375vw solid black;
  border-bottom-width: 1px;
  font-size: 4.375vw;
  line-height: 6.25vw;
}

.class2 {
  padding-top: 10px;
  padding-bottom: 10px;
  /* Any other comment */
  border: 1px solid black;
  margin-bottom: 1px;
  font-size: 6.25vw;
  line-height: 9.375vw;
}

@media (min-width: 750px) {
  .class3 {
    font-size: 16px;
    line-height: 22px;
  }
}
```

## 安装

```js

npm install postcss-px-to-viewport-design -D
or
yarn add postcss-px-to-viewport-design -D
```

## 配置参数使用与 [postcss-px-to-viewport](https://www.npmjs.com/package/postcss-px-to-viewport) 一致

**默认选项：**

```
{
  unitToConvert: 'px',
  viewportWidth: 320,
  unitPrecision: 5,
  propList: ['*'],
  viewportUnit: 'vw',
  fontViewportUnit: 'vw',
  selectorBlackList: [],
  minPixelValue: 1,
  mediaQuery: false,
  replace: true,
  exclude: [],
  landscape: false,
  landscapeUnit: 'vw',
  landscapeWidth: 568
}
```

- `unitToConvert` (String) 需要转换的单位，默认为"px"
- `viewportWidth` (Number | Function) 设计稿的视口宽度,如传入函数，函数的参数为当前处理的文件路径
- `unitPrecision` (Number) 单位转换后保留的精度
- `propList` (Array) 能转化为 vw 的属性列表
  - 传入特定的 CSS 属性；
  - 可以传入通配符"_"去匹配所有属性，例如：['_']；
  - 在属性的前或后添加"*",可以匹配特定的属性. (例如['*position\*'] 会匹配 background-position-y)
  - 在特定属性前加 "!"，将不转换该属性的单位 . 例如: ['*', '!letter-spacing']，将不转换 letter-spacing
  - "!" 和 "_"可以组合使用， 例如: ['_', '!font\*']，将不转换 font-size 以及 font-weight 等属性
- `viewportUnit` (String) 希望使用的视口单位
- `fontViewportUnit` (String) 字体使用的视口单位
- `selectorBlackList` (Array) 需要忽略的 CSS 选择器，不会转为视口单位，使用原有的 px 等单位。
  - 如果传入的值为字符串的话，只要选择器中含有传入值就会被匹配
    - 例如 `selectorBlackList` 为 `['body']` 的话， 那么 `.body-class` 就会被忽略
  - 如果传入的值为正则表达式的话，那么就会依据 CSS 选择器是否匹配该正则
    - 例如 `selectorBlackList` 为 `[/^body$/]` , 那么 `body` 会被忽略，而 `.body` 不会
- `minPixelValue` (Number) 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
- `mediaQuery` (Boolean) 媒体查询里的单位是否需要转换单位
- `replace` (Boolean) 是否直接更换属性值，而不添加备用属性
- `exclude` (Array or Regexp) 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
  - 如果值是一个正则表达式，那么匹配这个正则的文件会被忽略
  - 如果传入的值是一个数组，那么数组里的值必须为正则
- `include` (Array or Regexp) 如果设置了`include`，那将只有匹配到的文件才会被转换，例如只转换 'src/mobile' 下的文件 (`include: /\/src\/mobile\//`)
  - 如果值是一个正则表达式，将包含匹配的文件，否则将排除该文件
  - 如果传入的值是一个数组，那么数组里的值必须为正则
- `landscape` (Boolean) 是否添加根据 `landscapeWidth` 生成的媒体查询条件 `@media (orientation: landscape)`
- `landscapeUnit` (String) 横屏时使用的单位
- `landscapeWidth` (Number | Function) 横屏时使用的视口宽度 设计稿的视口宽度,如传入函数，函数的参数为当前处理的文件路径。

### Ignoring (需要翻译帮助)

You can use special comments for ignore conversion of single lines:

- `/* px-to-viewport-ignore-next */` — on a separate line, prevents conversion on the next line.
- `/* px-to-viewport-ignore */` — after the property on the right, prevents conversion on the same line.

Example:

```css
/* example input: */
.class {
  /* px-to-viewport-ignore-next */
  width: 10px;
  padding: 10px;
  height: 10px; /* px-to-viewport-ignore */
  border: solid 2px #000; /* px-to-viewport-ignore */
}

/* example output: */
.class {
  width: 10px;
  padding: 3.125vw;
  height: 10px;
  border: solid 2px #000;
}
```

There are several more reasons why your pixels may not convert, the following options may affect this: `propList`, `selectorBlackList`, `minPixelValue`, `mediaQuery`, `exclude`, `include`.

## 与 PostCss 配置文件一起使用

**在`postcss.config.js`文件添加如下配置**

```js
module.exports = {
  plugins: {
    ...
    'postcss-px-to-viewport-design': {
      // options
    }
  }
}
```

## Ignoring

你可以使用特殊的注释来忽略单行的转换:

- `/* px-to-viewport-ignore-next */` — 在单独的行上，防止在下一行上进行转换。
- `/* px-to-viewport-ignore */` — 在右边的属性之后，防止在同一行上进行转换。

## 作者

- [qqlcx5](https://github.com/qqlcx5)
