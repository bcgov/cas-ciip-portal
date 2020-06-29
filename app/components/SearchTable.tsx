import {Component} from 'react';

interface Props {
  query;
  defaultOrderByField: string;
  defaultOrderByDisplay: string;
  children: (props) => JSX.Element;
}
class SearchTableComponent extends Component<Props> {
  state = {
    orderByField: this.props.defaultOrderByField,
    direction: 'ASC',
    searchField: null,
    searchValue: null,
    searchDisplay: 'Search by: '
  };

  toggleDirection = () => {
    this.state.direction === 'ASC'
      ? this.setState({direction: 'DESC'})
      : this.setState({direction: 'ASC'});
  };

  sortColumn = (column) => {
    this.toggleDirection();
    this.setState({
      orderByField: column
    });
  };

  applySearch = (column, value) => {
    if (column)
      this.setState({
        searchField: column,
        searchValue: value
      });
    else {
      this.setState({
        searchField: undefined,
        searchValue: undefined
      });
    }
  };

  handleEvent = (action, value, column) => {
    this[action](value, column);
  };

  render() {
    const {query} = this.props;
    const {children} = this.props;

    return children({
      query,
      orderByField: this.state.orderByField,
      direction: this.state.direction,
      searchField: this.state.searchField,
      searchValue: this.state.searchValue,
      searchDisplay: this.state.searchDisplay,
      handleEvent: this.handleEvent
    });
  }
}

export default SearchTableComponent;
