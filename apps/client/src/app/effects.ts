import { all, fork } from 'redux-saga/effects'
import auth from 'features/Authentication/effects'

const effects = function* (): Generator {
  yield all([
    fork(auth),
  ])
}

export default effects
