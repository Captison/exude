
# Running Tasks

The task runner for this project is entirely encapsulated in the **task.js** file at project root.

To use the task runner, do

```bash
$ node task task-name
```

Available tasks are defined in files identified by `taskFiles` in __package.json__.


## Managing Tasks

A task file (__.tasks.js__) should export an array of task definition objects.  

A task definition object should contain:

- `name` (required)  
The name of the task (used on the command line).

- `fn` (required)  
The function that executes the task.

- `desc`  
A short description of what the task does.

For example.

```js
// example.tasks.js
module.exports =
[
    {
        name: 'build-dev',
        desc: 'Build project for development.',
        fn: ({ exit, log, run }) =>
        {
            log('Building project for development...');
            run.npx(['webpack', '--env', 'dev']).on('close', exit);
        }
    }
]
```

The task file above creates a `build-dev` task that launches a webpack development build.

Note that the task function receives an object with the following function properties:

- `exit(status: number)`  
Callback for task completion.

- `log(...msg: any)`  
Sends output to console (set to `console.log`).

- `run(cmd: string, args: array, opts: object)`  
Executes a console command.  Use `run.node(args, opts)` or `run.npx(args, opts)` to run node or npx commands, respectively.

To display all available tasks in the project, omit the task name (or provide an invalid one).

```bash
$ node task
```
