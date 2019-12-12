import React, {PureComponent} from 'react';
import axios from 'axios';

import './CountriesInfo.css';

class CountriesInfo extends PureComponent {
	state = {
		loadedCountry: null
	};


	async componentDidUpdate(prevProps) {
		if (this.props.code) {
			if (prevProps.code !== this.props.code) {
				const response = await axios.get('/rest/v2/alpha/' + this.props.code);
					const country = response.data;
					return Promise.all(country.borders.map(border => {
						return axios.get('/rest/v2/alpha/' + border).then(response =>  {
							return response.data.name;
						})
					})).then(result => {
						country['bordersByName'] = result;
						this.setState({loadedCountry: country});
					});
			}
		}
	};

	render() {
		if (this.state.loadedCountry) {
			const borders = this.state.loadedCountry.bordersByName.map((border, index) => (
				<li key={index}>{border}</li>
			));

			return (
				<section className="CountryInfo">
					<h2>{"Country: " + this.state.loadedCountry.name}</h2>
					<p><b>Capital: </b>{this.state.loadedCountry.capital}</p>
					<p><b>Population: </b>{this.state.loadedCountry.population}</p>
					<p><b>Region: </b>{this.state.loadedCountry.region}</p>
					<img src={this.state.loadedCountry.flag} width="150px" height="auto"/>
					<h3>Borders:</h3>
					<ul>{borders.length !== 0 ? borders : 'This country does not have borders !'}</ul>
				</section>
			);
		} else {return <p className="CountryInfo">Выберите страну...</p>;}
	}
}

export default CountriesInfo;