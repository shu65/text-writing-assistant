import * as vscode from 'vscode';

let commentId = 1;

export class SuggestionComment implements vscode.Comment {
	id: number;
	savedBody: string | vscode.MarkdownString;
	constructor(
		public body: string | vscode.MarkdownString,
		public mode: vscode.CommentMode,
		public author: vscode.CommentAuthorInformation,
		public parent: vscode.CommentThread,
		public contextValue?: string
	) {
		this.id = ++commentId;
		this.savedBody = body;
	}
}