class SearchField extends React.Component {
    render() {
      return (
        <div>
          <label>Search</label>
          <input type="text" 
            name={this.props.name} 
            autoComplete="off"
            onChange={this.props.onChange} />
        </div>
      );
    }
  }
  
  class SearchFullScreen extends React.Component {
    render() {
      return (
        <div className="full-screen-search">
          <button className="close-button" 
            onClick={this.props.onClose}>X</button>
          <label>Search</label>
          <input type="text" 
            name="searchlarge" 
            onChange={this.props.onChange} />
        </div>
      );
    }
  }
  
  class App extends React.Component {
    constructor() {
      super();
      
      this.state = {
        showLargeSearch: {
          display: 'none'
        }
      };
      
      this._handleChange = this._handleChange.bind(this);
      this._handleClose = this._handleClose.bind(this);
    }
    
    _handleChange(e) {
      e.preventDefault();
      let n = e.target.name;
      if (e.target.value.length > 0) {
        this.setState({showLargeSearch: { display: 'block' }}, () => {
          this._form.searchlarge.focus();
        });
        if (n === 'search') {
          this._form.searchlarge.value = e.target.value;
        }
        else {
          this._form.search.value = e.target.value;
        }
      }
      else {
        this._handleClose(e);
      }
    }
    
    _handleClose(e) {
      e.preventDefault();
      this.setState({showLargeSearch: { display: 'none' }}, () => {
        this._form.search.focus();
      }); 
    }
    
    render() {
      return (
        <div>
          <h1>Full Screen Search</h1>
          <form ref={f => this._form = f}>
            <SearchField 
              name="search" 
              onChange={this._handleChange} />
            <div style={this.state.showLargeSearch}>
              <SearchFullScreen 
                onChange={this._handleChange}
                onClose={this._handleClose}/>
            </div>
          </form>
        </div>
      );
    }
  }
  
  ReactDOM.render(<App />, document.getElementById('app'));