/**
 * Tests for the @funish/prompt package
 * Tests interactive command-line prompts with various input types and configurations
 */

import { createPrompt } from "@funish/prompt";
import { assertEquals } from "./test-utils";
import type { TestSuite } from "./test-utils";

export const promptTests: TestSuite = {
  name: "prompt",
  tests: [
    {
      name: "should create text prompt",
      async fn() {
        // Test basic text input with default value
        const answers = await createPrompt({
          name: {
            type: "text",
            question: "What is your name?",
            initial: "John",
          },
        });
        // Verify response is a string
        assertEquals(typeof answers.name, "string");
      },
    },
    {
      name: "should create confirm prompt",
      async fn() {
        // Test yes/no confirmation prompt with default value
        const answers = await createPrompt({
          confirm: {
            type: "confirm",
            question: "Are you sure?",
            initial: true,
          },
        });
        // Verify response is a boolean
        assertEquals(typeof answers.confirm, "boolean");
      },
    },
    {
      name: "should create select prompt",
      async fn() {
        // Test single-choice selection from a list of options
        const answers = await createPrompt({
          choice: {
            type: "select",
            question: "Select an option",
            options: ["A", "B", "C"],
          },
        });
        // Verify response is a valid selection
        assertEquals(typeof answers.choice, "string");
        assertEquals(["A", "B", "C"].includes(answers.choice as string), true);
      },
    },
    {
      name: "should create multiselect prompt",
      async fn() {
        // Test multiple-choice selection from a list of options
        const answers = await createPrompt({
          choices: {
            type: "multiselect",
            question: "Select options",
            options: ["A", "B", "C"],
          },
        });
        // Verify response is an array of valid selections
        assertEquals(Array.isArray(answers.choices), true);
        assertEquals(
          (answers.choices as string[]).every((c) =>
            ["A", "B", "C"].includes(c),
          ),
          true,
        );
      },
    },
    {
      name: "should handle multiple prompts",
      async fn() {
        // Test sequence of different prompt types
        const answers = await createPrompt({
          name: {
            type: "text",
            question: "Name?",
          },
          age: {
            type: "text",
            question: "Age?",
          },
          confirm: {
            type: "confirm",
            question: "Continue?",
          },
        });
        // Verify all responses have correct types
        assertEquals(typeof answers.name, "string");
        assertEquals(typeof answers.age, "string");
        assertEquals(typeof answers.confirm, "boolean");
      },
    },
  ],
};
