import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import csso from 'gulp-csso';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import gulpif from 'gulp-if';
import config from '../config';

const sass = gulpSass(dartSass);

export const sassBuild = () =>
  gulp
    .src(`${config.src.sass}/style.scss`)
    .pipe(plumber()) // для отслеживания ошибок
    .pipe(gulpif(config.isDev, sourcemaps.init()))
    .pipe(sass())
    .pipe(gulpif(config.isProd, gcmq()))
    .pipe(gulpif(config.isProd, autoprefixer()))
    .pipe(gulpif(config.isProd, csso()))
    .pipe(
      rename({
        suffix: '.min',
      }),
    )
    .pipe(gulpif(config.isDev, sourcemaps.write()))
    .pipe(gulp.dest(config.dest.css));

export const sassWatch = () =>
  gulp.watch(`${config.src.sass}/**/*.scss`, sassBuild);
