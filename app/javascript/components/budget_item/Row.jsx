import React from 'react';

export default class Row extends React.Component {
  getClass(column) {
    const classes = ['class', 'account', 'sub-account', 'rubric'];
    const stringId = new String(this.props.rubric.id);
    return `${classes[stringId.length - 1]}-${column}`;
  }

  render() {
    return (
      <tr>
        <th className={this.getClass('id')} scope="row">
          <span>{this.props.rubric.id}</span>
        </th>
        <td className={this.getClass('name')}>{this.props.rubric.name}</td>
        <td>{this.props.rubric.description}</td>
        <td>{this.props.rubric.amount}</td>
      </tr>
    );
  }
}
