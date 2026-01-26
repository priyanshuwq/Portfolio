import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { PORTFOLIO_CONTEXT } from "@/lib/portfolio-context";

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

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: PORTFOLIO_CONTEXT,
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
