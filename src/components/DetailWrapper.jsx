import styled from "styled-components";

const DetailWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 10px;
  padding: 20px 0;
  background-color: ${({ theme }) => theme.background.input};
  border: 3px solid ${({ theme }) => theme.background.main};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow.main};

  .viewer {
    display: grid;
    width: 680px;
    justify-items: center;
    align-items: center;
  }

  .comment {
    margin-right: 20px;
    flex-basis: 200px;
    flex-grow: 1;
  }
`;

export default DetailWrapper;
