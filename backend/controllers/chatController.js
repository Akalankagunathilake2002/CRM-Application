const chatWithGroq = async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Groq API key is missing in backend .env file.",
      });
    }

    const safeHistory = Array.isArray(history)
      ? history
          .filter(
            (item) =>
              item &&
              ["user", "assistant"].includes(item.role) &&
              typeof item.content === "string"
          )
          .slice(-8)
      : [];

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are LeadBot, a friendly AI assistant for LeadFlow CRM. Help users understand this CRM website, features, login flow, lead management, dashboard, notes, search, filters, and the tech stack. Keep answers short, clear, and practical. Do not claim you can access the database directly. If users ask how to use the CRM, guide them step by step.",
            },
            ...safeHistory,
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.4,
          max_completion_tokens: 350,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: data.error?.message || "Groq API request failed.",
      });
    }

    const reply =
      data.choices?.[0]?.message?.content ||
      "Sorry, I could not generate a response.";

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while chatting with AI.",
      error: error.message,
    });
  }
};

module.exports = {
  chatWithGroq,
};