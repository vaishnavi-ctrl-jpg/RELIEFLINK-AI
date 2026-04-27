import { NextResponse } from 'next/server';
import { updateRequest, volunteers } from '../../../lib/store';
import { GoogleGenAI } from '@google/genai';

export async function POST(req) {
  try {
    const { requestId, title, description, location, category } = await req.json();
    
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not set. Using mocked AI response.');
      // Mock logic
      const priority = category === 'Medical' || category === 'Fire' ? 'High' : 'Medium';
      const bestMatch = volunteers.find(v => v.skills.includes(category)) || volunteers[0];
      
      const updatedMock = updateRequest(requestId, {
        status: 'Assigned',
        priority,
        assignedVolunteerId: bestMatch.id,
        explanation: `[MOCKED] Assigned ${bestMatch.name} because they have ${category} expertise and are located in ${bestMatch.location}, and the request is ${priority} urgency.`
      });
      return NextResponse.json(updatedMock);
    }

    const ai = new GoogleGenAI();
    
    const prompt = `
You are an intelligent disaster relief matching system.
Analyze the following request and assign a priority level (High, Medium, Low).
Then, look at the available volunteers and pick the BEST match based on skill relevance and proximity.
Generate a clear, one-sentence explanation for the match like "Assigned Aisha because she has medical expertise, is located nearby, and the request is high urgency."

Request Details:
Title: ${title}
Description: ${description}
Location: ${location}
Category: ${category}

Available Volunteers:
${JSON.stringify(volunteers)}

Output your answer as a JSON object with exactly these fields:
- priority (String: "High", "Medium", "Low")
- volunteerId (String: ID of the selected volunteer)
- explanation (String)
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const aiResult = JSON.parse(response.text);
    
    const updated = updateRequest(requestId, {
      status: 'Assigned',
      priority: aiResult.priority,
      assignedVolunteerId: aiResult.volunteerId,
      explanation: aiResult.explanation
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Match error:', error);
    return NextResponse.json({ error: 'Failed to process match' }, { status: 500 });
  }
}
