import React, { Component } from "react";

export default class Carousel extends Component {
  state = {
    photos: [],
    active: 0
  };

  static getDerivedStateFromProps({ media }) {
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }
    return { photos };
  }

  handleIndexClick = event => {
    this.setState({ active: +event.target.dataset.index });
  };

  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active].value} alt="" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            <img
              onClick={this.handleIndexClick}
              key={photo.value}
              src={photo.value}
              className={index === active ? "active" : ""}
              alt={"text"}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}
