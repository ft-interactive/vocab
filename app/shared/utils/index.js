/**
 * Various utility functions
 */
// @flow
export const slug = (str: string) => str.toLowerCase().replace(/\s/g, '-');

export const bool = (str: string) => {
  if (str.toLowerCase().trim() === 'true') return true;
  else if (str.toLowerCase().trim() === 'false') return false;
  throw new Error('Invalid value detected');
};
