import React from 'react';
import Row from './Row';

export default class Table extends React.Component {
  renderRows() {
    return this.props.rubrics.map((rubric) => {
      return <Row key={rubric.id} rubric={rubric} />
    });
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="col-id" scope="col">N° comptes</th>
            <th scope="col">Intitulés</th>
            <th scope="col">Description</th>
            <th scope="col">Montant</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
}
