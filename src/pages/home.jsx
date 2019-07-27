import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from 'components/common/Link';
import styled from 'styled-components';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Title>Home Page Title with styled-components</Title>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js v4-beta example
        </Typography>
        <Link href="/feed" color="secondary">
          Go to the feed page
        </Link>
      </Box>
    </Container>
  );
}
