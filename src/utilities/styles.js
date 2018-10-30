const standardStyling = {
  book: {
    title: { fontStyle: "italic" }
  },
  article: {
    journal: { fontStyle: "italic" }
  },
  editedVolume: {
    title: { fontStyle: "italic" }
  },
  bookContribution: {
    volumeTitle: { fontStyle: "italic" }
  },
  multivolumeWorkWithAuthor: {
    title: { fontStyle: "italic" },
    seriesTitle: { fontStyle: "italic" }
  },
  multivolumeWorkWithEditor: {
    title: { fontStyle: "italic" },
    seriesTitle: { fontStyle: "italic" }
  },
  oneVolumeOfMultivolumeWorkWithAuthor: {
    title: { fontStyle: "italic" },
    seriesTitle: { fontStyle: "italic" }
  },
  oneVolumeOfMultivolumeWorkWithEditor: {
    title: { fontStyle: "italic" },
    seriesTitle: { fontStyle: "italic" }
  }
};
//==============================Chicago 16 Bib===============================

const chicago16bib = {
  _id: "chicago16bib",
  label: "Chicago 16th ed. Bibliography",
  primaryPersonFormatter: "FirstLastFirstLast",
  secondaryPersonFormatter: "FirstLastFirstLast",
  firstNameFormatter: "getFirstName",
  middleNameFormatter: "getMiddleName",
  connector: "and",
  pageFormatter: "truncEndPage",
  sortBy: ["compareEntriesByName", "compareEntriesByTitle"],
  sortPersonList: "sortByLastName",
  styles: standardStyling,
  useEtAlAfter: 7,
  etAlThreshhold: 10,
  templates: {
    book: [
      "/authors/. ",
      "/title/. ",
      "Translated by /translators/. ",
      "Edited by /editors/. ",
      "/edition/ ed. ",
      "/city/: ",
      "/publisher/, ",
      "/year/."
    ],
    article: [
      "/authors/. ",
      '"/title/." ',
      "/journal/ ",
      "/volume/, ",
      "no. /issue/ ",
      "(/year/): ",
      "/pageRange/."
    ],
    editedVolume: [
      "/editors/, ed(s). ",
      "/title/. ",
      "Translated by /translators/. ",
      "/edition/ ed.",
      "/city/: ",
      "/publisher/, ",
      "/year/."
    ],
    bookContribution: [
      "/authors/. ",
      '"/title/. " ',
      "Translated by /translators/. ",
      "In /volumeTitle/, ",
      "edited by /editors/, ",
      "/pageRange/. ",
      "/city/: ",
      "/publisher/, ",
      "/year/."
    ],
    multivolumeWorkWithAuthor: [
      "/authors/. ",
      "/title/. ",
      "Translated by /translators/. ",
      "Edited by /editors/. ",
      "/edition/ ed. ",
      "/numberOfVolumes/ vols. ",
      "/city/: ",
      "/publisher/, ",
      "/year/."
    ],
    multivolumeWorkWithEditor: [
      "/editors/, ed(s). ",
      "/title/. ",
      "Translated by /translators/. ",
      "/edition/ ed.",
      "/numberOfVolumes/ vols. ",
      "/city/: ",
      "/publisher/, ",
      "/year/."
    ],
    oneVolumeOfMultivolumeWorkWithAuthor: [
      "/authors/. ",
      "/title/. ",
      "Vol. /volume/ ",
      "of /seriesTitle/. ",
      "Translated by /translators/. ",
      "Edited by /editors/. ",
      "/city/: ",
      "/publisher/, ",
      "/year/."
    ],
    oneVolumeOfMultivolumeWorkWithEditor: [
      "/editors/, ed(s). ",
      "/title/. ",
      "Vol. /volume/ ",
      "of /seriesTitle/. ",
      "Translated by /translators/. ",
      "/city/: ",
      "/publisher/, ",
      "/year/."
    ]
  }
};

//==============================Chicago 16 Notes===============================

const chicago16Notes = {
  _id: "chicago16Notes",
  label: "Chicago 16th ed. Notes",
  primaryPersonFormatter: "FirstLastFirstLast",
  secondaryPersonFormatter: "FirstLastFirstLast",
  firstNameFormatter: "getFirstName",
  middleNameFormatter: "getMiddleInitial",
  connector: "and",
  sortPersonList: "sortByLastName",
  pageFormatter: "truncEndPage",
  sortBy: ["compareEntriesByName", "compareEntriesByTitle"],
  styles: standardStyling,
  useEtAlAfter: 1,
  etAlThreshhold: 4,
  templates: {
    book: [],
    article: [],
    editedVolume: [],
    multivolumeWorkWithAuthor: [],
    multivolumeWorkWithEditor: [],
    oneVolumeOfMultivolumeWorkWithAuthor: [],
    oneVolumeOfMultivolumeWorkWithEditor: []
  }
};

