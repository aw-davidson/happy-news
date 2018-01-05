

/**
 * ACTION TYPES
 */
const ADD_TO_FILTER = 'ADD_TO_FILTER'


/**
 * INITIAL STATE
 */
const filterValues = []

/**
 * ACTION CREATORS
 */
const addToFilter = value => ({type: ADD_TO_FILTER, value})


/**
 * REDUCER
 */
export default function (state = filterValues, action) {
  switch (action.type) {
    case ADD_TO_FILTER:
      return action.value.map(elem => elem.value)
    default:
      return state
  }
}
