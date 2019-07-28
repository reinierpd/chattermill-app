import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'routes';

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
        <Link route="dashboard">
          <a style={{ textDecoration: 'none', color: 'inherit' }}>
            Chattermill
          </a>
        </Link>
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navbar;
