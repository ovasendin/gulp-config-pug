import gulp from 'gulp';
import { cleanFonts } from './clean';
import config from '../config';

const srcPath = `${config.src.fonts}/**/*.{otf,ttf,woff,woff2}`;

export const fontsBuild = () =>
  gulp
    //
    .src(srcPath)
    .pipe(gulp.dest(`${config.dest.fonts}`));

export const fontsWatch = () =>
  gulp.watch(srcPath, gulp.series(cleanFonts, fontsBuild));
