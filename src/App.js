// App.js - Side-by-side live preview + layout switch with AI Summary Preview
import React, { useState } from 'react';
import './App.css';
import './index.css'
import {
  Container,
  Typography,
  CssBaseline,
  Box,
  FormControl,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ResumeForm from './components/ResumeForm';
import Preview from './components/Preview';
import { generateSummaryAndBullets } from './utils/togetherai.js';
import DownloadButton from './components/DownloadButton.js';
import ATSAnalyzer from './components/ATSAnalyzer';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    jobTitle: '',
    summary: '',
    skills: [],
    experience: [],
    education: [],
    certifications: '',
    projects: '',
    strengths: [],
    languages: [],
  });

  const [layout, setLayout] = useState('classic');
  const [aiSummary, setAiSummary] = useState('');

  const formatSummary = (text) => {
    const sentences = text.split('. ').filter(Boolean);
    return sentences.slice(0, 3).map(s => s.trim() + (s.endsWith('.') ? '' : '.')).join('\n');
  };

  const handleGenerateSummary = async () => {
    const experienceText = formData.experience
      .map((exp, i) => `(${i + 1}) ${exp.role} at ${exp.company}, ${exp.location} (${exp.duration})`)
      .join('\n');

    const prompt = `
Act as a professional resume writer. Based on the following details, create a professional summary for the top of a resume. Write it in 20-25 words (each sentence ends with dot but should not go to next line).

Name: ${formData.name}
Job Title: ${formData.jobTitle}
Skills: ${formData.skills.join(', ')}
Experience:
${experienceText}
`;

    try {
      const { summary } = await generateSummaryAndBullets(prompt);
      setAiSummary(formatSummary(summary));
    } catch (error) {
      console.error('❌ AI generation failed:', error);
    }
  };

  const handleUseAiSummary = () => {
    setFormData((prev) => ({ ...prev, summary: aiSummary }));
    setAiSummary('');
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ my: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
  <Box
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 1,
      justifyContent: 'center',
      mb: 1
    }}
  >
    <SmartToyIcon sx={{ fontSize: '3rem', color: '#1976d2' }} />
    <Typography
      variant="h3"
      sx={{
        fontWeight: 800,
        background: 'linear-gradient(to right, #1976d2, #0d47a1)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
        letterSpacing: 1.5,
        textTransform: 'uppercase'
      }}
    >
      Jobsy
    </Typography>
  </Box>

  <Typography
    variant="subtitle1"
    sx={{
      color: 'text.secondary',
      fontStyle: 'italic',
      letterSpacing: 1,
    }}
  >
    AI-powered Resume Builder for Professionals
  </Typography>
</Box>

          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="layout-select-label">Select Template</InputLabel>
            <Select
              labelId="layout-select-label"
              value={layout}
              label="Select Template"
              onChange={(e) => setLayout(e.target.value)}
            >
              <MenuItem value="classic">Classic</MenuItem>
              <MenuItem value="modern">Modern</MenuItem>
              <MenuItem value="minimal">Minimal</MenuItem>
            </Select>
          </FormControl>
          <Button
  variant="outlined"
  onClick={() => {
    const atsSection = document.getElementById('ats-score-box');
    if (atsSection) atsSection.scrollIntoView({ behavior: 'smooth' });
  }}
  sx={{
    mb: 3,
    color: '#1976d2',
    borderColor: '#1976d2',
    fontWeight: 600,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#e3f2fd'
    }
  }}
>
  🔍 Check ATS Score
</Button>

          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
            <Box flex={1} minWidth={380}>
              <ResumeForm
                formData={formData}
                setFormData={setFormData}
                aiSummary={aiSummary}
                onGenerateSummary={handleGenerateSummary}
                onUseAiSummary={handleUseAiSummary}
              />
            </Box>
            <Box flex={1} minWidth={380} sx={{ position: 'relative' }}>
              {/* Resume container with padding for the floating button */}
              <Box id="resume-preview" sx={{ pr: 4 }}>
                <Preview data={formData} layout={layout}/>
              </Box>

              {/* Floating Download Button - OUTSIDE the card */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 32,
                  right: -20,
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  boxShadow: 2,
                  zIndex: 10
                }}
              >
                <DownloadButton targetId="resume-preview" />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          id="ats-score-box"
          sx={{
            mt: 6,
            p: 4,
            bgcolor: '#f0f4ff',
            borderRadius: 2,
            border: '2px dashed #1976d2',
            boxShadow: 2,
            zIndex: 10
          }}
        >
          <ATSAnalyzer resumeData={formData} />
        </Box>
      </Container>
    </>
  );
}

export default App;