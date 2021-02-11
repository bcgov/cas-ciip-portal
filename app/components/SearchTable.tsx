import {Component} from 'react';

interface Props {
  query;
  defaultOrderByField: string;
  defaultOrderByDisplay: string;
  children: (props) => JSX.Element;
}
class SearchTable extends Component<Props> {
  state = {
    orderByField: this.props.defaultOrderByField,
    direction: 'ASC',
    searchDisplay: 'Search by: ',
    selectedReportingYear: 2019
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

  selectReportingYear = (year) => {
    this.setState({
      selectedReportingYear: year
    });
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
      searchDisplay: this.state.searchDisplay,
      handleEvent: this.handleEvent,
      selectedReportingYear: this.state.selectedReportingYear
    });
  }
}

export default SearchTable;
