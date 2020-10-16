import {Text} from '@react-pdf/renderer';
import React from 'react';

interface Props {
  comments: string;
}

export const PdfCommentsField: React.FunctionComponent<Props> = (
  props: Props
) => {
  return (
    <>
      {props.comments === null || props.comments === undefined ? null : (
        <Text style={{marginBottom: 2, marginTop: 2}}>
          {`comments: ${props.comments}`}
          {'\n'}
        </Text>
      )}
    </>
  );
};
