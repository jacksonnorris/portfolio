import React from 'react';
import { Box } from '@mui/material';

interface AccentRuleProps {
  mt?: number;
  mb?: number;
}

// The small gradient rule that sits under section headings.
const AccentRule = ({ mt = 0, mb = 0 }: AccentRuleProps) => (
  <Box
    aria-hidden
    sx={(theme) => ({
      width: 56,
      height: 3,
      borderRadius: 1.5,
      mx: 'auto',
      mt,
      mb,
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    })}
  />
);

export default AccentRule;
