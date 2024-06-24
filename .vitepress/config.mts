import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "libSQL Server",
  description: "Modern SQLite",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Documentation", link: "/docs" },
    ],

    sidebar: [
      {
        items: [
          { text: "Introduction", link: "/docs" },
          {
            text: "Installation",
            link: "/docs/installation/docker",
            items: [
              {
                text: "Docker - recommended",
                link: "/docs/installation/docker",
              },
              {
                text: "Local",
                link: "/docs/installation/local",
              },
            ],
          },
          {
            text: "Configuration",
            link: "/docs/configuration",
          },
          {
            text: "HTTP api",
            link: "/docs/http-api/client",
            items: [
              {
                text: "Client",
                link: "/docs/http-api/client",
              },
              {
                text: "Admin",
                link: "/docs/http-api/admin",
              },
            ],
          },
          {
            text: "Authentication",
            link: "/docs/authentication",
          },
          {
            text: "Replication",
            link: "/docs/replication",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/tursodatabase/libsql" },
    ],

    search: {
      provider: "local",
    },
  },
});
