// ResumeForm.js – UI Enhanced with Grid, Headers, and Style
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Autocomplete,
  Stack,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  FormControlLabel,
  Switch,
  Divider,
  Grid
} from '@mui/material';
import { generateSummaryAndBullets } from '../utils/togetherai.js';

const skillOptions = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Docker', 'AWS'];

const ResumeForm = ({ formData, setFormData, aiSummary, onGenerateSummary, onUseAiSummary }) => {
  const [loadingBullets, setLoadingBullets] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSkillChange = (event, value) => {
    setFormData({ ...formData, skills: value });
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...formData.experience];
    updated[index][field] = value;
    setFormData({ ...formData, experience: updated });
  };

  const handleGenerateBulletPoints = async (index) => {
    setLoadingBullets(true);
    const exp = formData.experience[index];
    const prompt = `Turn the following experience into 4-5 bullet points for a resume:\n${exp.details}`;
    const { bulletPoints } = await generateSummaryAndBullets(prompt);
    const updated = [...formData.experience];
    updated[index].bulletPoints = bulletPoints;
    setFormData({ ...formData, experience: updated });
    setLoadingBullets(false);
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { role: '', company: '', location: '', duration: '', details: '', bulletPoints: [] }],
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { degree: '', institution: '', duration: '', gpa: '', coursework: '' }],
    });
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData({ ...formData, education: updated });
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, backgroundColor: '#fafafa' }}>
      <Typography variant="h6" color="primary" gutterBottom>
        Personal Information
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}><TextField label="Full Name" fullWidth value={formData.name} onChange={handleChange('name')} /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Email" fullWidth value={formData.email} onChange={handleChange('email')} /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Phone" fullWidth value={formData.phone} onChange={handleChange('phone')} /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Location" fullWidth value={formData.location} onChange={handleChange('location')} /></Grid>
        <Grid item xs={12} sm={6}><TextField label="LinkedIn" fullWidth value={formData.linkedin} onChange={handleChange('linkedin')} /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Job Title" fullWidth value={formData.jobTitle} onChange={handleChange('jobTitle')} /></Grid>
      </Grid>

      <Typography variant="h6" color="primary" gutterBottom mt={4}>Professional Summary</Typography>
      <Divider sx={{ mb: 2 }} />
      <Box>
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            label="Enter your summary"
            fullWidth
            multiline
            rows={3}
            value={formData.summary}
            onChange={handleChange('summary')}
          />
          <Button
            variant="contained"
            onClick={async () => {
              setLoadingSummary(true);
              await onGenerateSummary();
              setLoadingSummary(false);
            }}
            disabled={loadingSummary}
          >
            {loadingSummary ? <CircularProgress size={20} /> : '✨ Generate'}
          </Button>
        </Box>
        {aiSummary && (
          <Box mt={2}>
            <Typography variant="body2" fontWeight="bold">AI Summary Preview:</Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line', mt: 1, background: '#f0f0f0', p: 2, borderRadius: 2 }}>{aiSummary}</Typography>
            <Button variant="outlined" onClick={onUseAiSummary} sx={{ mt: 1 }}>Use this in Resume</Button>
          </Box>
        )}
      </Box>

      <Typography variant="h6" color="primary" gutterBottom mt={4}>Skills</Typography>
      <Divider sx={{ mb: 2 }} />
      <Autocomplete
        multiple
        options={skillOptions}
        freeSolo
        value={formData.skills}
        onChange={handleSkillChange}
        renderInput={(params) => <TextField {...params} label="Skills" />}
      />

      <Typography variant="h6" color="primary" gutterBottom mt={4}>Experience</Typography>
      <Divider sx={{ mb: 2 }} />
      {formData.experience.map((exp, i) => (
        <Box key={i} sx={{ border: '1px solid #ddd', p: 2, mb: 2, borderRadius: 2 }}>
          <TextField fullWidth label="Role" value={exp.role} onChange={(e) => handleExperienceChange(i, 'role', e.target.value)} />
          <TextField fullWidth label="Company" value={exp.company} onChange={(e) => handleExperienceChange(i, 'company', e.target.value)} />
          <TextField fullWidth label="Location" value={exp.location} onChange={(e) => handleExperienceChange(i, 'location', e.target.value)} />
          <TextField fullWidth label="Duration" value={exp.duration} onChange={(e) => handleExperienceChange(i, 'duration', e.target.value)} />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Details"
            value={exp.details}
            onChange={(e) => handleExperienceChange(i, 'details', e.target.value)}
          />
          <Button
            variant="outlined"
            onClick={() => handleGenerateBulletPoints(i)}
            disabled={loadingBullets}
            sx={{ mt: 1 }}
          >
            {loadingBullets ? <CircularProgress size={20} /> : 'Generate Bullet Points'}
          </Button>
          {exp.bulletPoints?.length > 0 && (
            <List dense>
              {exp.bulletPoints.map((bp, idx) => (
                <ListItem key={idx}><ListItemText primary={`• ${bp}`} /></ListItem>
              ))}
            </List>
          )}
        </Box>
      ))}
      <Button onClick={addExperience}>+ Add Experience</Button>

      <Typography variant="h6" color="primary" gutterBottom mt={4}>Education</Typography>
      <Divider sx={{ mb: 2 }} />
      {formData.education.map((edu, i) => (
        <Box key={i} sx={{ border: '1px solid #ddd', p: 2, mb: 2, borderRadius: 2 }}>
          <TextField fullWidth label="Degree" value={edu.degree} onChange={(e) => handleEducationChange(i, 'degree', e.target.value)} />
          <TextField fullWidth label="Institution" value={edu.institution} onChange={(e) => handleEducationChange(i, 'institution', e.target.value)} />
          <TextField fullWidth label="Duration" value={edu.duration} onChange={(e) => handleEducationChange(i, 'duration', e.target.value)} />
          <TextField fullWidth label="GPA (Optional)" value={edu.gpa} onChange={(e) => handleEducationChange(i, 'gpa', e.target.value)} />
          <TextField fullWidth label="Relevant Coursework" multiline rows={2} value={edu.coursework} onChange={(e) => handleEducationChange(i, 'coursework', e.target.value)} />
        </Box>
      ))}
      <Button onClick={addEducation}>+ Add Education</Button>

      <Typography variant="h6" color="primary" gutterBottom mt={4}>Other Sections</Typography>
      <Divider sx={{ mb: 2 }} />
      <TextField label="Certifications" fullWidth multiline rows={2} value={formData.certifications} onChange={handleChange('certifications')} />
      <TextField label="Projects" fullWidth multiline rows={3} value={formData.projects} onChange={handleChange('projects')} />
    </Paper>
  );
};

export default ResumeForm;