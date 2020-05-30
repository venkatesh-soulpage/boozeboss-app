/**
 *
 * EventPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectEventPage, { makeSelectEvent, makeSelectCart } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { EventContainer } from './components';
import { makeSelectRole, makeSelectScope } from '../App/selectors';
import { getEvent, getEventSuccess, updateEvent, addItemToCart, removeItemFromCart } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class EventPage extends React.Component {

  componentDidMount = () => {
    const {getEvent} = this.props;
    const path = window.location.pathname.split('/');
    const event_id = path[2];
    

    if (event_id) {
      getEvent(event_id);
    }
    
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Event Page</title>
          <meta name="description" content="Description of EventPage" />
        </Helmet>
        <EventContainer 
          {...this.props}
        />
      </div>
    );
  }
}

EventPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  role: makeSelectRole(), 
  scope: makeSelectScope(), 
  event: makeSelectEvent(),
  cart: makeSelectCart(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEvent: event_id => dispatch(getEvent(event_id)),
    getEventSuccess: event => dispatch(getEventSuccess(event)), 
    updateEvent: (event_id, field) => dispatch(updateEvent(event_id, field)),
    addItemToCart: (item) => dispatch(addItemToCart(item)),
    removeItemFromCart: (item) => dispatch(removeItemFromCart(item))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'event', reducer });
const withSaga = injectSaga({ key: 'event', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EventPage);
