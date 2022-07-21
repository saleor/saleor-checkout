const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const findConfig = require("find-config");
const fs = require("fs");

// Note - env variables don't override each other
// if they have been loaded, so the order of loading is flipped from
// default next.js behavior (first .env.loca, then .env)

// Load env variables from apps/**/.env.local
if (fs.statSync(".env.local").isFile()) {
  dotenv.config({ path: ".env.local" });
}

// Load env variables from apps/**/.env
const env = dotenv.config();

// Load env variables from root of monorepo
dotenv.config({ path: findConfig(".env.local", { cwd: ".." }) });
dotenv.config({ path: findConfig(".env", { cwd: ".." }) });

// Replace $ in .env with loaded env variables
dotenvExpand.expand(dotenv.config({ path: ".env.local" }));
dotenvExpand.expand(dotenv.config({ path: ".env" }));
