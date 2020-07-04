/**
 *
 * QrScanner
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
import makeSelectQrScanner from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import QrReader from 'react-qr-reader';
import styled from 'styled-components';
import { Message } from 'rsuite';

const StyledCameraContainer = styled.div`
`


/* eslint-disable react/prefer-stateless-function */
export class QrScanner extends React.Component {

  state = {
    result: 'No result'
  }

  handleScan = data => {
    if (data) {

      const {history} = this.props;
      const json_data = JSON.parse(data);

      // Validate for check in
      if (json_data.type == 'check-in') {
        history.push({
          pathname: '/check-in',
          state: {
            code: json_data.code
          }
        })
      }

      // Validate for check-out 
      if (json_data.type === 'check-out') {
        history.push({
          pathname: '/check-out',
          state: {
            code: json_data.code
          }
        })
      }
      
      // Validate for redeem-order
      if (json_data.type === 'redeem-order') {
        history.push({
          pathname: `/orders/${json_data.order_identifier}`,
          state: {
            redeem: true,
            order_identifier: json_data.order_identifier
          }
        })
      }

      // Validate for redeem-order
      if (json_data.type === 'add-credits') {
        history.push({
          pathname: `/approve-credits`,
          state: {
            code: json_data.code
          }
        })
      }

      // Scan Free Drink
      if (json_data.type === 'free-drink') {
        console.log(json_data.code)
        history.push({
          pathname: `/approve-free-drink`,
          state: {
            code: json_data.code
          }
        })
      }
    }
  }
  handleError = err => {
    console.error(err)
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>QrScanner</title>
          <meta name="description" content="Description of QrScanner" />
        </Helmet>
        <div>
          <Message type='info' description={'Scan for Check-In and Check-out codes.'}/>
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: '100%'}}
          />
        </div>
      </div>
    );
  }
}

QrScanner.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'qrScanner', reducer });
const withSaga = injectSaga({ key: 'qrScanner', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(QrScanner);
