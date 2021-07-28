import React from 'react'
import { Redirect } from 'react-router-dom'
import uuid from 'uuid/v4'
import { ColorContext } from '../context/colorcontext' 
const socket  = require('../connection/socket').socket

/**
 * Onboard es donde creamos la sala de juegos.
 */

class CreateNewGame extends React.Component {
    state = {
        didGetUserName: false,
        inputText: "",
        gameId: ""
    }

    constructor(props) {
        super(props);
        this.textArea = React.createRef();
    }
    
    send = () => {
        /**
         * Este método debe crear una nueva sala en el espacio de nombres '/'
         * con un identificador único.
         */
        const newGameRoomId = uuid()

        // Se establece el estado de este componente con el gameId para que podamos
        // redirigir al usuario a esa dirección URL más adelante.
        this.setState({
            gameId: newGameRoomId
        })

        // Emite un suceso al servidor para crear una nueva sala
        socket.emit('createNewGame', newGameRoomId)
    }

    typingUserName = () => {
        // Tome el texto de entrada del campo desde el DOM
        const typedText = this.textArea.current.value
        
        // Establece el estado con ese texto
        this.setState({
            inputText: typedText
        })
    }

    render() {


        return (<React.Fragment>
            {
                this.state.didGetUserName ? 

                <Redirect to = {"/game/" + this.state.gameId}><button className="btn btn-success" style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px",backgroundColor: "darkred", color: "yellow"}}>Continuar</button></Redirect>

            :
               <div style={{backgroundColor: "darkred"}}>
                    <h1 style={{textAlign: "center",backgroundColor: "darkred", color: "yellow", marginTop: String((window.innerHeight / 3)) + "px"}}>Ingresa tu nombre:</h1>

                    <input style={{marginLeft: String((window.innerWidth / 2) - 120) + "px", width: "240px", marginTop: "62px", backgroundColor: "gray", color: "yellow"}}
                           ref = {this.textArea}
                           onInput = {this.typingUserName}></input>

                    <button className="btn btn-primary"  //este es el boton del primer jugador
                        style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px", marginTop: "62px",backgroundColor: "yellow", color: "black"}}
                        disabled = {!(this.state.inputText.length > 0)} 
                        onClick = {() => {
                            this.props.didRedirect()
                            this.props.setUserName(this.state.inputText) 
                            this.setState({
                                didGetUserName: true
                            })
                            this.send()
                        }}>Jugar</button>
                </div>
            }
            </React.Fragment>)
    }
}

const Onboard = (props) => {
    const color = React.useContext(ColorContext)

    return <CreateNewGame didRedirect = {color.playerDidRedirect} setUserName = {props.setUserName}/>
}


export default Onboard