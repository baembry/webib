import NewEntry from "./newEntry";
import axios from "axios";
import forms from "../../utilities/forms";

class Edit extends NewEntry {
  state = {};

  async componentDidMount() {
    try {
      const { data } = await axios.get(
        "/entries/" + this.props.match.params.entryId
      );
      await this.setState({ data });
    } catch (error) {
      console.log(error);
    }
    let counters = {};
    counters.authors = this.state.data.authors.length;
    counters.editors = this.state.data.editors.length;
    counters.translators = this.state.data.translators.length;
    const entryType = this.state.data.entryType || "book";
    this.setState({
      counters: counters,
      fieldsToGenerate: forms[entryType].fieldsToGenerate,
      requiredFields: forms[entryType].requiredFields,
      formIsValid: true,
      entryAdded: false
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put("/entries/" + this.state.data._id, this.state.data);
    } catch (error) {
      console.log(error);
    }
    window.history.back();
  };
}
export default Edit;
