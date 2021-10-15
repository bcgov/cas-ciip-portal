import React from "react";
import NumberFormat from "react-number-format";

interface Props {
  amount: string;
}

export const Money: React.FunctionComponent<Props> = ({ amount }) => {
  return (
    <NumberFormat
      value={amount}
      displayType="text"
      isNumericString
      thousandSeparator
      prefix="$"
      // remove the wrapping span NumberFormat uses by default.
      renderText={(formattedValue) => {
        return formattedValue;
      }}
    />
  );
};

export default Money;
