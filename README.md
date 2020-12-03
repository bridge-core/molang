# MoLang

A fast MoLang parser used and developed by the bridge. team.

## About

> MoLang is a simple expression-based language designed for fast calculation of values at run-time. Its focus is solely to enable script-like capabilities in high-performance systems where JavaScript is not performant at scale. We need scripting capabilities in these low-level systems to support end-user modding capabilities, custom entities, rendering, and animations.

\- From the Minecraft documentation

## Installation

-   `npm i molang`

    **or**

-   Download the `dist/main.web.js` file and add the script to your HTML page (library access via global `MoLang` object).

## Usage

For simple scripts, you can pass the execution environment to the `execute` function.

```javascript
import { execute } from 'molang'

execute('query.x + query.get(3) == 7', {
	query: {
		x: 0,
		get(val) {
			return val + 4
		},
	},
})
```

Some scripts may need to persist variable data defined by users at runtime. In order to support that, use the `setEnv` function once to define the base environment.

```javascript
import { execute, setEnv } from 'molang'

setEnv({
	query: {
		x: 0,
		get(val) {
			return val + 4
		},
	},
})
execute('query.x + query.get(3) == 7')
```

## Important

We are going to change the API surface to a class-based solution relatively soon to support better handling of multiple execution environments.
This should reduce the current overhead of calling `setEnv`.
