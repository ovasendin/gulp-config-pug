import gulp from 'gulp';
import fs from 'fs';
import changed from 'gulp-changed';
import svgSprite from 'gulp-svg-sprite';
import imagemin from 'gulp-imagemin';
import config from '../config';

const watchPath = [`${config.src.svg}/**/*.svg`, '!sprite.svg'];

const copyImages = () =>
  gulp
    .src(watchPath)
    .pipe(changed(config.dest.svg))
    .pipe(imagemin([imagemin.svgo()]))
    .pipe(gulp.dest(config.dest.svg));

const generateSprite = () =>
  gulp
    // svg берутся из папки dest
    .src([`${config.dest.svg}/**/*.svg`, '!sprite.svg'])
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: '../sprite.svg',
          },
        },
      }),
    )
    .pipe(gulp.dest(config.dest.svg));

const replacePath = (path) => {
  return path.replace('app', 'build').replace('assets\\', '');
};

export const svgBuild = gulp.series(copyImages, generateSprite);

export const svgSmartBuild = gulp.series(generateSprite);

const watcher = gulp.watch(watchPath, { ignoreInitial: false });

export const svgWatch = () =>
  watcher
    .on('add', function () {
      svgBuild();
    })
    .on('unlink', function (path) {
      fs.unlinkSync(replacePath(path));
      svgSmartBuild();
    })
    .on('change', function () {
      svgSmartBuild();
    });
