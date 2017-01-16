// next just goes to the next middleware
// dispatch means run the entire cycle over again
export default function({ dispatch }){
  return next => action => {
    // if action does not have payload or payload does not have a .then property we don't care about it, send it on
    if (!action.payload || !action.payload.then){
      // next tells the app to go onto the next middleware, if none exists then onto the reducers
      return next(action);
    }

    // make sure the action promise resolves
    action.payload
      .then(function(response){
        const newAction = { ...action, payload: response }
        dispatch(newAction);
      })

  }
}

// functionally the same as above
// export default function({ dispatch }){
//   return function(next){
//     return function(action){
//       next(action);
//     }
//   }
// }
