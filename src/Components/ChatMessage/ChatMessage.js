import { TextField } from '@mui/material'
import './ChatMessage.scss'

export const ChatMessage = (props)=>{
    const {message} = props
    const trimmedMessage = message.trim()
    return(
        <>
            <div className='chat-message-component'>
                <p id='chat'>{trimmedMessage}</p>
            </div>
        </>
    )
}