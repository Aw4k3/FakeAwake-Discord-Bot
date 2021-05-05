class controls {
    bindings = []

    addControls(emoteID, operation) {
        this.bindings.push(new action(emoteID, operation));
    }

    addControlsToMessage(msg) {
        for (var i = 0; i < this.bindings.length; i++) {
            msg.react(this.bindings[i].id);
        }
    }
}

class action {
    id = '';
    operation = function () { };

    constructor(control, operation) {
        this.id = control;
        this.operation = operation;
    }

    Execute() {
        this.operation();
    }
}

module.exports = controls;