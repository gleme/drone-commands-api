const { spawn } = require('child_process');
const { Command } = require('../models');

async function invokeCommand(name) { 

    const command = await Command.findByName(name);

    if (!command) {
        throw new Error('Unsupported command');
    }

    const cmdProcess = spawn(command.executablePath, command.arguments);
    cmdProcess.on('error', error => {
        // TODO: update command invocation status and notify user
    });

    cmdProcess.on('close', () => {
        // TODO: update command invocation status and notify user
    });

    // TODO: update command invocation status

}


module.exports = {
    invokeCommand,
};