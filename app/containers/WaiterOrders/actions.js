/*
 *
 * SignupPage actions
 *
 */

import status from 'utils/status';
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  ORDER_ITEMS_REQUEST,
  GET_OUTLET_VENUE_REQUEST,
  GET_OUTLET_VENUE_SUCCESS,
  GET_OUTLET_VENUE_ERROR,
} from './constants';

export function getCartItems(ID) {
  // console.log(ID,"USERID FROM GET CART ITEMS")
  return {
    type: GET_ITEMS_REQUEST,
    ID,
  };
}

export function getCartItemsSuccess(items) {
  return {
    type: GET_ITEMS_SUCCESS,
    items,
  };
}

export function getCartItemsError(error) {
  status(error, 'error');
  return {
    type: GET_ITEMS_ERROR,
    error,
  };
}

export function postOrder(details) {
  return {
    type: ORDER_ITEMS_REQUEST,
    details,
  };
}

export function getOutletVenue(venueId) {
  console.log('Action Hitted');
  return {
    type: GET_OUTLET_VENUE_REQUEST,
    venueId,
  };
}

export function getOutletVenueSuccess(venue) {
  return {
    type: GET_OUTLET_VENUE_SUCCESS,
    venue,
  };
}

export function getOutletVenueError(error) {
  return {
    type: GET_OUTLET_VENUE_ERROR,
    error,
  };
}
