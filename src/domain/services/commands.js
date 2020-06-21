const _ = require('lodash');
const { Command, Inspection, InspectionLog } = require('../models');
const { commands } = require('../../exceptions');
const drone = require('../../services/drone');

const { CommandAlreadyExistsError, CommandDoesNotExistError } = commands;

async function create(createCommandDto, user) {
    
    const { name, code } = createCommandDto;

    let command = await Command.findOne({ $or: [{ name },{ code }] });

    if (command) {
        throw new CommandAlreadyExistsError();
    }

    command = await Command.create({
        ...createCommandDto,
        author: user,
    });

    return command;
}

async function listAll() {
    return Command.find();
}


async function enable(id) {
    const command = await Command.findById(id);

    if (!command) {
        throw new CommandDoesNotExistError();
    }

    command.enabled = true;

    await command.save();
    return command;
}

async function disable(id) {
    const command = await Command.findById(id);

    if (!command) {
        throw new CommandDoesNotExistError();
    }

    command.enabled = false;
    await command.save();
    return command;
}

async function remove(id) {
    const command = await Command.findById(id);

    if (!command) {
        throw new CommandDoesNotExistError();
    }

    return Command.findByIdAndDelete(command._id);
}


async function invoke(dto, user) {
    const { requestId, messageId, code } = dto;

    const command = await Command.findByCode(code);

    if (!command) {
        throw new CommandDoesNotExistError();
    }

    const log = await InspectionLog.create({ who: user });
    const inspection = await Inspection.create({
        requestId,
        messageId,
        command,
        user,
        logs: [log._id],
    });

    await drone.invokeCommand(command, inspection);

    return inspection;
}


module.exports = {
    create,
    enable,
    disable,
    invoke,
    listAll,
    remove,
};
