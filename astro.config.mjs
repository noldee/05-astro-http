import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import db from "@astrojs/db";


import netlify from "@astrojs/netlify";

import vue from "@astrojs/vue";

export default defineConfig({
  site: "https://site.com",
  integrations: [mdx(), sitemap(), db(), vue()],

  adapter: netlify(),
});