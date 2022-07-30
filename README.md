
# postcss-px-to-viewport-8-plugin

## 问题

使用 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 控制台报以下代码

```bash
postcss-px-to-viewport: postcss.plugin was deprecated. Migration guide: https://evilmartians.com/chronicles/postcss-8-plugin-migration
```

## 解决

postcss-px-to-viewport 替换 postcss-px-to-viewport-8-plugin

## 对应库版本

```js
  "postcss": "^8.3.8", // 8.0.0版本都不会转单位
  "postcss-loader": "^6.1.1",
```

## 安装

```js

npm install postcss-px-to-viewport-8-plugin -D
or
yarn add postcss-px-to-viewport-8-plugin -D
```

## 使用与 [postcss-px-to-viewport](https://www.npmjs.com/package/postcss-px-to-viewport) 一致

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

- unitToConvert (String) unit to convert, by default, it is px.
- viewportWidth (Number) The width of the viewport.
- unitPrecision (Number) The decimal numbers to allow the vw units to grow to.
- propList (Array) The properties that can change from px to vw.
  - Values need to be exact matches.
  - Use wildcard * to enable all properties. Example: ['*']
  - Use * at the start or end of a word. (['position'] will match background-position-y)
  - Use ! to not match a property. Example: ['*', '!letter-spacing']
  - Combine the "not" prefix with the other prefixes. Example: ['', '!font']
- viewportUnit (String) Expected units.
- fontViewportUnit (String) Expected units for font.
- selectorBlackList (Array) The selectors to ignore and leave as px.
  - If value is string, it checks to see if selector contains the string.
    - ['body'] will match .body-class
  - If value is regexp, it checks to see if the selector matches the regexp.
    - [/^body$/] will match body but not .body
- minPixelValue (Number) Set the minimum pixel value to replace.
- mediaQuery (Boolean) Allow px to be converted in media queries.
- replace (Boolean) replaces rules containing vw instead of adding fallbacks.
- exclude (Array or Regexp) Ignore some files like 'node_modules'
  - If value is regexp, will ignore the matches files.
  - If value is array, the elements of the array are regexp.
- landscape (Boolean) Adds @media (orientation: landscape) with values converted via landscapeWidth.
- landscapeUnit (String) Expected unit for landscape option
- landscapeWidth (Number) Viewport width for landscape orientation.

## 与 PostCss 配置文件一起使用

**添加到您的 `postcss.config.js`**

```js
module.exports = {
  plugins: {
    ...
    'postcss-px-to-viewport-8-plugin': {
      // options
    }
  }
}
```

author: lkx
