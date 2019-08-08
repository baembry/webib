import React from 'react';
import { areEquivalent } from '../utilities/equivalentArrays';

const Entry = ({
  entry,
  previousEntry,
  style,
  onClick,
  handleCheck,
  checkboxDisplay,
  useEmDash,
  serializeDates,
}) => {
  const getSpan = (name, i) => {
    const spanStyle = style[entry.entryType].style
      ? style[entry.entryType].style[name]
      : null;

    return (
      <span key={i} style={spanStyle}>
        {/* format the field value if the style has a formatter for that field */}
        {style[entry.entryType].format[name]
          ? style[entry.entryType].format[name](entry[name])
          : // otherwise, just include the field value
            entry[name] +
            //add letters to the year if serialize Dates is selected
            (name === 'year' && serializeDates ? entry.annoAddendum : '')}
      </span>
    );
  };

  const getTextContent = name => {
    let text = style[entry.entryType].format[name]
      ? style[entry.entryType].format[name](entry[name])
      : entry[name];
    text = text.replace('..', '.');
    return text;
  };

  function getPrimaryPerson(entry) {
    const template0 = style[entry.entryType].templates[0];
    var fieldName = template0.match(/\/\w+\//i)[0];
    fieldName = fieldName.slice(1, fieldName.length - 1);
    return entry[fieldName];
  }

  const fillTemplate = entry => {
    var result;
    if (!style[entry.entryType]) {
      result = (
        <span style={{ color: 'red' }}>
          {entry.title + ' invalid entry type or style'}
        </span>
      );
    } else {
      //e.g., style.book.templates === ['/authors/.', '/title/', etc...]
      result = style[entry.entryType].templates.reduce(function(
        acc,
        template,
        i
      ) {
        // template === a string like 'ed. /editors/.'
        var fieldName = template.match(/\/\w+\//i)[0];

        //fieldName turns into 'editors', e.g.
        fieldName = fieldName.slice(1, fieldName.length - 1);

        //splits template into parts like this ['ed. ', 'editors', '.']
        var templateParts = template.split('/');

        var indexOfFieldName = templateParts.indexOf(fieldName);

        //fill template only if entry has corresponding field value
        if (!entry[fieldName] || entry[fieldName].length === 0) {
          return acc;
        } else if (
          //for using emdash
          previousEntry &&
          useEmDash &&
          i === 0 &&
          areEquivalent(entry[fieldName], getPrimaryPerson(previousEntry))
        ) {
          //replace author name with ---
          templateParts.splice(
            indexOfFieldName,
            1,
            <span key={i}>&mdash;&mdash;&mdash;</span>
          );
        } else {
          //wraps field in span for styling
          templateParts.splice(indexOfFieldName, 1, getSpan(fieldName, i));
        }
        //eliminate ".." in case initial ends authors list
        if (
          getTextContent(fieldName).endsWith('.') &&
          templateParts[indexOfFieldName + 1].startsWith('.')
        ) {
          templateParts[indexOfFieldName + 1] = templateParts[
            indexOfFieldName + 1
          ].slice(1);
        }

        //take care of eds. problem ad hoc;
        //an 's' in parentheses is optional; it appears only if the related field has multiple entries, like
        //multiple editors.
        const indexMutandi = templateParts.findIndex(
          part => typeof part === 'string' && part.includes('(s)')
        );

        if (indexMutandi > -1) {
          //only one editor, author, etc.
          if (entry[fieldName].length < 2) {
            templateParts[indexMutandi] = templateParts[indexMutandi].replace(
              '(s)',
              ''
            );
          } else {
            //multiple editors, authors, etc.
            templateParts[indexMutandi] = templateParts[indexMutandi].replace(
              '(s)',
              's'
            );
          }
        }

        return [...acc, templateParts];
      },
      []);
    }
    return result;
  };

  return (
    <div className="clickable hover entry__container">
      <input
        type="checkbox"
        value={entry._id}
        onClick={handleCheck}
        style={{ display: checkboxDisplay, marginRight: '0.5rem' }}
      />
      <span className="entry" onClick={e => onClick(e, entry)}>
        {fillTemplate(entry)}
      </span>
    </div>
  );
};

export default Entry;
