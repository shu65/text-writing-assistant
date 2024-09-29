import * as vscode from 'vscode';
import { SuggestionComment } from '../SuggestionComment';

export async function saveSuggestion(comment: SuggestionComment) {
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
}