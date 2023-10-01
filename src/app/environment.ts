interface Environment {
  baseUrl: string;
  jiraHost: string;
}

export const environment: Environment = {
  baseUrl: process.env.REACT_APP_BASE_URL!,
  jiraHost: process.env.REACT_APP_JIRA_HOST!,
};
