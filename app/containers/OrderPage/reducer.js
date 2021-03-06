/*
 *
 * OrderPage reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR,
  CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CANCEL_ORDER_ERROR, DISMISS, 
  SCAN_ORDER_REQUEST, SCAN_ORDER_SUCCESS, SCAN_ORDER_ERROR
} from './constants';

export const initialState = fromJS({
  order: null,
  success: null,
  error: null,
});

function orderPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return state;
    case GET_ORDER_SUCCESS:
      return state.set('order', action.order);
    case GET_ORDER_ERROR:
      return state.set('error', action.error);
    case CANCEL_ORDER_REQUEST:
      return state;
    case CANCEL_ORDER_SUCCESS:
      return state
        .set('success', action.success)
        .set('order', action.order);
    case CANCEL_ORDER_ERROR:
      return state.set('error', action.error);
    case SCAN_ORDER_REQUEST:
      return state;
    case SCAN_ORDER_SUCCESS:
      return state
        .set('success', action.success)
        .set('order', action.order);
    case SCAN_ORDER_ERROR:
      return state.set('error', action.error);
    case DISMISS:
      return state.set('success', null).set('error', null)
    default:
      return state;
  }
}

export default orderPageReducer;
