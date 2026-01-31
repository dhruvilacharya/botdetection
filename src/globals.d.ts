declare global {
  interface Window {
    chrome?: {
      runtime?: { connect?: unknown };
      loadTimes?: unknown;
      [key: string]: unknown;
    };
  }
}

export {};
