import React, { Component } from "react";
import pf from "petfinder-client";
import Carousel from "./Carousel";
import Loader from "react-loader-spinner";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

export default class Details extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    petfinder.pet
      .get({
        output: "full",
        id: this.props.id
      })
      .then(data => {
        let breed;
        const pet = data.petfinder.pet;
        if (Array.isArray(pet.breeds.breed)) {
          breed = pet.breeds.breed.join(", ");
        } else {
          breed = pet.breeds.breed;
        }
        this.setState({
          name: pet.name,
          animal: pet.animal,
          location: `${pet.contact.city}-${pet.contact.state}`,
          description: pet.description,
          media: pet.media,
          breed,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  }
  render() {
    if (this.state.loading) {
        return <Loader type="Puff" color="rgb(242, 175, 41)" height="100%" width="100%" />;
    }
    const { name, animal, breed, location, description, media } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <h1>{name}</h1>
        <h2>
          {animal} - {breed} - {location}
        </h2>
        <p>{description}</p>
      </div>
    );
  }
}
