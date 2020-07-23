import {
    PAYLOAD_HANDSHAKE_REQUEST,
    PAYLOAD_HANDSHAKE_RESPONSE,
    PAYLOAD_STATE_BROADCAST,
} from '../../constants/p2pPayloadConstants'
import logService from '../logService'
import Peer from 'peerjs'
import { P2PStateInterface } from '../roomState/roomStateService'
import masterPeerIdentity from './identity/masterPeerIdentity'

type PayloadFields = 'name' | 'peerId'

export type PayloadContent = Record<PayloadFields, string> & P2PStateInterface

export interface PayloadInterface {
    type: string
    payload: PayloadContent
}

interface SendHandshakeInterface {
    conn: Peer.DataConnection
    name: string
    peerId: string
    isHost?: boolean
}
interface BroadcastInterface {
    data: P2PStateInterface
}

export const sendHandshake = ({
    conn,
    name,
    peerId,
    isHost = false,
}: SendHandshakeInterface): void => {
    logService.log(`Sent handshake ${isHost ? 'request' : 'response'} `)
    conn.send({
        type: isHost ? PAYLOAD_HANDSHAKE_REQUEST : PAYLOAD_HANDSHAKE_RESPONSE,
        payload: {
            name,
            peerId,
        },
    })
}

export const broadcastData = ({ data }: BroadcastInterface): void => {
    // This can later be changed if need for slave broadcasting is introduced
    const peer = masterPeerIdentity.getPeerRef()
    const connections = masterPeerIdentity.getConnections()
    connections.map(item => {
        const connection = peer.connections[item.peerId][0]
        if (connection) {
            connection.send({
                type: PAYLOAD_STATE_BROADCAST,
                payload: data,
            })
        }
    })
}
