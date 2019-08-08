import { formatMap } from '../utilities/formatters';
import { sortMap } from '../utilities/sortEntries';
import { sortEntries } from './sortEntries';

//the default templates are from Chicago 16 Bibliography
//this function recieves as an argument a style object as in styles.js
//the function then creates an instance with the proper methods
export function Style({
  label,
  primaryPersonFormatter,
  secondaryPersonFormatter,
  firstNameFormatter,
  middleNameFormatter,
  connector,
  pageFormatter,
  sortBy,
  sortPersonList,
  styles,
  useEtAlAfter,
  etAlThreshhold,
  templates,
}) {
  this.label = label;
  this.firstNameFormatter = formatMap[firstNameFormatter];
  this.middleNameFormatter = formatMap[middleNameFormatter];
  this.connector = connector;
  this.sortPersonList = formatMap[sortPersonList];
  this.useEtAlAfter = useEtAlAfter;
  this.etAlThreshhold = etAlThreshhold;
  this.primaryPersonFormatter = formatMap[primaryPersonFormatter](
    this.connector,
    this.firstNameFormatter,
    this.middleNameFormatter,
    this.sortPersonList,
    this.useEtAlAfter,
    etAlThreshhold
  );
  this.secondaryPersonFormatter = formatMap[secondaryPersonFormatter](
    this.connector,
    this.firstNameFormatter,
    this.middleNameFormatter,
    this.sortPersonList,
    this.useEtAlAfter,
    etAlThreshhold
  );
  this.pageFormatter = formatMap[pageFormatter];

  //yields an array of sorting algorithms
  this.sortBy = sortBy.map(algorithm => sortMap[algorithm]);

  this.sortAlgorithm = function(entries) {
    return sortEntries(entries, this.sortPersonList, this.sortBy);
  };

  this.book = {
    templates: templates.book,

    style: styles.book,
    format: {
      authors: this.primaryPersonFormatter,
      editors: this.secondaryPersonFormatter,
      translators: this.secondaryPersonFormatter,
    },
  };
  this.article = {
    templates: templates.article,

    style: styles.article,
    format: {
      authors: this.primaryPersonFormatter,
      translators: this.secondaryPersonFormatter,
      pageRange: this.pageFormatter,
    },
  };

  this.editedVolume = {
    templates: templates.editedVolume,

    style: styles.editedVolume,
    format: {
      editors: this.primaryPersonFormatter,
      translators: this.secondaryPersonFormatter,
    },
  };

  this.multivolumeWorkWithAuthor = {
    templates: templates.multivolumeWorkWithAuthor,

    style: styles.multivolumeWorkWithAuthor,
    format: {
      authors: this.primaryPersonFormatter,
      editors: this.secondaryPersonFormatter,
      translators: this.secondaryPersonFormatter,
    },
  };

  this.multivolumeWorkWithEditor = {
    templates: templates.multivolumeWorkWithEditor,

    style: styles.multivolumeWorkWithEditor,
    format: {
      editors: this.primaryPersonFormatter,
      authors: this.secondaryPersonFormatter,
      translators: this.secondaryPersonFormatter,
    },
  };
  this.bookContribution = {
    templates: templates.bookContribution,

    style: styles.bookContribution,
    format: {
      authors: this.primaryPersonFormatter,
      editors: this.secondaryPersonFormatter,
      translators: this.secondaryPersonFormatter,
      pageRange: this.pageFormatter,
    },
  };
  this.oneVolumeOfMultivolumeWorkWithAuthor = {
    templates: templates.oneVolumeOfMultivolumeWorkWithAuthor,

    style: styles.oneVolumeOfMultivolumeWorkWithAuthor,
    format: {
      authors: this.primaryPersonFormatter,
      editors: this.secondaryPersonFormatter,
      translators: this.secondaryPersonFormatter,
    },
  };
  this.oneVolumeOfMultivolumeWorkWithEditor = {
    templates: templates.oneVolumeOfMultivolumeWorkWithEditor,

    style: styles.oneVolumeOfMultivolumeWorkWithEditor,
    format: {
      editors: this.primaryPersonFormatter,
      authors: this.secondaryPersonFormatter,
      translators: this.secondaryPersonFormatter,
    },
  };
}
