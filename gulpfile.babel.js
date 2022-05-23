import gulp from 'gulp';
import config from './gulp/config';
import server from './gulp/tasks/server';
import { cleanRoot } from './gulp/tasks/clean';
import { pugBuild, pugWatch } from './gulp/tasks/pug';
import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts';
import { sassBuild, sassWatch } from './gulp/tasks/styles';
import { fontsBuild, fontsWatch } from './gulp/tasks/fonts';
import { imagesBuild, imagesWatch } from './gulp/tasks/images';

config.setEnv();

export const build = gulp.series(
  cleanRoot,
  gulp.parallel(
    pugBuild,
    scriptsBuild,
    sassBuild,
    fontsBuild,
    imagesBuild,
    //
  ),
);

export const watch = gulp.series(
  build,
  server,
  gulp.parallel(
    pugWatch,
    scriptsWatch,
    sassWatch,
    fontsWatch,
    imagesWatch,
    //
  ),
);
