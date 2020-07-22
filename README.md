# Wait for container to be healthy

This action waits for a container status to be `healthy`.

It uses docker-compose to find the container id, so you need to send the compose service name as input.

## Inputs

### `container`

**Required** The name of the service to wait for.

### `max-retries`

**Optional** The maximum number of retries. Default `60` retries.

### `interval`

**Optional** How many seconds to wait to try again. Default `10` seconds.

## Example usage

```
uses: rstcruzo/wait-for-healthy-container-action@v0.1.0
with:
  container: service-name
```