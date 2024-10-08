import * as vscode from 'vscode';
import { SuggestionComment } from '../SuggestionComment';

export const editSuggestion = async (comment: SuggestionComment) => {
	if (!comment.parent) {
		return;
	}

	comment.parent.comments = comment.parent.comments.map(cmt => {
		if ((cmt as SuggestionComment).id === comment.id) {
			cmt.mode = vscode.CommentMode.Editing;
		}
		return cmt;
	});
};
