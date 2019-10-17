import React, { Component } from 'react';

import axios from 'axios';

import auth from '../services/authService';

import styles from '../utilities/styles';
import { contains } from '../utilities/search';
import { parseQueryString } from '../utilities/queryStringParser';
import { Style } from '../utilities/styleObj';
import { copyAll, copySelected } from '../utilities/copy';

import ShowEntry from './showEntry';
import Entry from './entry';

class Display extends Component {
  state = {
    entries: [],
    collections: [],
    myStyles: [],
    activeStyle: {},
    entriesToShow: [],
    collectionId: null,
    showEntry: false,
    entryToShow: {},
    edit: false,
    entriesToMove: [],
    searchBase: [],
    useEmDash: false,
    serializeDates: false,
    loading: true,
  };

  async componentDidMount() {
    console.log('Mounting...');
    const { collectionId } = parseQueryString(this.props.location.search);
    try {
      await auth.setUser(this);
      const { data: entries } = await axios.get('/entries');
      const { data: collections } = await axios.get('/collections');
      let { data: myStyles } = await axios.get('/styles');
      myStyles = myStyles.concat(styles);
      await this.setState({ entries, collections, myStyles });

      const activeStyle = new Style(myStyles[0]);
      await this.setState({ activeStyle });

      if (collectionId && collectionId !== 'allEntries') {
        var entriesToShow = this.serializeDates(
          this.sortEntries(this.getEntriesFromCollection(collectionId))
        );
      } else {
        entriesToShow = this.serializeDates(this.sortEntries([...entries]));
      }
      await this.setState({
        entriesToShow,
        collectionId,
        searchBase: entriesToShow,
        loading: false,
      });
    } catch (error) {
      this.props.flashMessage(error.response.data, 'danger', 1500);
      this.setState({ loading: false });
    }
  }

  //use this to update when All Entries is navigated
  componentWillReceiveProps(nextProps) {
    const { collectionId: nextCollection } = parseQueryString(
      nextProps.location.search
    );
    const { collectionId: currentCollection } = parseQueryString(
      this.props.location.search
    );
    if (nextCollection && currentCollection !== nextCollection) {
      this.handleCollectionSelect(nextCollection);
    }
  }

  getEntriesFromCollection = id => {
    const collection = this.state.collections.find(
      collection => collection._id === id
    );
    //in case id is undefined
    return collection ? collection.entries : [];
  };

  sortEntries = entries => {
    return this.state.activeStyle.sortAlgorithm(entries);
  };

  getPrimaryPerson = entry => {
    const template0 = this.state.activeStyle[entry.entryType].templates[0];
    var fieldName = template0.match(/\/\w+\//i)[0];
    fieldName = fieldName.slice(1, fieldName.length - 1);
    return entry[fieldName];
  };

  serializeDates = entries => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let letterIndex = 0;
    //this is changing state directly. wierd.
    let entriesMutanda = [...entries];
    entriesMutanda.forEach(entry => (entry.annoAddendum = ''));
    for (let i = 0; i < entriesMutanda.length - 1; i++) {
      //console.log(this.getPrimaryPerson(entriesMutanda[i]));
      if (
        this.areEquivalent(
          this.getPrimaryPerson(entriesMutanda[i]),
          this.getPrimaryPerson(entriesMutanda[i + 1])
        ) &&
        entriesMutanda[i].year === entriesMutanda[i + 1].year
      ) {
        entriesMutanda[i].annoAddendum = letters[letterIndex];
        letterIndex += 1;
        entriesMutanda[i + 1].annoAddendum = letters[letterIndex];
      } else {
        letterIndex = 0;
      }
    }
    return entriesMutanda;
  };

  toggleSerializeDates = () => {
    this.setState({ serializeDates: !this.state.serializeDates });
  };

  handleUseEmDash = e => {
    this.setState({ useEmDash: !this.state.useEmDash });
  };

  handleShow = (e, entry) => {
    const entriesToShow = [...this.state.entriesToShow];
    const entryToShow = entriesToShow.find(el => el._id === entry._id);
    this.setState({
      showEntry: true,
      entryToShow: entryToShow,
    });
  };

  unshowEntry = () => {
    this.setState({ showEntry: false });
  };

  handleCheck = e => {
    const entryId = e.currentTarget.value;
    var entriesToMove = [...this.state.entriesToMove]; //array of id's
    if (e.currentTarget.checked) {
      entriesToMove.push(entryId);
    } else {
      entriesToMove = entriesToMove.filter(id => id !== entryId);
    }
    this.setState({ entriesToMove });
  };

  handleAddToCollection = async collectionId => {
    const entriesToMove = [...this.state.entriesToMove];
    let procede = true;
    this.props.toggleLoading();
    //loop is required for await because forEach invokes a function
    for (let entryId of entriesToMove) {
      try {
        console.log(`adding ${entryId} to collection ${collectionId}`);
        let response = await axios.put('/collections/' + collectionId, {
          entryId,
          add: true,
        });
        console.log(response);
      } catch (error) {
        await this.props.flashMessage(
          'Error updating collection: ' + error.response.data,
          'danger',
          1500
        );
        procede = false;
      }
    }
    this.props.toggleLoading();
    if (procede) {
      window.location =
        this.props.location.pathname + '?collectionId=' + collectionId;
    }
  };

