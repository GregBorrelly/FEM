import React, { Component } from "react";
import Pet from "./Pet";
import pf from "petfinder-client";
import Loader from 'react-loader-spinner'

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: [],
      loading:true
    };
  }
  componentDidMount() {
    petfinder.pet
      .find({ output: "full", location: "New york city, ny" })
      .then(data => {
        let pets;
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }

          this.setState({ pets, loading:false });
        }
      });
  }
  render() {
    const {pets, loading} = this.state;

    if(loading){
        return <Loader type="Puff" color="rgb(242, 175, 41)" height="100%" width="100%" />;
    }
    return (
      <div className="search">
        {pets.map(pet => (
          <Pet
            name={pet.name}
            animal={pet.animal}
            breed={pet.breeds.breed}
            media={pet.media}
            key={pet.id}
            id={pet.id}
            location={`${pet.contact.city},${pet.contact.state}`}
          />
        ))}
      </div>
    );
  }
}

export default Results;
