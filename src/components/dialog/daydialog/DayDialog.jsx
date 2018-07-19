import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Divider, Chip } from '@material-ui/core';
import T from 'i18n-react';

class DayDialog extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			summary: '',
			draftPlace: '',
			places: [],
		}

		this.handleClose = this.handleClose.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.addChip = this.addChip.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleClose() {
		this.setState({
			name: ''
		});
		this.props.onClose();
	}

	handleSave() {
		this.props.onSave(Object.assign({}, this.state));
		this.setState({
			name: ''
		});
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