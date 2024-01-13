import { App, Editor, Modal, Plugin } from 'obsidian';

export default class WheelDecide extends Plugin {
	async onload() {
		this.addCommand({
			id: 'create-decision-wheel',
			name: 'Create decision wheel',
			editorCallback: (editor: Editor) => {
				const wheelOptions: string[] = [];
				const startLine = editor.getCursor("from").line;
				const endLine = editor.getCursor("to").line;
				for (let i = startLine; i < endLine + 1; i++) {
					wheelOptions.push(editor.getLine(i))
				}

				new WheelModal(this.app, wheelOptions).open()
			}
		});
	}
}

class WheelModal extends Modal {
	wheelOptions: string[];

	constructor(app: App, wheelOptions: string[]) {
		super(app);
		this.wheelOptions = wheelOptions;
	}

	onOpen() {
		const { contentEl } = this;
		const wheelUrl = new URL("https://wheeldecide.com/e.php?");

		for (let i = 0; i < this.wheelOptions.length; i++) {
			wheelUrl.searchParams.append(`c${i + 1}`, this.wheelOptions[i])
		}

		contentEl.innerHTML += `<iframe src="${wheelUrl.href}" width="500" height="500" scrolling="no" frameborder="0"></iframe>`
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
