declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_APP_ID: string;
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
      GITHUB_SECRET: string;
    }
  }
}

export {}
