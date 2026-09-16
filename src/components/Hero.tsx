import React, { ReactElement } from 'react';
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
  primary?: boolean;
}

const Hero = () => {
  const { name, title, about, contact } = portfolioData;
  const paragraphs = Array.isArray(about) ? about : [about];

  const links: ContactLink[] = [
    { label: 'Email', href: `mailto:${contact.email}`, icon: <EmailIcon />, primary: true },
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
      sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}
    >
      <Typography
        component={motion.h1}
        variants={itemVariants}
        variant="h2"
        sx={(theme) => ({
          fontWeight: 400,
          mb: 2,
          // The display face runs wide: the variant size wraps the name at
          // phone widths, so scale with the viewport below the sm breakpoint.
          fontSize: { xs: 'clamp(1.9rem, 9vw, 2.4rem)', sm: theme.typography.h2.fontSize },
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
        {links.map(({ label, href, icon, primary }) => (
          <Button
            key={label}
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            variant={primary ? 'contained' : 'outlined'}
            disableElevation
            startIcon={icon}
          >
            {label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default Hero;
