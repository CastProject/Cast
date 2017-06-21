const fs = rqeuire('fs');

const CommandMetaDefault = {
    "file": "mycommand",
    "args": ["arg1", "arg2"],
    "permissions": "ADMIN, MODERATOR, null"
}

class CommandsManager {
    constructor(client, commandsPath) {
        this.client = client;
        this.commandsPath = commandsPath;

    }
}