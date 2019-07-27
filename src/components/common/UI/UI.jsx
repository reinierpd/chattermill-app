import styled from 'styled-components';

export const Layout = styled.div`
  margin: auto;
  padding: 4px;
`;

export const Container = styled.div`
  padding: 30px 15px;
  border-radius: 20px;
  background-color: aliceblue;
  @media (min-width: 768px) {
    padding: 30px;
  }
`;

export const Wrapper = styled.div`
  border-radius: 10px;
  padding: 30px;
  background-color: aliceblue;
`;

export const DisplayFlex = styled.div`
  display: flex;
`;

export const Section = styled.div`
  margin: 2rem 0;
`;

export const CenteredContent = styled(DisplayFlex)`
  justify-content: center;
`;

export const VerticalCentered = styled(DisplayFlex)`
  align-items: center;
`;

export const TextCenter = styled.div`
  text-align: center;
`;

export const InsertLink = styled.a`
  font-weight: 700;
  font-size: 9pt;
  color: #00c;
  text-decoration: underline;
  cursor: pointer;
`;

export const PathLink = styled.a`
  color: black;
  text-decoration: underline;
  font-size: 12px;
  font-weight: 700;
  padding: 0;
  line-height: 25px;
`;

export const PathSeparator = styled.span`
  margin: 0 3px;
  font-weight: 700;
  line-height: 2;
`;

export const ToolTip = styled.div`
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;

  &:hover {
    span:after {
      visibility: visible;
    }

    span {
      visibility: visible;
    }
  }
`;

export const ToolTipIcon = styled.span`
  cursor: pointer;

  &:after {
    left: 0;
    visibility: hidden;
    content: '';
    position: absolute;
    top: 100%;
    width: 0;
    height: 0;
    border-bottom: 10px solid black;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }
`;

export const ToolTipText = styled.span`
  visibility: hidden;
  width: 310px;
  background-color: black;
  color: #fff;
  border-radius: 4px;
  padding: 10px 15px 20px;
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: 150%;
  right: -30vw;

  @media (min-width: 640px) {
    right: -5vw;
  }

  @media (min-width: 768px) {
    width: 380px;
    right: -20vw;
  }

  p,
  a {
    color: #fff;
    margin: 10px 0;
  }
`;

export const Description = styled.div`
  padding: 10px;
  margin: 0.5rem 0 1.5rem;
  width: 100%;
  background-color: white;
`;
