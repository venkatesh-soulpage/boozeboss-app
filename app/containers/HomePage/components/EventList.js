import React, { Component } from 'react';
import styled from 'styled-components';
import { Panel, Button, Divider, Input, InputGroup, Icon } from 'rsuite';
import moment from 'moment';
import Countdown from 'react-countdown';

const styles = {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  };
  

const EventTitle = styled.b`
    margin: 0 0 1em 0;
`

const EventListContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em;
    flex: 1;
`

const EventRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 1;
    align-items: center;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`
/* const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <p>Ready</p>;
    } else {
      // Render a countdown
        return <span>{days}D : {hours}H : {minutes}M : {seconds} S</span>;
    }
  }; */

class EventCard extends Component {

    renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          // Render a completed state
          return <Button color="green" block onClick={this.handleShowInvite}>Check-In</Button>;
        } else {
          // Render a countdown
            return <span>{days}D : {hours}H : {minutes}M : {seconds}S</span>;
        }
      };

    handleShowCheckIn = () => {
        const {history, event_guest} = this.props;
        history.push({
            pathname: 'qr-invite',
            state: {
                event_guest: event_guest,
                is_checkin: true
            }
        })
    }

    handleShowCheckOut = () => {
        const {history, event_guest} = this.props;
        history.push({
            pathname: 'qr-invite',
            state: {
                event_guest: event_guest,
                is_checkout: true
            }
        })
    }

    render() {
        const {event_guest} = this.props;
        return (
            <Panel bordered>
                <EventRow>
                    <p>{moment(event_guest.event.started_at).format('DD/MM/YYYY')}</p>
                    {/* If its an upcoming event */}
                    {new Date(event_guest.event.started_at).getTime() >= new Date().getTime() && (
                        <p style={{margin: 0}}>Starting {moment(event_guest.event.started_at).fromNow()}</p>
                    )}
                    {/* If its an ongoing event */}
                    {(new Date(event_guest.event.started_at).getTime() < new Date().getTime()) && 
                        (new Date(event_guest.event.ended_at).getTime() >= new Date().getTime()) && (
                            <b style={{margin: 0}}>ONGOING</b>
                    )}
                    {/* If its a finished event */}
                    {(new Date(event_guest.event.ended_at).getTime() <= new Date().getTime()) && (
                            <b style={{margin: 0}}>Finished</b>
                    )}
                </EventRow>
                <EventRow style={{margin: '1em 0 0 0'}}>
                    <b>{event_guest.event.brief_event.name}<p>@ {event_guest.event.brief_event.venue.name} ({event_guest.event.brief_event.venue.address})</p></b>
                </EventRow>
                <Divider />
                { new Date(event_guest.event.started_at).getTime() <= new Date().getTime() ? (
                     <EventRow>
                        {event_guest.checked_in ? (
                            <React.Fragment>
                                {event_guest.check_out_time ? (
                                    <p>Successfully Checked-Out</p>
                                ) : (
                                    <ButtonContainer>
                                        <Button color="green" block>Menu</Button> 
                                        <Button block onClick={this.handleShowCheckOut}>Check-Out</Button>
                                    </ButtonContainer>
                                )}
                            </React.Fragment>
                            
                            
                        ) : (
                            <Button color="green" block onClick={this.handleShowCheckIn}>Check-In</Button>
                        )}
                    </EventRow>
                ): (
                    <Button block color="green">
                            <Countdown 
                                date={event_guest.event.started_at} 
                                renderer={this.renderer}
                            />
                    </Button>
                )}
            </Panel>
        )
    }
}

export default class EventList extends Component {

    state = {
        code: null
    }
    
    handleEventCodeChange = (code) => {
        if (code.length < 7) {
            this.setState({code})
        }
    }

    handleSubmitCode = () => {
        const {submitEventCode} = this.props;
        const {code} = this.state;
        
        submitEventCode(code);
    }

    render() {
        const { events } = this.props;
        const {code} = this.state;
        return (
            <EventListContainer>
                <EventTitle>My Events</EventTitle>
                {events &&
                    events.length > 0 && 
                    events.filter(event_guest => new Date(event_guest.event.ended_at).getTime() >= new Date().getTime()) &&
                    events.map(event_guest => <EventCard {...this.props} event_guest={event_guest}/>) 
                } 
                {events &&
                    events.length < 1 && (
                        <Panel bordered>
                            <p>No upcoming events.</p>
                            <p>Do you have an event invite code?</p> 
                            <InputGroup style={styles}>
                                <InputGroup.Addon>
                                    <Icon icon="key" />
                                </InputGroup.Addon>
                                <Input onChange={this.handleEventCodeChange} value={code}/>
                            </InputGroup>
                            <Button block color="green" disabled={!code || code.length < 6} onClick={this.handleSubmitCode}>
                                Submit
                            </Button>
                        </Panel>
                )}
            </EventListContainer>
        )
    }
}
