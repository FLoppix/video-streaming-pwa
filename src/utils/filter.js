export const filterDuplicates = array => {
  return array.filter((elem, pos, arr) => {
    return arr.indexOf(elem) === pos;
  });
};
