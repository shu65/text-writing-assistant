import * as vscode from 'vscode';

export async function showDiff(thread: vscode.CommentThread) {
	const editor = vscode.window.activeTextEditor;
	if (!editor){
		vscode.window.showInformationMessage('No active editor');
		return;
	}

	const selection = thread.range;
	const originalText = editor.document.getText(selection);
	const suggestion = thread.comments[0].body.toString();

	await runDiff(originalText, suggestion);

}

async function runDiff(originalText: string, suggestion: string) {
	const originalDoc = await vscode.workspace.openTextDocument({ content: originalText });
	const suggestionDoc = await vscode.workspace.openTextDocument({ content: suggestion });

	await vscode.commands.executeCommand(
		'vscode.diff', 
		originalDoc.uri, 
		suggestionDoc.uri, 
		'Original vs Suggestion',
		{ preview: true, viewColumn: vscode.ViewColumn.Beside }
	);
}