// Helper de resiliência para chamadas HTTP a APIs externas.
// Fornece timeout por requisição e retry com backoff exponencial
// (respeitando Retry-After) em status 429/5xx.

export class HttpError extends Error {
  constructor(public status: number, message: string, public body?: unknown) {
    super(message);
    this.name = "HttpError";
  }
}

export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit & { timeoutMs?: number } = {}
): Promise<Response> {
  const { timeoutMs = 30000, ...rest } = init;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...rest, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchWithRetry(
  input: RequestInfo | URL,
  init: RequestInit & { timeoutMs?: number; maxRetries?: number } = {},
  retryableStatuses: number[] = [429, 500, 502, 503, 504]
): Promise<Response> {
  const { maxRetries = 3, ...rest } = init;
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetchWithTimeout(input, rest);

      if (retryableStatuses.includes(response.status) && attempt < maxRetries) {
        const retryAfter = response.headers.get("Retry-After");
        const delayMs = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : Math.pow(2, attempt) * 1000;
        await new Promise((res) => setTimeout(res, delayMs));
        continue;
      }

      return response;
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries) {
        await new Promise((res) => setTimeout(res, Math.pow(2, attempt) * 1000));
      }
    }
  }

  throw lastError;
}
