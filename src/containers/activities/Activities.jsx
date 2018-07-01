import React from 'react';
import Timeline from '../../components/timeline/Timeline.jsx';
import LocalActivity from '@material-ui/icons/LocalActivity';
import T from 'i18n-react';

class Spending extends React.Component {

    render() {

        return (
            <section className="spending">
                <div className="app-bar"><LocalActivity /><h2>{T.translate("activities")}</h2></div>
                <div className="wrapper"></div>
            </section>
        );
    }
}

export default Spending;