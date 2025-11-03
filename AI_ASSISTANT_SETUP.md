# AI Assistant Setup Guide

## Overview
The AI Assistant uses Hugging Face's free inference API to provide interactive help about the portfolio skills and technologies.

## Setup Instructions

### 1. Get a Free Hugging Face API Token
1. Visit [Hugging Face](https://huggingface.co/) and create a free account
2. Go to [Settings > Access Tokens](https://huggingface.co/settings/tokens)
3. Create a new token with "Read" permissions
4. Copy the token

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Hugging Face token:
   ```env
   NEXT_PUBLIC_HUGGINGFACE_API_TOKEN=your_actual_token_here
   ```

### 3. Features
- **Smart Fallbacks**: Works without API token using portfolio-specific responses
- **Real-time Chat**: Interactive conversation about skills and technologies
- **Minimizable Interface**: Clean, non-intrusive design
- **Mobile Responsive**: Works on all device sizes

### 4. Available Models
The assistant uses `microsoft/DialoGPT-medium` by default, but you can change it:

```env
NEXT_PUBLIC_HUGGINGFACE_MODEL=microsoft/DialoGPT-large
```

Popular alternatives:
- `microsoft/DialoGPT-small` (faster, smaller responses)
- `microsoft/DialoGPT-large` (better quality, slower)
- `facebook/blenderbot-400M-distill` (conversational AI)

### 5. Usage
- Click the chat bubble in the bottom-right corner
- Ask about specific technologies: "Tell me about Python skills"
- Inquire about experience levels: "What's the React proficiency?"
- General questions: "What technologies are showcased here?"

### 6. Fallback Mode
Even without an API token, the assistant provides intelligent responses about:
- Individual technologies and skill levels
- Technology categories and comparisons
- Experience and project types
- Contact and collaboration information

## Technical Details

### API Integration
- Uses Hugging Face's free inference API
- Implements conversation context (last 3 exchanges)
- Graceful error handling with meaningful fallbacks
- No server required - runs entirely client-side

### Security
- API token is client-side only (NEXT_PUBLIC_ prefix)
- No sensitive data transmitted
- Rate limiting handled by Hugging Face
- Fallback responses for offline functionality

### Performance
- Lazy loading - only loads when opened
- Efficient message management
- Smooth animations and transitions
- Mobile-optimized interface