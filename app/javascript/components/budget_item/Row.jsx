import React from 'react';

export default class Row extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.rubric.id}</td>
        <td>{this.props.rubric.name}</td>
        <td>{this.props.rubric.description}</td>
        <td>{this.props.rubric.amount}</td>
      </tr>
    );
  }
}
