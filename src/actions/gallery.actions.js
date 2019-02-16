import { SAVE_IMAGE } from './types';

export function saveImage(args) {
  return {
    type: SAVE_IMAGE,
    payload: args
  };
}
