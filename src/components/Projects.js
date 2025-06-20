import React, { useState, useMemo } from 'react';
import portfolioData from '../data/portfolioData.json';
import styles from './Projects.module.scss';

import { Box, Typography, Grid, Card, CardContent, CardActions, Button, Chip, useTheme } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';

import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const theme = useTheme(); 

  const allTags = useMemo(() => {
    const tags = new Set();
    portfolioData.projects.forEach(p => p.tags.forEach(tag => tags.add(tag)));
    return ['All', ...Array.from(tags)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (!selectedTag || selectedTag === 'All') {
      return portfolioData.projects;
    }
    return portfolioData.projects.filter(project =>
      project.tags.includes(selectedTag)
    );
  }, [selectedTag]);

  const handleTagClick = (tag) => {
    setSelectedTag(prevTag => (prevTag === tag ? null : tag));
  };

  const chipContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const chipVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <Box component="section" id="projects" sx={{ py: 8 }}>
      <Typography variant="h2" component="h2" align="center" sx={{ mb: 4 }}>
        Featured Projects
      </Typography>

      <Box 
        component={motion.div}
        variants={chipContainerVariants}
        initial="hidden"
        animate="visible"
        sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1.5, mb: 8 }}
      >
        {allTags.map((tag) => {
          const isSelected = selectedTag === tag || (tag === 'All' && !selectedTag);
          return (
            <motion.div key={tag} variants={chipVariants}>
              <Chip
                label={tag}
                onClick={() => handleTagClick(tag)}
                color="primary"
                variant={isSelected ? 'filled' : 'outlined'}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  fontSize: '0.9rem',
                  ...(isSelected && {
                    boxShadow: `0px 2px 12px 0px ${theme.palette.primary.main}60`,
                    transform: 'scale(1.05)',
                  }),
                  ...(!isSelected && {
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      transform: 'scale(1.05)',
                    },
                  }),
                }}
              />
            </motion.div>
          );
        })}
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
                component={motion.div}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className={styles.projectCard}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">{project.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{project.description}</Typography>
                  <Box>
                    {project.tags.map((tag) => (
                      <Chip 
                        key={tag} 
                        label={tag} 
                        size="small" 
                        variant="outlined"
                        onClick={() => handleTagClick(tag)}
                        sx={{ 
                          mr: 1, 
                          mb: 1, 
                          cursor: 'pointer',
                          transition: 'all 0.2s ease-in-out',
                          color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#172b4d',
                          borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#172b4d',
                          '&:hover': {
                            backgroundColor: 'action.hover',
                            transform: 'scale(1.05)',
                          }
                        }} 
                      />
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