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

```javascript
import { MoLang } from 'molang'

const molang = new MoLang(
	{
		query: {
			x: 0,
			get(val) {
				return val + 4
			},
		},
	},
	{ useCache: true }
)
molang.execute('query.x + query.get(3) == 7')
```

### Setting up nested environments

For the context switching operator "->", you can set up nested environments like this:

```javascript
import { MoLang, Context } from 'molang'

const molang = new MoLang({
	query: {
		test: 1,
	},
	context: {
		other: new Context({
			query: { test: 1 },
		}),
	},
})
```
