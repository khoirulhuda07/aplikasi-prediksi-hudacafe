import {combineDefaults, combineWithMathJax} from '#js/components/global.js';
import {Package} from "#js/components/package.js";

export const FONTPATH = (typeof document === 'undefined' ?
                         '@mathjax/%%FONT%%-font' :
                         'https://cdn.jsdelivr.net/npm/%%FONT%%-font');

export const OutputUtil = {
  config(jax, jaxClass, defaultFont, fontClass) {

    if (MathJax.loader) {

      combineDefaults(MathJax.config, jax, MathJax.config.output || {});

      let config = MathJax.config[jax];
      let font = config.font || defaultFont;
      if (typeof(font) !== 'string') {
        config.fontData = font;
        config.font = font = font.NAME;
      }

      if (font.charAt(0) !== '[') {
        const path = (config.fontPath || FONTPATH);
        const name = (font.match(/^[a-z]+:/) ? (font.match(/[^/:\\]*$/) || [jax])[0] : font);
        combineDefaults(MathJax.config.loader, 'paths', {
          [name]: (name === font ? path.replace(/%%FONT%%/g, font) : font)
        });
        font = `[${name}]`;
      }
      const name = font.substring(1, font.length - 1);

      if (name !== defaultFont) {

        MathJax.loader.addPackageData(`output/${jax}`, {extraLoads: [`${font}/${jax}`]});

      } else {

        const extraLoads = MathJax.config.loader[`${font}/${jax}`]?.extraLoads;
        if (extraLoads) {
          MathJax.loader.addPackageData(`output/${jax}`, {extraLoads});
        }

        combineWithMathJax({_: {
          output: {
            fonts: {
              [name]: {
                [jax + '_ts']: {
                  [fontClass.NAME + 'Font']: fontClass
                }
              }
            }
          }
        }});

        combineDefaults(MathJax, 'config', {
          output: {
            font: font,
          },
          [jax]: {
            fontData: fontClass,
            dynamicPrefix: `${font}/${jax}/dynamic`
          }
        });
        if (jax === 'chtml') {
          combineDefaults(MathJax.config, jax, {
            fontURL: Package.resolvePath(`${font}/${jax}/woff`, false),
          });
        }

      }
    }

    if (MathJax.startup) {
      MathJax.startup.registerConstructor(jax, jaxClass);
      MathJax.startup.useOutput(jax);
    }

  },

  loadFont(startup, jax, font, preload) {
    if (!MathJax.loader) {
      return startup;
    }
    if (preload) {
      MathJax.loader.preLoad(`[${font}]/${jax}`);
    }
    return Package.loadPromise(`output/${jax}`).then(startup);
  }

};
