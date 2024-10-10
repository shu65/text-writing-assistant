import * as vscode from 'vscode';
import OpenAI from 'openai';

let openaiInstance: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (openaiInstance) {
    return openaiInstance;
  }

  const baseURL = vscode.workspace.getConfiguration('text-writing-assistant').get('openaiBaseURL') as string;
  if (!baseURL) {
    throw new Error('OpenAI Base URL is required');
  }
  const apiKey = vscode.workspace.getConfiguration('text-writing-assistant').get('openaiApiKey') as string;
  if (!apiKey) {
    throw new Error('OpenAI API Key is required');
  }
  openaiInstance = new OpenAI({ baseURL, apiKey });
  return openaiInstance;
}