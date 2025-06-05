import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing RapidAPI key' }, { status: 500 });
  }

  const prompt =
     "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

  const messages = [
    {
      role: 'user',
      content: prompt,
    },
  ];

  try {
    const response = await fetch('https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages,
        max_tokens: 400,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: errText }, { status: response.status });
    }

    const data = await response.json();
    const output = data.choices?.[0]?.message?.content?.trim() || 'No result.';

    return NextResponse.json({ result: output });
  } catch (error: any) {
    console.error('RapidAPI GPT-4o Error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}

