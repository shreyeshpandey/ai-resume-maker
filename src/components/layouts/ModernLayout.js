// ModernLayout.js – Matched to Enhancv-style resume image
import React from 'react';
import {
  Typography,
  Stack,
  Chip,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper
} from '@mui/material';

const SectionHeader = ({ title }) => (
  <Typography
    variant="h6"
    fontWeight="bold"
    textTransform="uppercase"
    sx={{ borderBottom: '2px solid #1976d2', mb: 1, mt: 3, color: '#1976d2', fontSize: '1rem' }}
  >
    {title}
  </Typography>
);

const ModernLayout = ({ data }) => {
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
    <Paper elevation={3} sx={{ p: 4, mt: 4, fontSize: '0.95rem' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ color: '#0b3f91' }}>{name}</Typography>
          <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 500 }}>{jobTitle}</Typography>
        </Box>
        <Box textAlign="right">
          <Typography variant="body2">📞 {phone}</Typography>
          <Typography variant="body2">📧 {email}</Typography>
          <Typography variant="body2">📍 {location}</Typography>
          <Typography variant="body2">🔗 {linkedin}</Typography>
        </Box>
      </Box>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
        {/* Left Column */}
        <Box flex={2}>
          {/* Summary */}
          {summary && (
            <Box>
              <SectionHeader title="Summary" />
              <Typography sx={{ whiteSpace: 'pre-line' }}>{summary}</Typography>
            </Box>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <Box>
              <SectionHeader title="Experience" />
              {experience.map((exp, i) => (
                <Box key={i} mb={3}>
                  <Typography variant="subtitle1" fontWeight="bold" color="primary">
                    {exp.role}
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>{exp.company}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    📅 {exp.duration} | 📍 {exp.location}
                  </Typography>
                  {exp.bulletPoints?.length > 0 ? (
                    <List dense>
                      {exp.bulletPoints.map((point, j) => (
                        <ListItem key={j} sx={{ pl: 2 }}>
                          <ListItemText primary={`• ${point}`} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{exp.details}</Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Right Column */}
        <Box flex={1}>
          {/* Education */}
          {education?.length > 0 && (
            <Box>
              <SectionHeader title="Education" />
              {education.map((edu, i) => (
                <Box key={i} mb={2}>
                  <Typography fontWeight="bold">{edu.degree}</Typography>
                  <Typography variant="body2" sx={{ color: '#1976d2' }}>{edu.institution}</Typography>
                  <Typography variant="body2" color="text.secondary">📅 {edu.duration}</Typography>
                  {edu.gpa && <Typography variant="body2">GPA: {edu.gpa}</Typography>}
                </Box>
              ))}
            </Box>
          )}

          {/* Skills */}
          {skills?.length > 0 && (
            <Box>
              <SectionHeader title="Skills" />
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {skills.map((skill, i) => (
                  <Chip key={i} label={skill} sx={{ borderRadius: 0 }} />
                ))}
              </Stack>
            </Box>
          )}

          {/* Strengths */}
          {strengths?.length > 0 && (
            <Box>
              <SectionHeader title="Strengths" />
              {strengths.map((s, i) => (
                <Box key={i} mb={1}>
                  <Typography fontWeight="bold">{s.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{s.detail}</Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <Box>
              <SectionHeader title="Languages" />
              {languages.map((lang, i) => (
                <Box key={i} mb={1}>
                  <Typography fontWeight="bold">{lang.name}</Typography>
                  <Box display="flex" gap={0.5} mt={0.5}>
                    {[...Array(5)].map((_, j) => (
                      <Box
                        key={j}
                        width={12}
                        height={12}
                        borderRadius="50%"
                        bgcolor={j < Math.round(lang.level / 20) ? '#1976d2' : '#ccc'}
                      />
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          {/* Certifications */}
          {certifications && (
            <Box>
              <SectionHeader title="Certifications" />
              <Typography sx={{ whiteSpace: 'pre-line' }}>{certifications}</Typography>
            </Box>
          )}

          {/* Projects */}
          {projects && (
            <Box>
              <SectionHeader title="Projects" />
              <Typography sx={{ whiteSpace: 'pre-line' }}>{projects}</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default ModernLayout;