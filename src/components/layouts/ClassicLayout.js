// ClassicLayout.js
import React from 'react';
import {
  Typography,
  Stack,
  Chip,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Box
} from '@mui/material';

const ClassicLayout = ({ data }) => {
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
    projects,
    strengths,
    languages
  } = data;

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold">{name}</Typography>
      <Typography variant="subtitle1" color="text.secondary">{jobTitle}</Typography>
      <Typography variant="body2" color="text.secondary">{email}</Typography>
      <Typography variant="body2" color="text.secondary">{phone}</Typography>
      <Typography variant="body2" color="text.secondary">{location}</Typography>
      <Typography variant="body2" color="text.secondary">{linkedin}</Typography>

      <Divider sx={{ my: 2 }} />

      {/* Summary */}
      {summary && (
        <>
          <Typography variant="h6">Professional Summary</Typography>
          <Typography sx={{ whiteSpace: 'pre-line', mb: 2 }}>{summary}</Typography>
        </>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>Skills</Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 2 }}>
            {skills.map((skill, index) => (
              <Chip key={index} label={skill} color="primary" />
            ))}
          </Stack>
        </>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>Experience</Typography>
          {experience.map((exp, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">{exp.role} - {exp.company}</Typography>
              <Typography variant="body2" color="text.secondary">{exp.location} | {exp.duration}</Typography>
              {exp.bulletPoints?.length > 0 ? (
                <List dense>
                  {exp.bulletPoints.map((point, i) => (
                    <ListItem key={i} sx={{ pl: 2 }}>
                      <ListItemText primary={`• ${point}`} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography sx={{ whiteSpace: 'pre-line' }}>{exp.details}</Typography>
              )}
            </Box>
          ))}
        </>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>Education</Typography>
          {education.map((edu, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">{edu.degree} - {edu.institution}</Typography>
              <Typography variant="body2" color="text.secondary">
                {edu.duration} {edu.gpa && `| GPA: ${edu.gpa}`}
              </Typography>
              <Typography sx={{ whiteSpace: 'pre-line' }}>{edu.coursework}</Typography>
            </Box>
          ))}
        </>
      )}

      {/* Certifications */}
      {certifications && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>Certifications</Typography>
          <Typography sx={{ whiteSpace: 'pre-line', mb: 2 }}>{certifications}</Typography>
        </>
      )}

      {/* Projects */}
      {projects && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>Projects</Typography>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{projects}</Typography>
        </>
      )}

      {/* Strengths */}
      {strengths?.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>Strengths</Typography>
          {strengths.map((s, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Typography fontWeight="bold">{s.title}</Typography>
              <Typography variant="body2" color="text.secondary">{s.detail}</Typography>
            </Box>
          ))}
        </>
      )}

      {/* Languages */}
      {languages?.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>Languages</Typography>
          {languages.map((lang, i) => (
            <Box key={i}>
              <Typography fontWeight="bold">{lang.name}</Typography>
              <Typography variant="body2" color="text.secondary">{lang.level}</Typography>
            </Box>
          ))}
        </>
      )}
    </Paper>
  );
};

export default ClassicLayout;