export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof APIError) {
    return error.message;
  }

  if (error instanceof Error) {
    if (error.message.includes('ANTHROPIC_API_KEY')) {
      return 'API key configuration error. Please check server configuration.';
    }
    if (error.message.includes('fetch failed')) {
      return 'Network error. Please check your connection and try again.';
    }
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
}
