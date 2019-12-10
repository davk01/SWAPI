export default class SwapiService {
    _apiBase = 'https://swapi.co/api';
    async getResourcre(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if(!res.ok){
            throw new Error(`could nor fetch ${url}` + 
                `received ${res.status}`)
        }
        return await res.json();    
    }
    async getAllPeople(){
        const res = await this.getResourcre(`/people`);
        return res.results.map(this._transformPlanet);
    }
    async getPerson(id){
        const person = await this.getResourcre(`/people/${id}/`)
        return this._transfprmPerson(person)
    }
    async getAllPlanets(){
        const res = await this.getResourcre(`/planets`);
        return res.results.map(this._transformPlanet);
    }
    async getPlanet(id){
       const planet = await this.getResourcre(`/planets/${id}/`);
       return this._transformPlanet(planet)
    }
    async getAllStarships(){
        const res = await this.getResourcre(`/starships/`)
        return res.results.map(this._transformStarships)
    }
    async getStarship(id){
        const starship = await this.getResourcre(`/starships/${id}/`);
        return this._transformStarships(starship)
    }
    _extractId(item) {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }
    _transformPlanet(planet) {  
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter,
          }
    }
    _transformStarships(starships){
        return {
            id: this._extractId(starships),
            name:starships.name,
            model: starships.model,
            manufacture:starships.manufacture,
            contInCredits: starships.contInCredits,
            length: starships.length,
            crew: starships.crew,
            passengers: starships.passengers,
            cargoCapacty: starships.cargoCapacty
        }
    }
    _transfprmPerson(person){
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.eyeColor
        }
    }
}


// const swapi = new SwapiService();
// swapi.getAllPeople().then((people) => {
//     people.forEach((p) => {
//         console.log(p.name)
//     })
// })