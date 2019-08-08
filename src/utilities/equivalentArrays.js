//checks equivalence for 1-d arrrays of 1-d objects
export function areEquivalent(arr1, arr2) {
  var result = true;
  if (
    arr1.length !== arr2.length ||
    !Array.isArray(arr2) ||
    !Array.isArray(arr1)
  ) {
    return false;
  }
  arr1.forEach((author, i) => {
    if (
      author.firstName !== arr2[i].firstName ||
      author.lastName !== arr2[i].lastName
    ) {
      result = false;
    }
  });
  return result;
}
