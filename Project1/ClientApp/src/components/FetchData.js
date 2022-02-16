import React, { Component } from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;
  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
      this.populateWeatherData();
  }

  static renderForecastsTable(forecasts) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

    async populateWeatherData() {
      const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWFhYWEiLCJleHAiOjE2NDQ5OTAxMzksImlzcyI6IlByb2plY3QxIiwiYXVkIjoiUHJvamVjdDEifQ.akUooB_kCNSKfVGyS65lSPBlpWWmSWt0oo9PXIP1P4ewOExlue9rsBQvKQPXj13cPzvexxIIJpB7CX_fewVqjw';
      const response = await fetch('weatherforecast', {
          method: 'GET',
          headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
      });
      const data = await response.json();
      this.setState({forecasts: data, loading: false });
  }
}
