import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import JoinRoom from './onboard/joinroom'
import { ColorContext } from './context/colorcontext'
import Onboard from './onboard/onboard'
import JoinGame from './onboard/joingame'
import ChessGame from './chess/ui/chessgame'
/*
 *  Frontend:
 *
 * 1. El usuario primero abre esta aplicación en el explorador.
 * 2. Aparece una pantalla que pide al usuario que envíe a su amigo la URL del juego para iniciar el juego.
 * 3. El usuario envía a su amigo su URL del juego
 * 4. El usuario hace clic en el botón 'inicio' y espera a que el otro jugador se una.
 * 5. Tan pronto como el otro jugador se une, el juego comienza.
 * 
 * 
 * Flujo de otros jugadores:
 * 1. el usuario obtiene el vínculo enviado por su amigo
 * 2. usuario hace clic en el enlace y redirige a su juego. Si el 'host' aún no lo ha hecho
 * ha hecho clic en el botón 'inicio' todavía, el usuario esperará cuando el host haga clic en el botón de inicio.
 * Si el host decide irse antes de hacer clic en el botón "inicio", el usuario será notificado
 * que el host ha finalizado la sesión.
 * 3. Una vez que el host hace clic en el botón de inicio o el botón de inicio ya se hizo clic en
 * antes, es cuando comienza el juego.
 * Onboarding screen =====> Game start. 
 * 
 * Cada vez que un usuario abre nuestro sitio desde la ruta '/', se crea automáticamente una nueva instancia de juego
 * en el back-end. Debemos generar el uuid en el frontend, enviar la solicitud con el uuid
 * como parte del cuerpo de la solicitud. Si algún jugador se va, entonces el otro jugador gana automáticamente.
 * 
 */


function App() {

  const [didRedirect, setDidRedirect] = React.useState(false)

  const playerDidRedirect = React.useCallback(() => {
    setDidRedirect(true)
  }, [])

  const playerDidNotRedirect = React.useCallback(() => {
    setDidRedirect(false)
  }, [])

  const [userName, setUserName] = React.useState('')

  return (
    <ColorContext.Provider value = {{didRedirect: didRedirect, playerDidRedirect: playerDidRedirect, playerDidNotRedirect: playerDidNotRedirect}}>
      <Router>
        <Switch>
          <Route path = "/" exact>
            <Onboard setUserName = {setUserName}/>
          </Route>
          <Route path = "/game/:gameid" exact>
            {didRedirect ? 
              <React.Fragment>
                    <JoinGame userName = {userName} isCreator = {true} />
                    <ChessGame myUserName = {userName} />
              </React.Fragment> 
              :
              <JoinRoom />}
          </Route>
          <Redirect to = "/" />
        </Switch>
      </Router>
    </ColorContext.Provider>);
}

export default App;
