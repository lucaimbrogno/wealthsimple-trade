import {
  SELECT_ACCOUNT,
  GET_STATUS_RESPONSE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  GET_HISTORY,
  GET_HISTORY_RESPONSE,
  GET_WATCHLIST,
  GET_WATCHLIST_RESPONSE,
  SELECT_SECURITY,
  SELECTED_SECURITY,
  GET_SECURITY_HISTORY,
  GET_SECURITY_HISTORY_RESPONSE,
} from '../constants'

const initialState = {
  selectedAccount: null,
  accounts: {},
  isHistoryLoading: false,
  historicQuotes: {},
  watchlist: {},
  isWatchlistLoading: false,
  selectedSecurity: null,
  isSelectedSecurityLoading: false,
}

const tradeState = (prevState = initialState, { type, payload }) => {
  switch (type) {
    case SELECT_ACCOUNT: {
      return {
        ...prevState,
        selectedAccount: payload,
      }
    }

    case LOGIN_USER_SUCCESS: {
      // pull out portfolio data from login success
      const { portfolioData = {} } = payload.data

      return {
        ...prevState,
        accounts: portfolioData,
      }
    }

    case LOGOUT_USER_SUCCESS: {
      return {
        ...prevState,
        accounts: {},
        historicQuotes: {},
        selectedAccount: null,
      }
    }

    case GET_STATUS_RESPONSE: {
      // pull out portfolio data from login success
      const { portfolioData = {} } = payload.data

      return {
        ...prevState,
        accounts: portfolioData,
      }
    }

    case GET_HISTORY: {
      return {
        ...prevState,
        isHistoryLoading: true,
      }
    }

    case GET_HISTORY_RESPONSE: {
      return {
        ...prevState,
        isHistoryLoading: false,
        historicQuotes: {
          ...prevState.historicQuotes,
          ...payload.data,
        },
      }
    }

    case GET_WATCHLIST: {
      return {
        ...prevState,
        isWatchlistLoading: true,
      }
    }

    case GET_WATCHLIST_RESPONSE: {
      return {
        ...prevState,
        isWatchlistLoading: false,
        watchlist: payload.data,
      }
    }

    // when a new security is selected, update the security id and invalidate previous historic quotes
    case SELECT_SECURITY: {
      return {
        ...prevState,
        selectedSecurity: {
          ...payload,
          historicQuotes: {},
        },
      }
    }

    case SELECTED_SECURITY: {
      return {
        ...prevState,
        selectedSecurity: {
          ...prevState.selectedSecurity,
          ...payload,
        },
      }
    }

    case GET_SECURITY_HISTORY: {
      return {
        ...prevState,
        isSelectedSecurityLoading: true,
      }
    }

    // if we requested history for a security, only update new historic data for that time period
    case GET_SECURITY_HISTORY_RESPONSE: {
      return {
        ...prevState,
        isSelectedSecurityLoading: false,
        selectedSecurity: {
          ...prevState.selectedSecurity,
          historicQuotes: {
            ...prevState.selectedSecurity.historicQuotes,
            ...payload.data,
          },
        },
      }
    }

    default:
      return prevState
  }
}

export default tradeState
