import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { title, excerpt, content, targetLang, targetLangLabel } = req.body ?? {};
  if (!title || !targetLang || !targetLangLabel) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Translation service not configured" });

  const systemPrompt = `You are a professional translator. Translate the following blog post fields into ${targetLangLabel} (language code: ${targetLang}).

Rules:
- Return ONLY valid JSON with keys: title, excerpt, content
- Preserve all HTML tags in the content field exactly as-is — only translate the visible text between tags
- Keep proper nouns, brand names (RealHubb, RERA, BDA), and URLs unchanged
- Match the tone and style of the original
- Do not add any explanation, preamble, or markdown code fences`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{ role: "user", content: JSON.stringify({ title, excerpt: excerpt ?? "", content: content ?? "" }) }],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    return res.status(response.status).json({ error: text });
  }

  const data = await response.json();
  const raw   = data.content?.find((b: any) => b.type === "text")?.text ?? "";
  const clean = raw.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();

  try {
    return res.json(JSON.parse(clean));
  } catch {
    return res.status(500).json({ error: "Failed to parse translation" });
  }
}
