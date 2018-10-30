import React from "react";

const CollectionsDropdown = ({
  collections,
  handleCollectionSelect,
  value
}) => {
  return (
    <select
      name="style"
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
  );
};

export default CollectionsDropdown;
