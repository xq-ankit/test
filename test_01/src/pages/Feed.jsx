import React, { useEffect, useState } from 'react';
import { getUsers, getPostsForUser } from '../services/api';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Feed = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const users = await getUsers();

        // Convert users object to an array
        const usersArray = Object.keys(users).map((userId) => ({
          id: userId,
          name: users[userId],
        }));

        const allPosts = [];
        for (const user of usersArray) {
          const posts = await getPostsForUser(user.id);
          allPosts.push(...posts);
        }

        const sortedPosts = allPosts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setFeed(sortedPosts);
      } catch (error) {
        console.error('Error fetching feed:', error);
      }
    };

    fetchFeed();

    const intervalId = setInterval(fetchFeed, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Feed
      </Typography>
      <List>
        {feed.map((post) => (
          <ListItem key={post.id}>
            <ListItemText primary={post.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Feed;
