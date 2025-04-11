import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";


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
                return <Card key={actress.id}>
                    <div className="info-container">
                        <h2 className="name">{actress.name}</h2>
                        <div className="year"><span>Birth Year:</span> {actress.birth_year}</div>
                        <div className="nationality"><span>Nationality:</span>{actress.nationality}</div>
                        <div className="biography">
                            <h3>Biography:</h3>
                            <p>{actress.biography}</p>
                        </div>
                        <div className="awards">
                            <h4>Awards</h4>
                            <p>{actress.awards}</p>
                        </div>
                    </div>
                    <div className="image-container">
                        <img src={actress.image} alt={actress.name} className="img" />
                    </div>
                </Card>
            })}
        </div>
    </main>
}

export default Main;