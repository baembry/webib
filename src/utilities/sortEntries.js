export const sortEntries = (entries, sortPersons, compareFunctions) => {
  return entries.sort(function(a, b) {
    return compareFunctions[0](a, b, sortPersons, compareFunctions.slice(1));
  });
};

const getSortingNames = (entry, sortPersons) => {
  if (
    [
      "book",
      "article",
      "bookContribution",
      "multivolumeWorkWithAuthor",
      "oneVolumeOfMultivolumeWorkWithAuthor"
    ].includes(entry.entryType)
  ) {
    return sortPersons(entry.authors) || null;
  } else {
    return sortPersons(entry.editors) || null;
  }
};

export const compareEntriesByName = (
  a,
  b,
  sortPersons,
  fallbackCompareFunctions
) => {
  const aAuthors = getSortingNames(a, sortPersons);
  const bAuthors = getSortingNames(b, sortPersons);
  const remainingCompareFunctions =
    fallbackCompareFunctions.length > 1
      ? fallbackCompareFunctions.slice(1)
      : false;
  let result = aAuthors
    .map((author, i) => {
      if (!bAuthors[i]) {
        return 1;
      } else if (author.lastName < bAuthors[i].lastName) {
        return -1;
      } else if (author.lastName > bAuthors[i].lastName) {
        return 1;
      } else {
        return 0;
      }
    })
    .find(num => num !== 0);

  if (result === undefined) {
    if (fallbackCompareFunctions) {
      result = fallbackCompareFunctions[0](
        a,
        b,
        sortPersons,
        remainingCompareFunctions
      );
    } else {
      result = 0;
    }
  }
  return result;
};

export function compareEntriesByTitle(
  a,
  b,
  sortPersons,
  fallbackCompareFunctions
) {
  const articles = /^a\s|^the\s|^an\s|^ le\s|^ la\s |^ les\s |^ l'|^un\s|^une\s|^des\s|^de\s|^d'|^der\s|^die\s|^das\s|^ein\s|^eine\s|^unos\s|^unas\s|^una\s|^el\s|^los|^las\s/i;
  const titleA = a.title.replace(articles, "");
  const titleB = b.title.replace(articles, "");
  const remainingCompareFunctions =
    fallbackCompareFunctions.length > 1
      ? fallbackCompareFunctions.slice(1)
      : false;
  if (titleA < titleB) {
    return -1;
  } else if (titleA > titleB) {
    return 1;
  } else {
    return fallbackCompareFunctions
      ? fallbackCompareFunctions[0](
          a,
          b,
          sortPersons,
          remainingCompareFunctions
        )
      : 0;
  }
}

export function compareEntriesByDate(
  a,
  b,
  sortPersons,
  fallbackCompareFunctions
) {
  const dateA = a.year;
  const dateB = b.year;
  const remainingCompareFunctions =
    fallbackCompareFunctions.length > 1
      ? fallbackCompareFunctions.slice(1)
      : false;
  if (dateA < dateB) {
    return -1;
  } else if (dateA > dateB) {
    return 1;
  } else {
    return fallbackCompareFunctions
      ? fallbackCompareFunctions[0](
          a,
          b,
          sortPersons,
          remainingCompareFunctions
        )
      : 0;
  }
}

export const sortMap = {
  compareEntriesByDate,
  compareEntriesByName,
  compareEntriesByTitle
};
