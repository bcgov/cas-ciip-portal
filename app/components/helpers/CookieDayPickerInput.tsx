import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {useCookies} from 'react-cookie';

interface Props {
  cookies: {[name: string]: any};
  setCookie: (name: string, value: any, options?: any) => void;
}

class InternalCookieDayPickerInput extends React.Component<Props> {
  static mockTimeCookieIdentifier = 'mocks.mocked_timestamp';

  state = {
    selectedDay: InternalCookieDayPickerInput.getCookieValue(
      this.props.cookies[InternalCookieDayPickerInput.mockTimeCookieIdentifier]
    )
  };

  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  // retrieves the unix epoch in the cookie and spits out a Date object - or undefined if not set
  private static getCookieValue(cookieValue: string): Date {
    if (cookieValue === undefined || !cookieValue) return undefined;
    return new Date(parseInt(cookieValue, 10) * 1000);
  }

  handleDayChange(day: Date): void {
    const unixEpoch = day.getTime() / 1000;
    this.props.setCookie(
      InternalCookieDayPickerInput.mockTimeCookieIdentifier,
      unixEpoch
    );

    this.setState({selectedDay: day});

    //TODO: send cookies to server through ajax request instead
    window.location.reload(false);
  }

  render() {
    const {selectedDay} = this.state;
    return (
      <div>
        {selectedDay && <p>Mocked day: {selectedDay.toISOString()}</p>}
        {!selectedDay && <p>Choose a day</p>}
        <DayPickerInput onDayChange={this.handleDayChange} />
      </div>
    );
  }
}

const CookieDayPickerInput = () => {
  const [cookies, setCookie] = useCookies([
    InternalCookieDayPickerInput.mockTimeCookieIdentifier
  ]);
  return (
    <InternalCookieDayPickerInput cookies={cookies} setCookie={setCookie} />
  );
};

export default CookieDayPickerInput;
