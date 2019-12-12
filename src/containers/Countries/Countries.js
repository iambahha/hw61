import React, {Component, Fragment} from 'react';
import CountriesInfo from '../../components/CountriesInfo/CountriesInfo';
import axios from "axios";

import './Countries.css';

class Countries extends Component {
	state = {
		countries: [],
		selectedCountryCode: null
	};

	async componentDidMount() {
		const response = await axios.get('/rest/v2/all?fields=name;alpha3Code');
		const countries = response.data;
		this.setState({countries: countries});

	}

	getCountryInfo = alpha3Code => {
		this.setState({selectedCountryCode: alpha3Code});
	};

	render() {
		return (
			<Fragment>
				<section className="CountriesPanel">
					<ol>
						{this.state.countries.map(country=>(
							<li
								key={country.alpha3Code}
								onClick={() => this.getCountryInfo(country.alpha3Code)}
							>{country.name}</li>
						))}
					</ol>
				</section>
				<CountriesInfo code={this.state.selectedCountryCode} />
			</Fragment>
		);
	}
}

export default Countries;