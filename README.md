# MoLang

> MoLang is a simple expression-based language designed for fast calculation of values at run-time. Its focus is solely to enable script-like capabilities in high-performance systems where JavaScript is not performant at scale. We need scripting capabilities in these low-level systems to support end-user modding capabilities, custom entities, rendering, and animations.

\- From the Minecraft documentation

This library is an extendable MoLang parser for JavaScript/TypeScript applications.

## Installation

`npm i molang`

## Usage

```javascript
import { parse, setENV } from 'molang'

setENV({
	query: {
		x: 0,
		get(val) {
			return val + 4
		},
	},
})

parse('query.x + query.get(3) == 7')
```
