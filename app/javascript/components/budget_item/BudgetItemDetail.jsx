import React from 'react';
import Table from './Table';

const makeRubric = ({id, name, description, eligible_transactions}) => {
  return {id, name, description, eligible_transactions};
};

export default class BudgetItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      accounts: [],
      sub_accounts: [],
      rubrics: []
    };
  }

  fetchData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }

  componentDidMount() {
    this.fetchData('/pcop/categories.json')
      .then(categories => this.setState({...this.state, categories}))
      .catch(error => console.log(error));
    this.fetchData('/pcop/accounts.json')
      .then(accounts => this.setState({...this.state, accounts}))
      .catch(error => console.log(error));
    this.fetchData('/pcop/sub_accounts.json')
      .then(sub_accounts => this.setState({...this.state, sub_accounts}))
      .catch(error => console.log(error));
    this.fetchData('/pcop/rubrics.json')
      .then(rubrics => this.setState({...this.state, rubrics}))
      .catch(error => console.log(error));
  }

  groupByParent(rubrics, key) {
    return rubrics.reduce((current, rubric) => {
      const keyName = rubric[key];
      const current_rubrics = current[keyName] ? current[keyName].concat([makeRubric(rubric)]) : [makeRubric(rubric)];
      return {...current, [keyName]: current_rubrics}
    }, {});
  }

  combineRubrics(parent, child) {
    return parent.reduce((accumulator, current) => {
      const current_rubrics = [makeRubric(current)].concat(child[current.id] || []);
      return {...accumulator, [current.id]: current_rubrics};
    }, {});
  }

  combineSubAccountsAndRubrics() {
    const rubrics = this.groupByParent(this.state.rubrics, 'pcop_sub_account_id');
    const sub_accounts = this.combineRubrics(this.state.sub_accounts, rubrics);
    return this.combineRubrics(this.state.accounts, sub_accounts);
  }

  flatternData() {
    let pcop_rubrics = [];

    const getRubric = ({id, name, description, eligible_transactions}) => {
      return {id, name, description, eligible_transactions}
    };

    pcop_rubrics = this.state.categories.reduce((current, category) => {
      const accounts = this.state.accounts.filter((account) => {
        account.pcop_category_id === category.id;
      });
      return current.concat([getRubric(category), ...accounts]);
    }, []);
    return pcop_rubrics;
  }

  render() {
    console.log(this.combineSubAccountsAndRubrics());
    return (
      <div>
      </div>
    );
  }
}
