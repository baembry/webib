export const LastFirstFirstLast = (
  connector,
  formatFirstName,
  formatMiddleName,
  sort,
  useEtAlAfter,
  etAlThreshhold
  //pass etAlValue and etAlThreshhold, then if i === etAlValue, and arr.length > etAlThreshhold, rest += 'et al' break.
) => {
  return function(arr) {
    sort(arr);
    const start = `${arr[0].lastName}, ${formatFirstName(
      arr[0].firstName
    )}${formatMiddleName(arr[0].middleName)}`;

    var rest = "";
    for (var i = 1; i < arr.length; i++) {
      if (i === useEtAlAfter && arr.length >= etAlThreshhold) {
        rest += ", et al.";
        break;
      } else if (i === arr.length - 1) {
        rest += `, ${connector} ${formatFirstName(
          arr[i].firstName
        )}${formatMiddleName(arr[i].middleName)} ${arr[i].lastName}`;
      } else {
        rest += `, ${formatFirstName(arr[i].firstName)}${formatMiddleName(
          arr[i].middleName
        )} ${arr[i].lastName}`;
      }
    }
    return start + rest;
  };
};

export const LastFirstLastFirst = (
  connector,
  formatFirstName,
  formatMiddleName,
  sort,
  useEtAlAfter,
  etAlThreshhold
) => {
  return function(arr) {
    sort(arr);
    const start = `${arr[0].lastName}, ${formatFirstName(
      arr[0].firstName
    )}${formatMiddleName(arr[0].middleName)}`;
    var rest = "";
    for (var i = 1; i < arr.length; i++) {
      if (i === useEtAlAfter && arr.length >= etAlThreshhold) {
        rest += ", et al.";
        break;
      } else if (i === arr.length - 1) {
        rest += `, ${connector} ${arr[i].lastName}, ${formatFirstName(
          arr[i].firstName
        )}${formatMiddleName(arr[i].middleName)}`;
      } else {
        rest += `, ${arr[i].lastName}, ${formatFirstName(
          arr[i].firstName
        )}${formatMiddleName(arr[i].middleName)}`;
      }
    }
    return start + rest;
  };
};

export const FirstLastFirstLast = (
  connector,
  formatFirstName,
  formatMiddleName,
  sort,
  useEtAlAfter,
  etAlThreshhold
) => {
  return function(arr) {
    sort(arr);
    const start =
      arr[0].firstName +
      formatMiddleName(arr[0].middleName) +
      " " +
      arr[0].lastName;

    var rest = "";
    for (var i = 1; i < arr.length; i++) {
      if (i === useEtAlAfter && arr.length >= etAlThreshhold) {
        rest += ", et al.";
        break;
      } else if (i === arr.length - 1 && arr.length === 2) {
        rest += ` ${connector} ${formatFirstName(
          arr[i].firstName
        )}${formatMiddleName(arr[i].middleName)} ${arr[i].lastName}`;
      } else if (i === arr.length - 1) {
        rest += `, ${connector} ${formatFirstName(
          arr[i].firstName
        )}${formatMiddleName(arr[i].middleName)} ${arr[i].lastName}`;
      } else {
        rest += `, ${formatFirstName(arr[i].firstName)}${formatMiddleName(
          arr[i].middleName
        )} ${arr[i].lastName}`;
      }
    }
    return start + rest;
  };
};

//these are the same. deprecate
export const getFirstInitial = name => {
  return name ? name.slice(0, 1) + "." : "";
};

export const getMiddleInitial = name => {
  return name ? " " + name.slice(0, 1) + "." : "";
};

export const getFirstName = name => {
  return name || "";
};

export const getMiddleName = name => {
  if (name === undefined) {
    return "";
  } else {
    return " " + name;
  }
};

export const truncEndPage = pageRange => {
  //this is from chicago edition 1-16
  //exclude roman numerals
  if (pageRange.match(/[a-z]/gi)) {
    return pageRange;
  }

  let pageArr = pageRange.split("-");
  const startPage = pageArr[0];
  let endPage = pageArr[1];
  let trunc;

  if (startPage > 100 && startPage.slice(-2) > 0 && startPage.slice(-2) < 10) {
    for (let i = 0; i < endPage.length; i++) {
      if (startPage[i] !== endPage[i]) {
        trunc = endPage.slice(i);
        break;
      }
    }
  } else if (startPage > 109) {
    for (let i = 0; i < endPage.length; i++) {
      if (startPage[i] !== endPage[i]) {
        trunc = endPage.slice(i);
        break;
      }
    }
    if (trunc.length < 2) {
      trunc = endPage.slice(-2);
    }
  }

  return startPage + "-" + trunc;
};

export const noFormat = _ => _;
export const noOrder = _ => _;

export const sortByLastName = arr => {
  return arr.sort(function(a, b) {
    const nameA = a.lastName.toUpperCase();
    const nameB = b.lastName.toUpperCase();
    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
};

export const formatMap = {
  FirstLastFirstLast,
  LastFirstFirstLast,
  LastFirstLastFirst,
  getFirstInitial,
  getMiddleInitial,
  getFirstName,
  getMiddleName,
  truncEndPage,
  noFormat,
  sortByLastName,
  noOrder
};
