import {startup} from '../startup/init.js';
import {Loader} from '#js/components/loader.js';
import '../core/core.js';
import '../input/tex/tex.js';
import {loadFont} from '../output/chtml/chtml.js';
import '../ui/menu/menu.js';
import {checkSre} from '../a11y/util.js';

Loader.preLoad(
  'core',
  'input/tex',
  'output/chtml',
  'ui/menu'
);
Loader.saveVersion('tex-chtml-nofont');

loadFont(checkSre(startup));
