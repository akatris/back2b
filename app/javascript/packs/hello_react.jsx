// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const DATA = {
  rubrics: [
    {
      id: 1,
      name: 'Comptes des fonds',
      description: 'blabla',
      type: 0,
      current: {
        year: 2019,
        value: 170000,
      },
      previous: [
        {
          year: 2018,
          value: 172000,
        },
        {
          year: 2017,
          value: 171000,
        },
      ],
      children: [
        {
          id: 11,
          name: 'accounts 2',
          description: 'blabala',
          type: 1,
          current: {
            year: 2019,
            value: 70000,
          },
          previous: [
            {
              year: 2018,
              value: 1934,
            },
            {year: 2017, value: 7834},
          ],
        },
      ],
    },
  ],
};

class SeasonDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  fetchPcops() {
    return new Promise((fullfil, reject) => {
      fetch('/pcops.json')
        .then(response => {
          return response.json();
        })
        .then(data => {
          fullfil(data);
        })
        .catch(error => console.log(error));
    });
  }

  componentDidMount() {
    this.fetchPcops()
      .then(data => {
        this.setState({
          categories: data,
        });
      })
      .catch(e => console.log(e));
  }

  render() {
    let categories = this.state.categories ? this.state.categories : [];
    return (
      <div>
        <h1>Details sur le budget</h1>
        <div>
          <div class="form-group">
            <input type="text" placeholder="Numéro de compte" />
          </div>
          <div class="form-group">
            <input type="text" placeholder="Nom du rubrique" />
          </div>
          <button class="btn" value="Effacer les filtres">
            Effacer les filtres
          </button>
        </div>
        <BudgetTable categories={categories} />
      </div>
    );
  }
}

class BudgetTable extends React.Component {
  flat() {
    let rubrics = [];
    const categories = this.props.categories;
    return categories.reduce((rubrics, current) => {
      return rubrics.concat(current);
    }, []);
  }

  renderRows() {
    let rows = null;
    rows = this.props.categories.map(category => {
      return (
        <Row
          key={category.id}
          rubric={category}
          amount={1000000}
          type={'category'}
        />
      );
    });
    return rows;
  }

  render() {
    return (
      <table className="table table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Rubriques</th>
            <th>Description</th>
            <th>Montant</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
}

class Row extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.rubric.id}</td>
        <td>{this.props.rubric.name}</td>
        <td>{this.props.rubric.description}</td>
        <td>{this.props.amount}</td>
      </tr>
    );
  }
}

ReactDOM.render(<SeasonDetail />, document.getElementById('season-detail'));
