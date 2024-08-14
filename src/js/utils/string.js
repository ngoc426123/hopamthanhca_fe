export function convertAuthorfromArray(array) {
  if (!array.length) return '';

  return array.reduce((pre, cum, idx) => `${pre}${idx > 0 ? ', ' : ''} ${cum.cat_name}`, '');
}