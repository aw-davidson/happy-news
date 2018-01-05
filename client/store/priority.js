

/**
 * ACTION TYPES
 */
const ADD_TO_PRIORITY = 'ADD_TO_PRIORITY'


/**
 * INITIAL STATE
 */
const priorityValues = []

/**
 * ACTION CREATORS
 */
const addToPriority = value => ({type: ADD_TO_PRIORITY, value})


/**
 * REDUCER
 */
export default function (state = priorityValues, action) {
  switch (action.type) {
    case ADD_TO_PRIORITY:
      return action.value.map(elem => elem.value)
    default:
      return state
  }
}
