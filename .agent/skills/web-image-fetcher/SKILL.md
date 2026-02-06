---
name: Web Image Fetcher
description: Searches for images or GIFs on the web (Google/Bing) and downloads them to the project assets.
---

# Web Image Fetcher Skill

Use this skill when the user asks to "get an image", "download a gif", or "find a photo" of a specific topic, without using paid APIs.

## Instructions

1.  **Search for the Image**:
    *   Use the `search_web` tool to find a direct URL for an image.
    *   Query: `[topic] filetype:png` or `[topic] filetype:gif` or `[topic] filetype:jpg`.
    *   *Tip*: Look for high-resolution, royalty-free sources if possible (e.g., Wikimedia, Pexels via search), but standard Google Images results are acceptable for internal drafts.
    *   **Alternative**: Use `browser_subagent` to visit a site and extract a specific image URL if `search_web` returns generic pages.

2.  **Verify URL**:
    *   Ensure the URL ends in a valid image extension (.png, .jpg, .jpeg, .gif, .webp).

3.  **Download**:
    *   Use `run_command` with PowerShell to download the file.
    *   Target Directory: `src/assets/`
    *   Naming Convention: `[topic_snake_case].[extension]`
    *   **Command**:
        ```powershell
        Invoke-WebRequest -Uri "[IMAGE_URL]" -OutFile "src/assets/[FILENAME]"
        ```
    *   *Wait*: Set `WaitMsBeforeAsync` to a sufficient time (e.g., 2000) to ensure completion, or check status.

4.  **Confirm**:
    *   Check if the file exists using `list_dir` or `run_command` (`Test-Path`).
    *   Notify the user that the image has been saved to `src/assets`.

## Example
**User**: "Consigue un gif de un perro bailando"
1.  **Search**: `search_web` -> "dog dancing gif filetype:gif"
2.  **Select**: Found `https://example.com/dancing-dog.gif`
3.  **Download**: `Invoke-WebRequest -Uri "https://example.com/dancing-dog.gif" -OutFile "src/assets/dancing_dog.gif"`
