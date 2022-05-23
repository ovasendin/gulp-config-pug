import browsersync from 'browser-sync';
import config from '../config';

const server = (callback) => {
  browsersync.create().init({
    server: {
      baseDir: config.dest.root,
    },
    // Следить за файлами
    files: [
      `${config.dest.html}/*.html`,
      `${config.dest.css}/**/*.css`,
      `${config.dest.js}/*.js`,
      // Обновляем, если происходят изменения в изображениях
      {
        match: `${config.dest.images}/**/*.{jpg,jpeg,png,gif,ico,svg,webp}`,
        fn() {
          this.reload();
        },
      },
    ],
    open: false,
    notify: false,
  });

  callback();
};

export default server;
