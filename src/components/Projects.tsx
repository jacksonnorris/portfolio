import React, { useState, useMemo, ReactElement } from 'react';
import { portfolioData } from '../data/portfolio';
import type { Project, ProjectCategory, LinkIcon } from '../types/portfolio';
import styles from './Projects.module.scss';

import { Box, Typography, Grid, Card, CardContent, CardActions, Button, Chip, useTheme } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import LanguageIcon from '@mui/icons-material/Language';

import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  key: ProjectCategory;
  heading: string;
  blurb: string;
}

const SECTIONS: Section[] = [
  {
    key: 'professional',
    heading: 'Current Work',
    blurb: 'Production systems rather than public repos, so these link to the live app and site.',
  },
  {
    key: 'earlier',
    heading: 'Public Projects',
    blurb: 'Older personal work, with the source up on GitHub.',
  },
];

const LINK_ICONS: Record<LinkIcon, ReactElement> = {
  apple: <AppleIcon />,
  android: <AndroidIcon />,
  web: <LanguageIcon />,
  github: <GitHubIcon />,
};

const Projects = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const theme = useTheme();

  const allTags = useMemo(() => {
    const tags = new Set<string>();
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

  const handleTagClick = (tag: string) => {
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

  const renderCard = (project: Project) => (
    <Grid
      key={project.id}
      size={{ xs: 12, md: 6 }}
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
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
            <Typography gutterBottom variant="h5" component="h3">{project.title}</Typography>
            {project.status && (
              <Chip
                label={project.status}
                size="small"
                color="secondary"
                sx={{ flexShrink: 0, fontWeight: 600 }}
              />
            )}
          </Box>
          {project.subtitle && (
            <Typography
              variant="overline"
              color="primary"
              sx={{ display: 'block', lineHeight: 1.4, mb: 1.5 }}
            >
              {project.subtitle}
            </Typography>
          )}
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
          {(project.links ?? []).map(({ url, label, icon }) => (
            <Button
              key={url}
              variant="outlined"
              size="small"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={LINK_ICONS[icon] ?? <LaunchIcon />}
            >
              {label}
            </Button>
          ))}
        </CardActions>
      </Card>
    </Grid>
  );

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

      {SECTIONS.map((section) => {
        const sectionProjects = filteredProjects.filter(p => p.category === section.key);
        if (sectionProjects.length === 0) return null;

        return (
          <Box key={section.key} sx={{ mb: 8 }}>
            <Typography variant="h4" component="h3" align="center" sx={{ mb: 1 }}>
              {section.heading}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ maxWidth: 620, mx: 'auto', mb: 4 }}
            >
              {section.blurb}
            </Typography>

            <Grid container spacing={4} justifyContent="center" component={motion.div} layout>
              <AnimatePresence>
                {sectionProjects.map(renderCard)}
              </AnimatePresence>
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
};

export default Projects;
