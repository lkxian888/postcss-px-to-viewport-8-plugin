import type { Rule } from 'postcss';

export type OptionType = {
  //  /* px-to-viewport-ignore-next */  在另一行上，阻止下一行上的转换
  // /* px-to-viewport-ignore */  在右边的属性之后，防止在同一行上转换

  /**
   * 需要转换的单位，默认为"px"
   */
  unitToConvert?: string;
  /**
   * 设计稿的视口宽度
   * 支持传入函数，函数的参数为当前处理的文件路径
   */
  viewportWidth?: number | ((filePath: string) => number|undefined);
  /**
   * 设计稿的视口高度
   */
  viewportHeight?: number; // not now used; TODO: need for different units and math for different properties
  /**
   * 单位转换后保留的精度
   */
  unitPrecision?: number;
  /**
   * 希望使用的视口单位
   */
  viewportUnit?: string;
  /**
   * 字体使用的视口单位
   */
  fontViewportUnit?: string; // vmin is more suitable.
  /**
   * 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位
   * 如果传入的值为字符串的话，只要选择器中含有传入值就会被匹配：例如 selectorBlackList 为 ['body'] 的话， 那么 .body-class 就会被忽略
   * 如果传入的值为正则表达式的话，那么就会依据CSS选择器是否匹配该正则：例如 selectorBlackList 为 [/^body$/] , 那么 body 会被忽略，而 .body 不会
   */
  selectorBlackList?: string[];
  /**
   * 能转化为vw的属性列表
   * 传入特定的CSS属性
   * 可以传入通配符""去匹配所有属性，例如：['']
   * 在属性的前或后添加"*",可以匹配特定的属性. (例如['position'] 会匹配 background-position-y)
   * 在特定属性前加 "!"，将不转换该属性的单位 . 例如: ['*', '!letter-spacing']，将不转换letter-spacing
   * "!" 和 ""可以组合使用， 例如: ['', '!font*']，将不转换font-size以及font-weight等属性
   */
  propList?: string[];
  /**
   * 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
   */
  minPixelValue?: number;
  /**
   * 媒体查询里的单位是否需要转换单位
   */
  mediaQuery?: boolean;
  /**
   * 是否直接更换属性值，而不添加备用属性
   */
  replace?: boolean;
  /**
   * 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
   * 如果值是一个正则表达式，那么匹配这个正则的文件会被忽略
   * 如果传入的值是一个数组，那么数组里的值必须为正则
   */
  exclude?: RegExp | RegExp[];
  /**
   * 如果设置了include，那将只有匹配到的文件才会被转换
   * 如果值是一个正则表达式，将包含匹配的文件，否则将排除该文件
   * 如果传入的值是一个数组，那么数组里的值必须为正则
   */
  include?: RegExp | RegExp[];
  /**
   * 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
   */
  landscape?: boolean;
  /**
   * 横屏时使用的单位
   */
  landscapeUnit?: string;
  /**
   * 横屏时使用的视口宽度
   * 支持传入函数，函数的参数为当前处理的文件路径
   */
  landscapeWidth?: number | ((filePath: string) => number|undefined);

};

export type ParentExtendType = { prop: string; value: string; params: string };

export type ParentType = {
  parent: Rule['parent'] & ParentExtendType;
};

export type RuleType = Omit<Rule, 'parent'> & ParentType;
