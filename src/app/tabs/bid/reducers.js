import {
  REQUEST_BID, RECEIVE_BID, ERROR_BID
} from './types';
import { MetamaskResponseType } from '../../types';

const initialState = {
  loading: false,
  response: null
};

const bidReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_BID: return {
      loading: true,
      response: null
    }
    case RECEIVE_BID: return {
      loading: false,
      response: {
        type: MetamaskResponseType.SUCCESS,
        message: action.response
      }
    }
    case ERROR_BID: return {
      loading: false,
      response: {
        type: MetamaskResponseType.ERROR,
        message: action.error
      }
    }
    default: return state
  }
};

export default bidReducer;