import React, { Component } from "react";
import axios from "axios";

import styles from "../../utilities/styles";
import forms from "../../utilities/forms";

import StyleDropdown from "../pageComponents/styleDropdown";
import Template from "./formComponents/template";
import TemplateGroup from "./formComponents/templateGroup";

const blankStyle = {
  label: "",
  extends: "",
  primaryPersonFormatter: "",
  secondaryPersonFormatter: "",
  firstNameFormatter: "",
  middleNameFormatter: "",
  connector: "",
  sortPersonList: "",
  pageFormatter: "",
  useEtAlAfter: false,
  etAlThreshhold: false,
  sortBy: [],
  templates: {
    book: [],
    article: [],
    editedVolume: [],
    bookContribution: [],
    multivolumeWorkWithAuthor: [],
    multivolumeWorkWithEditor: [],
    oneVolumeOfMultivolumeWorkWithAuthor: [],
    oneVolumeOfMultivolumeWorkWithEditor: []
  },
  styles: {}
};

class NewStyle extends Component {
  state = {
    newStyle: blankStyle,
    myStyles: []
  };

  async componentDidMount() {
    let entryTypes = Object.keys(forms);
    let cssStyles = {};
    entryTypes.forEach(type => (cssStyles[type] = {}));
    let newStyle = { ...this.state.newStyle };
    newStyle.styles = cssStyles;
    this.setState({ newStyle });

    let { data: myStyles } = await axios.get("/styles");
    myStyles = myStyles.concat(styles);
    myStyles.unshift(this.state.newStyle);
    await this.setState({ myStyles });

    if (this.props.match.params.id) {
      let { data: newStyle } = await axios.get(
        "/styles/" + this.props.match.params.id
      );
      this.setState({ newStyle });
    }
  }

  handleStyleFont = (e, cssStyle) => {
    const entryType = e.currentTarget.name;
    const field = e.currentTarget.value;
    if (e.currentTarget.checked) {
      let newStyle = { ...this.state.newStyle };
      newStyle.styles[entryType][field] = cssStyle;
      this.setState({ newStyle });
    } else {
      let newStyle = { ...this.state.newStyle };
      newStyle.styles[entryType][field] = {};
      this.setState({ newStyle });
    }
  };
  handleChange = (e, key) => {
    let newStyle = { ...this.state.newStyle };
    newStyle[key] = e.currentTarget.value;
    this.setState({ newStyle });
  };

  handleAddTemplate = (e, entryType, index) => {
    let newStyle = { ...this.state.newStyle };
    newStyle.templates[entryType][index] = e.currentTarget.value;
    this.setState({ newStyle });
  };

  handleExtend = e => {
    let extendendum = this.state.myStyles.find(
      style => style._id === e.currentTarget.value
    );
    if (extendendum === undefined) {
      extendendum = blankStyle;
    }
    this.setState({ newStyle: extendendum });
  };

  handleAddSorter = (e, i) => {
    let newStyle = { ...this.state.newStyle };
    newStyle.sortBy[i] = e.currentTarget.value;
    this.setState({ newStyle });
  };

  renderFieldsArray = entryType => {
    let fields = ["authors", "editors", "translators"].concat(
      forms[entryType].fieldsToGenerate
    );
    if (fields.includes("startPage")) {
      fields = fields.filter(
        field => field !== "startPage" && field !== "endPage"
      );
      fields.splice(-1, 0, "pageRange");
    }
    return fields;
  };

  renderTemplates = entryType => {
    let templates = [];
    let length = this.renderFieldsArray(entryType).length;
    for (let i = 0; i <= length; i++) {
      templates.push(
        <Template
          key={i}
          entryType={entryType}
          index={i}
          handleChange={this.handleAddTemplate}
          value={this.state.newStyle.templates[entryType][i]}
        />
      );
    }
    return templates;
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.props.toggleLoading();
    let match = this.state.myStyles.find(
      style => style.label === this.state.newStyle.label
    );

    let newStyle = { ...this.state.newStyle };
    if (this.props.match.params.id) {
      axios.put("/styles/" + newStyle._id, newStyle);
    } else {
      //check for duplicate names
      if (match) {
        this.props.flashMessage(
          `You already have a style with the name ${
            this.state.newStyle.label
          }. Please change the name.`,
          "warning",
          1500
        );
        return;
      }
      delete newStyle._id;
      await axios.post("/styles", newStyle);
    }
    this.props.toggleLoading();
    this.props.history.push("/entries");
  };

