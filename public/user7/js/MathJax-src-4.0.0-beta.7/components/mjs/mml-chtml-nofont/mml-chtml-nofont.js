import {startup} from '../startup/init.js';
import {Loader} from '#js/components/loader.js';
import '../core/core.js';
import '../input/mml/mml.js';
import {loadFont} from '../output/chtml/chtml.js';
import '../ui/menu/menu.js';
import {checkSre} from '../a11y/util.js';

Loader.preLoad(
  'loader', 'startup',
  'core',
  'input/mml',
  'output/chtml',
  'ui/menu'
);
Loader.saveVersion('mml-chtml-nofont');

loadFont(checkSre(startup));
