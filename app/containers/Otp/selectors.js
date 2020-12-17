import { createSelector } from 'reselect';

const selectOtp = state => state.outlet;

const selectOutletInfo = state => state.outlet;

const makeSelectCartItems = () =>
  createSelector(
    selectOutletInfo,
    cartState => cartState.get('cartitems'),
  );

const makeSelectOutletInfo = () =>
  createSelector(
    selectOutletInfo,
    cartState => cartState.get('outlet'),
  );

const makeSelectCurrentOutlet = () =>
  createSelector(
    selectOutletInfo,
    cartState => cartState.get('currentOutlet'),
  );

const makeSelectError = () =>
  createSelector(
    selectOtp,
    otpState => otpState.get('error'),
  );

const makeSelectSuccess = () =>
  createSelector(
    selectOtp,
    otpState => otpState.get('success'),
  );

export {
  makeSelectSuccess,
  makeSelectError,
  makeSelectCartItems,
  makeSelectOutletInfo,
  makeSelectCurrentOutlet,
};
