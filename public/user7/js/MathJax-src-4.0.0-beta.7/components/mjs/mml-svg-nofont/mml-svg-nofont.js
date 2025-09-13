import {startup} from '../startup/init.js';
import {Loader} from '#js/components/loader.js';
import '../core/core.js';
import '../input/mml/mml.js';
import {loadFont} from '../output/svg/svg.js';
import '../ui/menu/menu.js';
import {checkSre} from '../a11y/util.js';

Loader.preLoad(
  'loader', 'startup',
  'core',
  'input/mml',
  'output/svg',
  'ui/menu'
);
Loader.saveVersion('mml-svg-nofont');

loadFont(checkSre(startup));
