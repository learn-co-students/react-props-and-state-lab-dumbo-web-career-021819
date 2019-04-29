import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      displayPets: [],
      filters: {
        type: 'all'
      }
    }
  }

//Only fetches on mount
  componentDidMount() {
    fetch("/api/pets")
      .then(response => response.json())
      .then(pets => {
        this.setState({
          pets: pets,
        })
      })
  }

  onChangeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

//The filter changes the display pets without altering the original fetch
  onFindPetsClick = () => {
    if (this.state.filters.type === 'all') {
      this.setState({
        displayPets: this.state.pets
      })
    } else {
      const filterPets = this.state.pets.filter(pet => {return pet.type === this.state.filters.type})
      this.setState({
        displayPets: filterPets
      })
    }
  }

  onAdoptPet = (petId) => {
    const newPets = this.state.pets.map(pet => {
      if (pet.id === petId) {
        pet.isAdopted = !pet.isAdopted
        return pet
      } else {
        return pet
      }
    })
    this.setState({
      pets: newPets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.displayPets} onAdoptPet= {this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
