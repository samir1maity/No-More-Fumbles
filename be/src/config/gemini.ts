import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  // Load API Key
  const apiKey = process.env.GEMINI_API_KEY as string;
//   console.log('apiKey', apiKey)
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 0.7, 
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 2048,
    responseMimeType: "application/json", 
  };
  
  export async function generateResponse(prompt: string) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: `You are an AI interviewer for technical job interviews. Follow these rules:
              
              - You must **only** ask questions related to the job role, tech stack, and experience level.
              - When the user responds, provide **structured feedback in JSON format**.
              - If the user goes off-topic, **warn them to stay focused**.
              - If the session is interrupted, resume from the last asked question.
              
              **Response Format (ALWAYS IN JSON):**
              {
                "question": "<Next Question>",
                "feedback": "<Feedback on last answer>",
                "warning": "<If user is off-topic>"
              }
              
              Let's begin! Ask the first interview question.`,
            },
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    console.log('result', result.response.text())
    return result.response.text();
  }
  