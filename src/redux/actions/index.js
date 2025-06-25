export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_FETCH = 'REQUEST_FETCH';
export const ASK_UPDATE = 'ASK_UPDATE';
export const CHANGE_EXPENSES = 'CHANGE_EXPENSES';

export function addLoginAction(emailValue) {
  return {
    type: ADD_EMAIL,
    email: emailValue,
  };
}
export function fetchApi(state) {
  return {
    type: REQUEST_FETCH,
    state,
  };
}
export function requestFetch() {
  return async (dispatch) => {
    const makeFetch = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await makeFetch.json();
    dispatch(fetchApi(response));
  };
}

export const updateExpenses = (state) => async (dispatch) => {
  const makeFetch = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await makeFetch.json();
  dispatch({
    type: ASK_UPDATE,
    expense: {
      ...state,
      exchangeRates: response,
    },
  });
};
export const changingExpenses = (state) => ({
  type: CHANGE_EXPENSES,
  state,
});
