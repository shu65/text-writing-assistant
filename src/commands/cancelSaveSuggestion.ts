import * as vscode from 'vscode';
import { SuggestionComment } from '../SuggestionComment';

export async function cancelSaveSuggestion(comment: SuggestionComment) {
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
}