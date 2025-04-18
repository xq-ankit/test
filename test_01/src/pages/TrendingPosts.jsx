// src/pages/TrendingPosts.js
import React, { useEffect, useState } from 'react';
import { getUsers, getPostsForUser, getCommentsForPost } from '../services/api';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const users = await getUsers();
        const allPosts = [];

        for (const user of users) {
          const posts = await getPostsForUser(user.id);
          allPosts.push(...posts);
        }

        const postCommentCounts = [];

        for (const post of allPosts) {
          const comments = await getCommentsForPost(post.id);
          postCommentCounts.push({ ...post, commentCount: comments.length });
        }

        // Find the maximum comment count
        const maxCommentCount = Math.max(
          ...postCommentCounts.map((post) => post.commentCount)
        );

        // Filter posts with the maximum comment count
        const trending = postCommentCounts.filter(
          (post) => post.commentCount === maxCommentCount
        );

        setTrendingPosts(trending);
      } catch (error) {
        console.error('Error fetching trending posts:', error);
      }
    };

    fetchTrendingPosts();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Trending Posts
      </Typography>
      <List>
        {trendingPosts.map((post) => (
          <ListItem key={post.id}>
            <ListItemText
              primary={`${post.title} (${post.commentCount} comments)`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TrendingPosts;