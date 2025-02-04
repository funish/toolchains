/**
 * Tests for the @funish/scaffolding package
 * Tests project scaffolding functionality with different templates and configurations
 */

import { existsSync, rmdirSync } from "node:fs";
import { join } from "node:path";
import { createScaffolding } from "@funish/scaffolding";
import { assertEquals, assertThrowsAsync } from "./test-utils";
import type { TestSuite } from "./test-utils";

/**
 * Cleans up a test project directory
 * @param dir Path to the project directory to remove
 */
const cleanupProject = (dir: string) => {
  if (existsSync(dir)) {
    rmdirSync(dir, { recursive: true });
  }
};

export const scaffoldingTests: TestSuite = {
  name: "scaffolding",
  tests: [
    {
      name: "should create TypeScript project",
      async fn() {
        // Set up test project directory
        const projectDir = join(process.cwd(), "test-ts-project");
        try {
          // Create a new TypeScript project from template
          await createScaffolding(
            "github:funish/templates/typescript",
            projectDir,
            {
              projectName: "test-project",
              description: "Test TypeScript project",
              author: "Test Author",
              email: "test@example.com",
              version: "1.0.0",
              license: "MIT",
            },
          );
          // Verify project structure
          assertEquals(existsSync(projectDir), true);
          assertEquals(existsSync(join(projectDir, "package.json")), true);
          assertEquals(existsSync(join(projectDir, "tsconfig.json")), true);
        } finally {
          // Clean up test project
          cleanupProject(projectDir);
        }
      },
    },
    {
      name: "should create Node.js API project",
      async fn() {
        // Set up test project directory
        const projectDir = join(process.cwd(), "test-api-project");
        try {
          // Create a new API project with specific features
          await createScaffolding(
            "github:funish/templates/node-api",
            projectDir,
            {
              projectName: "test-api",
              description: "Test API project",
              author: "Test Author",
              email: "test@example.com",
              version: "1.0.0",
              port: "3000",
              database: "MongoDB",
              features: ["authentication", "swagger-docs", "rate-limiting"],
            },
          );
          // Verify project structure
          assertEquals(existsSync(projectDir), true);
          assertEquals(existsSync(join(projectDir, "package.json")), true);
          assertEquals(existsSync(join(projectDir, "src")), true);
        } finally {
          // Clean up test project
          cleanupProject(projectDir);
        }
      },
    },
    {
      name: "should fail with invalid template",
      async fn() {
        // Set up test project directory
        const projectDir = join(process.cwd(), "test-invalid-project");
        try {
          // Attempt to create project with non-existent template
          await assertThrowsAsync(
            () =>
              createScaffolding(
                "github:funish/templates/non-existent",
                projectDir,
                {},
              ),
            /Template not found/,
          );
        } finally {
          // Clean up test project
          cleanupProject(projectDir);
        }
      },
    },
  ],
};
