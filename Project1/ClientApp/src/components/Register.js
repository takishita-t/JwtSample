import React, { Component } from 'react';
import axios from 'axios';

export class Register extends Component {
    static displayName = Register.name;
    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
    }
    componentDidMount() {
       this.populateWeatherData();
    }

    static renderForecastsTable(forecasts) {
        return (
            <div>
              {forecasts.map(forecast =>
                <ul key={forecast.date}>
                  <li>{forecast.username}</li>
                  <li>{forecast.passwordHash}</li>
                  <li>{forecast.passwordSalt}</li>
                </ul>
                )}
            </div>
        );
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Register.renderForecastsTable(this.state.forecasts);

        return (
            <div>
                <h1 id="tabelLabel" >Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
       const response = await axios.post('/api/Auth/register', { username: "string", password: "string" });
       const data = await response.json();
       this.setState({ forecasts: data, loading: false });
    }
}
