# Headings Extractor Chrome Extension

## Overview

The **Headings Extractor** Chrome Extension allows users to easily extract all HTML headings (`<h1>` to `<h6>`) from any webpage. It displays the headings in plain text, offers options to search, copy to clipboard, and export the headings to a `.txt` file. The extension also shows the respective counts of each heading type (`H1`, `H2`, etc.) and provides a simple, intuitive interface.

## Features

- Extracts all HTML headings (`<h1>`, `<h2>`, etc.) from a webpage.
- Displays the heading content in a clean, plain-text format.
- Provides a search bar to filter through headings.
- Shows counts for each type of heading (e.g., `H1: 3`, `H2: 5`, etc.).
- Copy headings to the clipboard with one click.
- Export headings to a `.txt` file.
- Automatically hides buttons and displays a message if no headings are found on the page.

## Installation

1. Clone or download the repository to your local machine.
2. Open Chrome and navigate to the Extensions page by typing `chrome://extensions/` in the address bar.
3. Enable **Developer Mode** by toggling the switch in the top-right corner.
4. Click on the "Load unpacked" button and select the folder where you downloaded/cloned the extension files.
5. The extension should now appear in the extensions bar, and you can use it by clicking on the icon.

## Usage

1. Navigate to any webpage.
2. Click the **Headings Extractor** extension icon in the Chrome toolbar.
3. If headings are found:
   - The extension will display the headings in a dedicated container.
   - You can search for specific headings using the search bar.
   - Use the "Copy to Clipboard" button to copy the headings.
   - Use the "Export Headings" button to download the headings as a `.txt` file.
4. If no headings are found, a message will be displayed, and the buttons will be hidden.

## Files

- **manifest.json**: Describes the extension's metadata and permissions.
- **popup.html**: The HTML structure of the extension's popup window.
- **popup.js**: The JavaScript logic that controls the extraction, display, and interaction functionality.
- **popup.css**: The CSS file for styling the extension's popup window.
- **content.js**: (If required for later use) To handle any background or injected page-specific logic.

## Screenshots

### Headings Extracted:
![screenshot_headings_found](screenshot_headings_found.png)

### No Headings Found:
![screenshot_no_headings](screenshot_no_headings.png)

## License

This extension is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute as per the terms of the license.

---

### Contributions & Support

Feel free to open an issue or submit a pull request if you encounter any bugs or have suggestions for improvements.

---

### Notes

This extension currently only supports extracting headings (`<h1>` to `<h6>`). Future versions may include support for other elements or additional features based on user feedback.
