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
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import ResumeForm from './components/ResumeForm';
import Preview from './components/Preview';
import { generateSummaryAndBullets } from './utils/togetherai.js';
import DownloadButton from './components/DownloadButton.js';

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
          <Typography variant="h3" gutterBottom align="center">
            AI Resume Maker
          </Typography>

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
      </Container>
    </>
  );
}

export default App;