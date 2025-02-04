import { createPrompt } from "@funish/prompt";
import type {
  ConfirmOptions,
  MultiSelectOptions,
  SelectOptions,
  TextOptions,
} from "@funish/prompt";

// Example 1: Basic prompts
console.log("\nExample 1: Basic prompts");
async function basicPrompts() {
  try {
    const answers = await createPrompt({
      name: {
        type: "text",
        question: "What is your name?",
      } as TextOptions,
      age: {
        type: "text",
        question: "How old are you?",
      } as TextOptions,
      likes: {
        type: "confirm",
        question: "Do you like TypeScript?",
      } as ConfirmOptions,
    });

    console.log("Answers:", answers);
  } catch (error) {
    console.error("Failed to get answers:", error);
  }
}

// Example 2: Project setup prompts
console.log("\nExample 2: Project setup prompts");
async function projectSetup() {
  try {
    const answers = await createPrompt({
      projectName: {
        type: "text",
        question: "What is your project name?",
      } as TextOptions,
      description: {
        type: "text",
        question: "Project description:",
      } as TextOptions,
      version: {
        type: "text",
        question: "Initial version:",
        initial: "1.0.0",
      } as TextOptions,
      features: {
        type: "multiselect",
        question: "Select features to include:",
        options: ["TypeScript", "ESLint", "Prettier", "Jest", "GitHub Actions"],
      } as MultiSelectOptions,
      packageManager: {
        type: "select",
        question: "Select package manager:",
        options: ["npm", "yarn", "pnpm"],
      } as SelectOptions,
    });

    console.log("Project setup:", answers);
  } catch (error) {
    console.error("Failed to setup project:", error);
  }
}

// Example 3: Configuration prompts
console.log("\nExample 3: Configuration prompts");
async function configSetup() {
  try {
    const answers = await createPrompt({
      port: {
        type: "text",
        question: "Server port:",
        initial: "3000",
      } as TextOptions,
      database: {
        type: "select",
        question: "Select database:",
        options: ["MongoDB", "PostgreSQL", "MySQL"],
      } as SelectOptions,
      features: {
        type: "multiselect",
        question: "Enable features:",
        options: [
          "Authentication",
          "Rate Limiting",
          "CORS",
          "Compression",
          "Logging",
        ],
      } as MultiSelectOptions,
      confirm: {
        type: "confirm",
        question: "Save configuration?",
      } as ConfirmOptions,
    });

    console.log("Configuration:", answers);
  } catch (error) {
    console.error("Failed to setup configuration:", error);
  }
}

// Run examples
basicPrompts();
projectSetup();
configSetup();
