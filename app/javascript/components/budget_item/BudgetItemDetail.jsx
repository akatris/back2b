import React from 'react';
import Table from './Table';

export default class BudgetItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch('/pcops.json')
      .then(response => response.json())
      .then(data => this.setState({data}))
      .catch(error => console.log(error));
  }

  flatternData() {
    let pcop_rubrics = [];

    const getRubric = ({id, name, description, eligible_transactions}) => {
      return {id, name, description, eligible_transactions}
    };

    for (const category of this.state.data) {
      pcop_rubrics = pcop_rubrics.concat(getRubric(category));
      for (const account of category.accounts) {
        pcop_rubrics = pcop_rubrics.concat(getRubric(account));
        for (const sub_account of account.sub_accounts) {
          pcop_rubrics = pcop_rubrics.concat(getRubric(sub_account));
          for (const rubric of sub_account.rubrics) {
            pcop_rubrics = pcop_rubrics.concat(getRubric(rubric));
          }
        }
      }
    }
    return pcop_rubrics;
  }

  render() {

    return (
      <div>
        <Table rubrics={this.flatternData()} />
      </div>
    );
  }
}
