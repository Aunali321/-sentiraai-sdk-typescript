<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</p>
<p align="center">
    <h1 align="center">SentiraAI SDK</h1>
</p>
<p align="center">
    <em>Simplify Audio Transcription and Summarization with SentiraAI</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/Aunali321/sentiraai-sdk-typescript?style=flat-square&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/Aunali321/sentiraai-sdk-typescript?style=flat-square&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/Aunali321/sentiraai-sdk-typescript?style=flat-square&color=0080ff" alt="repo-top-language">
</p>

## Overview

SentiraAI SDK is a powerful Node.js client for seamless integration with the SentiraAI API. It provides developers with efficient tools for audio transcription, text summarization, and API key management, enabling the creation of sophisticated AI-driven applications.

## Key Features

- **Audio Transcription**: Convert speech to text with high accuracy and speed.
- **Text Summarization**: Generate concise summaries from lengthy content while preserving key information.
- **API Key Management**: Securely create, validate, and manage API keys for enhanced control and security.

## Installation

Install the SentiraAI SDK using npm:

```sh
npm install @sentira-ai/sdk
```

## Quick Start

```javascript
import SentiraAI from '@sentira-ai/sdk';

const sentira = new SentiraAI({ apiKey: 'your-api-key' });

// Transcribe audio
async function transcribeAudio() {
  const result = await sentira.transcribe({
    file: audioBuffer,
    input_type: 'file',
    transcript_type: 'text',
    model: 'fast' // or 'slow' for higher accuracy
  });
  console.log('Transcription:', result.response.transcript);
}

// Summarize text
async function summarizeText() {
  const result = await sentira.summarize({
    text: 'Your text to summarize...',
    summary_length: 'short',
    summary_format: 'paragraph',
    model: 'slow' // or 'fast'
  });
  console.log('Summary:', result.response.summary);
}
```

## API Reference

### SentiraAI Class

#### Constructor

```javascript
new SentiraAI(config: SentiraConfig)
```

- `config.apiKey`: Your SentiraAI API key
- `config.accessToken`: Your SentiraAI access token (alternative to apiKey)
- `config.baseUrl`: Custom base URL for the API (optional)

#### Methods

- `transcribe(options: TranscribeOptions): Promise<TranscribeResponse>`
- `summarize(options: SummarizeOptions): Promise<SummarizeResponse>`
- `createApiKey(request: ApiKeyRequest): Promise<ApiKeyResponse>`
- `getApiKeys(): Promise<GetApiKeysResponse>`
- `deleteApiKey(apiKeyId: string): Promise<DeleteApiKeyResponse>`
- `validateApiKey(request: ValidateApiKeyRequest): Promise<ValidateApiKeyResponse>`

For detailed type information, please refer to the `src/types.ts` file in the SDK source code.

## Error Handling

The SDK uses custom error classes for precise error handling:

```javascript
import { SentiraApiError } from '@sentira-ai/sdk';

try {
  // SDK operation
} catch (error) {
  if (error instanceof SentiraApiError) {
    console.error('SentiraAI API Error:', error.message, 'Status:', error.statusCode);
  } else {
    console.error('Unexpected Error:', error);
  }
}
```

## Contributing

We welcome contributions to the SentiraAI SDK. Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

Please ensure your code adheres to our coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

For support, please email support@sentiraai.com or open an issue in the GitHub repository.

---
