import axios from 'axios';

export async function generateSummaryAndBullets(prompt, options = {}) {
  try {
    const response = await axios.post(
      'https://api.together.xyz/v1/chat/completions',
      {
        model: 'meta-llama/Llama-3-8b-chat-hf',
        messages: [
          ...(options.systemMessage
            ? [{ role: 'system', content: options.systemMessage }]
            : options.type === 'resume'
            ? [{
                role: 'system',
                content: `
You are a professional resume generator. Your output should contain:
- A concise 20-30 words professional summary.
- 3–5 action-oriented bullet points under "Experience Highlights".
Do NOT repeat the user’s name/email, and do NOT include phrases like “Here is” or “Based on”. Return only clean, direct content.
                `.trim()
              }]
            : []),
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOGETHER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const raw = response.data.choices[0]?.message?.content?.trim() || '';

    // 🟡 ATS response: return raw content
    if (options.type === 'ats') {
      return { atsFeedback: raw };
    }

    // 🔵 Resume summary/bullets: parse structured output
    let cleaned = raw
      .replace(/here\s+is\s+(a\s+)?(for\s+)?[^\n]*[:\-]*/gi, '')
      .replace(/professional\s+summary[:\-]*/gi, '')
      .replace(/experience\s+highlights[:\-]*/gi, '')
      .replace(/experience[:\-]*/gi, '')
      .replace(/^(name|email|job title)[:\-].*$/gim, '')
      .replace(/\*{1,}/g, '')
      .replace(/^["']|["']$/g, '')
      .trim();

    const lines = cleaned
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    let summary = '';
    const bulletPoints = [];

    for (const line of lines) {
      if (/^[-*•]/.test(line)) {
        bulletPoints.push(line.replace(/^[-*•]\s*/, '').trim());
      } else if (bulletPoints.length === 0) {
        summary += line + ' ';
      }
    }

    return {
      summary: summary.trim(),
      bulletPoints,
    };
  } catch (error) {
    console.error('TogetherAI error:', error.response?.data || error.message);
    throw error;
  }
}