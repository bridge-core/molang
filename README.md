# MoLang

A fast MoLang parser used and developed by the bridge. team.

## About

> MoLang is a simple expression-based language designed for fast calculation of values at run-time. Its focus is solely to enable script-like capabilities in high-performance systems where JavaScript is not performant at scale. We need scripting capabilities in these low-level systems to support end-user modding capabilities, custom entities, rendering, and animations.

\- From the Minecraft documentation

## Installation

`npm i molang`

## Usage

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
