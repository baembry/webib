import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getLabel } from "../utilities/labels";

import DeleteButton from "../components/forms/buttons/deleteButton";

const ShowEntry = ({
  entry,
  unshowEntry,
  handleDeleteFromCollection,
  handleDeleteFromEntries,
  collections,
  collectionId
}) => {
  const handleAddToCollection = async e => {
    const collectionId = e.currentTarget.value;
    const entryId = entry._id;
    try {
      await axios.put("/collections/" + collectionId, { entryId, add: true });
    } catch (error) {
      console.log(error);
    }
    window.location = "/entries";
    unshowEntry();
  };
  return (
    <React.Fragment>
      <div className="showEntry__backdrop" onClick={unshowEntry} />
      <div className="showEntry">
        <div className="showEntry__buttons">
          <Link
            to={"/entries/" + entry._id + "/edit"}
            className="btn btn-primary no-width"
          >
            Edit Entry
          </Link>
          <DeleteButton
            handleDeleteFromCollection={() =>
              handleDeleteFromCollection(entry._id)
            }
            handleDeleteFromEntries={() => handleDeleteFromEntries(entry._id)}
            collectionId={collectionId}
          />

          <div className="showEntry__addToCollection">
            <select
              name="addToCollection"
              className="form-control"
              onChange={handleAddToCollection}
            >
              <option value={null}>Add to Collection...</option>
              {collections.map(collection => {
                return (
                  <option key={collection._id} value={collection._id}>
                    {collection.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="info">Title: {entry.title}</div>
        <div className="info">Entry Type: {getLabel(entry.entryType)}</div>
        <div className="info">Notes: {entry.notes}</div>
        <div className="info">Abstract: {entry.abstract}</div>
      </div>
    </React.Fragment>
  );
};

export default ShowEntry;
