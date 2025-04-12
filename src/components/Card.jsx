function Card({ person }) {
    return <div className="card"><div className="info-container">
        <h2 className="name">{person.name}</h2>
        <div className="year"><span>Birth Year:</span> {person.birth_year}</div>
        <div className="nationality"><span>Nationality:</span><p>{person.nationality}</p></div>
        <div className="biography">
            <h3>Biography:</h3>
            <p>{person.biography}</p>
        </div>
        <div className="awards">
            <h4>Awards</h4>
            <p>{person.awards}</p>
        </div>
    </div>
        <div className="image-container">
            <img src={person.image} alt={person.name} className="img" />
        </div></div>
}

export default Card;