const core = require('@actions/core');

const exec = require('child_process').execSync;
var sleep = require('system-sleep');


try {
  const container = core.getInput('container');
  const maxRetries = parseInt(core.getInput('max-retries'));
  const interval = parseInt(core.getInput('interval'));

  const getHealthStatusCmd =
    `docker inspect --format '{{ .State.Health.Status }}' $(docker-compose ps -q ${container})`;

  core.info(`Waiting for ${container}...`);

  let i = 0;
  for (; i < maxRetries; i++) {
    const output = exec(getHealthStatusCmd, { encoding: 'utf-8' }).trim();
    if (output === 'healthy') {
      break;
    }

    sleep(interval * 1000);  // to milliseconds
  }

  if (i < maxRetries) {
    core.setFailed('Max retries were excceeded. Container still not healthy!');
  } else {
    core.info(`${container} is healthy!`);
  }
} catch (error) {
  core.setFailed(error.message);
}