import React from 'react';
import T from 'i18n-react';
import { Divider } from '@material-ui/core';
import Check from '@material-ui/icons/Check';

class Todo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="todo-list">
                <h2><Check />{T.translate('checklist')}</h2>
                <Divider />
            </section>
        );
    }
}

export default Todo;