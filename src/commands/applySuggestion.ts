import * as vscode from 'vscode';

export async function applySuggestion(thread: vscode.CommentThread) {
	const editor = vscode.window.activeTextEditor;
	if (!editor){
		vscode.window.showInformationMessage('No active editor');
		return;
	}

	const suggestion = thread.comments[0].body.toString();

	// get selected text
	await editor.edit(editBuilder => {
		editBuilder.replace(thread.range, suggestion);
	});
	thread.dispose();
}