'use strict';

import * as vscode from 'vscode';
import { showChatGPTSuggestion } from './commands/showChatGPTSuggestion';
import { applySuggestion } from './commands/applySuggestion';
import { deleteSuggestion } from './commands/deleteSuggestion';
import { editSuggestion } from './commands/editSuggestion';
import { SuggestionComment } from './SuggestionComment';
import { cancelSaveSuggestion } from './commands/cancelSaveSuggestion';
import { saveSuggestion } from './commands/saveSuggestion';
import { showDiff } from './commands/showDiff';


export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "text-writing-assistant" is now active!');

	// A `CommentController` is able to provide comments for documents.
	const commentController = vscode.comments.createCommentController('chatgptSuggestion', 'ChatGPT Suggestion');
	context.subscriptions.push(commentController);

	// Register command
	context.subscriptions.push(
		vscode.commands.registerCommand('text-writing-assistant.showChatGPTSuggestion', () => showChatGPTSuggestion(commentController)));

	context.subscriptions.push(
		vscode.commands.registerCommand('text-writing-assistant.applySuggestion', (thread: vscode.CommentThread) => {
			applySuggestion(thread);
	}));

	context.subscriptions.push(
		vscode.commands.registerCommand('text-writing-assistant.showDiff', async (thread: vscode.CommentThread) => {
			showDiff(thread);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('text-writing-assistant.deleteSuggestion', (thread: vscode.CommentThread) => {
		deleteSuggestion(thread);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('text-writing-assistant.editSuggestion', (comment: SuggestionComment) => {
		editSuggestion(comment);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('text-writing-assistant.cancelSaveSuggestion', (comment: SuggestionComment) => {
		cancelSaveSuggestion(comment);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('text-writing-assistant.saveSuggestion', (comment: SuggestionComment) => {
		saveSuggestion(comment);
	}));
}

