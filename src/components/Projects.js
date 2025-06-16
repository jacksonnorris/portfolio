import React from 'react';
import portfolioData from '../data/portfolioData.json';

// MUI Imports for styling and components
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, Chip, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

// Framer Motion and Intersection Observer for animations
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
    <Box component="section" id="projects" sx={{ py: 8, px: 2, backgroundColor: '#f7f9fc' }}>
      <Typography variant="h2" component="h2" align="center" gutterBottom>
        My Projects
      </Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        {portfolioData.projects.map((project, index) => (
          <Grid item key={project.id} xs={12} sm={6} md={4}>
            <MotionGridItem index={index}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8,
                }
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {project.title}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {project.tags.map((tag, index) => (
                      <Chip key={index} label={tag} variant="outlined" color="primary" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  {/* <Button 
                    component={Link} 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    size="small" 
                    startIcon={<LaunchIcon />}
                  >
                    Live Demo
                  </Button> */}
                  <Button 
                    component={Link} 
                    href={project.repoUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small" 
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