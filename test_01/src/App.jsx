import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TopUsers from './pages/TopUsers';
import TrendingPosts from './pages/TrendingPosts';
import Feed from './pages/Feed';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Analytics Dashboard
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Top Users
          </Button>
          <Button color="inherit" component={Link} to="/trending-posts">
            Trending Posts
          </Button>
          <Button color="inherit" component={Link} to="/feed">
            Feed
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<TopUsers />} />
          <Route path="/trending-posts" element={<TrendingPosts />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;