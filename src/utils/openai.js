import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // ❗only for dev use
});

export const generateSummary = async ({ name, jobTitle, skills, experience }) => {
  const prompt = `
Write a professional summary for a resume.

Name: ${name}
Job Title: ${jobTitle}
Skills: ${skills.join(', ')}
Experience: ${experience}

Summary:
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  return completion.choices[0].message.content.trim();
};