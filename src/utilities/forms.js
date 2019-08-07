export const forms = {
  book: {
    //for validation
    requiredFields: ["authors", "title"],
    fieldsToGenerate: [
      "title",
      "edition",
      "publisher",
      "year",
      "city",
      "retrievedFrom"
    ],
    //sets the number of input feilds for each type
    counters: { authors: 1, editors: 0, translators: 0 }
  },
  article: {
    requiredFields: ["authors", "title"],
    fieldsToGenerate: [
      "title",
      "journal",
      "year",
      "volume",
      "issue",
      "startPage",
      "endPage",
      "retrievedFrom"
    ],
    counters: { authors: 1, editors: 0, translators: 0 }
  },
  bookContribution: {
    requiredFields: ["authors", "editors", "title"],
    fieldsToGenerate: [
      "title",
      "volumeTitle",
      "edition",
      "publisher",
      "year",
      "city",
      "startPage",
      "endPage",
      "retrievedFrom"
    ],
    counters: { authors: 1, editors: 1, translators: 0 }
  },
  editedVolume: {
    requiredFields: ["editors", "title"],
    fieldsToGenerate: [
      "title",
      "edition",
      "publisher",
      "year",
      "city",
      "retrievedFrom"
    ],
    counters: { authors: 0, editors: 1, translators: 0 }
  },
  multivolumeWorkWithAuthor: {
    requiredFields: ["title"],
    fieldsToGenerate: [
      "title",
      "edition",
      "numberOfVolumes",
      "publisher",
      "year",
      "city",
      "retrievedFrom"
    ],
    //sets the number of input feilds for each type
    counters: { authors: 1, editors: 0, translators: 0 }
  },
  multivolumeWorkWithEditor: {
    requiredFields: ["title"],
    fieldsToGenerate: [
      "title",
      "edition",
      "numberOfVolumes",
      "publisher",
      "year",
      "city",
      "retrievedFrom"
    ],
    //sets the number of input feilds for each type
    counters: { authors: 0, editors: 1, translators: 0 }
  },
  oneVolumeOfMultivolumeWorkWithAuthor: {
    //for validation
    requiredFields: ["authors", "title"],
    fieldsToGenerate: [
      "title",
      "seriesTitle",
      "edition",
      "volume",
      "publisher",
      "year",
      "city",
      "retrievedFrom"
    ],
    //sets the number of input feilds for each type
    counters: { authors: 1, editors: 0, translators: 0 }
  },
  oneVolumeOfMultivolumeWorkWithEditor: {
    //for validation
    requiredFields: ["editors", "title"],
    fieldsToGenerate: [
      "title",
      "seriesTitle",
      "edition",
      "volume",
      "publisher",
      "year",
      "city",
      "retrievedFrom"
    ],
    //sets the number of input feilds for each type
    counters: { authors: 0, editors: 1, translators: 0 }
  }
};

export default forms;
