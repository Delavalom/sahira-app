import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  name: "Sahira-App",
  slug: "sahira-app",
  extra: {
    apiToken: process.env.API_TOKEN,
  },
});
