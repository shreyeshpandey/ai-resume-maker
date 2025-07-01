// Preview.js
import React from 'react';
import ClassicLayout from './layouts/ClassicLayout';
import ModernLayout from './layouts/ModernLayout';
import MinimalLayout from './layouts/MinimalLayout';
import { Box, Typography, Paper, useTheme } from '@mui/material';

const Preview = ({ data, layout, isExport = false }) => {
  const theme = useTheme();

  if (!data) return null;

  const renderLayout = () => {
    switch (layout) {
      case 'modern':
        return <ModernLayout data={data} />;
      case 'minimal':
        return <MinimalLayout data={data} />;
      case 'classic':
      default:
        return <ClassicLayout data={data} />;
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: theme.palette.background.paper,
        height: '100%',
        overflow: 'auto',
        position: 'relative',
      }}
    >
      {!isExport && (
        <Typography
          variant="h6"
          fontWeight="bold"
          align="center"
          color="primary"
          gutterBottom
          sx={{ mb: 2 }}
          className="no-export"
        >
          Live Resume Preview
        </Typography>
      )}

      {/* ✅ Only layout gets wrapped in the exportable element */}
      <Box id="resume-preview">{renderLayout()}</Box>
    </Paper>
  );
};

export default Preview;