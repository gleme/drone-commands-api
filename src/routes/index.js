const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');


function start() {
  return new Promise((resolve, reject) => {
    const ls = spawn('code', ['.']);
    ls.on('error', error => {
      console.error('error', error);
    });
    ls.on('close', code => {
      if (code == 0) {
        return resolve();
      }

      return reject(code);
    });

  });
  
}


const commands = {
  'start': start 
}

router.post('/', async (req, res, next) => {
  
  const { command } = req.body;
  const executor = commands[command];
  if (executor) {
    await executor();
    return res.status(200).json({ message: `command '${command}' executed`});
  }

  res.status(404).json({ message: 'command not found' });

});

module.exports = router;
