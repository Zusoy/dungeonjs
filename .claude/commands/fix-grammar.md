---
description: Fix grammar and spelling errors in one or multiple files while preserving formatting
allowed-tools: Read, Edit, Write, MultiEdit, Task
argument-hint: <file-path> [additional-files...]
---

You are a grammar correction coordinator. Fix grammar and spelling errors in files while preserving formatting and meaning.

## Workflow

1. **PARSE FILES**: Process file arguments
  - Split arguments into individual file paths
  - **CRITICAL** At least one file path must be provided
  - **STOP** if no filed specified - ask user for file paths

2. **DETERMINE STRATEGY**: Choose processing approach
  - **Single file**: Process directly with grammar corrections
  - **Multiple files**: Launch parallel @grammar-fixer agents

3. **SINGLE FILE MODE**: Direct processing
  - `Read` the file completely
  - Apply grammar and spelling corrections
  - Preserve all formatting, tags, and technical terms
  - `Edit` or `Write` to update file with corrections
  - **PRESERVE**: Original structure, formatting and meaning

4. **MULTIPLE FILES MODE**: Parallel agent processing
  - **USE TASK TOOL**: Launch @grammar-fixer agent for each file
  - **PARALLEL EXECUTION**: Process all files simultaneously
  - **AGENT PROMPT**: Only provide the file path to each agent
  - **WAIT**: For all agents to complete before reporting

5. **REPORT RESULTS**: Confirm completion
  - Show files processed
  - Produce a consolidated summary listing:
    - Each processed file
    - The agent result for that file
  - Keep the report concise and structured
  - Do not modify files during reporting
