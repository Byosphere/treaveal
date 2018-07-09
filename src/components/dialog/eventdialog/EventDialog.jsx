import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider, InputLabel, Select, MenuItem } from '@material-ui/core';
import LocalActivity from '@material-ui/icons/LocalActivity';
import T from 'i18n-react';
import { EVENT_ACTIVITY, EVENT_TRANSPORT, EVENT_TEXT } from '../../../Constants';

class EventDialog extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: this.props.event.name || '',
			type: this.props.event.type || '',
			description: this.props.event.description || '',
			startHour: this.props.event.startHour || '',
			timeLength: this.props.event.timeLength || '',
			nameError: '',
		}

		this.handleClose = this.handleClose.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleClose() {
		this.props.onClose();
	}

	handleSave() {
		this.props.onSave(Object.assign({}, this.state));
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	render() {

		return (
			<Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="event-dialog" className="event-dialog dialog" >
				<DialogTitle id="event-dialog-title">{T.translate('event.add')}</DialogTitle>
				<Divider />
				<DialogContent>
					<InputLabel htmlFor='type'>{T.translate('event.type')}</InputLabel>
					<Select
						className="event-select"
						value={this.state.type}
						onChange={this.handleChange}
						inputProps={{
							name: 'type',
							id: 'type',
						}}>
						<MenuItem value={EVENT_ACTIVITY}><LocalActivity /> {T.translate('activity')}</MenuItem>
						<MenuItem value={EVENT_TRANSPORT}>{T.translate('transport')}</MenuItem>
						<MenuItem value={EVENT_TEXT}>{T.translate('text')}</MenuItem>
					</Select>
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
EventDialog.propsType = {
	'open': PropTypes.bool.isRequired,
	'onClose': PropTypes.func.isRequired,
	'onSave': PropTypes.func.isRequired,
	'event': PropTypes.object.isRequired
}

export default EventDialog;