import styled from '@react-pdf/styled-components';

const Header = styled.Text`
  margin: 0;
  font-size: 15px;
  font-family: 'Helvetica';
  padding: 10px 30px;
`;

const Title = styled.Text`
  font-size: 15px;
  font-weight: bold;
  // padding: 20px 0;
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

const Hr = styled.View`
  border-bottom: 1px solid #000;
`;

export {Header, Title, Body, FormFields, Row, Column, Hr};
