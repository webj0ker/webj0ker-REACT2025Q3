import { Component } from 'react';
import Header from './components/Header/Header';
import Results from './components/Results/Results';
import './App.css';

interface Spell {
  name: string;
  description?: string;
}

interface AppState {
  results: Spell[];
  error?: string;
  loading: boolean;
}

class App extends Component<object, AppState> {
  state: AppState = {
    results: [],
    error: undefined,
    loading: false,
  };

  componentDidMount() {
    this.handleSearch('');
  }

  handleSearch = (searchTerm: string) => {
    this.setState({ loading: true, error: undefined });

    const apiUrl = searchTerm
      ? `https://hp-api.onrender.com/api/spells?name=${searchTerm.toLowerCase()}`
      : 'https://hp-api.onrender.com/api/spells';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: Spell[]) => {
        const results = searchTerm
          ? data.filter((spell) =>
              spell.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : data;
        this.setState({ results, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message || undefined, loading: false });
      });
  };

  throwError = () => {
    this.setState(() => {
      throw new Error('Test error');
    });
  };

  render() {
    const { results, error, loading } = this.state;

    return (
      <div>
        <Header onSearch={this.handleSearch} />
        <Results
          results={results}
          error={error}
          loading={loading}
          throwError={this.throwError}
        />
      </div>
    );
  }
}

export default App;