  handleDeleteFromCollection = async id => {
    // //update state: entriesToShow and collections
    let entriesToShow = [...this.state.entriesToShow];
    const originalState = { ...this.state };
    entriesToShow = entriesToShow.filter(entry => entry._id !== id);
    entriesToShow = this.serializeDates(this.sortEntries(entriesToShow));

    let collections = [...this.state.collections];
    let indexCollectionis = this.state.collections.findIndex(
      collection => collection._id === this.state.collectionId
    );
    collections[indexCollectionis].entries = entriesToShow;

    await this.setState({ entriesToShow, collections });

    //update db
    try {
      await axios.put('/collections/' + this.state.collectionId, {
        entryId: id,
        add: false, //this tells the route to delete instead of adding
      });
      this.props.flashMessage('Entry Deleted from Collection', 'success', 1500);
    } catch (error) {
      this.props.flashMessage(
        'Error deleting from collection ' + error.response.data,
        'danger',
        1500
      );
      this.setState(originalState);
    }
    this.setState({ showEntry: false });
  };

  handleDeleteFromEntries = async id => {
    //remove from entriesToShow
    let entriesToShow = [...this.state.entriesToShow];
    entriesToShow = entriesToShow.filter(entry => entry._id !== id);
    entriesToShow = this.serializeDates(this.sortEntries(entriesToShow));

    const originalState = { ...this.state };

    //remove from entries
    let entries = [...this.state.entries];
    entries = entries.filter(entry => entry._id !== id);

    //remove from all collections
    let collections = [...this.state.collections];
    collections.forEach(collection => {
      collection.entries = collection.entries.filter(entry => entry._id !== id);
    });

    await this.setState({ entriesToShow, entries, collections });

    //update db
    try {
      await axios.delete('/entries/' + id);
      await this.props.flashMessage('Entry Deleted', 'success', 1500);
      this.setState({ showEntry: false });
    } catch (error) {
      await this.props.flashMessage(
        'There was a problem deleting the entry: ' + error.response.data,
        'success',
        1500
      );
      this.setState(originalState);
    }
  };

  handleSearch = e => {
    let filtered = [...this.state.searchBase];
    let searchTerms = e.currentTarget.value.split(/\s+/);

    searchTerms.forEach(term => {
      filtered = filtered.filter(entry => contains(entry, term));
    });
    this.setState({ entriesToShow: filtered });
  };

  handleCollectionSelect = collectionId => {
    var entriesToShow;
    if (collectionId === 'allEntries') {
      entriesToShow = this.serializeDates(
        this.sortEntries([...this.state.entries])
      );
    } else {
      entriesToShow = this.serializeDates(
        this.sortEntries(this.getEntriesFromCollection(collectionId))
      );
    }
    this.setState({
      entriesToShow,
      collectionId,
      searchBase: entriesToShow,
    });
    //this url change is epiphenomenal but helps keep the place for reloading
    this.props.history.push('/entries?collectionId=' + collectionId);
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.props.toggleLoading();
    const collectionName = e.currentTarget.elements[0].value;
    try {
      let { data: newCollection } = await axios.post('/collections', {
        userId: this.state.userId,
        name: collectionName,
      });
      window.location = '/entries?collectionId=' + newCollection._id;
    } catch (error) {
      this.props.flashMessage(
        'Error making collection: ' + error.response.data,
        'danger',
        1500
      );
    }
    this.props.toggleLoading();
  };

  handleStyleSelect = async e => {
    const styleId = e.currentTarget.value;
    const selectedStyle = this.state.myStyles.find(
      style => style._id === styleId
    );
    const activeStyle = new Style(selectedStyle); //construct style object
    await this.setState({ activeStyle });

    //resort entries according to new activeStyle
    let entriesToShow = this.sortEntries(this.state.entriesToShow);
    this.setState({ entriesToShow });
  };

  areEquivalent = (arr1, arr2) => {
    var result = true;
    if (
      arr1.length !== arr2.length ||
      !Array.isArray(arr2) ||
      !Array.isArray(arr1)
    ) {
      return false;
    }
    arr1.forEach((author, i) => {
      if (
        author.firstName !== arr2[i].firstName ||
        author.lastName !== arr2[i].lastName
      ) {
        result = false;
      }
    });
    return result;
  };

  handleCopyAll() {
    copyAll();
    this.props.flashMessage('Copied!', 'success', 750);
  }

  handleCopySelected() {
    const selected = [...this.state.entriesToMove];
    copySelected(selected);
    this.props.flashMessage('Copied!', 'success', 750);
  }

  renderContent = () => {
    if (!this.state.loading) {
      return (
        <div className="entries">
          <input
            type="text"
            className="form-control search-bar"
            placeholder="Search..."
            disabled={this.state.searchBase.length === 0}
            onChange={this.handleSearch}
          />
          <button
            className="btn btn-primary btn-sm copy-button"
            onClick={() => this.handleCopyAll()}
          >
            Copy All
          </button>
          <button
            className="btn btn-primary btn-sm copy-button"
            onClick={() => this.handleCopySelected()}
          >
            Copy Selected
          </button>

          {/* ============CONDITIONALLY RENDER SHOWENTRY============== */}
          {this.state.showEntry ? (
            <ShowEntry
              entry={this.state.entryToShow}
              unshowEntry={this.unshowEntry}
              handleDeleteFromCollection={this.handleDeleteFromCollection}
              handleDeleteFromEntries={this.handleDeleteFromEntries}
              collections={this.state.collections}
              collectionId={this.state.collectionId}
            />
          ) : null}
          {/* =====================RENDER ADD TO COLLECTION OR ENTRIES==================== */}
          <div id="copy">
            {this.state.entriesToShow.map((entry, i, arr) => (
              <Entry
                key={i}
                entry={entry}
                previousEntry={arr[i - 1]}
                // nextEntry={arr[i + 1]}
                style={this.state.activeStyle}
                onClick={this.handleShow}
                handleCheck={this.handleCheck}
                useEmDash={this.state.useEmDash}
                serializeDates={this.state.serializeDates}
              />
            ))}
          </div>
        </div>
      );
    } else {
      return <div className="loader" />;
    }
  };
}

export default Display;
