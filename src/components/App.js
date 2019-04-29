import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onAdoptPet = (id) => {

    this.setState({
      pets: this.state.pets.map (pet => {
        if (pet.id === id) {
          const newPet = {...pet}
          newPet.isAdopted = true;
          return newPet
        }
        return pet
      })
    })
    // console.log(event.target.parentElement.id)
    // const pets = this.state.pets
    // const pet = this.state.pets.find(pet => pet.id)
    // const petCopy = pet
    // petCopy.isAdopted
    // this.setState({
    //   pets: [
    //     ...this.state.pets,
    //     this.state.pets.find(pet => pet.id === id).isAdopted true
    //   ]
    // })
    // const pet = this.state.pets.find(pet => pet.id === id)
    // debugger
  }

  componentDidMount(){
    fetch('/api/pets') // = all, /api/pets?type=cat OR dog OR micropig
    .then(r => r.json()) 
    .then(allPets => {
      this.setState({pets: allPets})
    }) // update this.state.pets
  }


  onChangeType = (event) => { // setState this.state.filters.type in select
    // console.log(this.state.filters)
    this.setState({
      filters: {type: event.target.value}
    })
    // console.log(event.target.value)
  }

  onFindPetsClick = () => { // fetch a list of pets with fetch()
    fetch((this.state.filters.type === 'all' ? `/api/pets` : `/api/pets?type=${this.state.filters.type}`))
    .then(r => r.json())
    .then(r => this.setState({pets: r}))
    // console.log('Find Pets Click') // clicks find pets
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
              <Filters onChangeType={this.onChangeType}
              onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
