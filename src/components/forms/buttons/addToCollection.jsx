import React from "react";

const AddToCollection = ({ collections, handleAddToCollection, disabled }) => {
  return (
    <div className="btn-group" role="group">
      <button
        id="btnGroupDrop1"
        type="button"
        className="btn btn-outline-primary dropdown-toggle add-to-collection"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        disabled={disabled}
      >
        Add Selected Entries To...
      </button>
      <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
        {collections.map((collection, i) => (
          <button
            key={i}
            className="dropdown-item"
            onClick={() => handleAddToCollection(collection._id)}
          >
            {collection.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AddToCollection;
