import { useState, useEffect } from "react";
import axios from "axios";

const urlActress = "http://localhost:5173/api/actresses"


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

    return <main>Sono il Main</main>
}

export default Main;