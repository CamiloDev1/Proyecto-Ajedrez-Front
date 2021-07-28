import io from 'socket.io-client'
const URL = 'http://localhost:3000'
//const URL = 'https://ajedrez-ser.herokuapp.com/'


const socket = io(URL)

var mySocketId
// Registre los detectores de eventos preliminares aquí:


socket.on("createNewGame", statusUpdate => {
    console.log("Nuevo Juego creado! Usuario!: " + statusUpdate.userName + ", Game id: " + statusUpdate.gameId + " Socket id: " + statusUpdate.mySocketId)
    mySocketId = statusUpdate.mySocketId
})

export {
    socket,
    mySocketId
}