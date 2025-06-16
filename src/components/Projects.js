import React from 'react';
import portfolioData from '../data/portfolioData.json';
import styles from './Projects.module.scss';

import { Box, Typography, Grid, Card, CardContent, CardActions, Button, Chip, Link } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MotionGridItem = ({ children, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ height: '100%' }}
    >
      {children}
    </motion.div>
  );
};


const Projects = () => {
    return (
      <Box component="section" id="projects" sx={{ py: 8 }}>
        <Typography variant="h2" component="h2" align="center" sx={{ mb: 6 }}>
          Featured Projects
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {portfolioData.projects.map((project, index) => (
            <Grid item key={project.id} xs={12} md={6} lg={4}>
              <MotionGridItem index={index}>
                <Card className={styles.projectCard} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h3">
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {project.description}
                    </Typography>
                    <Box>
                      {project.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" sx={{ mr: 1, mb: 1 }} />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions className={styles.projectLinks}>
                    {/* <Button 
                      variant="outlined" 
                      href={project.liveUrl} 
                      target="_blank" 
                      startIcon={<LaunchIcon />}
                    >
                      Live Demo
                    </Button> */}
                    <Button 
                      href={project.repoUrl} 
                      target="_blank" 
                      startIcon={<GitHubIcon />}
                    >
                      GitHub
                    </Button>
                  </CardActions>
                </Card>
              </MotionGridItem>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  
  export default Projects;