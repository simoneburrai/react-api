import { useState, useEffect } from "react";
import axios from "axios";

const urlActress = "https://www.freetestapi.com/api/v1/actresses"


const Main = () => {
    const [actressList, setActressList] = useState([]);

    function ApiCall() {
        axios.get(urlActress)
            .then(response => {
                setActressList(response.data);
            })
            .catch(error => console.log(error.message));
    }

    console.log(actressList)


    useEffect(ApiCall, []);

    return <main>
        <div className="card-container">
            {actressList.map(actress => {
                return <div key={actress.id} className="actress">
                    <h2 className="name">Name: {actress.name}</h2>
                    <div className="year">Birth Year:{actress.birth_year}</div>
                    <div className="nationality">Nationality: {actress.nationality}</div>
                    <div className="biography">
                        <h3>Biography</h3>
                        <p>{actress.biography}</p>
                    </div>
                    <img src={actress.image} alt={actress.name} className="img" />
                </div>
            })}
        </div>
    </main>
}

export default Main;