import { h, render } from 'preact'
import { Views } from 'preact-views'
import { subscribe } from 'store'
import './App.css'

import Connect from 'views/Connect'
import Lights from 'views/Lights'
import Groups from 'views/Groups'
import Settings from 'views/Settings'

global.h = h

const App = subscribe(({ bridge, view }) => {
  if (!bridge.token) {
    return <Connect />
  }

  return (
    <Views view={view}>
      <Lights name='Lights' />
      <Groups name='Groups' />
      <Settings name='Settings' />
    </Views>
  )
})

render(
  <App />,
  document.querySelector('#app')
)
