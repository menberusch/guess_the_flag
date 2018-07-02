import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      guess: null,
      showAnswer: null,
      correctAnswer: '',
      randomFlag: null
    };

    this.onGuess = this.onGuess.bind(this);
    this.onNext = this.onNext.bind(this);
  }
  
  componentDidMount() {
    const countriesUrl = 'https://restcountries.eu/rest/v2';
    fetch(countriesUrl)
      .then(data => data.json())
      .then(data => data.sort(() => 0.5 - Math.random()))
      .then(countries => this.setState({countries, randomFlag: Math.floor(Math.random() * 4)}));
  }

  onGuess() {
    let checkedAnswer = document.querySelector('input:checked'),
        correctAnswer = document.querySelector('img').getAttribute('data-id'),
        guess;

    if(!checkedAnswer) return;

    checkedAnswer.getAttribute('data-id') === correctAnswer ? guess = true : guess = false;

    this.setState({guess, showAnswer:true, correctAnswer});
  }

  onNext() {
    const countries = this.state.countries.slice().sort(() => 0.5 - Math.random());
    this.setState({countries, randomFlag: Math.floor(Math.random() * 4), showAnswer: false});
  }
  
  render() {
    let options = <div>Loading...</div>, flag, button;
    const {guess, countries: stateCountries, showAnswer, correctAnswer, randomFlag} = this.state;
    
    if(stateCountries && stateCountries.length > 0) {
      const countries = stateCountries.slice(0, 4);

      if(showAnswer) {
        options = <li>{guess ? `Correct!: ${correctAnswer}` : `Incorrect! Correct Answer: ${correctAnswer}`}</li>;
        button = <button type="button" onClick={this.onNext}>NEXT</button>
      } else {
        options = countries.map((country, i) => (
          <li key={i}>
            <input type="radio" data-id={country.name} id={country.alpha2Code} name="country_option"/>
            <label htmlFor={country.alpha2Code}>{country.name}</label>
          </li>
        ));
        button = <button type="button" onClick={this.onGuess}>GUESS</button>;
      }

      const randomCountry = countries[randomFlag];
      flag = <img
                data-id={randomCountry.name}
                src={randomCountry.flag} 
                alt="Guess this Flag"
              />
    }

    return (
      <div className="App">
        <header>
          <h1>Guess The Flag</h1>
        </header>
        <ul>
          {options}
          <li>{button}</li>
        </ul>
        {flag}
      </div>
    );
  }
}

export default App;
