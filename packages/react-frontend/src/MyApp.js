import React, {useEffect, useState} from "react";
import Table from "./Table";
import Form from './Form';


function MyApp() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log(error); });
    }, [] );

    function removeOneCharacter(index) {
        const id = characters.filter((character, i) => i === index)[0]['id'];
        return fetch(`Http://localhost:8000/users/${id}`, {method: "DELETE"})
            .then(() => fetchUsers()
                .then((res) => res.json())
                .then((json) => setCharacters(json["users_list"])));
    }

    function updateList(person) {
        postUser(person)
            .then((res) => res.status === 201 ? res.json() : undefined)
            .then((json) => {
                if (json) setCharacters([...characters,json]);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function fetchUsers() {
        return fetch("http://localhost:8000/users");
    }

    function postUser(person) {
        return fetch("Http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });
    }

    return (
        <div className="container">
            <Table characterData={characters}
                   removeCharacter={removeOneCharacter} />
            <Form handleSubmit={updateList} />
        </div>
    )
}
export default MyApp;