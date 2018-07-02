import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Divider } from '@material-ui/core';
import T from 'i18n-react';

class DayDialog extends React.Component {

	constructor(props) {
		super(props);

		this.state = {

		}

		this.handleClose = this.handleClose.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleClose() {
		this.props.onClose();
	}

	handleSave() {
		this.props.onSave(this.state);
	}

	handleChange(name, event) {
		this.setState({
			[name]: event.target.value
		});
	}

	render() {

		return (
			<Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="hotel-dialog" className="hotel-dialog dialog" >
				<DialogTitle id="travel-dialog-title">{T.translate('create-day')}</DialogTitle>
				<Divider />
				<DialogContent>

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

export default DayDialog;