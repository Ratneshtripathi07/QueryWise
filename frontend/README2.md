# 🚀 QueryWise - Getting Started Guide

QueryWise is an intelligent document query system that allows you to ask questions about PDF documents and get AI-powered answers. This guide will help you set up and run the application.

## 📋 Prerequisites

- **Node.js** (v18.19.1 or higher recommended)
- **npm** (v9.2.0 or higher)
- **Git** (for cloning the repository)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd QueryWise-main
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api/query
NEXT_PUBLIC_API_TOKEN=your_api_token_here

# Google AI Configuration (for Genkit)
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The application will start on **http://localhost:9002**

### Available Scripts

| Command                | Description                             |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Start development server with Turbopack |
| `npm run build`        | Build for production                    |
| `npm run start`        | Start production server                 |
| `npm run lint`         | Run ESLint                              |
| `npm run typecheck`    | Run TypeScript type checking            |
| `npm run genkit:dev`   | Start Genkit AI development server      |
| `npm run genkit:watch` | Start Genkit AI with watch mode         |

## 🏗️ Project Structure

```
QueryWise-main/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── page.tsx         # Main application page
│   │   ├── layout.tsx       # Root layout
│   │   ├── globals.css      # Global styles
│   │   ├── collaborate/     # Collaboration page
│   │   ├── contact/         # Contact page
│   │   └── faq/            # FAQ page
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── ai/                  # AI integration
│   │   ├── genkit.ts       # Genkit configuration
│   │   ├── dev.ts          # Development server
│   │   └── flows/          # AI flows
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utility functions
├── docs/                   # Documentation
├── package.json           # Dependencies and scripts
├── tailwind.config.ts     # Tailwind CSS configuration
└── next.config.ts         # Next.js configuration
```

## 🎨 Features

### Core Functionality

- **PDF Document Processing**: Upload PDF files or provide PDF URLs
- **Question Interface**: Ask multiple questions about your documents
- **AI-Powered Answers**: Get intelligent responses using Google AI (Gemini)
- **Modern UI**: Clean, responsive interface with dark/light theme support

### UI Components

- **Input Forms**: URL input and file upload options
- **Loading States**: Animated loading indicators
- **Error Handling**: User-friendly error messages
- **Results Display**: Card-based answer presentation
- **Theme Toggle**: Switch between light and dark modes

### Technical Features

- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Modern component library
- **Next.js 15**: Latest React framework
- **Turbopack**: Fast development builds

## 🔧 Configuration Options

### API Configuration

The application supports two types of backend integration:

1. **Custom API Backend**:

   - Set `NEXT_PUBLIC_API_URL` to your API endpoint
   - Set `NEXT_PUBLIC_API_TOKEN` for authentication
   - API should accept POST requests with document data and questions

2. **Google AI Integration** (Genkit):
   - Set `GOOGLE_AI_API_KEY` with your Google AI API key
   - Uses Gemini 2.0 Flash model for document processing
   - Built-in document summarization and Q&A capabilities

### Environment Variables

| Variable                | Description              | Required             |
| ----------------------- | ------------------------ | -------------------- |
| `NEXT_PUBLIC_API_URL`   | Backend API endpoint     | Yes (for custom API) |
| `NEXT_PUBLIC_API_TOKEN` | API authentication token | Yes (for custom API) |
| `GOOGLE_AI_API_KEY`     | Google AI API key        | Yes (for Genkit AI)  |

## 🌐 API Integration

### Custom Backend API

If you're using a custom backend, ensure it accepts:

**POST** requests to your API endpoint with:

**For URL-based documents:**

```json
{
  "documents": "https://example.com/document.pdf",
  "questions": ["Question 1", "Question 2", "Question 3"]
}
```

**For file uploads:**

```
FormData with:
- file: PDF file
- questions: Array of questions
```

**Response format:**

```json
{
  "answers": [
    "Answer to question 1",
    "Answer to question 2",
    "Answer to question 3"
  ]
}
```

## 🎯 Usage Guide

### 1. Access the Application

Open your browser and navigate to `http://localhost:9002`

### 2. Choose Input Method

- **PDF Link**: Enter a URL to a PDF document
- **Upload PDF**: Select a PDF file from your device

### 3. Ask Questions

Enter your questions in the text area, one per line:

```
What is the main topic of this document?
What are the key findings?
What recommendations are provided?
```

### 4. Get Answers

Click "Analyze Document" and wait for the AI to process your document and questions.

### 5. View Results

Answers will be displayed in individual cards with the original question and AI-generated response.

## 🔍 Troubleshooting

### Common Issues

1. **"API URL or Token is not configured"**

   - Ensure `.env.local` file exists with proper configuration
   - Check that environment variables are correctly set

2. **"API request failed"**

   - Verify your backend API is running
   - Check API endpoint URL and authentication
   - Ensure API accepts the expected request format

3. **"Invalid response format"**

   - Backend API should return JSON with an "answers" array
   - Check API response structure matches expected format

4. **Port already in use**
   - The app runs on port 9002 by default
   - Change port in `package.json` if needed: `"dev": "next dev --turbopack -p 9003"`

### Development Tips

- Use `npm run typecheck` to check for TypeScript errors
- Use `npm run lint` to check code quality
- Check browser console for detailed error messages
- Use browser dev tools to inspect network requests

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Variables for Production

Ensure all required environment variables are set in your production environment.

### Recommended Hosting Platforms

- **Vercel**: Optimized for Next.js applications
- **Netlify**: Easy deployment with Git integration
- **Railway**: Simple container deployment
- **Docker**: Containerized deployment

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Google AI Documentation](https://ai.google.dev/)
- [Genkit Documentation](https://genkit.ai/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

Frontend built with FirebaseStudio. This project is licensed under the MIT License.

---

**Happy Querying! 🎉**

For support or questions, please refer to the documentation or create an issue in the repository.
