import React from 'react';
import { connect } from 'react-redux';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { setCurrentDay } from '../../actions/dayActions';

class Timeline extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentDay: this.props.currentDay,
            nbDays: this.props.nbDays,
        }
    }

    handleNext() {
        this.props.setCurrentDay(this.state.currentDay + 1);
        this.setState(state => ({
            currentDay: state.currentDay + 1,
        }));

    }

    handleBack() {
        this.props.setCurrentDay(this.state.currentDay - 1);
        this.setState(state => ({
            currentDay: state.currentDay - 1,
        }));

    }

    componentWillUpdate(nextProps) {
        if (nextProps.nbDays !== this.state.nbDays || nextProps.currentDay !== this.state.currentDay) {
            this.setState({
                currentDay: nextProps.currentDay,
                nbDays: nextProps.nbDays
            });
        }
    }

    render() {
        return (
            <section className="timeline">
                <MobileStepper
                    classes={{ dot: 'dot', root: 'stepper', dotActive: 'active' }}
                    steps={this.state.nbDays}
                    position="static"
                    activeStep={this.state.currentDay}
                    nextButton={
                        <Button size="small" onClick={this.handleNext.bind(this)} disabled={this.state.currentDay === (this.state.nbDays - 1)}>
                            Next
                            <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this.handleBack.bind(this)} disabled={this.state.currentDay === 0}>
                            <KeyboardArrowLeft />
                            Back
                        </Button>
                    }
                />
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        nbDays: state.days.nbDays,
        currentDay: state.days.currentDay,
    }
}

export default connect(mapStateToProps, { setCurrentDay })(Timeline);