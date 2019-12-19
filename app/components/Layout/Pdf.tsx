import styled from '@react-pdf/styled-components';

const Header = styled.View`
  font-size: 16px;
  padding-bottom: 10px;
  text-align: center;
`;

const Body = styled.View`
  padding: 0px 30px;
`;

const FormFields = styled.View`
  font-size: 12px;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin-left: -10px;
`;

const Column = styled.View`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  margin: 0 10px;
`;

export {Header, Body, FormFields, Row, Column};
