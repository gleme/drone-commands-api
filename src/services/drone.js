const { spawn } = require('child_process');
const { Inspection, InspectionStatus } = require('../domain/models');

async function invokeCommand(command, inspection) { 

    const cmdProcess = spawn(command.executablePath, command.arguments);
    cmdProcess.on('error', async error => {
        // TODO: update command invocation status and notify user
        await Inspection.updateOne({ _id: inspection._id }, { $set: { status: InspectionStatus.ERROR, result: error } });
    });
    cmdProcess.on('close', async code => {
        console.log('close');
        await Inspection.updateOne({ _id: inspection._id }, { $set: { status: InspectionStatus.FINISHED_EXECUTION, result: String(code) } });
    });
    cmdProcess.on('exit', code => {
        console.log('exit', code);
        // TODO: update command invocation status and notify user
    });

    // TODO: update command invocation status
    await Inspection.updateOne({ _id: inspection._id }, { $set: { status: InspectionStatus.EXECUTING } });
}

module.exports = {
    invokeCommand,
};
