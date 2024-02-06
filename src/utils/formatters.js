export const convertFirebaseTimeToString = ({ time_created }) => {
  const seconds = time_created._seconds;
  const mili = seconds * 1000;
  const date = new Date(mili).toString();
  return date;
};

export const sortByTimeCreated = (arr) => {
  const copy = arr;

  copy.sort(function compareNumbers(a, b) {
    return a.time_created._seconds - b.time_created._seconds;
  });
  copy.reverse();
  return copy;
};

export const sortByNumber = (arr) => {
  const copy = arr;

  copy.sort(function compareNumbers(a, b) {
    return a.number - b.number;
  });
  copy.reverse();
  return copy;
};
