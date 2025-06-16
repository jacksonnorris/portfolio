import React, { useState, useMemo } from 'react';
import portfolioData from '../data/portfolioData.json';
import styles from './Projects.module.scss';

import { Box, Typography, Grid, Card, CardContent, CardActions, Button, Chip } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';

import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  // All state and filtering logic remains the same...
  const [selectedTag, setSelectedTag] = useState(null);
  const allTags = useMemo(() => {
    const tags = new Set();
    portfolioData.projects.forEach(p => p.tags.forEach(tag => tags.add(tag)));
    return ['All', ...Array.from(tags)];
  }, []);
  const filteredProjects = useMemo(() => {
    if (!selectedTag || selectedTag === 'All') return portfolioData.projects;
    return portfolioData.projects.filter(p => p.tags.includes(selectedTag));
  }, [selectedTag]);
  const handleTagClick = (tag) => setSelectedTag(tag);

  return (
    <Box component="section" id="projects" sx={{ py: 8 }}>
      <Typography variant="h2" component="h2" align="center" sx={{ mb: 4 }}>
        Featured Projects
      </Typography>

      {/* Filter Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, mb: 6 }}>
        {allTags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => handleTagClick(tag)}
            variant={selectedTag === tag ? 'filled' : 'outlined'}
            color="primary"
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Box>

      <Grid container spacing={4} justifyContent="center" component={motion.div} layout>
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <Grid 
              item 
              key={project.id} 
              xs={12} 
              md={6} 
              lg={4}
              component={motion.div}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
            >
              <Card 
                className={styles.projectCard} 
                component={motion.div}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">{project.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{project.description}</Typography>
                  <Box>
                    {project.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" sx={{ mr: 1, mb: 1, cursor: 'pointer' }} onClick={() => handleTagClick(tag)} />
                    ))}
                  </Box>
                </CardContent>
                <CardActions className={styles.projectLinks}>
                  {project.liveUrl && <Button variant="outlined" href={project.liveUrl} target="_blank" rel="noopener noreferrer" startIcon={<LaunchIcon />}>Live Demo</Button>}
                  {project.repoUrl && <Button href={project.repoUrl} target="_blank" rel="noopener noreferrer" startIcon={<GitHubIcon />}>GitHub</Button>}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>
    </Box>
  );
};

export default Projects;