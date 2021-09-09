import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 630px;
  height: 690px;
  margin: 10px auto;
  padding-top: 20px;
  border-radius: 4%;
  box-shadow: 0 3px 5px gray;
  background: ${props => props.color};
  color: ${({ theme }) => theme.background.input};
  font-size: 0.9rem;
  list-style: none;
`;

export default Wrapper;
