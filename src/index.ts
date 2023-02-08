import { getUnitRegexp } from './pixel-unit-regexp';
import { createPropListMatcher } from './prop-list-matcher';
import type { OptionType, ParentExtendType, RuleType } from './types';
import {
  blacklistedSelector,
  createPxReplace,
  declarationExists,
  getUnit,
  isExclude,
  validateParams,
} from './utils';
import objectAssign from 'object-assign';

import type { AtRule, Root } from 'postcss';
import postcss from 'postcss';

const defaults: Required<Omit<OptionType, 'exclude' | 'include'>> = {
  unitToConvert: 'px',
  viewportWidth: 320,
  viewportHeight: 568, // not now used; TODO: need for different units and math for different properties
  unitPrecision: 5,
  viewportUnit: 'vw',
  fontViewportUnit: 'vw', // vmin is more suitable.
  selectorBlackList: [],
  propList: ['*'],
  minPixelValue: 1,
  mediaQuery: false,
  replace: true,
  landscape: false,
  landscapeUnit: 'vw',
  landscapeWidth: 568,
};

const ignoreNextComment = 'px-to-viewport-ignore-next';
const ignorePrevComment = 'px-to-viewport-ignore';

const postcssPxToViewport = (options: OptionType) => {
  const opts = objectAssign({}, defaults, options);

  const pxRegex = getUnitRegexp(opts.unitToConvert);
  const satisfyPropList = createPropListMatcher(opts.propList);
  const landscapeRules: AtRule[] = [];

  return {
    postcssPlugin: 'postcss-px-to-viewport',
    Once(css: Root, { result }: { result: any }) {
      // @ts-ignore 补充类型
      css.walkRules((rule: RuleType) => {
        // Add exclude option to ignore some files like 'node_modules'
        const file = rule.source?.input.file || '';

        if (opts.exclude && file) {
          if (Object.prototype.toString.call(opts.exclude) === '[object RegExp]') {
            if (isExclude(opts.exclude as RegExp, file)) return;
          } else if (
            // Object.prototype.toString.call(opts.exclude) === '[object Array]' &&
            opts.exclude instanceof Array
          ) {
            for (let i = 0; i < opts.exclude.length; i++) {
              if (isExclude(opts.exclude[i], file)) return;
            }
          } else {
            throw new Error('options.exclude should be RegExp or Array.');
          }
        }

        if (blacklistedSelector(opts.selectorBlackList, rule.selector)) return;

        if (opts.landscape && !rule.parent?.params) {
          const landscapeRule = rule.clone().removeAll();

          rule.walkDecls((decl) => {
            if (decl.value.indexOf(opts.unitToConvert) === -1) return;
            if (!satisfyPropList(decl.prop)) return;

            landscapeRule.append(
              decl.clone({
                value: decl.value.replace(
                  pxRegex,
                  createPxReplace(opts, opts.landscapeUnit, opts.landscapeWidth),
                ),
              }),
            );
          });

          if (landscapeRule.nodes.length > 0) {
            landscapeRules.push(landscapeRule as unknown as AtRule);
          }
        }

        if (!validateParams(rule.parent?.params, opts.mediaQuery)) return;

        rule.walkDecls((decl, i) => {
          if (decl.value.indexOf(opts.unitToConvert) === -1) return;
          if (!satisfyPropList(decl.prop)) return;

          const prev = decl.prev();
          // prev declaration is ignore conversion comment at same line
          if (prev && prev.type === 'comment' && prev.text === ignoreNextComment) {
            // remove comment
            prev.remove();
            return;
          }
          const next = decl.next();
          // next declaration is ignore conversion comment at same line
          if (next && next.type === 'comment' && next.text === ignorePrevComment) {
            if (/\n/.test(next.raws.before!)) {
              result.warn(
                `Unexpected comment /* ${ignorePrevComment} */ must be after declaration at same line.`,
                { node: next },
              );
            } else {
              // remove comment
              next.remove();
              return;
            }
          }

          let unit;
          let size;
          const { params } = rule.parent;

          if (opts.landscape && params && params.indexOf('landscape') !== -1) {
            unit = opts.landscapeUnit;
            size = opts.landscapeWidth;
          } else {
            unit = getUnit(decl.prop, opts);
            if (typeof opts.viewportWidth === 'function') {
              // @ts-ignore default number
              size = opts.viewportWidth(file);
            } else {
              size = opts.viewportWidth;
            }
          }

          const value = decl.value.replace(pxRegex, createPxReplace(opts, unit!, size));

          if (declarationExists(decl.parent as unknown as ParentExtendType[], decl.prop, value))
            return;

          if (opts.replace) {
            // eslint-disable-next-line no-param-reassign
            decl.value = value;
          } else {
            decl.parent?.insertAfter(i, decl.clone({ value }));
          }
        });
      });

      if (landscapeRules.length > 0) {
        const landscapeRoot = new postcss.AtRule({
          params: '(orientation: landscape)',
          name: 'media',
        });

        landscapeRules.forEach((rule) => {
          landscapeRoot.append(rule);
        });
        css.append(landscapeRoot);
      }
    },
  };
};

module.exports.postcss = true;

export default postcssPxToViewport;

export { postcssPxToViewport };
