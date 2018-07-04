import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';
import T from 'i18n-react';

class DeleteDayDialog extends React.Component {

	constructor(props) {
		super(props);

		this.handleClose = this.handleClose.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleClose() {
		this.props.onClose();
	}

	handleDelete() {
		this.props.onDelete();
	}

	render() {

		return (
			<Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="hotel-dialog" className="hotel-dialog dialog" >
				<DialogTitle id="travel-dialog-title">{T.translate('confirm-delete-day')}</DialogTitle>
				<DialogActions>
					<Button onClick={this.handleClose}>
						{T.translate('cancel')}
					</Button>
					<Button onClick={this.handleDelete} color="primary">
						{T.translate('validate')}
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

DeleteDayDialog.propTypes = {
	'open': PropTypes.bool.isRequired,
	'onClose': PropTypes.func.isRequired,
	'onDelete': PropTypes.func.isRequired,
}

export default DeleteDayDialog;