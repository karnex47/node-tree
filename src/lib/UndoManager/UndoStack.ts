import Action from './Action';

export default class UndoStack {
    undoStack: Action[];
    redoStack: Action[];
    constructor() {
        this.undoStack = [];
        this.redoStack = [];
    }
    undo() {
        const lastAction = <Action>this.undoStack.pop();
        lastAction.undo();
        this.redoStack.push(lastAction);
    }
    redo() {
        const lastAction = <Action>this.undoStack.pop();
        lastAction.redo();
        this.undoStack.push(lastAction);
    }
    push(action: Action) {
        this.undoStack.push(action);
    }
}