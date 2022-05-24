import gulp from 'gulp';
import fs from 'fs';
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
    .src(`${config.src.images}/**/*.{jpg,jpeg,png}`)
    .pipe(changed(`${config.dest.images}/webp`, { extension: '.webp' }))
    .pipe(imagemin([imageminWebp({ quality: 80 })]))
    .pipe(
      rename({
        extname: '.webp',
      }),
    )
    .pipe(gulp.dest(`${config.dest.images}/webp`));

const replacePath = (path, webp) => {
  if (webp === 'webp')
    return (
      path
        .replace('app', 'build')
        .replace('assets\\images', 'images\\webp')
        .substr(0, path.lastIndexOf('.')) + '.webp'
    );
  else return path.replace('app', 'build').replace('assets\\', '');
};

export const imagesBuild = gulp.series(copyImages, convertImagesToWebp);

const watcher = gulp.watch(watchPath, { ignoreInitial: false });

export const imagesWatch = () =>
  watcher
    .on('add', function (path, stats) {
      imagesBuild();
    })
    .on('unlink', function (path, stats) {
      fs.unlinkSync(replacePath(path));
      fs.unlinkSync(replacePath(path, 'webp'));
      imagesBuild();
    })
    .on('change', function (path, stats) {
      imagesBuild();
    });
