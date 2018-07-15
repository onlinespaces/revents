import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import EventList from '../../event/EventList/EventList';
import EventActivity from '../../event/EventActivity/EventActivity';
import { deleteEvent} from "../eventActions";
import LoadingComponent from '../../../app/layout/LoadingComponent';

const mapState = (state) => ({
    events: state.firestore.ordered.events,
    loading: state.async.loading
});

const actions = {
    deleteEvent
};

class EventDashboard extends Component {
    handleDeleteEvent = eventId => () => {
        this.props.deleteEvent(eventId);
    };

    render() {
        const {events} = this.props;
        if(!isLoaded(events) || isEmpty(events)) return <LoadingComponent inverted={true} />;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventList deleteEvent={this.handleDeleteEvent} events={events} />
                </Grid.Column>
                <Grid.Column width={6}>
                    <EventActivity/>
                </Grid.Column>
            </Grid>
        );
    }
}

export default connect(mapState, actions)(firestoreConnect([{collection: 'events'}])(EventDashboard));