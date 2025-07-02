import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import { generateSummaryAndBullets } from '../utils/togetherai';

const getProgressColor = (value) => {
  if (value >= 80) return 'success';   // Green
  if (value >= 50) return 'warning';   // Orange
  return 'error';                      // Red
};

const getEmojiLabel = (value) => {
  if (value >= 80) return '🟢 Excellent';
  if (value >= 50) return '🟠 Average';
  return '🔴 Needs Improvement';
};

const ATSAnalyzer = ({ resumeData }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [atsFeedback, setAtsFeedback] = useState('');
  const [score, setScore] = useState(null);
  const [keywordMatch, setKeywordMatch] = useState(null);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);

  const extractATSData = (text) => {
    const scoreMatch = text.match(/Score:\s*(\d{1,3})\/100/i);
    const keywordMatchMatch = text.match(/Keyword Match:\s*(\d{1,3})%/i);
    const tipMatches = text.match(/(?:\d+\.\s+.*)/g);

    const scoreValue = scoreMatch ? parseInt(scoreMatch[1]) : null;
    const keywordValue = keywordMatchMatch ? parseInt(keywordMatchMatch[1]) : null;
    const tipList = tipMatches || [];

    return {
      score: scoreValue,
      keywordMatch: keywordValue,
      tips: tipList,
    };
  };

  const handleAnalyzeATS = async () => {
    if (!jobDescription.trim()) return;
    setLoading(true);
    setAtsFeedback('');
    setScore(null);
    setKeywordMatch(null);
    setTips([]);

    const resumeText = `
Name: ${resumeData.name}
Job Title: ${resumeData.jobTitle}
Skills: ${resumeData.skills.join(', ')}
Experience: ${resumeData.experience
      .map(exp => `${exp.role} at ${exp.company} (${exp.duration})`)
      .join(', ')}
`;

    const prompt = `
You are an ATS (Applicant Tracking System) engine. Compare the following resume with the job description. Give an objective score out of 100, keyword match percentage, and 3 actionable improvement tips.

Resume:
${resumeText}

Job Description:
${jobDescription}

Respond in this format:
Score: XX/100
Keyword Match: XX%
Tips:
1. ...
2. ...
3. ...
`;

    try {
      const { atsFeedback: rawFeedback } = await generateSummaryAndBullets(prompt, { type: 'ats' });
      const parsed = extractATSData(rawFeedback);

      setAtsFeedback(rawFeedback);
      setScore(parsed.score);
      setKeywordMatch(parsed.keywordMatch);
      setTips(parsed.tips);
    } catch (error) {
      console.error('❌ ATS analysis failed:', error);
      setAtsFeedback('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box id="ats-analyzer" sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        ATS Score Analyzer
      </Typography>

      <TextField
        label="Paste Job Description"
        multiline
        rows={6}
        fullWidth
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste job description here..."
      />

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleAnalyzeATS}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Analyze ATS Score'}
      </Button>

      {(score !== null || keywordMatch !== null || tips.length > 0) && (
        <Box sx={{ mt: 3, p: 2, bgcolor: '#f9f9f9', borderRadius: 2 }}>
          {/* <Typography variant="subtitle1" gutterBottom>
            Results
          </Typography> */}

          {score !== null && (
            <Box sx={{ mb: 2 }}>
              <Typography>
                ATS Score: {score}/100 &nbsp;
                <strong>{getEmojiLabel(score)}</strong>
              </Typography>
              <LinearProgress
                variant="determinate"
                value={score}
                color={getProgressColor(score)}
                sx={{ height: 10, borderRadius: 5 }}
              />
            </Box>
          )}

          {keywordMatch !== null && (
            <Box sx={{ mb: 2 }}>
              <Typography>
                Keyword Match: {keywordMatch}% &nbsp;
                <strong>{getEmojiLabel(keywordMatch)}</strong>
              </Typography>
              <LinearProgress
                variant="determinate"
                value={keywordMatch}
                color={getProgressColor(keywordMatch)}
                sx={{ height: 10, borderRadius: 5 }}
              />
            </Box>
          )}

          {tips.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography fontWeight="bold">Tips to Improve:</Typography>
              <ul>
                {tips.map((tip, idx) => (
                  <li key={idx}>{tip.replace(/^\d+\.\s*/, '')}</li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ATSAnalyzer;