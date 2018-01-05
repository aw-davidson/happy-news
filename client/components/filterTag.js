import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css'
import store from '../store'

var FilterTag = createClass({
	displayName: 'FilterTag',
	propTypes: {
		hint: PropTypes.string,
		label: PropTypes.string
	},
	getInitialState () {
		return {
			multi: true,
			multiValue: [],
			options: [
				{ value: 'Trump', label: 'Trump' },
				{ value: 'War', label: 'War' },
				{ value: 'Guns', label: 'Guns' },
				{ value: 'Genocide', label: 'Genocide' },
				{ value: 'Republicans', label: 'Republicans' },
				{ value: 'Opiod', label: 'Opiod' },
				{ value: 'North Korea', label: 'North Korea' },
			],
			value: undefined
		};
	},
	handleOnChange (value) {
			this.setState({ multiValue: value });
			store.dispatch({type: 'ADD_TO_FILTER', value})
	},
	render () {
		const { multi, multiValue, options, value } = this.state;
		return (
			<div className="section">
				<Select.Creatable
					multi={multi}
					options={options}
					onChange={this.handleOnChange}
					onSubmit={this.handleSubmit}
					value={multi ? multiValue : value}
				/>
				<div className="hint">{this.props.hint}</div>
			</div>
		);
	}
});

module.exports = FilterTag;
