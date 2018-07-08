import React from 'react';
import { connect } from 'react-redux';
import { TextField, Card, CardContent, Button } from '@material-ui/core';
import { setNotes } from '../../actions/travelActions';
import T from 'i18n-react';

class Notes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.notes || "",
            disabled: true,
            savedValue: this.props.notes,
            display: this.props.display
        }
        this.textChange = this.textChange.bind(this);
        this.save = this.save.bind(this);
    }

    textChange(event) {
        this.setState({
            value: event.target.value,
            disabled: (event.target.value == this.state.savedValue)
        });
    }

    save() {
        this.props.setNotes(this.state.value);
        this.setState({
            disabled: true,
            savedValue: this.state.value
        })
    }
    static getDerivedStateFromProps(props, state) {
        if (props.display !== state.display) {
            return {
                display: props.display
            }
        }
        return null;
    }

    render() {
        return (
            <section className={this.state.display ? 'notes' : 'notes hidden'}>
                <Card raised={true}>
                    <CardContent className="card-content">
                        <TextField
                            id="multiline-static"
                            label={T.translate('notes')}
                            multiline
                            rows="4"
                            margin="none"
                            fullWidth={true}
                            className="large-text-field"
                            onChange={this.textChange}
                            value={this.state.value}
                        />
                        <Button onClick={this.save} variant="contained" color="secondary" disabled={this.state.disabled}> Save </Button>
                    </CardContent>
                </Card>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        notes: state.travel.notes,
        display: state.travel.displayNotes
    }
}

export default connect(mapStateToProps, { setNotes })(Notes);