const srcPath = 'app';
const destPath = 'build';

const config = {
  src: {
    root: srcPath,
    pug: `${srcPath}/files/pug`,
    sass: `${srcPath}/files/scss`,
    js: `${srcPath}/files/js`,
    fonts: `${srcPath}/files/assets/fonts`,
    images: `${srcPath}/files/assets/images`,
    svg: `${srcPath}/files/assets/svg`,
  },

  dest: {
    root: destPath,
    html: `${destPath}`,
    css: `${destPath}/files/css`,
    js: `${destPath}/files/js`,
    fonts: `${destPath}/files/fonts`,
    images: `${destPath}/files/images`,
    svg: `${destPath}/files/svg`,
  },

  setEnv() {
    this.isProd = process.argv.includes('--prod');
    this.isDev = !this.isProd;
  },
};

export default config;
