# Wait for container to be healthy

This action waits for a container status to be `healthy`.

It uses docker-compose to find the container id, so you need to send the compose service name as input.

## Inputs

### `container`

**Required** The name of the service to wait for.

### `max-retries`

**Optional** The maximum number of retries.

### `interval`

**Optional** How many seconds to wait to try again.

## Example usage

uses: rstcruzo/wait-for-healthy-container-action@master
with:
  container: service-name