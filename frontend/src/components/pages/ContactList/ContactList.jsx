import React, {useState, useEffect} from 'react';
import classes from './ContactList.module.css';


export default function ContactList() {

    const [clients, setClients] = useState([])
    const [serverMessage, setServerMessage] = useState("")
    const [selectedClient, setSelectedClient] = useState(null)

    useEffect(() => {
        const addingClient = async () => {
            setServerMessage("Loading data")
            const data = await fetch("http://localhost:5000/get-client")
            const finalData = await data.json()
            const {msg, documents} = finalData
            setClients(documents)
            setServerMessage(msg)
        }
        addingClient();
    },[])


    const deleteClient = async (clientId) => {
        try {
            const response = await fetch(`http://localhost:5000/delete-client/${clientId}`, {
                method: 'DELETE',
            });
            const data = await response.json()
            if (data.deleted) {
                setClients(clients.filter(client => client._id !== clientId))
                setServerMessage(data.msg)
            } else {
                setServerMessage(data.msg)
            }
        } catch (error) {
            setServerMessage("Error deleting client: " + error.message)
        }
    };

    const handleClientClick = (client) => {
        setSelectedClient(client)
    }


    return (
        <div className={classes['client-list-container']}>
            <div className={classes['client-list']}>
                {clients.map((client, _id) => (
                    <div key={_id} className={classes['client-group']}>
                        <button className={classes['button-client']} onClick={() => handleClientClick(client)}>
                            {client.firstName} {client.lastName}
                        </button>
                        <button className={classes['button-delete']} onClick={() => deleteClient(client._id)}>Delete</button>
                    </div>
                ))}
            </div>
            <div className={classes.msg}>{serverMessage}</div>
            {selectedClient && (
                <div className={classes['client-details']}>
                    <h3>Client Details:</h3>
                    <p><strong>Name:</strong> {selectedClient.firstName}</p>
                    <p><strong>Last Name:</strong> {selectedClient.lastName}</p>
                    <p><strong>Birth Date:</strong> {selectedClient.birthDate}</p>
                    <p><strong>Sex:</strong> {selectedClient.sex}</p>
                </div>
            )}
        </div>
    )
}