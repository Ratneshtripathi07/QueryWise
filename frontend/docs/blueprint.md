# **App Name**: QueryWise

## Core Features:

- Input Form: Provides a clean UI with a single input field for the PDF URL and a text area for questions.
- Loading State: Displays a loading animation while fetching data from the API.
- Error Display: Displays error messages in a styled box when the API returns an error.
- Results Display: Renders the answers in individual cards with the original question displayed above each answer. Multi-line text and bullet points are correctly rendered.
- State Management: Manages the application's state using React hooks: loading, error, and data.
- API Call: Fetches the PDF URL and queries from the UI, sends them to the backend API, receives and displays the answers, using NEXT_PUBLIC_API_URL and NEXT_PUBLIC_API_TOKEN from the environment.
- Document Query Answering: Tool that takes the document URL, analyzes the content, reasons over it using an LLM, and then answers each user question individually. Answers will be multi-line when appropriate to the user's prompt, including lists or other text formats if they make the answers clearer.

## Style Guidelines:

- Background: Deep charcoal gray (#333333) for a modern dark theme.
- Primary: Electric blue (#3B82F6) as a vibrant accent color for buttons and highlights.
- Accent: A slightly darker blue (#2563EB) to provide visual contrast and indicate interactive elements.
- Font: 'Inter' (sans-serif) for a clean and highly readable text throughout the app. Note: currently only Google Fonts are supported.
- Headings: Bold with generous letter-spacing for emphasis.
- Minimal and clean layout with ample whitespace; responsive design using a single-column layout on mobile and a centered, max-width container on desktop.
- Components (input fields, buttons, etc.) use rounded corners.
- Loading: Use a modern loading animation, such as a pulsing spinner.