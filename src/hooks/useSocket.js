import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = (serverPath) => {

    const socket = useMemo(() => io.connect(serverPath), [serverPath]);

    const [online, setOnline] = useState(false);

    // Si el socket está conectado o no
    useEffect(() => {
        setOnline(socket.connected)
    }, [socket])

    // Escuchar cuando se conecta o reconecta
    useEffect(() => {
        socket.on('connect', () => {
            setOnline(true)
        })
    }, [socket])

    // Escuchar cuando nos desconectamos
    useEffect(() => {
        socket.on('disconnect', () => {
            setOnline(false)
        })
    }, [socket])

    return {
        socket,
        online
    }
}