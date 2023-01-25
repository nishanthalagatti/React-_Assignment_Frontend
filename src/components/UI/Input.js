import React, { Component } from "react";

export class Input extends Component {
  render() {
    return (
      <div>
        <label htmlFor={this.props.id} className={this.props.className}>
          {this.props.children}
        </label>
        <input
          type={this.props.type}
          id={this.props.id}
          name={this.props.name}
          className={this.props.className}
          value={this.props.value}
          onChange={this.props.onChange}
        ></input>
      </div>
    );
  }
}

export default Input;
