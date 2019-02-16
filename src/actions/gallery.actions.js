import { SAVE_IMAGE, FLUSH_IMAGE } from './types';

export function saveImage(args) {
  return {
    type: SAVE_IMAGE,
    payload: args
  };
}

export function flushImage() {
  return { type: FLUSH_IMAGE };
}
