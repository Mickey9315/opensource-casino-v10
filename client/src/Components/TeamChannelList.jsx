import React from 'react'
import { AddChannel } from '../assets';

function TeamChannelList({ children, error = false, loading, type }) {
    if (error) {
        return type === 'team' ? (
            <div className="team-channel-list">
                <p className="team-channel-list__message">
                    Connection error please wait a moment and try again..!
                </p>
            </div>
        ) : null;
    }

    if (loading) {
        return (
            <div className="team-channel-list">
                <p className="team-channel-list__message loading">
                    {type === 'team' ? 'Channels' : 'Messages'} loading...
                </p>
            </div>

        )
    }
    return (
        <div className="team-channel-list">
            <div className="team-channel-list__header">
                <p className="team-chennal-list__header__title">
                    {type === 'team' ? 'Channels' : ' Direct Messages'}
                </p>
                {/* Button to add channel */}
            </div>
            {children}
        </div>
    )
}

export default TeamChannelList
