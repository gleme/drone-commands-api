const _ = require('lodash');
const { Command } = require('../models');
const { commands } = require('../../exceptions');

const { CommandAlreadyExistsError, CommandDoesNotExistError } = commands;

async function create(createCommandDto, author) {
    
    const { name, code } = createCommandDto;

    let command = await Command.findOne({ $or: [{ name },{ code }] });

    if (command) {
        throw new CommandAlreadyExistsError();
    }

    command = await Command.create({
        ...createCommandDto,
        author
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

module.exports = {
    create,
    enable,
    disable,
    listAll,
    remove,
};
