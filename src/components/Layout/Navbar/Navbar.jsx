import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Link } from 'routes';

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
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h5" color="inherit">
        Chattermill
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navbar;