chicago16Notes.templates.book = [
  "/authors/, ",
  "/title/",
  ", /edition/ ed.",
  ", trans. /translators/",
  ", ed. /editors/",
  " (/city/: ",
  "/publisher/, ",
  "/year/)."
];
chicago16Notes.templates.editedVolume = [
  "/editors/, ed(s)., ",
  "/title/",
  " (/city/: ",
  "/publisher/, ",
  "/year/)."
];
chicago16Notes.templates.bookContribution = [
  "/authors/, ",
  '"/title/," ',
  "in /volumeTitle/, ",
  "ed. /editors/ ",
  "(/city/: ",
  "/publisher/, ",
  "/year/)."
];
chicago16Notes.templates.article = [
  "/authors/, ",
  '"/title/," ',
  "/journal/ ",
  "/volume/, ",
  "no. /issue/ ",
  "(/year/): ",
  "/pageRange/."
];
chicago16Notes.templates.multivolumeWorkWithAuthor = [
  "/authors/, ",
  "/title/",
  ", /edition/ ed.",
  ", trans. /translators/",
  ", ed. /editors/",
  ", /numberOfVolumes/ vols. ",
  " (/city/: ",
  "/publisher/, ",
  "/year/)."
];
chicago16Notes.templates.multivolumeWorkWithEditor = [
  "/editors/, ed(s).,",
  "/title/",
  ", /edition/ ed.",
  ", trans. /translators/",
  ", /numberOfVolumes/ vols. ",
  " (/city/: ",
  "/publisher/, ",
  "/year/)."
];
chicago16Notes.templates.oneVolumeOfMultivolumeWorkWithAuthor = [
  "/authors/, ",
  "/seriesTitle/, ",
  "ed. /editors/, ",
  "vol. /volume/, ",
  "/title/ ",
  "(/city/: ",
  "/publisher/, ",
  "/year/)."
];
chicago16Notes.templates.oneVolumeOfMultivolumeWorkWithEditor = [
  "/editors/, ed(s)., ",
  "/seriesTitle/, ",
  "ed. /editors/, ",
  "vol. /volume/, ",
  "/title/ ",
  "(/city/: ",
  "/publisher/, ",
  "/year/)."
];

//==============================APA 6===============================
//for some reason both of these methods are changing standardStyling; fix
// let apaStyling = { ...standardStyling };
let apaStyling = Object.assign({}, standardStyling);
apaStyling.oneVolumeOfMultivolumeWorkWithAuthor.volume = {
  fontStyle: "italic"
};
apaStyling.oneVolumeOfMultivolumeWorkWithEditor.volume = {
  fontStyle: "italic"
};
const apa6 = {
  _id: "apa6",
  label: "APA 6th ed.",
  primaryPersonFormatter: "LastFirstLastFirst",
  secondaryPersonFormatter: "FirstLastFirstLast",
  firstNameFormatter: "getFirstInitial",
  middleNameFormatter: "getMiddleInitial",
  connector: "&",
  sortPersonList: "sortByLastName",
  pageFormatter: "noFormat",
  sortBy: [
    "compareEntriesByName",
    "compareEntriesByDate",
    "compareEntriesByTitle"
  ],
  styles: apaStyling,
  useEtAlAfter: false,
  etAlThreshhold: false,
  templates: {
    book: [],
    article: [],
    editedVolume: [],
    multivolumeWorkWithAuthor: [],
    multivolumeWorkWithEditor: [],
    oneVolumeOfMultivolumeWorkWithAuthor: [],
    oneVolumeOfMultivolumeWorkWithEditor: []
  }
};

apa6.templates.book = [
  "/authors/. ",
  "(/year/). ",
  "/title/ ",
  "/city/: ",
  "/publisher/. ",
  "/retrievedFrom/"
];

apa6.templates.editedVolume = [
  "/editors/ (Ed(s).). ",
  "(/year/). ",
  "/title/ ",
  "/city/: ",
  "/publisher/. ",
  "/retrievedFrom/"
];

apa6.templates.article = [
  "/authors/. ",
  "(/year/) ",
  "/title/. ",
  "/journal/, ",
  "/volume/, ",
  "/pageRange/. ",
  "/retrievedFrom/"
];

apa6.templates.bookContribution = [
  "/authors/. ",
  "(/year/). ",
  "/title/. ",
  "In /editors/ (Ed(s).), ",
  "/volumeTitle/ ",
  "(pp. /pageRange/). ",
  "/city/: ",
  "/publisher/. ",
  "/retrievedFrom/"
];

apa6.templates.multivolumeWorkWithAuthor = [
  "/authors/. ",
  "(/year/). ",
  "/title/ ",
  "(Vols. 1-/numberOfVolumes/). ",
  "/city/: ",
  "/publisher/.",
  "/retrievedFrom/"
];

