import React from "react";

const DeleteButton = ({
  handleDeleteFromCollection,
  handleDeleteFromEntries,
  collectionId
}) => {
  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-danger dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Delete
      </button>
      <div className="dropdown-menu">
        <button
          className="dropdown-item"
          onClick={handleDeleteFromCollection}
          disabled={!collectionId}
        >
          From Collection
        </button>
        <button className="dropdown-item" onClick={handleDeleteFromEntries}>
          From Entries
        </button>
      </div>
    </div>
  );
};

export default DeleteButton;
