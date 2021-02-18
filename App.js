import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    var dataJson = [];
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((response) => {
      for(var i=0; i < response.length; i++){
        dataJson.push(response[i].name);
      }
    });
    console.log(dataJson);
    this.items = dataJson;
    
    this.state = {
      suggestions: [],
      text: ''
    }
  }
  
onTextChanged = (e) => {
  const value = e.target.value;
  let suggestions = [];
  if(value.length > 0) {
    const regex = new RegExp(`^${value}`, 'i');
    suggestions = this.items.sort().filter(v => regex.test(v));
  }
  this.setState(() => ({suggestions, text: value}));
}

suggestionSelected(value) {
  this.setState(() => ({
    text: value,
    suggestions: []
  }));
}

renderSuggestions() {
  const {suggestions} = this.state;
  if(suggestions.length === 0) {
    return null;
  }
  return (
    <div className="srchList">
      <ul>
        {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
      </ul>
    </div>
  );
}

  render() {
    const { text } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 input">
          <label className="inboxText" id="inboxText"><strong>Search Names</strong></label>
          <br></br>
          <br></br>
            <input value={text} onChange={this.onTextChanged} type="text" placeholder="Search" />
          </div>
          <div className="col-md-12">
            {this.renderSuggestions()}
          </div>
        </div>
      </div>
    );
  }
}
        
ReactDOM.render(<App />, document.getElementById('root'));

export default App;