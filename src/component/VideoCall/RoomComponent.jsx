import React from 'react'

export default function RoomComponent() {
    const handleDisconnect = () => {
        socketInstance.current?.destoryConnection();
        props.history.push('/');
    }
    return (
        <React.Fragment>
            <div id="room-container"></div>
            <button onClick={handleDisconnect}>Disconnect</button>
        </React.Fragment>
    )
}
