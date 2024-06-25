import SentiraAI from './SentiraAI';
import { SentiraApiError } from './errors';
import fs from 'fs';

const sentira = new SentiraAI({ apiKey: 'your-api-key-here' });

async function example() {
    try {
        const summaryResult = await sentira.summarize({
            text: 'Your long text here...',
            summary_length: 'short',
            summary_format: 'paragraph',
            model: 'slow'
        });
        console.log('Summary:', summaryResult.response.summary);

        const audioBuffer = fs.readFileSync('path/to/your/audio.mp3');
        const transcriptionResult = await sentira.transcribe({
            file: audioBuffer,
            input_type: 'file',
            transcript_type: 'text',
            model: 'nova-2'
        });
        console.log('Transcription:', transcriptionResult.response.transcript);

    } catch (error) {
        if (error instanceof SentiraApiError) {
            console.error('Sentira API Error:', error.message, 'Status Code:', error.statusCode);
        } else {
            console.error('Unexpected Error:', error);
        }
    }
}

example();