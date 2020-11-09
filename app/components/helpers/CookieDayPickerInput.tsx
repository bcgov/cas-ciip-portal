import React from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useCookies} from 'react-cookie';

interface CookieProps {
  cookies: {[name: string]: any};
  setCookie: (name: string, value: any, options?: any) => void;
  removeCookie: (name: string, options?: any) => void;
}

class InternalCookieDayPickerInput extends React.Component<CookieProps> {
  static CookieOptions = {
    path: '/',
    secure: true,
    sameSite: 'strict'
  };
  static MockTimeCookieIdentifier = 'mocks.mocked_timestamp';

  state = {
    selectedDay: InternalCookieDayPickerInput.getCookieValue(
      this.props.cookies[InternalCookieDayPickerInput.MockTimeCookieIdentifier]
    )
  };

  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  // retrieves the unix epoch in the cookie and spits out a Date object - or undefined if not set
  private static getCookieValue(cookieValue: string): Date {
    if (cookieValue === undefined || !cookieValue) return undefined;
    return new Date(parseInt(cookieValue, 10) * 1000);
  }

  handleDayChange(day: Date): void {
    if (day === undefined || day === null) {
      this.reset();
      return;
    }

    const unixEpoch = day.getTime() / 1000;
    this.props.setCookie(
      InternalCookieDayPickerInput.MockTimeCookieIdentifier,
      unixEpoch,
      InternalCookieDayPickerInput.CookieOptions
    );

    this.setState({selectedDay: day});
    //No need to refresh as the cookies will be transmitted next time there is a request to the server
  }

  reset(): void {
    this.props.removeCookie(
      InternalCookieDayPickerInput.MockTimeCookieIdentifier,
      InternalCookieDayPickerInput.CookieOptions
    );
    delete this.props.cookies[
      InternalCookieDayPickerInput.MockTimeCookieIdentifier
    ];
    this.setState({selectedDay: undefined});
  }

  render() {
    const {selectedDay} = this.state;
    return (
      <Container fluid>
        <Row>
          <Col className="text-right align-self-center">
            {selectedDay && (
              <>Mocked database date: {selectedDay.toISOString()}</>
            )}
            {!selectedDay && <>Database date: today</>}
          </Col>
          <Col xs="auto">
            <DatePicker
              onChange={this.handleDayChange}
              selected={selectedDay}
              showMonthDropdown
              showYearDropdown
            />
          </Col>
          <Col xs="auto">
            <Button onClick={this.reset} size="sm">
              Reset
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const CookieDayPickerInput = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    InternalCookieDayPickerInput.MockTimeCookieIdentifier
  ]);
  return (
    <InternalCookieDayPickerInput
      cookies={cookies}
      setCookie={setCookie}
      removeCookie={removeCookie}
    />
  );
};

export default CookieDayPickerInput;
