import React, { useEffect, useState } from 'react';
import { getUsers, getPostsForUser, getCommentsForPost } from '../services/api';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const users = await getUsers();
        const userCommentCounts = [];

        // Convert the users object to an array
        const usersArray = Object.keys(users).map((userId) => ({
          id: userId,
          name: users[userId],
        }));

        for (const user of usersArray) {
          const posts = await getPostsForUser(user.id);
          let totalComments = 0;

          for (const post of posts) {
            const comments = await getCommentsForPost(post.id);
            totalComments += comments.length;
          }

          userCommentCounts.push({ ...user, totalComments });
        }

        const sortedUsers = userCommentCounts.sort(
          (a, b) => b.totalComments - a.totalComments
        );

        setTopUsers(sortedUsers.slice(0, 5));
      } catch (error) {
        console.error('Error fetching top users:', error);
      }
    };

    fetchTopUsers();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Top Users
      </Typography>
      <List>
        {topUsers.map((user) => (
          <ListItem key={user.id}>
            <ListItemText
              primary={`${user.name} (${user.totalComments} comments)`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TopUsers;
