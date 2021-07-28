import React from 'react'
import { useParams } from 'react-router-dom'
const socket  = require('../connection/socket').socket




const JoinGameRoom = (gameid, userName, isCreator) => {
    /**
     * Para esta instancia del explorador, queremos
     * para unirlo a un gameRoom. Por ahora
     * Supongamos que existe la sala de juegos
     * en el backend.
     *
     *
     * TODO: handle el caso cuando la sala de juegos no existe.
     */
    const idData = {
        gameId : gameid,
        userName : userName,
        isCreator: isCreator,

    }
    socket.emit("playerJoinGame", idData)
}
  
  
const JoinGame = (props) => {
    /**
     * Extraiga el 'gameId' de la URL.
     * el 'gameId' es el ID de gameRoom.
     */
    const { gameid } = useParams()
    JoinGameRoom(gameid, props.userName, props.isCreator)

    return <div style={{backgroundColor: "darkred",color:"yellow", textAlign: "center", marginTop: "100px"}}>

        <h1>Hola {props.userName}, vamos a jugar</h1>
    </div>
}

export default JoinGame
  
