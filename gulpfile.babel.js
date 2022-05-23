import gulp from 'gulp';
import config from './gulp/config';
import clean from './gulp/tasks/clean';
import server from './gulp/tasks/server';
import { pugBuild, pugWatch } from './gulp/tasks/pug';
import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts';
import { sassBuild, sassWatch } from './gulp/tasks/styles';

config.setEnv();

export const build = gulp.series(
  clean,
  gulp.parallel(
    pugBuild,
    scriptsBuild,
    sassBuild,
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
    //
  ),
);
