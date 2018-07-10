import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../../event/EventList/EventList';
import EventForm from '../EventForm/EventForm';
import { createEvent, deleteEvent, updateEvent } from "../eventActions";
import cuid from 'cuid';

const mapState = (state) => ({
    events: state.events
});

const actions = {
    createEvent,
    updateEvent,
    deleteEvent
};

class EventDashboard extends Component {
    state = {
        isOpen: false,
        selectedEvent: null
    };

    handleFormOpen = () => {
        this.setState({
            selectedEvent: null,
            isOpen: true
        });
    };

    handleFormCancel = () => {
        this.setState({
          isOpen: false
        });
    };

    handleCreateEvent = (newEvent) => {
        newEvent.id = cuid();
        newEvent.hostPhotoURL = '/assets/user.png';

        this.props.createEvent(newEvent);

        this.setState({
          isOpen: false
        })
    };

    handleUpdateEvent = (updatedEvent) => {
        this.props.updateEvent(updatedEvent);
        this.setState({
            isOpen: false,
            selectedEvent: null
        })
    };

    handleOpenEvent = (eventToOpen) => () => {
        this.setState({
            selectedEvent: eventToOpen,
            isOpen: true
        });
    };

    handleDeleteEvent = eventId => () => {
        this.props.deleteEvent(eventId);
    };

    render() {
        const {selectedEvent} = this.state;
        const {events} = this.props;

        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventList deleteEvent={this.handleDeleteEvent} events={events} onEventOpen={this.handleOpenEvent} />
                </Grid.Column>
                <Grid.Column width={6}>
                    <Button onClick={this.handleFormOpen} positive content='Create Event'/>
                    {this.state.isOpen &&
                        <EventForm
                            selectedEvent={selectedEvent}
                            onFormCancel={this.handleFormCancel}
                            onCreateEvent={this.handleCreateEvent}
                            updateEvent={this.handleUpdateEvent}
                        />}
                </Grid.Column>
            </Grid>
        );
    }
}

export default connect(mapState, actions)(EventDashboard);