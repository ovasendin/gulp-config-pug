import del from 'del';
import config from '../config';

export const cleanRoot = () => del(config.dest.root);
export const cleanFonts = () => del(config.dest.fonts);
