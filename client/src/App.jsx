import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth } from './Components'

import  'stream-chat-react/dist/css/index.css';
import './App.css';

const cookies = new Cookies();

const apiKey = 'fpnhb337mb2e';

const client = StreamChat.getInstance(apiKey);

const authToken = cookies.get("token");

if(authToken) {
    client.connectUser({
        id:cookies.get('userId'),
        name:cookies.get('userName'),
        fullName:cookies.get('fullName'),
        image:cookies.get('avatarURL'),
        // token:cookies.get('token'),
        hashedPassword:cookies.get('hashedPassword'),
        phoneNumber:cookies.get('phoneNumber'),
    }, authToken)
}

function App() {
    const [createType, setCreateType] = React.useState('');
    const [isCreating, setIsCreating] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);

    if (!authToken) return <Auth />
    
    return (
        <div className= "app__wrapper">
            <Chat client = {client} theme = "team light">
                <ChannelListContainer 
                    isCreating = {isCreating}
                    setIsCreating = {setIsCreating}
                    // isEditing = {isEditing}
                    setIsEditing={setIsEditing}
                    setCreateType = {setCreateType}
                 />

                <ChannelContainer
                    isCreating = {isCreating}
                    setIsCreating = {setIsCreating}
                    isEditing = {isEditing}
                    setIsEditing={setIsEditing}
                    createType = {createType}
               />
          </Chat>
        </div>
    )
}

export default App
