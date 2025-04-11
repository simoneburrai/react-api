import { useState, useEffect } from "react";
import axios from "axios";

const urlActress = "https://freetestapi.com/api/v1/actresses"


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
        </div>
    </main>
}

export default Main;