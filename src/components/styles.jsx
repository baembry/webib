import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Styles extends Component {
  state = {
    myStyles: []
  };
  async componentDidMount() {
    const { data: myStyles } = await axios.get("/styles");
    this.setState({ myStyles });
  }
  handleDelete = async (e, style) => {
    const confirm = window.confirm(
      "Are you sure you want to delete " + style.label + "?"
    );
    if (confirm) {
      let myStyles = [...this.state.myStyles];
      const id = style._id;
      myStyles = myStyles.filter(style => style._id !== id);
      await this.setState({ myStyles });
      axios.delete("/styles/" + id);
    }
  };
  handleEdit = (e, id) => {
    this.props.history.push("/styles/" + id + "/edit");
  };
  render() {
    return (
      <div className="my-styles">
        {this.state.myStyles.map((style, i) => (
          <div className="my-styles__style" key={i}>
            {style.label}
            <span className="my-styles__buttons">
              <button
                className="btn btn-warning"
                onClick={e => this.handleEdit(e, style._id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={e => this.handleDelete(e, style)}
              >
                Delete
              </button>
            </span>
          </div>
        ))}
        <Link to="/styles/new" className="new-style btn btn-primary">
          New Style
        </Link>
      </div>
    );
  }
}

export default Styles;
