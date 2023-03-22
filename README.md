# postcss-px-to-viewport-8-plugin

将 px 单位转换为视口单位的 (vw, vh, vmin, vmax) 的 [PostCSS](https://github.com/postcss/postcss) 插件.

## 问题

使用 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 控制台报以下代码

```js
postcss-px-to-viewport: postcss.plugin was deprecated. Migration guide: https://evilmartians.com/chronicles/postcss-8-plugin-migration

```

## 解决

`postcss-px-to-viewport` 替换 `postcss-px-to-viewport-8-plugin`

注意对应库版本

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

npm install postcss-px-to-viewport-8-plugin -D
or
yarn add postcss-px-to-viewport-8-plugin -D
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

## API 说明

| 参数 | 说明 | 类型 | 默认值 |
| :-- | --- | --- | --- |
| `unitToConvert` | 需要转换的单位，默认为 px | `string` | px |
| `viewportWidth` | 设计稿的视口宽度,如传入函数，函数的参数为当前处理的文件路径,函数返回 `undefind` 跳过转换 | `number \| Function` | 320 |
| `unitPrecision` | 单位转换后保留的精度 | `number` | 5 |
| `propList` | 能转化为 vw 的属性列表 | `string[]` | ['*'] |
| `viewportUnit` | 希望使用的视口单位 | `string` | vw |
| `fontViewportUnit` | 字体使用的视口单位 | `string` | vw |
| `selectorBlackList` | 需要忽略的 CSS 选择器，不会转为视口单位，使用原有的 px 等单位 | `string[]` | [] |
| `minPixelValue` | 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换 | `number` | 1 |
| `mediaQuery` | 媒体查询里的单位是否需要转换单位 | `boolean` | false |
| `replace` | 是否直接更换属性值，而不添加备用属性 | `boolean` | true |
| `landscape` | 是否添加根据 `landscapeWidth` 生成的媒体查询条件 `@media (orientation: landscape)` | `boolean` | false |
| `landscapeUnit` | 横屏时使用的单位 | `string` | vw |
| `landscapeWidth` | 横屏时使用的视口宽度,,如传入函数，函数的参数为当前处理的文件路径,函数返回 `undefind` 跳过转换 | `number` | 568 |
| `exclude` | 忽略某些文件夹下的文件或特定文件，例如 node_modules 下的文件，如果值是一个正则表达式，那么匹配这个正则的文件会被忽略，如果传入的值是一个数组，那么数组里的值必须为正则 | `Regexp` | undefined |
| `include` | 需要转换的文件，例如只转换 'src/mobile' 下的文件 (`include: /\/src\/mobile\//`)，如果值是一个正则表达式，将包含匹配的文件，否则将排除该文件， 如果传入的值是一个数组，那么数组里的值必须为正则 | `Regexp` | undefined |

## 补充说明

- `propList` (Array) 能转化为 vw 的属性列表
  - 传入特定的 CSS 属性；
  - 可以传入通配符"_"去匹配所有属性，例如：['_']；
  - 在属性的前或后添加"*",可以匹配特定的属性. (例如['*position\*'] 会匹配 background-position-y)
  - 在特定属性前加 "!"，将不转换该属性的单位 . 例如: ['*', '!letter-spacing']，将不转换 letter-spacing
  - "!" 和 "_"可以组合使用， 例如: ['_', '!font\*']，将不转换 font-size 以及 font-weight 等属性
- `selectorBlackList` (Array) 需要忽略的 CSS 选择器，不会转为视口单位，使用原有的 px 等单位。

  - 如果传入的值为字符串的话，只要选择器中含有传入值就会被匹配
    - 例如 `selectorBlackList` 为 `['body']` 的话， 那么 `.body-class` 就会被忽略
  - 如果传入的值为正则表达式的话，那么就会依据 CSS 选择器是否匹配该正则
    - 例如 `selectorBlackList` 为 `[/^body$/]` , 那么 `body` 会被忽略，而 `.body` 不会

- 你可以使用特殊的注释来忽略单行的转换:

  - `/* px-to-viewport-ignore-next */` — 在单独的行上，防止在下一行上进行转换。
  - `/* px-to-viewport-ignore */` — 在右边的属性之后，防止在同一行上进行转换。

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
    'postcss-px-to-viewport-8-plugin': {
      viewportWidth: 1920,
      exclude: [/node_modules/],
      unitToConvert: 'px',
      ...
    }
  }
}
```

## vite 使用

**在`vite.config.ts`文件添加如下配置**

```ts
import { defineConfig } from 'vite';
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin';

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport8plugin({
          unitToConvert: 'px',
          viewportWidth: file => {
            let num = 1920;
            if (file.indexOf('m_') !== -1) {
              num = 375;
            }
            return num;
          },
          unitPrecision: 5, // 单位转换后保留的精度
          propList: ['*'], // 能转化为vw的属性列表
          viewportUnit: 'vw', // 希望使用的视口单位
          fontViewportUnit: 'vw', // 字体使用的视口单位
          selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
          minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
          mediaQuery: true, // 媒体查询里的单位是否需要转换单位
          replace: true, //  是否直接更换属性值，而不添加备用属性
          exclude: [/node_modules\/ant-design-vue/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          include: [], // 如果设置了include，那将只有匹配到的文件才会被转换
          landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
          landscapeUnit: 'vw', // 横屏时使用的单位
          landscapeWidth: 1024, // 横屏时使用的视口宽度
        }),
      ],
    },
  },
});
```

## 作者

- [lkxian888](https://github.com/lkxian888)
