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

  componentDidMount() {
    fetch('/api/pets')
    .then(res => res.json())
    .then(petData => {
      this.setState({
        pets: petData
      })
    })
  }

  adoptPet = (clickedPet) => {
    let petsArray = this.state.pets.map(petObj => {
      if (petObj.id === clickedPet.id) {
        clickedPet.isAdopted = true
        return clickedPet
      } else {
        return petObj
      }
    })
    this.setState({
      pets: petsArray
    })
  }

  changeHandler = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  filterHandler = () => {
    // /api/pets?type=cat
    // /api/pets
    if (this.state.filters.type === 'all') {
      fetch('/api/pets')
      .then(res => res.json())
      .then(petData => {
        this.setState({
          pets: petData
        })
      })
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(res => res.json())
      .then(petData => {
        this.setState({
          pets: petData
        })
      })
    }
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
              <Filters filterHandler={this.filterHandler} changeHandler={this.changeHandler} type={this.state.filters.type}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser adoptPet={this.adoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
