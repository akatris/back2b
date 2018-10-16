import React from 'react';
import Row from './Row';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rubrics: [
        {id: 1, name: 'Rubric 1', description: 'Rubric description', amount: 100000},
        {id: 11, name: 'Rubric 11', description: 'Rubric description', amount: 100000},
        {id: 111, name: 'Rubric 111', description: 'Rubric description', amount: 100000},
        {id: 112, name: 'Rubric 112', description: 'Rubric description', amount: 100000},
        {id: 113, name: 'Rubric 113', description: 'Rubric description', amount: 100000},
        {id: 114, name: 'Rubric 114', description: 'Rubric description', amount: 100000},
        {id: 12, name: 'Rubric 12', description: 'Rubric description', amount: 100000},
        {id: 13, name: 'Rubric 13', description: 'Rubric description', amount: 100000},
        {id: 14, name: 'Rubric 14', description: 'Rubric description', amount: 100000},
        {id: 2, name: 'Rubric 2', description: 'Rubric description', amount: 100000},
        {id: 21, name: 'Rubric 21', description: 'Rubric description', amount: 100000},
        {id: 22, name: 'Rubric 22', description: 'Rubric description', amount: 100000},
        {id: 23, name: 'Rubric 23', description: 'Rubric description', amount: 100000},
        {id: 24, name: 'Rubric 24', description: 'Rubric description', amount: 100000},
      ]
    };
  }

  renderRows() {
    return this.state.rubrics.map((rubric) => {
      return <Row rubric={rubric} />
    });
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>N° de compte</th>
            <th>Nom de compte</th>
            <th>Description</th>
            <th>Montant</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
}
