import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { PORTFOLIO_CONTEXT } from "@/lib/portfolio-context";
import { getAllDynamicData, formatDynamicDataForAI } from "@/lib/dynamic-data";

export async function POST(req: Request) {
  try {
    // Debug: Check if API key is loaded
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY not found in environment variables");
      return new Response(
        JSON.stringify({ error: "API key not configured. Please restart the server." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const groq = createGroq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const { messages } = await req.json();

    // Detect if user is asking about real-time information
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
    const needsDynamicData = /spotify|music|listening|playing|song|track|github|repos?|repositories|commits?|contribution|visitors?|traffic|views?|stats|activity|recent/i.test(lastMessage);

    // Prepare context with dynamic data if needed
    let contextToUse = PORTFOLIO_CONTEXT;
    if (needsDynamicData) {
      try {
        const dynamicData = await getAllDynamicData();
        const dynamicContext = formatDynamicDataForAI(dynamicData);
        contextToUse = `${PORTFOLIO_CONTEXT}\n\n${dynamicContext}`;
      } catch (error) {
        console.error("Error fetching dynamic data:", error);
        // Continue with static context only
      }
    }

    const result = streamText({
      model: groq("llama-3.1-8b-instant"),
      system: contextToUse,
      messages,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
