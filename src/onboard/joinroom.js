import React from 'react'
import JoinGame from './joingame'
import ChessGame from '../chess/ui/chessgame'


/**
 * Onboard es donde creamos la sala de juegos
 */

class JoinRoom extends React.Component {
    state = {
        didGetUserName: false,
        inputText: ""
    }


    constructor(props) {
        super(props);
        this.textArea = React.createRef();

    }

    typingUserName = () => {
        // Toma el texto de entrada del campo desde el DOM
        const typedText = this.textArea.current.value
        
        // Establecer el estado con ese texto
        this.setState({
            inputText: typedText
        })
    }

    render() {
    
        return (<React.Fragment>
            {
                this.state.didGetUserName ? 
                <React.Fragment>
                    <JoinGame userName = {this.state.inputText} isCreator = {false}/>
                    <ChessGame myUserName = {this.state.inputText}/>
                </React.Fragment>
            :
                    //Pagina de inicio del oponente
               <div style={{backgroundColor: "darkred"}}>
                    <h1 style={{textAlign: "center",color: "yellow", marginTop: String((window.innerHeight / 3)) + "px"}}>Ingresa tu nombre:</h1>

                    <input style={{marginLeft: String((window.innerWidth / 2) - 120) + "px", width: "240px", marginTop: "62px", backgroundColor: "gray", color: "yellow"}}
                           ref = {this.textArea}
                           onInput = {this.typingUserName}></input>

                    <button className="btn btn-primary"  //Este es el boton del oponente
                        style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px", marginTop: "62px",backgroundColor: "yellow", color: "black"}}
                        disabled = {!(this.state.inputText.length > 0)}
                        onClick = {() => {
                            // Cuando se presiona el boton 'Submit' desde la pantalla del nombre de usuario,
                            // Debemos enviar una solicitud al servidor para crear una nueva sala con
                            // el uuid que generamos aquí.
                            this.setState({
                                didGetUserName: true
                            })
                        }}>Continuar</button>
                </div>
            }
            </React.Fragment>)
    }
}

export default JoinRoom