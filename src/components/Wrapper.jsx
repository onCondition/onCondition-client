import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.isShrink ? "400px" : "630px"};
  height: ${(props) => props.isShrink ? "240px" : "670px"};
  margin: 10px auto;
  padding-top: 20px;
  border-radius: 4%;
  box-shadow: 0 3px 5px ${({ theme }) => theme.shadow.main};
  background: ${props => props.color};
  color: ${({ theme }) => theme.background.input};
  font-size: 0.9rem;
  list-style: none;
`;

Wrapper.propTypes = {
  isShrink: PropTypes.bool.isRequired,
};

Wrapper.defaultProps = {
  isShrink: false,
};

export default Wrapper;
