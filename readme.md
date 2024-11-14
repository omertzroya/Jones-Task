# Form Automation Script

A Node.js script using Puppeteer to automate form submission on a test website. This script demonstrates automated form filling, dropdown selection, and form submission.

## Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone this repository or create a new directory for your project
2. Initialize a new Node.js project (if not already done):
   ```bash
   npm init -y
   ```
3. Install Puppeteer:
   ```bash
   npm install puppeteer
   ```

## Project Structure

```
project-root/
├── formAutomation.js    # Main automation script
├── package.json         # Project dependencies
└── README.md           # This file
```

## Features

- Opens a browser in non-headless mode
- Navigates to a specified form URL
- Automatically fills in form fields:
  - Name
  - Email
  - Phone number
  - Company name
- Handles dropdown selections (targets options containing '51' or '500')
- Takes a screenshot before form submission
- Submits the form
- Handles successful submission and navigation
- Includes error handling and browser cleanup


## Usage

Run the script using Node.js:

```bash
node formAutomation.js
```
## Screenshots

The script saves a screenshot named 'form-before-submit.png' before form submission. This can be useful for debugging or verification purposes.

## Troubleshooting

If you encounter issues:
1. Ensure all dependencies are properly installed
2. Check if the target website is accessible
3. Verify that selectors match the current website structure
4. Check console output for error messages
5. Ensure proper network connectivity

