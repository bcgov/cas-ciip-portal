import React from 'react';
import NumberFormat from 'react-number-format';

interface Props {
  amount: string;
}

export const Money: React.FunctionComponent<Props> = ({amount}) => {
  return (
    <NumberFormat
      value={amount}
      displayType="text"
      thousandSeparator
      prefix="$"
    />
  );
};

export default Money;
