import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import ApiUrl from "../data/ApiUrl";





const Main = () => {

    // Array of Actors 
    const [actressList, setActressList] = useState([]);
    const [actorsList, setActorsList] = useState([]);
    const [allActors, setAllActors] = useState([]);

    // View All Actors Button 
    const [clickButton, setClickButton] = useState(false);

    // Urls and Searching Options 
    const [urlActress, setUrlActress] = useState(ApiUrl.urlActress);
    const [urlActors, setUrlActors] = useState(ApiUrl.urlActors);
    const [searchValue, setSearchValue] = useState("");
    const searchActor = ApiUrl.searchActors;
    const searchActress = ApiUrl.searchActress;


    const onSubmitResearch = (e) => {
        const isActressChecked = e.target.elements.actresses.checked;
        const isActorChecked = e.target.elements.actors.checked;
        e.preventDefault();
        if (isActressChecked && searchValue !== "") {
            const newUrl = `${searchActress}${searchValue}`
            setUrlActress(newUrl);
        } else {
            setUrlActress(ApiUrl.urlActress)
        }
        if (isActorChecked && searchValue !== "") {
            const newUrl = `${searchActor}${searchValue}`
            setUrlActors(newUrl);
        } else {
            setUrlActors(ApiUrl.urlActors)
        }
    }

    function ApiCallActresses(url) {

        axios.get(url)
            .then(response => {
                setActressList(response.data);
            })
            .catch(error => console.log(error.message));

    }

    function ApiCallActors(url) {
        axios.get(url)
            .then(response => {
                setActorsList(response.data);
            })
            .catch(error => console.log(error.message));
    }

    useEffect(() => {
        ApiCallActresses(urlActress)
        ApiCallActors(urlActors)
    }, [urlActress, urlActors]);



    const generateAllActors = () => {

        const actorsIdChanged = actorsList.map(actor => {
            actor.id = actor.id + actressList.length;
            return actor;
        })
        console.log(actorsIdChanged);
        const allActorsMerged = [...actressList, ...actorsIdChanged];
        allActorsMerged.sort((firstActor, secondActor) => {
            const firstName = firstActor.name.toUpperCase();
            const secondName = secondActor.name.toUpperCase();
            if (firstName < secondName) {
                return -1;
            }
            if (firstName > secondName) {
                return 1;
            }
            return 0;
        });
        setAllActors(allActorsMerged)
        setClickButton(true);
    }

    console.log(allActors)

    return <main>
        {!clickButton && <div className="controls">
            <button onClick={generateAllActors}>View all Actors</button>
            <form onSubmit={onSubmitResearch}>
                <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                <label>Actresses</label>
                <input type="checkbox" name="actresses" />
                <label>Actors</label>
                <input type="checkbox" name="actors" />
                <button type="submit">Submit</button>
            </form>
        </div>}
        {clickButton && <div id="all-actors" className="card-container">
            <h2>Actors and Actresses</h2>
            {allActors.map(actor => {
                return <Card key={actor.id} person={actor}>
                </Card>
            })}
        </div>}


        {!clickButton && <>  <div className="card-container">
            <h2>Actresses</h2>
            {actressList.map(actress => {
                return <Card key={actress.id} person={actress}>
                </Card>
            })}
        </div>
            <div className="card-container actors">
                <h2>Actors</h2>
                {actorsList.map(actor => {
                    return <Card key={actor.id} person={actor}>
                    </Card>
                })}
            </div></>}

    </main>
}

export default Main;