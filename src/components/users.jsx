import React, {useState} from "react";
import api from "../api";
import "bootstrap/dist/css/bootstrap.css"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id !== userId))
    }

    const renderUsersQualities = (user) => {
        return (
            user.qualities.map(quality => (
                <span className={"m-2 badge bg-" + quality.color}>
                        {quality.name}
                    </span>))
        )
    }

    const renderUsersTable = () => {
        return users.map(user => (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>{renderUsersQualities(user)}</td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td>
                    <button className="btn btn-danger"
                            onClick={() => handleDelete(user._id)}
                    >
                        delete
                    </button>
                </td>
            </tr>
        ))
    }

    const renderPhrase = (number) => {
        if(!number) {
            return <h1 className="btn btn-danger m-2">Сегодня никто с тобой не тусанет</h1>
        } else if((number%10 === 1 && (number === 1 || number > 20))
            || (number > 4 && number < 11)
            || (number > 10 && number < 15) ) {
            return <h1 className="btn btn-primary m-2">{number} человек тусанет с тобой сегодня</h1>
        } else {
            return <h1 className="btn btn-primary m-2">{number} человека тусанет с тобой сегодня</h1>
        }
    }

    return (
    <>
        {renderPhrase(users.length)}
        <table className="table">
            <thead>
            <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился,раз</th>
                <th scope="col">Оценка</th>
            </tr>
            </thead>
            <tbody>
                 {renderUsersTable()}
            </tbody>
        </table>
    </>
    )
}

export default Users
