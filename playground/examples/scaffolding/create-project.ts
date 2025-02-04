import { createScaffolding } from "@funish/scaffolding";

// Example 1: Create a basic TypeScript project
console.log("\nExample 1: Create a TypeScript project");
async function createTypeScriptProject() {
  try {
    await createScaffolding(
      "github:funish/templates/typescript",
      "./my-ts-project",
      {
        projectName: "my-awesome-project",
        description: "A TypeScript project created with @funish/scaffolding",
        author: "Your Name",
        email: "your.email@example.com",
        version: "1.0.0",
        license: "MIT",
      },
    );

    console.log("TypeScript project created successfully");
  } catch (error) {
    console.error("Failed to create TypeScript project:", error);
  }
}

// Example 2: Create a Node.js API project
console.log("\nExample 2: Create a Node.js API project");
async function createApiProject() {
  try {
    await createScaffolding(
      "github:funish/templates/node-api",
      "./my-api-project",
      {
        projectName: "my-api",
        description: "RESTful API with Express and TypeScript",
        author: "Your Name",
        email: "your.email@example.com",
        version: "1.0.0",
        port: "3000",
        database: "MongoDB",
        features: ["authentication", "swagger-docs", "rate-limiting", "docker"],
      },
    );

    console.log("API project created successfully");
  } catch (error) {
    console.error("Failed to create API project:", error);
  }
}

// Example 3: Create a Vue.js frontend project
console.log("\nExample 3: Create a Vue.js project");
async function createVueProject() {
  try {
    await createScaffolding("github:funish/templates/vue", "./my-vue-project", {
      projectName: "my-vue-app",
      description: "Vue.js application with TypeScript",
      author: "Your Name",
      email: "your.email@example.com",
      version: "1.0.0",
      features: ["vue-router", "pinia", "tailwindcss", "vitest", "cypress"],
      eslint: true,
      prettier: true,
    });

    console.log("Vue.js project created successfully");
  } catch (error) {
    console.error("Failed to create Vue.js project:", error);
  }
}

// Run examples
createTypeScriptProject();
createApiProject();
createVueProject();
