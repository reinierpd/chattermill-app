import React from 'react';
import styled from 'styled-components';
import { Link } from 'routes';
// styles
import { CenteredContent } from 'components/common/UI';

const Logo = styled.img`
  height: 2.5rem;
  @media (min-width: 768px) {
    height: auto;
  }
`;
/**
 * @description
 * React hook Navbar
 *
 * @returns {*} - Image as link.
 */
const Navbar = () => (
  <CenteredContent as="nav">
    <Link route="home">
      <a>
        <Logo
          src={`${process.env.STATIC_URL}/static/images/home_logo.png`}
          alt="Revolico logo"
        />
      </a>
    </Link>
  </CenteredContent>
);

export default Navbar;
