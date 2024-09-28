import * as vscode from 'vscode';

export const deleteSuggestion = async (thread: vscode.CommentThread) => {
	thread.dispose();
};
