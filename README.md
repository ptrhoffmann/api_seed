# REST-API-SEED #

## Installation and Building ##

Switch to working directory and run:
```
> npm install
> npm run build
```

The build task will run linting and resolve the swagger-json config files.

## Running ##
1. Start server in dev environment (with file-change watcher and rebuild):
```
> npm run dev
```

2. Start server in production:
```
> npm start
```

3. Running tests:
```
> # run unit test
> npm run test:unit
>
> # run integration tests. this will additionally start the server. 
> # you'll get errors on port listening, when an other server is already running.
> npm run test:ci
>
> # use different reporters (see https://mochajs.org/#reporters)
> npm run test:unit -- --reporter dot
```

## Local Endpoints ##
- DOC-UI: http://localhost:3030/docs/
- API: http://localhost:3030/ (all available endpoints from doc)

## Ports ##
- Docker(localhost): 3030
- Consul: not yet configured (old content portfolio service listening on port 83)

## Environment Variables ##
- AWS_ENV (in frontend set to ci or rancher)
- PORT (default 3030)
- FLUENT_HOST (defaults to 172.17.0.1)
- NODE_ENV (production or development)

## Known Issues ##

1. Only in dev mode while running nodemon scripts ("npm run dev"):
Sometimes you could get an EPERM error on the "update-notifier-nodemon.json"-file. 
That's because we start two nodemon watchers in parallel, which will check for nodemon updates and try to update the json-file.
In this case you can simply rerun the task (npm run dev) or change configs to opt out the notifier (see https://github.com/yeoman/update-notifier/blob/master/readme.md#user-settings)
