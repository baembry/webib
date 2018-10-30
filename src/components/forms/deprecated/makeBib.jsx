import React from "react";
import axios from "axios";

import Collection from "../../collection";
import NewEntry from "../newEntry";

class MakeBib extends Collection {
  state = {
    collectionId: "abc123",
    collectionName: "MyCollection",
    entries: [],
    showEntry: false,
    entryToShow: {},
    clientY: 0
  };

  async componentDidMount() {}
  //   render() {
  //     return (
  //     );
  //   }
}

export default MakeBib;
