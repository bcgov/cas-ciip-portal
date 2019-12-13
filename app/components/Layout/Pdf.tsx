import styled from '@react-pdf/styled-components';

const Header = styled.Text`
  margin: 0;
  font-size: 18px;
  font-family: 'Helvetica';
  background: #036;
  color: white;
  padding: 20px 30px;
`;

const Body = styled.View`
  padding: 10px 30px;
`;

const Form = styled.View`
  font-size: 13px;
`;

export {Header, Body, Form};
