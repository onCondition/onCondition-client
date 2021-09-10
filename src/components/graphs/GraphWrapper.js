import styled from "styled-components";

const GraphWrapper = styled.div`
  margin-top: 5rem;
  padding: 5rem;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.background.graph};
`;

export default GraphWrapper;
