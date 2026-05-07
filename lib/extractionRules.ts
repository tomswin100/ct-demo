import { ExtractedWorkflowDataSchema } from "./memoSchema";
import type { ExtractedWorkflowData } from "./workflowTypes";
import {
  EMAIL_THREAD_EXTRACTION_SYSTEM_PROMPT,
  buildEmailThreadExtractionUserMessage,
  extractionLayerJsonSchema,
} from "./prompts/emailThreadExtraction";

const OPENAI_CHAT_COMPLETIONS_URL = "https://api.openai.com/v1/chat/completions";
const EXTRACTION_MODEL = "gpt-4o-2024-08-06";

type ChatCompletionsResponse = {
  choices?: Array<{
    message?: {
      content?: string | null;
      refusal?: string | null;
    };
  }>;
  error?: {
    message?: string;
  };
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Extraction failed.";
}

export async function extractWorkflowData(
  emailThread: string,
  apiKey: string,
): Promise<ExtractedWorkflowData> {
  const trimmedApiKey = apiKey.trim();

  if (!trimmedApiKey) {
    throw new Error("Add an OpenAI API key before running extraction.");
  }

  const response = await fetch(OPENAI_CHAT_COMPLETIONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${trimmedApiKey}`,
    },
    body: JSON.stringify({
      model: EXTRACTION_MODEL,
      messages: [
        {
          role: "system",
          content: EMAIL_THREAD_EXTRACTION_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: buildEmailThreadExtractionUserMessage(emailThread),
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "email_thread_extraction",
          strict: true,
          schema: extractionLayerJsonSchema,
        },
      },
    }),
  });

  const payload = (await response.json()) as ChatCompletionsResponse;

  if (!response.ok) {
    throw new Error(
      payload.error?.message ??
        `OpenAI request failed with status ${response.status}.`,
    );
  }

  const firstChoice = payload.choices?.[0];
  const refusal = firstChoice?.message?.refusal?.trim();

  if (refusal) {
    throw new Error(refusal);
  }

  const content = firstChoice?.message?.content?.trim();

  if (!content) {
    throw new Error("OpenAI returned no structured extraction content.");
  }

  try {
    const parsed = JSON.parse(content);
    return ExtractedWorkflowDataSchema.parse(parsed);
  } catch (error) {
    throw new Error(
      `The extraction response did not match the expected schema. ${getErrorMessage(error)}`,
    );
  }
}
