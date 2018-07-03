import React from 'react';
import Timeline from '../../components/timeline/Timeline.jsx';
import Flight from '@material-ui/icons/Flight';
import T from 'i18n-react';

class Transports extends React.Component {

    render() {

        return (
            <section className="transports">
                <div className="app-bar"><Flight /><h2>{T.translate("transports")}</h2></div>
                <div className="wrapper"></div>
            </section>
        );
    }
}

export default Transports;