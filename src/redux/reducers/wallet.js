import { ASK_UPDATE, REQUEST_FETCH, CHANGE_EXPENSES } from '../actions';

const INITIAL_STATE = {

  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,

};
function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_FETCH:
    return {
      ...state,
      currencies: Object.keys(action.state).filter((coin) => coin !== 'USDT'),
    };
  case ASK_UPDATE:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.expense, id: state.expenses.length }],
    };
  case CHANGE_EXPENSES: return {
    ...state,
    expenses: [...action.state],
  };

  default: return state;
  }
}
export default wallet;