  render() {
    return (
      <div className="style-form">
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Your new style name"
              value={this.state.newStyle.label}
              onChange={e => this.handleChange(e, "label")}
              required
            />
          </div>
          <div>
            <label htmlFor="style">New Style Extends: </label>
            <StyleDropdown
              id={"extends"}
              handleStyleSelect={this.handleExtend}
              styles={this.state.myStyles}
              disabled={this.props.match.params.id}
            />
          </div>
          <div className="">
            <h1>General Formatting</h1>
            <label htmlFor="primaryListOrder">Primary Person List Order</label>
            <select
              id="primaryListOrder"
              className="form-control dropdown"
              onChange={e => this.handleChange(e, "primaryPersonFormatter")}
              value={this.state.newStyle.primaryPersonFormatter}
              required
            >
              <option value="" />

              <option value={"FirstLastFirstLast"}>
                First name Last name, First name Last name...
              </option>
              <option value={"LastFirstLastFirst"}>
                Last name First name, Last name First name...
              </option>
              <option value={"LastFirstFirstLast"}>
                Last name First name, First name Last name...
              </option>
            </select>
            <small>
              Primary persons are those listed first: authors for books and
              articles, editors for edited volumes.
            </small>
          </div>
          <div>
            <label htmlFor="secondaryListOrder">
              Secondary Person List Order
            </label>
            <select
              id="secondaryListOrder"
              className="form-control dropdown"
              onChange={e => this.handleChange(e, "secondaryPersonFormatter")}
              value={this.state.newStyle.secondaryPersonFormatter}
              required
            >
              <option value="" />

              <option value={"FirstLastFirstLast"}>
                First name Last name, First name Last name...
              </option>
              <option value={"LastFirstLastFirst"}>
                Last name First name, Last name First name...
              </option>
              <option value={"LastFirstFirstLast"}>
                Last name First name, First name Last name...
              </option>
            </select>
            <small>
              Secondary persons are those listed not-first, usually editors and
              translators.
            </small>
          </div>
          <div>
            <legend>Order multiple authors, editors, or translators</legend>
            <label htmlFor="sortByLastName">Sort by last names</label>
            <input
              type="radio"
              name="sortPersonList"
              className="radio"
              id="sortByLastName"
              value="sortByLastName"
              onChange={e => this.handleChange(e, "sortPersonList")}
              checked={this.state.newStyle.sortPersonList === "sortByLastName"}
              required
            />
            <label htmlFor="noOrder">Render as entered: do not sort</label>
            <input
              type="radio"
              name="sortPersonList"
              className="radio"
              id="noOrder"
              value="noOrder"
              onChange={e => this.handleChange(e, "sortPersonList")}
              checked={this.state.newStyle.sortPersonList === "noOrder"}
              required
            />
          </div>
          <div>
            <div>
              <legend>Select first name formatting</legend>
              <label htmlFor="useFirstInitial">Use initial</label>
              <input
                type="radio"
                name="formatFirstName"
                className="radio"
                id="useFirstInitial"
                value="getFirstInitial"
                onChange={e => this.handleChange(e, "firstNameFormatter")}
                checked={
                  this.state.newStyle.firstNameFormatter === "getFirstInitial"
                }
                required
              />

              <label htmlFor="getFirstName">Use whole name</label>
              <input
                type="radio"
                name="formatFirstName"
                className="radio"
                id="getFirstName"
                value="getFirstName"
                onChange={e => this.handleChange(e, "firstNameFormatter")}
                checked={
                  this.state.newStyle.firstNameFormatter === "getFirstName"
                }
                required
              />
            </div>
            <div>
              <legend>Select middle name formatting</legend>
              <label htmlFor="getFirstInitial">Use initial</label>
              <input
                type="radio"
                name="formatMiddleName"
                className="radio"
                id="getMiddleInitial"
                value="getMiddleInitial"
                onChange={e => this.handleChange(e, "middleNameFormatter")}
                checked={
                  this.state.newStyle.middleNameFormatter === "getMiddleInitial"
                }
                required
              />

              <label htmlFor="getMiddleName">Use whole name</label>
              <input
                type="radio"
                name="formatMiddleName"
                className="radio"
                id="getMiddleName"
                value="getMiddleName"
                onChange={e => this.handleChange(e, "middleNameFormatter")}
                checked={
                  this.state.newStyle.middleNameFormatter === "getMiddleName"
                }
                required
              />
            </div>

            <div>
              <legend>Connector</legend>
              <label htmlFor="selectConnector">"and"</label>
              <input
                type="radio"
                name="selectConnector"
                className="radio"
                id="selectConnector"
                value="and"
                onChange={e => this.handleChange(e, "connector")}
                checked={this.state.newStyle.connector === "and"}
                required
              />
              <label htmlFor="selectConnector">"&"</label>
              <input
                type="radio"
                name="selectConnector"
                className="radio"
                id="selectConnector"
                value="&"
                onChange={e => this.handleChange(e, "connector")}
                checked={this.state.newStyle.connector === "&"}
                required
              />

              <label htmlFor="selectConnector">none</label>
              <input
                type="radio"
                name="selectConnector"
                className="radio"
                id="selectConnector"
                value=""
                onChange={e => this.handleChange(e, "connector")}
                checked={this.state.newStyle.connector === ""}
                required
              />
            </div>
            <div>
              <legend>et al.</legend>
              <label htmlFor="useEtAlAfter">
                Use 'et al.' after person number{" "}
              </label>
              <select
                id="useEtAlAfter"
                className="form-control dropdown et-al"
                onChange={e => this.handleChange(e, "useEtAlAfter")}
                value={this.state.newStyle.useEtAlAfter}
                required
              >
                <option value={false} />

                {[...Array(18)].map((_, i) => (
                  <option value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <label htmlFor="etAlThreshhold">if list is at least </label>
              <select
                id="etAlThreshhold"
                className="form-control dropdown et-al"
                onChange={e => this.handleChange(e, "etAlThreshhold")}
                value={this.state.newStyle.etAlThreshhold}
                required
              >
                <option value={false} />

                {[...Array(21)].map((_, i) => (
                  <option value={i + 3}>{i + 3}</option>
                ))}
              </select>
              <span>persons long.</span>
              <div>
                <small>Leave blank to omit 'et al.'</small>
              </div>
            </div>
            <div>
              <legend>Page Range</legend>
              <label htmlFor="truncEndPage">Truncate end page</label>
              <input
                type="radio"
                name="pageFormatter"
                className="radio"
                id="truncEndPage"
                value="truncEndPage"
                onChange={e => this.handleChange(e, "pageFormatter")}
                checked={this.state.newStyle.pageFormatter === "truncEndPage"}
                required
              />
              <label htmlFor="doNotTrunc">Do not truncate</label>
              <input
                type="radio"
                name="pageFormatter"
                className="radio"
                id="doNotTrunc"
                value="noFormat"
                onChange={e => this.handleChange(e, "pageFormatter")}
                checked={this.state.newStyle.pageFormatter === "noFormat"}
                required
              />
            </div>
          </div>
          <div>
            <legend>Sort Order</legend>
            <label htmlFor="sortBy1">Sort entries by:</label>
            <select
              id="sortBy1"
              className="form-control dropdown"
              onChange={e => this.handleAddSorter(e, 0)}
              value={this.state.newStyle.sortBy[0]}
              required
            >
              <option value="" />
              <option value="compareEntriesByName">Last name</option>
              <option value="compareEntriesByTitle">Title</option>
              <option value="compareEntriesByDate">Date</option>
            </select>
            <label htmlFor="sortBy2">Then by:</label>
            <select
              id="sortBy2"
              className="form-control dropdown"
              onChange={e => this.handleAddSorter(e, 1)}
              value={this.state.newStyle.sortBy[1]}
            >
              <option value="" />
              <option value="compareEntriesByName">Last name</option>
              <option value="compareEntriesByTitle">Title</option>
              <option value="compareEntriesByDate">Date</option>
            </select>
            <label htmlFor="sortBy3">Then by:</label>
            <select
              id="sortBy3"
              className="form-control dropdown"
              onChange={e => this.handleAddSorter(e, 2)}
              value={this.state.newStyle.sortBy[2]}
            >
              <option value="" />
              <option value="compareEntriesByName">Last name</option>
              <option value="compareEntriesByTitle">Title</option>
              <option value="compareEntriesByDate">Date</option>
            </select>
          </div>

          <div>
            <h2>Entry Templates</h2>
            <p>
              Instructions: Make a template for each entry field of each entry
              type. Place entry field names between forward slashes, like this:
              /authors/. Webib will replace /authors/ with your list of authors,
              formatted according to the above selections.
            </p>
            <p>
              Any text not within forward-slashes will be rendered literally. So
              if you want a period and a space after authors, enter this
              "/authors/. ".
            </p>
            <p>
              If an entry does not contain authors, Webib will not render the
              authors template. This feature can be used to render content
              conditionally. For example, Webib will render the template
              "/editors/, ed." only if your entry has editors.
            </p>
            <p>
              For conditially rendering plural "s" in a person list, place the
              "s" in parentheses, like this, "ed(s)." Webib will then render the
              "s" only if the associated person list (authors, editors,
              translators) has more than one entry.
            </p>
            <p>
              Valid entry field names for each entry type are listed below.
              Entry field names must be entered exactly as shown, in camelCase.
            </p>

            <p>
              Example templates, separated by "|": /authors/. |/title/.
              |/editors/ (ed(s).), | /translators/, trans. |/edition/ ed.
              |/city/: |/publisher/, |/year/. |/retrievedFrom/ |
            </p>
            {Object.keys(forms).map((entryType, i) => (
              <TemplateGroup
                key={i}
                entryType={entryType}
                renderFieldsArray={this.renderFieldsArray}
                renderTemplates={this.renderTemplates}
                handleStyleFont={this.handleStyleFont}
                style={this.state.newStyle.styles[entryType]}
              />
            ))}
          </div>
          <button className="btn btn-secondary" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default NewStyle;
