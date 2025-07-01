import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  CircularProgress
} from '@mui/material';
import openai from '../utils/openai';

const BulletGenerator = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [task, setTask] = useState('');
  const [bullet, setBullet] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setBullet('');

    const prompt = `You are a resume writing expert. Rewrite the following experience into a professional, ATS-friendly bullet point suitable for a ${jobTitle} role:\n\n"${task}"`;

    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are an expert resume writer.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 100,
      });

      const generated = response.data.choices[0].message.content.trim();
      setBullet(generated);
    } catch (err) {
      console.error('Error generating bullet:', err);
      setBullet('❌ Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        🎯 AI Bullet Point Generator
      </Typography>
      <Stack spacing={3}>
        <TextField
          label="Job Title"
          variant="outlined"
          fullWidth
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <TextField
          label="Describe a Task or Responsibility"
          variant="outlined"
          multiline
          rows={3}
          fullWidth
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button variant="contained" onClick={handleGenerate} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Generate Bullet Point'}
        </Button>
        {bullet && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">Generated Bullet:</Typography>
            <Typography variant="body1" color="text.secondary">
              {bullet}
            </Typography>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default BulletGenerator;