# MoLang
> "MoLang is a simple expression-based language designed for fast calculation of values at run-time. Its focus is solely to enable script-like capabilities in high-performance systems where JavaScript is not performant at scale. We need scripting capabilities in these low-level systems to support end-user modding capabilities, custom entities, rendering, and animation."

\- From the Minecraft documentation

This library is a MoLang parser for JavaScript/TypeScript applications.

## Installation
```npm i molang```

## Usage
```javascript
import MoLang from "molang";

const interpreter = new MoLang.Interpreter({
  query: {
    x: 1,
    get(slot) {
      return slot * 2;
    }
  }
});

interpreter.parse("query.x + query.get(3) == 7");
```
