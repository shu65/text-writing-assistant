import * as vscode from 'vscode';
import { getOpenAIClient } from '../utils/openaiClient';
import { SuggestionComment } from '../SuggestionComment';

export async function showChatGPTSuggestion(commentController: vscode.CommentController) {
  const editor = vscode.window.activeTextEditor;
  if (!editor){
    vscode.window.showInformationMessage('No active editor');
    return;
  }

	// get selected text
	const selection = editor.selection;
	const originalText = editor.document.getText(selection);
	if (!originalText) {
		vscode.window.showInformationMessage('No text selected');
		return;
	}

	let openai_client;
	try {
		openai_client = getOpenAIClient();
	} catch (error: any) {
		vscode.window.showErrorMessage(`got error! ${error.message}`);
		return;
	}

	await vscode.window.withProgress({
		location: vscode.ProgressLocation.Notification,
		title: 'ChatGPT is thinking...',
		cancellable: false,
	}, async () => {
		const modelName = vscode.workspace.getConfiguration('text-writing-assistant').get('modelName') as string;
		const userPrompt = vscode.workspace.getConfiguration('text-writing-assistant').get('userPrompt') as string;
		const instruction = vscode.workspace.getConfiguration('text-writing-assistant').get('instruction') as string;
		try {
      const response = await openai_client.chat.completions.create({
        model: modelName,
        messages: [
          { role: 'system', content: 'The following is a conversation with an AI assistant' },
          { role: 'user', content: `${instruction}\n\n"${originalText}"` },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      const suggestion = response.choices[0].message.content?.trim();
      // const suggestion = "This is a suggestion from GPT";
			if (!suggestion) {
				vscode.window.showInformationMessage('No suggestion from ChatGPT');
				return;
			}
			
			const thread = commentController.createCommentThread(
				editor.document.uri, 
				new vscode.Range(selection.start, selection.end),
				[]
			);

			// add suggestion to the thread
			const newSuggestionComment = new SuggestionComment(
				suggestion,
				vscode.CommentMode.Preview,
				{ name: 'ChatGPT' },
				thread
			);
			thread.comments = [newSuggestionComment];
			thread.collapsibleState = vscode.CommentThreadCollapsibleState.Expanded;
			thread.canReply = false;
		} catch (error: any) {
			vscode.window.showErrorMessage(`got error! ${error.message}`);
		}
	});
}