import { LOADING } from "../types";

const initialState = {
  isLoading: false,
};

const loadingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    default:
      return state;
  }
};

export default loadingReducer;
