import React, { ReactElement } from 'react';
import { alpha } from '@mui/material/styles';
import { portfolioData } from '../data/portfolio';

import { Box, Typography, Button, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

interface ContactLink {
  label: string;
  href: string;
  icon: ReactElement;
}

const Hero = () => {
  const { name, title, about, contact } = portfolioData;
  const paragraphs = Array.isArray(about) ? about : [about];

  const links: ContactLink[] = [
    { label: 'Email', href: `mailto:${contact.email}`, icon: <EmailIcon /> },
    { label: 'LinkedIn', href: contact.linkedin, icon: <LinkedInIcon /> },
    { label: 'GitHub', href: contact.github, icon: <GitHubIcon /> },
  ];

  return (
    <Box
      component={motion.section}
      id="about"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={(theme) => ({
        py: { xs: 8, md: 12 },
        textAlign: 'center',
        position: 'relative',
        zIndex: 0,
        // Soft color glow behind the intro, in the palette's own colors.
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          background: `radial-gradient(600px circle at 15% 20%, ${alpha(
            theme.palette.primary.main,
            theme.palette.mode === 'dark' ? 0.14 : 0.1
          )}, transparent 65%), radial-gradient(560px circle at 85% 25%, ${alpha(
            theme.palette.secondary.main,
            theme.palette.mode === 'dark' ? 0.11 : 0.08
          )}, transparent 65%)`,
        },
      })}
    >
      <Typography
        component={motion.h1}
        variants={itemVariants}
        variant="h2"
        sx={(theme) => ({
          fontWeight: 700,
          letterSpacing: '-0.02em',
          mb: 2,
          backgroundImage: `linear-gradient(92deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
        })}
      >
        {name}
      </Typography>

      <Typography
        component={motion.p}
        variants={itemVariants}
        variant="h6"
        color="primary"
        sx={{ fontWeight: 500, maxWidth: 820, mx: 'auto', mb: 5, lineHeight: 1.6 }}
      >
        {title}
      </Typography>

      <Box sx={{ maxWidth: 720, mx: 'auto', mb: 5 }}>
        {paragraphs.map((paragraph, i) => (
          <Typography
            key={i}
            component={motion.p}
            variants={itemVariants}
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: i === paragraphs.length - 1 ? 0 : 2.5 }}
          >
            {paragraph}
          </Typography>
        ))}
      </Box>

      <Stack
        component={motion.div}
        variants={itemVariants}
        direction="row"
        spacing={2}
        justifyContent="center"
        flexWrap="wrap"
        useFlexGap
      >
        {links.map(({ label, href, icon }) => (
          <Button
            key={label}
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            variant="outlined"
            startIcon={icon}
            sx={{ fontWeight: 600 }}
          >
            {label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default Hero;
