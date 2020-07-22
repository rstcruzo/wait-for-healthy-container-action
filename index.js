const core = require('@actions/core');

const exec = require('child_process').execSync;
var sleep = require('system-sleep');

const performance = require('perf_hooks').performance;


try {
  const container = core.getInput('container');
  const maxRetries = core.getInput('max-retries');
  const interval = core.getInput('interval');

  const getHealthStatusCmd =
    `docker inspect --format '{{ .State.Health.Status }}' $(docker-compose ps -q ${container})`;

  const t0 = performance.now();

  for (let i = 0; i < maxRetries; i++) {
    const output = exec(getHealthStatusCmd, { encoding: 'utf-8' });
    if (output === 'healthy') {
      break;
    }

    sleep(interval);
  }

  const t1 = performance.now();
  core.setOutput("time-spent", t1 - t0);

} catch (error) {
  core.setFailed(error.message);
}