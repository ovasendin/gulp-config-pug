import gulp from 'gulp';
import { cleanImages } from './clean';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import rename from 'gulp-rename';
import config from '../config';

const watchPath = `${config.src.images}/**/*.{jpg,jpeg,png,webp}`;

const copyImages = () =>
  gulp
    .src(watchPath)
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
    // может можно передать конкретный файл для сжатия
    .src(`${config.src.images}/**/*.{jpg,jpeg,png}`)
    .pipe(changed(config.dest.images, { extension: '.webp' }))
    .pipe(imagemin([imageminWebp({ quality: 80 })]))
    .pipe(
      rename({
        extname: '.webp',
      }),
    )
    .pipe(gulp.dest(`${config.dest.images}/webp`));

export const imagesBuild = gulp.series(copyImages, convertImagesToWebp);

const watcher = gulp.watch(watchPath, { ignoreInitial: false });

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
