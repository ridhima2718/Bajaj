import React, { useState } from 'react';
import Select from 'react-select';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);
  const [response, setResponse] = useState(null);

  const options = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
  ];

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleFilterChange = (selectedOptions) => {
    setFilterOptions(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedJson = JSON.parse(jsonInput);
      const response = await fetch('https://testbfhl.herokuapp.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedJson),
      });

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      alert('Invalid JSON input or server error');
    }
  };

  const renderFilteredResponse = () => {
    if (!response) return '';
    let result = '';
    filterOptions.forEach(option => {
      if (option.value === 'numbers') {
        result += `Numbers: ${response.numbers.join(', ')}\n`;
      }
      if (option.value === 'alphabets') {
        result += `Alphabets: ${response.alphabets.join(', ')}\n`;
      }
      if (option.value === 'highest_lowercase_alphabet') {
        result += `Highest Lowercase Alphabet: ${response.highest_lowercase_alphabet.join(', ')}\n`;
      }
    });
    return result;
  };

  return (
    <div className="App">
      <h1>API Input</h1>
      <textarea
        rows="4"
        cols="50"
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='{"data": ["M", "1", "334", "4", "B"]}'
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <h2>Multi Filter</h2>
        <Select
          isMulti
          options={options}
          onChange={handleFilterChange}
          className="multi-select"
        />
      </div>
      <div>
        <h3>Filtered Response</h3>
        <pre>{renderFilteredResponse()}</pre>
      </div>
    </div>
  );
}

export default App;
