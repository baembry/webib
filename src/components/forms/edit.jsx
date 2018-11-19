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
    } catch (error) {
      console.log(error);
      this.props.flashMessage(error.message, "danger", 1500);
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.props.toggleLoading();
    try {
      await axios.put("/entries/" + this.state.data._id, this.state.data);
    } catch (error) {
      console.log(error);
      await this.props.flashMessage(error.message, "danger", 1500);
    }
    this.props.toggleLoading();
    window.history.back();
  };
}
export default Edit;
