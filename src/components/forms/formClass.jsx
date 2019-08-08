import { Component } from 'react';
import axios from 'axios';
import auth from '../../services/authService';
import forms from '../../utilities/forms';
import { handleSearch } from '../../utilities/search';

class FormClass extends Component {
  state = {
    data: {
      entryType: 'book',
      authors: [],
      editors: [],
      translators: [],
    },
    collectionId: 123,
    fieldsToGenerate: [],
    requiredFields: [],
    formIsValid: false,
    entryAdded: false,
    counters: {
      authors: 0,
      editors: 0,
      translators: 0,
    },
    entries: [],
    filtered: [],
  };

  constructor(props) {
    super(props);
    this.state.data = {
      entryType: 'book',
      authors: [],
      editors: [],
      translators: [],
    };
    this.state.collectionId = this.props.match.params.collectionId;
    this.state.fieldsToGenerate = forms.book.fieldsToGenerate;
    this.state.requiredFields = forms.book.requiredFields;
    this.state.counters = forms.book.counters;
    //the following sets values for input fields so they can be controlled
    let dataClone = { ...this.state.data };
    this.state.fieldsToGenerate.forEach(field => {
      dataClone[field] = '';
    });
    this.state.data = dataClone;
  }

  async componentDidMount() {
    auth.setUser(this);
    //this get is not s
    // const { data: entries } = await axios.get('/all-entries');
    // this.setState({ entries });
    this.initializePersons();
  }

  initializePersons() {
    //populates authors, editors, translators with empty persons objects
    //otherwise React throws a warning about controlled components
    const counters = { ...this.state.counters };
    const data = { ...this.state.data };
    for (let personType in counters) {
      for (let i = 0; i < counters[personType]; i++) {
        data[personType].push({ firstName: '', middleName: '', lastName: '' });
      }
    }
    this.setState({ data });
  }

  //==================Handlers=============================//
  //target is passed from the function call in the button; target is not an event
  //target is person type. Like 'authors' or 'editors'
  handleAddPerson = target => {
    let counters = { ...this.state.counters };
    counters[target] += 1;
    this.setState({ counters });
    //this is so the new component is controlled
    let data = { ...this.state.data };
    data[target].push({ firstName: '', middleName: '', lastName: '' });
    this.setState({ data });
  };

  handleSubtractPerson = target => {
    //decrement from counter and clear last element in data[target] --i.e., authors, editors, or translators
    let data = { ...this.state.data };
    let counters = { ...this.state.counters };
    counters[target] -= 1;
    data[target].length = counters[target];
    this.setState({ data, counters });
  };

  handleDropdownSelect = async e => {
    let data = { ...this.state.data };
    const { name, value } = e.currentTarget;
    data[name] = value;
    const counters = forms[value].counters;
    const fieldsToGenerate = forms[value].fieldsToGenerate;
    const requiredFields = forms[value].requiredFields;
    await this.setState({ data, counters, fieldsToGenerate, requiredFields });
    this.validateForm();
  };

  handleChange = async e => {
    let targetName = e.currentTarget.name;
    if (targetName.includes('[')) {
      //handle change for arrays of data; event target name will be of form 'key[i]key', like 'authors[2]firstName
      let key1 = targetName.slice(0, targetName.indexOf('['));
      let index = targetName.slice(
        targetName.indexOf('[') + 1,
        targetName.indexOf(']')
      );
      let key2 = targetName.slice(targetName.indexOf(']') + 1);
      let data = { ...this.state.data };
      //preserve the data already in data[key1][index], or else give it an initial value to be modified
      data[key1][index] = data[key1][index] || {};
      data[key1][index][key2] = e.currentTarget.value;

      await this.setState({ data });
      this.validateForm();
    } else {
      //handle change for data key-value; event target name is name of data key.
      let data = { ...this.state.data };
      data[targetName] = e.currentTarget.value;

      await this.setState({ data });
      this.validateForm();
    }
  };
  //******************************************************
  validateForm = () => {
    let formIsValid = true;
    const requiredFields = [...this.state.requiredFields];
    requiredFields.forEach(field => {
      if (Array.isArray(this.state.data[field])) {
        if (!this.state.data[field][0] || !this.state.data[field][0].lastName) {
          formIsValid = false;
        }
      } else if (!this.state.data[field]) {
        formIsValid = false;
      }
    });
    this.setState({ formIsValid });
  };

  handleFilter = async e => {
    let filtered = await handleSearch(this.state.data);
    this.setState({ filtered });
  };

  //e doesn't do anything but is needed for display
  handleCopyEntry = async (e, entry) => {
    delete entry._id;
    await this.setState({ data: entry });
    this.validateForm();
  };
  //******************************************************** */
  handleSubmit = async e => {
    e.preventDefault();
    this.props.toggleLoading();
    const collectionId = this.props.match.params.collectionId;
    try {
      //data is pushed to two different db.collections on server
      await axios.post('/entries', {
        entry: this.state.data,
        collectionId: collectionId,
      });
    } catch (error) {
      console.log('Post to entries error: ', error);
      this.props.flashMessage(error.message, 'danger', 1500);
    }
    this.props.toggleLoading();
    if (collectionId && collectionId !== 'undefined') {
      this.props.history.push('/entries?collectionId=' + collectionId);
    } else {
      this.props.history.push('/entries');
    }
  };
  render() {
    return "I don't actually render anything; I just hold methods common to NewEntry and Edit";
  }
}

export default FormClass;
