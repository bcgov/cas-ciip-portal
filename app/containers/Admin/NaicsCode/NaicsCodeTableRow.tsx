import React from 'react';
import {Button} from 'react-bootstrap';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {NaicsCodeTableRow_naicsCode} from '__generated__/NaicsCodeTableRow_naicsCode.graphql';

interface Props {
  relay: RelayProp;
  naicsCode: NaicsCodeTableRow_naicsCode;
}

const handleDeleteNaicsCode = (naicsId: string) => {
  console.log(naicsId);
};

export const NaicsCodeTableRowContainer: React.FunctionComponent<Props> = (
  props
) => {
  const {naicsCode} = props;

  return (
    <tr key={naicsCode.id}>
      <td>{naicsCode.naicsCode}</td>
      <td>{naicsCode.ciipSector}</td>
      <td>{naicsCode.naicsDescription}</td>
      <td style={{textAlign: 'center'}}>
        <Button
          variant="danger"
          onClick={() => handleDeleteNaicsCode(naicsCode.id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default createFragmentContainer(NaicsCodeTableRowContainer, {
  naicsCode: graphql`
    fragment NaicsCodeTableRow_naicsCode on NaicsCode {
      id
      naicsCode
      ciipSector
      naicsDescription
    }
  `
});
