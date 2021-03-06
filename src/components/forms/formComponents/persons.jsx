import React from 'react';

const getLabel = name => {
  return name.slice(0, 1).toUpperCase() + name.slice(1, -1);
};

const Persons = ({
  counters,
  handleChange,
  handleFilter,
  data,
  requiredFields,
}) => {
  const types = Object.keys(counters);
  return types.map(personType => {
    const label = getLabel(personType);
    const persons = [...Array(counters[personType])].map((_, index) => {
      const personNumber = index + 1;
      return (
        <React.Fragment key={index}>
          <div className="form-group">
            <label>{label + ' ' + personNumber + ' First Name'}</label>
            <input
              type="text"
              title="Will be rendered as entered."
              name={personType + '[' + index + ']firstName'}
              value={
                //this ternary isn't strictly necessary, but it's more robust in case data[personType][index] does not exist
                data[personType][index] ? data[personType][index].firstName : ''
              }
              className="form-control"
              placeholder={label + ' ' + personNumber + ' First Name'}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>{label + ' ' + personNumber + ' Middle Name'}</label>
            <input
              type="text"
              title="Will be rendered as entered."
              name={personType + '[' + index + ']middleName'}
              value={
                data[personType][index]
                  ? data[personType][index].middleName
                  : ''
              }
              className="form-control"
              placeholder={label + ' ' + personNumber + ' Middle Name'}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>{label + ' ' + personNumber + ' Last Name'}</label>
            <input
              type="text"
              title="Will be rendered as entered."
              name={personType + '[' + index + ']lastName'}
              value={
                data[personType][index] ? data[personType][index].lastName : ''
              }
              className="form-control"
              placeholder={label + ' ' + personNumber + ' Last Name'}
              onBlur={handleFilter}
              onChange={handleChange}
              required={requiredFields.includes(personType)}
            />
          </div>
        </React.Fragment>
      );
    });
    return persons;
  });
};

export default Persons;
