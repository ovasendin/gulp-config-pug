import gulp from 'gulp';
import { cleanSVG } from './clean';
import changed from 'gulp-changed';
import svgSprite from 'gulp-svg-sprite';
import imagemin from 'gulp-imagemin';
import config from '../config';

const srcPath = `${config.src.svg}/**/*.svg`;

const copyImages = () =>
  gulp
    .src(srcPath)
    .pipe(changed(config.dest.svg))
    .pipe(imagemin([imagemin.svgo()]))
    .pipe(gulp.dest(config.dest.svg));

const generateSprite = () =>
  gulp
    // svg берутся из папки dest
    .src(`${config.dest.svg}/**/*.svg`)
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: '../sprite.svg',
          },
        },
      }),
    )
    .pipe(gulp.dest(config.dest.images));

export const svgBuild = gulp.series(copyImages, generateSprite);

const watcher = gulp.watch(srcPath, { ignoreInitial: false });

export const svgWatch = () =>
  watcher
    .on('add', function (path, stats) {
      svgBuild();
    })
    .on('change', function (path, stats) {
      cleanSVG();
      svgBuild();
    })
    .on('unlink', function (path, stats) {
      cleanSVG();
      svgBuild();
    });
