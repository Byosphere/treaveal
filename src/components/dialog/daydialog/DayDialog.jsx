import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Divider, Chip } from '@material-ui/core';
import T from 'i18n-react';

class DayDialog extends React.Component {

	constructor(props) {
		super(props);

		const day = this.props.day;
		this.state = {
			day: day,
			name: day ? day.name : '',
			summary: day ? day.summary : '',
			draftPlace: '',
			places: day ? day.places : [],
			date: day ? day.date : ''
		}

		this.handleClose = this.handleClose.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.addChip = this.addChip.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	init(day) {
		this.setState({
			day: day,
			name: day ? day.name : '',
			summary: day ? day.summary : '',
			draftPlace: '',
			places: day ? day.places : [],
			date: day ? day.date : '',
		});
	}

	handleClose() {
		this.props.onClose();
		this.init(this.props.day);
	}

	handleSave() {
		this.props.onSave(Object.assign({}, this.state));
		this.init(this.props.day);
	}

	handleChange(name, event) {
		this.setState({
			[name]: event.target.value
		});
	}

	handleDelete(data) {
		const modifiedPlaces = [...this.state.places];
		const placeToDelete = modifiedPlaces.indexOf(data);
		modifiedPlaces.splice(placeToDelete, 1);
		this.setState({
			places: modifiedPlaces
		});
	};

	addChip() {
		const newPlaces = [...this.state.places];
		newPlaces.push({ key: newPlaces.length, label: this.state.draftPlace });

		this.setState({
			places: newPlaces,
			draftPlace: ''
		});
	}

	static getDerivedStateFromProps(props, state) {
		if (props.day !== state.day) {
			return {
				day: props.day,
				name: props.day ? props.day.name : '',
				summary: props.day ? props.day.summary : '',
				draftPlace: '',
				places: props.day ? props.day.places : [],
				date: props.day ? props.day.date : ''
			}
		}
		return null;
	}

	render() {
		return (
			<Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="day-dialog" className="day-dialog dialog" >
				<DialogTitle id="day-dialog-title">{T.translate('create-day')}</DialogTitle>
				<Divider />
				<DialogContent>
					<form noValidate autoComplete="off">
						<TextField
							id="name"
							label="Name"
							value={this.state.name}
							onChange={(evt) => this.handleChange('name', evt)}
							margin="normal"
							fullWidth
						/>
						<TextField
							id="date"
							label="Date"
							type="date"
							value={this.state.date}
							onChange={(evt) => this.handleChange('date', evt)}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							id="summary"
							label="Summary"
							value={this.state.summary}
							onChange={(evt) => this.handleChange('summary', evt)}
							margin="normal"
							fullWidth
						/>
						<TextField
							id="draftPlace"
							label="Places"
							value={this.state.draftPlace}
							onChange={(evt) => this.handleChange('draftPlace', evt)}
							margin="normal"
						/>
						<Button disabled={!this.state.draftPlace} onClick={this.addChip}> Add </Button>
						<div>
							{this.state.places.map(data => {
								return (
									<Chip
										key={data.key}
										label={data.label}
										onDelete={() => this.handleDelete(data.key)}
									/>
								);
							})}
						</div>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleClose}>
						{T.translate('cancel')}
					</Button>
					<Button onClick={this.handleSave} color="primary">
						{T.translate('save')}
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

DayDialog.propTypes = {
	'open': PropTypes.bool.isRequired,
	'onClose': PropTypes.func.isRequired,
	'onSave': PropTypes.func.isRequired,
}

export default DayDialog;