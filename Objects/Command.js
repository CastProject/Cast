module.exports = class Command {
    constructor(client, settings, plugin = null) {
        if (!client) this.log(`Invalid arguments passed to command constructor`, true);
        this.client = client;
        this.meta = settings;
        if (plugin) this.plugin = plugin;
    }

    execute(message, response, args) {

    }

    log(data, error = false) {
        if (!data) return;
        error ?
            console.error(`[ERROR] ${data}`) :
            console.log(`[INFO] ${data}`);
    }

    logError(error) {
        if (!error.name) return;
        this.log(`${error.name}${error.message ? `: ${error.message}` : ' was thrown.'}`, true);
        if (configurationDefaults.debug && error.stack) console.error(error.stack);
    }
}