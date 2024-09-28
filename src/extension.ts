'use strict';

import * as vscode from 'vscode';
import { showChatGPTSuggestion } from './commands/showChatGPTSuggestion';
import { applySuggestion } from './commands/applySuggestion';
import { deleteSuggestion } from './commands/deleteSuggestion';
import { editSuggestion } from './commands/editSuggestion';
import { SuggestionComment } from './SuggestionComment';


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

	context.subscriptions.push(vscode.commands.registerCommand('text-writing-assistant.deleteSuggestion', (thread: vscode.CommentThread) => {
		deleteSuggestion(thread);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('text-writing-assistant.editSuggestion', (comment: SuggestionComment) => {
		editSuggestion(comment);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('text-writing-assistant.cancelsaveSuggestion', (comment: SuggestionComment) => {
		if (!comment.parent) {
			return;
		}

		comment.parent.comments = comment.parent.comments.map(cmt => {
			if ((cmt as SuggestionComment).id === comment.id) {
				cmt.body = (cmt as SuggestionComment).savedBody;
				cmt.mode = vscode.CommentMode.Preview;
			}

			return cmt;
		});
	}));

	context.subscriptions.push(vscode.commands.registerCommand('text-writing-assistant.saveSuggestion', (comment: SuggestionComment) => {
		if (!comment.parent) {
			return;
		}

		comment.parent.comments = comment.parent.comments.map(cmt => {
			if ((cmt as SuggestionComment).id === comment.id) {
				(cmt as SuggestionComment).savedBody = cmt.body;
				cmt.mode = vscode.CommentMode.Preview;
			}

			return cmt;
		});
	}));
}