apa6.templates.multivolumeWorkWithEditor = [
  "/editors/ (Ed(s).). ",
  "(/year/). ",
  "/title/ ",
  "(Vols. 1-/numberOfVolumes/). ",
  "/city/: ",
  "/publisher/.",
  "/retrievedFrom/"
];

apa6.templates.oneVolumeOfMultivolumeWorkWithAuthor = [
  "/authors/. ",
  "(/year/). ",
  "/title/. ",
  "In /editors/ (Ed(s).), ",
  "/seriesTitle/: ",
  "Vol. /volume/. ",
  "/city/: ",
  "/publisher/.",
  "/retrievedFrom/"
];
apa6.templates.oneVolumeOfMultivolumeWorkWithEditor = [
  "/editors/ (Ed(s).). ",
  "(/year/). ",
  "/title/. ",
  "In /seriesTitle/: ",
  "Vol. /volume/. ",
  "/city/: ",
  "/publisher/.",
  "/retrievedFrom/"
];
//=============================MLA===================================
const mla3 = {
  _id: "mla3",
  label: "MLA 3rd ed.",
  primaryPersonFormatter: "LastFirstFirstLast",
  secondaryPersonFormatter: "FirstLastFirstLast",
  firstNameFormatter: "getFirstName",
  middleNameFormatter: "getMiddleName",
  connector: "and",
  sortPersonList: "sortByLastName",
  pageFormatter: "truncEndPage",
  sortBy: [
    "compareEntriesByName",
    "compareEntriesByTitle",
    "compareEntriesByDate"
  ],
  styles: standardStyling,
  useEtAlAfter: false,
  etAlThreshhold: false,
  templates: {
    book: [],
    article: [],
    editedVolume: [],
    multivolumeWorkWithAuthor: [],
    multivolumeWorkWithEditor: [],
    oneVolumeOfMultivolumeWorkWithAuthor: [],
    oneVolumeOfMultivolumeWorkWithEditor: []
  }
};

mla3.templates.book = [
  "/authors/. ",
  "/title/. ",
  "/edition/ ed.",
  "Trans. /translators/. ",
  "/city/: ",
  "/publisher/, ",
  "/year/. ",
  "/retrievedFrom/"
];

mla3.templates.editedVolume = [
  "/editors/, ed(s). ",
  "/title/. ",
  "/edition/ ed.",
  "/city/: ",
  "/publisher/, ",
  "/year/. ",
  "/retrievedFrom/"
];

mla3.templates.article = [
  "/authors/. ",
  '"/title/." ',
  "/journal/ ",
  "/volume/.",
  "/issue/ ",
  "(/year/): ",
  "/pageRange/. ",
  "/retrievedFrom/"
];

mla3.templates.bookContribution = [
  "/authors/. ",
  '"/title/." ',
  "Trans. /translators/. ",
  "/volumeTitle/. ",
  "/edition/ ed.",
  "Trans. /translators/. ",
  "Ed. /editors/. ",
  "/city/: ",
  "/publisher/, ",
  "/year/. ",
  "/pageRange/. ",
  "/retrievedFrom/"
];

mla3.templates.multivolumeWorkWithAuthor = [
  "/authors/. ",
  "/title/. ",
  "/edition/ ed.",
  "Trans. /translators/. ",
  "Ed. /editors/. ",
  "/numberOfVolumes/ vols. ",
  "/city/: ",
  "/publisher/, ",
  "/year/. ",
  "/retrievedFrom/"
];

mla3.templates.multivolumeWorkWithEditor = [
  "/editors/, ed(s). ",
  "/title/. ",
  "/edition/ ed.",
  "Trans. /translators/. ",
  "/numberOfVolumes/ vols. ",
  "/city/: ",
  "/publisher/, ",
  "/year/. ",
  "/retrievedFrom/"
];

mla3.templates.oneVolumeOfMultivolumeWorkWithAuthor = [
  "/authors/. ",
  "/title/. ",
  "Trans. /translators/. ",
  "/seriesTitle/. ",
  "Ed. /editors/. ",
  "/edition/ ed.",
  "Vol. /volume/. ",
  "/city/: ",
  "/publisher/, ",
  "/year/. ",
  "/retrievedFrom/"
];
mla3.templates.oneVolumeOfMultivolumeWorkWithEditor = [
  "/editors/, ed(s). ",
  "/title/. ",
  "Trans. /translators/. ",
  "/seriesTitle/. ",
  "/edition/ ed.",
  "Vol. /volume/. ",
  "/city/: ",
  "/publisher/, ",
  "/year/. ",
  "/retrievedFrom/"
];
//==============================Export===============================

export default [chicago16bib, chicago16Notes, apa6, mla3];
