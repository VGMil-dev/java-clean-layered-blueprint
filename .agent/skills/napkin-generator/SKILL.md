---
name: Napkin Generator
description: Generates a napkin-style sketch image for a given topic and saves it to src/assets.
---

# Napkin Generator Skill

Use this skill when the user wants a "napkin style", "hand drawn", or "rough sketch" image, especially for the RepoJava project.

## Instructions

1.  **Analyze the Request**: Identify the specific subject or concept to illustrate (e.g., "login process", "database schema").

2.  **Generate the Image**:
    *   Call the `generate_image` tool.
    *   **ImageName**: `napkin_[subject_snake_case]` (e.g., `napkin_login_flow`).
    *   **Prompt**: 
        > "Digital hand-drawn diagram in the style of napkin.ai. Professional technical architecture diagram depicting [SUBJECT]. **Text MUST be in SPANISH**. Key terms: [SPANISH_TERMS]. Background: Transparent (or solid dark hex #120f0d). Lines are clean white and off-white. Accents in Gold (#f59e0b) and Amber. High contrast, premium dark mode aesthetic. No paper texture. Clean, readable, professional. Context: Modern Java/Spring architecture with a premium documentation feel."

3.  **Locate and Move**:
    *   The `generate_image` tool will save the file to the artifacts directory.
    *   You MUST move or copy this file to the project's assets folder: `src/assets/`.
    *   Construct the target path: `src/assets/napkin_[subject_snake_case].png`.
    *   Use `run_command` to copy the file.
    *   *Command*: `Copy-Item -Path '[ARTIFACT_PATH]' -Destination 'src/assets/napkin_[subject_snake_case].png' -Force`

4.  **Verify**:
    *   Check the generated image (you effectively see it when it is created or notified).
    *   **CRITICAL**: Ask the user: "He generado la imagen. ¿Es legible el texto y están correctas las frases en español? Si hay garabatos o texto ilegible, ¿quieres que la regenere?"
    *   If the user approves, you are done. If not, retry step 2 with a refined prompt emphasizing "Legible Spanish Text".
