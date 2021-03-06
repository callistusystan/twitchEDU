import React from 'react';
import Autosuggest from 'react-autosuggest';
import {Glyphicon} from 'react-bootstrap';

const boosters = [
  {
      icon: 'comment',
      name: 'Chat'
  },
  {
      icon: 'stats',
      name: 'Poll'
  },
  {
      icon: 'stats',
      name: 'Hackamon Poll'
  }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return boosters.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span className="searchItem"> <Glyphicon glyph={suggestion.icon}/> {suggestion.name}</span>
  );
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: []
    };
  }

  clearBar = () => {
      this.setState({
          value: ''
      });
  };

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSelectionClick = (event, data) => {
      console.log();
      this.props.onSuggestionSelected(event, this.state.suggestions[data.suggestionIndex]);
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search Boosters...",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={this.onSelectionClick}
        inputProps={inputProps} />
    );
  }
}

export default SearchBar;
