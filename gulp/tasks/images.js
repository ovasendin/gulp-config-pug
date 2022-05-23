import gulp from 'gulp';
import { cleanImages } from './clean';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import config from '../config';

const srcPath = `${config.src.images}/**/*.{jpg,jpeg,png,webp}`;

const copyImages = () =>
  gulp
    .src(srcPath)
    .pipe(changed(config.dest.images))
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 60 }),
        imageminPngquant({ quality: [0.6, 0.8] }),
      ]),
    )
    .pipe(gulp.dest(config.dest.images));

const convertImagesToWebp = () =>
  gulp
    .src(`${config.src.images}/**/*.{jpg,jpeg,png}`)
    .pipe(changed(config.dest.images, { extension: '.webp' }))
    .pipe(imagemin([imageminWebp({ quality: 80 })]))
    .pipe(
      rename({
        extname: '.webp',
      }),
    )
    .pipe(gulp.dest(config.dest.images));

export const imagesBuild = gulp.series(copyImages, convertImagesToWebp);

const watcher = gulp.watch(srcPath, { ignoreInitial: false });

export const imagesWatch = () =>
  watcher
    .on('add', function (path, stats) {
      imagesBuild();
    })
    .on('change', function (path, stats) {
      cleanImages();
      imagesBuild();
    })
    .on('unlink', function (path, stats) {
      cleanImages();
      imagesBuild();
    });
