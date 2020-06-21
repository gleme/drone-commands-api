const { spawn } = require('child_process');
const _ = require('lodash');
const { Invocation, InvocationStatus } = require('../domain/models');

async function invokeCommand(command, invocation) { 

    const cmdProcess = spawn(command.executablePath, command.arguments);
    cmdProcess.on('error', async error => {
        // TODO: notify user
        await Invocation.update({ _id: invocation._id }, [{
            $set: {
                result: { $concat: ['$result', `\nerror: ${error}`] },
                status: InvocationStatus.ERROR,
            }
        }]);
    });

    cmdProcess.on('close', async code => {
        console.log('close:', code);
        await Invocation.update({ _id: invocation._id }, [{
            $set: {
                result: { $concat: ['$result', `\ncode: ${code}`] },
                status: InvocationStatus.FINISHED_EXECUTION,
            }
        }]);
    });

    cmdProcess.on('exit', code => {
        // TODO: update command invocation status and notify user
        console.log('exit:', code);
    });
    
    cmdProcess.stdout.on('data', async data => {
        await Invocation.update({ _id: invocation._id }, [{
            $set: {
                result: { $concat: ['$result', `\n${data.toString()}`] },
            },
        }]);
    });

    await Invocation.updateOne({ _id: invocation._id }, { $set: { status: InvocationStatus.EXECUTING } });
}

module.exports = {
    invokeCommand,
};
