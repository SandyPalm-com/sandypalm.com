import { createClient } from "contentful";

// Detect if running on the server
const isServer = typeof window === "undefined";

// Create Contentful client with dynamic credentials
export const createContentfulClient = () => {
  return createClient({
    space: isServer
      ? process.env.CONTENTFUL_SPACE_ID!
      : process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,

    accessToken: isServer
      ? process.env.CONTENTFUL_ACCESS_TOKEN!
      : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,

    host: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!
      ? "preview.contentful.com"
      : "cdn.contentful.com",
  });
};

// Export a singleton instance for convenience (server-side only)
export const contentfulClient = isServer ? createContentfulClient() : null;
