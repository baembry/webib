import React from "react";

const CollectionsDropdown = ({
  collections,
  handleCollectionSelect,
  value
}) => {
  return (
    <React.Fragment>
      <div className="collections-dropdown-container">
        <label htmlFor="collections">Select a collection</label>
        <select
          name="collections"
          className="form-control dropdown"
          onChange={handleCollectionSelect}
          value={value}
        >
          <option value="allEntries">All Entries</option>
          {collections.map((collection, i) => (
            <option key={i} value={collection._id}>
              {collection.name}
            </option>
          ))}
        </select>
      </div>
    </React.Fragment>
  );
};

export default CollectionsDropdown;
