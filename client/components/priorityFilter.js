import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css'
import store from '../store'

var priorityFilter = createClass({
	displayName: 'priorityFilter',
	propTypes: {
		hint: PropTypes.string,
		label: PropTypes.string
	},
	getInitialState () {
		return {
			multi: true,
			multiValue: [],
			options: [
				{ value: 'Dogs', label: 'Dogs' },
				{ value: 'Cats', label: 'Cats' },
				{ value: 'Movies', label: 'Movies' },
				{ value: 'Sunshine', label: 'Sunshine' },
				{ value: 'Health', label: 'Health' },
				{ value: 'Smile', label: 'Smile' },
			],
			value: undefined
		};
	},
	handleOnChange (value) {
			this.setState({ multiValue: value });
			store.dispatch({type: 'ADD_TO_PRIORITY', value})
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

module.exports = priorityFilter;
