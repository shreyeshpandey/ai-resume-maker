// MinimalLayout.js – Sleek, clean resume layout
import React from 'react';
import {
  Typography,
  Chip,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Box,
  Stack
} from '@mui/material';

const MinimalLayout = ({ data }) => {
  const {
    name,
    email,
    phone,
    location,
    linkedin,
    jobTitle,
    summary,
    skills,
    experience,
    education,
    certifications,
    projects
  } = data;

  const contactLine = [email, phone, location, linkedin].filter(Boolean).join(' | ');

  return (
    <Paper elevation={1} sx={{ p: 3, mt: 4, backgroundColor: '#fff', boxShadow: 'none' }}>
      {/* Header */}
      <Typography variant="h5" fontWeight="bold">{name}</Typography>
      <Typography variant="subtitle1">{jobTitle}</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {contactLine}
      </Typography>

      {/* Summary */}
      {summary && (
        <Box mt={3}>
          <Typography variant="h6" fontWeight="medium">Summary</Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{summary}</Typography>
        </Box>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <Box mt={3}>
          <Typography variant="h6" fontWeight="medium">Skills</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {skills.map((skill, i) => (
              <Chip key={i} label={skill} size="small" variant="outlined" />
            ))}
          </Stack>
        </Box>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <Box mt={3}>
          <Typography variant="h6" fontWeight="medium">Experience</Typography>
          {experience.map((exp, i) => (
            <Box key={i} mt={2}>
              <Typography fontWeight="bold">{exp.role}, {exp.company}</Typography>
              <Typography variant="body2" color="text.secondary">{exp.duration} | {exp.location}</Typography>
              {exp.bulletPoints?.length > 0 && (
                <List dense>
                  {exp.bulletPoints.map((point, j) => (
                    <ListItem key={j} sx={{ pl: 2 }}>
                      <ListItemText primary={`• ${point}`} />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <Box mt={3}>
          <Typography variant="h6" fontWeight="medium">Education</Typography>
          {education.map((edu, i) => (
            <Box key={i} mt={1}>
              <Typography fontWeight="bold">{edu.degree}, {edu.institution}</Typography>
              <Typography variant="body2" color="text.secondary">
                {edu.duration}{edu.gpa && ` | GPA: ${edu.gpa}`}
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{edu.coursework}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Certifications */}
      {certifications && (
        <Box mt={3}>
          <Typography variant="h6" fontWeight="medium">Certifications</Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{certifications}</Typography>
        </Box>
      )}

      {/* Projects */}
      {projects && (
        <Box mt={3}>
          <Typography variant="h6" fontWeight="medium">Projects</Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{projects}</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default MinimalLayout;