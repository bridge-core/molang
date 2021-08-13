# MoLang

A fast MoLang parser used and developed by the bridge. team. This library has full support for all of Minecraft's MoLang features.

## About

> MoLang is a simple expression-based language designed for fast calculation of values at run-time. Its focus is solely to enable script-like capabilities in high-performance systems where JavaScript is not performant at scale. We need scripting capabilities in these low-level systems to support end-user modding capabilities, custom entities, rendering, and animations.

\- From the Minecraft documentation

## Installation

-   `npm i molang`

    **or**

-   Download the `dist/main.web.js` file and add the script to your HTML page (library access via global `MoLang` object).

## Basic Usage

To execute a basic MoLang statement, first construct a new instance of the `MoLang` class. The first constructor argument is the environment your MoLang script will have access to and the second argument configures the MoLang interpreter. Take a look at the `IParserConfig` interface [for a list of all available options](https://github.com/bridge-core/MoLang/blob/master/lib/main.ts).

`molang.execute(...)` simple executes a MoLang script and returns the value it evaluates to.

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
			query: { test: 2 },
		}),
	},
})

molang.execute('query.test') // Returns 1
molang.execute('context.other->query.test') // Returns 2
```

## Using Custom MoLang Functions

Custom MoLang functions were designed to support `.molang` files within bridge.

```javascript
import { CustomMoLang } from 'molang'

const customMoLang = new CustomMoLang({})

const moLangFunctions = ... // Somehow load MoLang input that defines custom functions

// Make custom functions known to MoLang parser
customMoLang.parse(moLangFunctions)

const moLangSource = ... // Somehow load MoLang source from JSON files

const transformedSource = customMoLang.parse(moLangSource)
... // Write the transformed source string back to the JSON file or do further processing
```

A custom MoLang function is defined like this:

```javascript
function('sq', 'base', {
	return math.pow(a.base, 2);
});

function('pow', 'base', 'exp', {
	return a.exp == 0 ? 1 : a.base * f.pow(a.base, a.exp - 1);
});
```

-   The first argument always defines the function name
-   All following arguments except the last one define input arguments
-   The last argument is the function body
-   Temporary variables get scoped to the current function body automatically
-   Basic recursion is supported as long as the interpreter can stop the recursive calls at compile-time
-   To call a function inside of MoLang scripts, simply do `f.sq(2)` or `f.pow(3, 2)`

## Using AST Scripts

You can write abitrary scripts to tarverse the abstract syntax tree this library builds.

```javascript
import { MoLang, expressions } from 'molang'

const moLang = new MoLang()

let ast = moLang.parse(`context.other->query.something + 1`)
const { NumberExpression } = expressions

// This increments all numbers within a MoLang script
ast = ast.walk((expr) => {
	if (expr instanceof NumberExpression)
		return new NumberExpression(expr.eval() + 1)
})

const output = ast.toString() // 'context.other->query.something+2'
```

## Performance

**Disclaimer:** Both bridge.'s MoLang library and Blockbench's library are usually fast enough. However, bridge.'s MoLang interpreter shines when it comes to executing a wide variety of different scripts (ineffective cache) where it is up to 10x faster interpreting a vanilla MoLang script.

### Vanilla Script

The following script gets executed 100,000 times for the first test:

`variable.hand_bob = query.life_time < 0.01 ? 0.0 : variable.hand_bob + ((query.is_on_ground && query.is_alive ? math.clamp(math.sqrt(math.pow(query.position_delta(0), 2.0) + math.pow(query.position_delta(2), 2.0)), 0.0, 0.1) : 0.0) - variable.hand_bob) * 0.02;`

### MoLang

Used by bridge.

| Test                       | Average Time |
| -------------------------- | ------------ |
| Parse & Execute (uncached) | 1253.332ms   |
| Parse & Execute (cached)   | 90.036ms     |

### MoLangJS

Used by Blockbench & Snowstorm
| Test | Average Time |
| -------------------------- | ------------ |
| Parse & Execute (uncached) | 11872ms |
| Parse & Execute (cached) | 185.299ms |

### Early Return

The same script as above, except that we now insert a "return 1;" in front of it. bridge.'s interpreter is smart enough to figure out that the whole expression is static after it parsed `return 1;`. These kinds of optimizations can be found throughout our library.

### MoLang

Used by bridge.

| Test                       | Average Time |
| -------------------------- | ------------ |
| Parse & Execute (uncached) | 103.61ms     |
| Parse & Execute (cached)   | 8.835ms      |

### MoLangJS

Used by Blockbench & Snowstorm
| Test | Average Time |
| -------------------------- | ------------ |
| Parse & Execute (uncached) | 13230.682ms |
| Parse & Execute (cached) | 147,786ms |

## MoLang Playground

We have built a very basic MoLang playground with this interpreter. You can use it at [bridge-core.github.io/molang-playground](https://bridge-core.github.io/molang-playground).
