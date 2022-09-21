var oe = Object.defineProperty;
var ae = (r, e, t) => e in r ? oe(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var o = (r, e, t) => (ae(r, typeof e != "symbol" ? e + "" : e, t), t);
const he = {
  "!": "BANG",
  "&": "AND",
  "(": "LEFT_PARENT",
  ")": "RIGHT_PARENT",
  "*": "ASTERISK",
  "+": "PLUS",
  ",": "COMMA",
  "-": "MINUS",
  "/": "SLASH",
  ":": "COLON",
  ";": "SEMICOLON",
  "<": "SMALLER",
  "=": "EQUALS",
  ">": "GREATER",
  "?": "QUESTION",
  "[": "ARRAY_LEFT",
  "]": "ARRAY_RIGHT",
  "{": "CURLY_LEFT",
  "|": "OR",
  "}": "CURLY_RIGHT"
}, H = /* @__PURE__ */ new Set([
  "return",
  "continue",
  "break",
  "for_each",
  "loop",
  "false",
  "true"
]);
class N {
  constructor(e, t, s, n) {
    this.type = e, this.text = t, this.startColumn = s, this.startLine = n;
  }
  getType() {
    return this.type;
  }
  getText() {
    return this.text;
  }
  getPosition() {
    return {
      startColumn: this.startColumn,
      startLineNumber: this.startLine,
      endColumn: this.startColumn + this.text.length,
      endLineNumber: this.startLine
    };
  }
}
class D {
  constructor(e) {
    o(this, "keywordTokens");
    o(this, "i", 0);
    o(this, "currentColumn", 0);
    o(this, "currentLine", 0);
    o(this, "lastColumns", 0);
    o(this, "expression");
    e ? this.keywordTokens = /* @__PURE__ */ new Set([...H, ...e]) : this.keywordTokens = H;
  }
  init(e) {
    this.currentLine = 0, this.currentColumn = 0, this.lastColumns = 0, this.i = 0, this.expression = e;
  }
  next() {
    for (this.currentColumn = this.i - this.lastColumns; this.i < this.expression.length && (this.expression[this.i] === " " || this.expression[this.i] === "	" || this.expression[this.i] === `
`); )
      this.expression[this.i] === `
` && (this.currentLine++, this.currentColumn = 0, this.lastColumns = this.i + 1), this.i++;
    if (this.expression[this.i] === "#") {
      const t = this.expression.indexOf(`
`, this.i + 1);
      return this.i = t === -1 ? this.expression.length : t, this.currentLine++, this.lastColumns = this.i + 1, this.currentColumn = 0, this.next();
    }
    let e = he[this.expression[this.i]];
    if (e)
      return new N(
        e,
        this.expression[this.i++],
        this.currentColumn,
        this.currentLine
      );
    if (this.isLetter(this.expression[this.i]) || this.expression[this.i] === "_") {
      let t = this.i + 1;
      for (; t < this.expression.length && (this.isLetter(this.expression[t]) || this.isNumber(this.expression[t]) || this.expression[t] === "_" || this.expression[t] === "."); )
        t++;
      const s = this.expression.substring(this.i, t).toLowerCase();
      return this.i = t, new N(
        this.keywordTokens.has(s) ? s.toUpperCase() : "NAME",
        s,
        this.currentColumn,
        this.currentLine
      );
    } else if (this.isNumber(this.expression[this.i]) || this.expression[this.i] === ".") {
      let t = this.i + 1, s = this.expression[this.i] === ".";
      for (; t < this.expression.length && (this.isNumber(this.expression[t]) || this.expression[t] === "." && !s); )
        this.expression[t] === "." && (s = !0), t++;
      const n = new N(
        "NUMBER",
        this.expression.substring(this.i, t),
        this.currentColumn,
        this.currentLine
      ), i = s && this.expression[t] === "f";
      return this.i = i ? t + 1 : t, n;
    } else if (this.expression[this.i] === "'") {
      let t = this.i + 1;
      for (; t < this.expression.length && this.expression[t] !== "'"; )
        t++;
      t++;
      const s = new N(
        "STRING",
        this.expression.substring(this.i, t),
        this.currentColumn,
        this.currentLine
      );
      return this.i = t, s;
    }
    return this.hasNext() ? (this.i++, this.next()) : new N("EOF", "", this.currentColumn, this.currentLine);
  }
  hasNext() {
    return this.i < this.expression.length;
  }
  isLetter(e) {
    return e >= "a" && e <= "z" || e >= "A" && e <= "Z";
  }
  isNumber(e) {
    return e >= "0" && e <= "9";
  }
}
const ue = (r, e, t) => typeof r != "number" || Number.isNaN(r) ? e : r > t ? t : r < e ? e : r, ce = (r, e, t) => {
  let s = 0, n = 0;
  for (; s < r; )
    n += V(e, t);
  return n;
}, le = (r, e, t) => {
  let s = 0, n = 0;
  for (; s < r; )
    n += j(e, t);
  return n;
}, pe = (r) => 3 * r ** 2 - 2 * r ** 3, fe = (r, e, t) => (t < 0 ? t = 0 : t > 1 && (t = 1), r + (e - r) * t), xe = (r, e, t) => {
  const s = (n) => ((n + 180) % 360 + 180) % 360;
  if (r = s(r), e = s(e), r > e) {
    let n = r;
    r = e, e = n;
  }
  return e - r > 180 ? s(e + t * (360 - (e - r))) : r + t * (e - r);
}, Ee = (r, e) => r % e, V = (r, e) => r + Math.random() * (e - r), j = (r, e) => Math.round(r + Math.random() * (e - r)), ge = (r) => (r = r % 360, r = (r + 360) % 360, r > 179 && (r -= 360), r), me = (r) => {
  const e = r ? 1 : Math.PI / 180;
  return {
    "math.abs": Math.abs,
    "math.acos": (t) => Math.acos(t) / e,
    "math.asin": (t) => Math.asin(t) / e,
    "math.atan": (t) => Math.atan(t) / e,
    "math.atan2": (t, s) => Math.atan2(t, s) / e,
    "math.ceil": Math.ceil,
    "math.clamp": ue,
    "math.cos": (t) => Math.cos(t * e),
    "math.die_roll": ce,
    "math.die_roll_integer": le,
    "math.exp": Math.exp,
    "math.floor": Math.floor,
    "math.hermite_blend": pe,
    "math.lerp": fe,
    "math.lerp_rotate": xe,
    "math.ln": Math.log,
    "math.max": Math.max,
    "math.min": Math.min,
    "math.min_angle": ge,
    "math.mod": Ee,
    "math.pi": Math.PI,
    "math.pow": Math.pow,
    "math.random": V,
    "math.random_integer": j,
    "math.round": Math.round,
    "math.sin": (t) => Math.sin(t * e),
    "math.sqrt": Math.sqrt,
    "math.trunc": Math.trunc
  };
}, we = (r, e, t) => typeof r != "number" || typeof e != "number" || typeof t != "number" ? (console.error('"query.in_range": value, min and max must be numbers'), !1) : r >= e && r <= t, Se = (r, ...e) => e.every((t) => t === r), ve = (r, ...e) => e.some((t) => t === r), Re = (r) => Array.isArray(r) ? r.length : 1, de = {
  "query.in_range": we,
  "query.all": Se,
  "query.any": ve,
  "query.count": Re
}, q = (r) => ({
  ...me(r),
  ...de
});
class I {
  constructor(e, t) {
    o(this, "env");
    var s;
    if (this.config = t, !e)
      throw new Error("Provided environment must be an object");
    this.env = {
      ...q((s = t.useRadians) != null ? s : !1),
      "query.self": () => this.env,
      ...t.isFlat ? e : this.flattenEnv(e)
    };
  }
  updateConfig({
    variableHandler: e,
    convertUndefined: t,
    useRadians: s
  }) {
    t !== void 0 && (this.config.convertUndefined = t), typeof e == "function" && (this.config.variableHandler = e), !!this.config.useRadians != !!s && (this.env = Object.assign(this.env, q(!!s)));
  }
  get() {
    return this.env;
  }
  flattenEnv(e, t = "", s = {}) {
    var n;
    for (let i in e) {
      let a = i;
      if (i[1] === ".")
        switch (i[0]) {
          case "q":
            a = "query" + i.substring(1, i.length);
            break;
          case "t":
            a = "temp" + i.substring(1, i.length);
            break;
          case "v":
            a = "variable" + i.substring(1, i.length);
            break;
          case "c":
            a = "context" + i.substring(1, i.length);
            break;
          case "f":
            a = "function" + i.substring(1, i.length);
            break;
        }
      (n = e[i]) != null && n.__isContext ? s[`${t}${a}`] = e[i].env : typeof e[i] == "object" && !Array.isArray(e[i]) ? this.flattenEnv(e[i], `${t}${i}.`, s) : s[`${t}${a}`] = e[i];
    }
    return s;
  }
  setAt(e, t) {
    if (e[1] === ".")
      switch (e[0]) {
        case "q":
          e = "query" + e.substring(1, e.length);
          break;
        case "t":
          e = "temp" + e.substring(1, e.length);
          break;
        case "v":
          e = "variable" + e.substring(1, e.length);
          break;
        case "c":
          e = "context" + e.substring(1, e.length);
          break;
        case "f":
          e = "function" + e.substring(1, e.length);
          break;
      }
    return this.env[e] = t;
  }
  getFrom(e) {
    var s, n, i;
    if (e[1] === ".")
      switch (e[0]) {
        case "q":
          e = "query" + e.substring(1, e.length);
          break;
        case "t":
          e = "temp" + e.substring(1, e.length);
          break;
        case "v":
          e = "variable" + e.substring(1, e.length);
          break;
        case "c":
          e = "context" + e.substring(1, e.length);
          break;
        case "f":
          e = "function" + e.substring(1, e.length);
          break;
      }
    const t = (i = this.env[e]) != null ? i : (n = (s = this.config).variableHandler) == null ? void 0 : n.call(s, e, this.env);
    return t === void 0 && this.config.convertUndefined ? 0 : t;
  }
}
class at {
  constructor(e) {
    o(this, "__isContext", !0);
    this.env = e;
  }
}
class u {
  toString() {
    return `${this.eval()}`;
  }
  walk(e, t = /* @__PURE__ */ new Set()) {
    var n;
    let s = (n = e(this)) != null ? n : this;
    return s.iterate(e, t), s;
  }
  iterate(e, t) {
    var s;
    for (let n = 0; n < this.allExpressions.length; n++) {
      const i = this.allExpressions[n];
      if (t.has(i))
        continue;
      t.add(i);
      const a = (s = e(i)) != null ? s : i;
      a !== i && t.has(a) || (t.add(a), this.setExpressionAt(n, a), a.iterate(e, t));
    }
  }
  some(e) {
    return this.allExpressions.some(
      (t) => e(t) || t.some(e)
    );
  }
}
class d extends u {
  constructor() {
    super(...arguments);
    o(this, "type", "VoidExpression");
  }
  get allExpressions() {
    return [];
  }
  setExpressionAt() {
  }
  isStatic() {
    return !0;
  }
  eval() {
    return 0;
  }
  toString() {
    return "";
  }
}
class ye {
  constructor(e) {
    o(this, "prefixParselets", /* @__PURE__ */ new Map());
    o(this, "infixParselets", /* @__PURE__ */ new Map());
    o(this, "readTokens", []);
    o(this, "tokenIterator", new D());
    o(this, "executionEnv");
    this.config = e;
  }
  updateConfig(e) {
    this.config = e;
  }
  init(e) {
    this.tokenIterator.init(e), this.readTokens = [];
  }
  setTokenizer(e) {
    this.tokenIterator = e;
  }
  setExecutionEnvironment(e) {
    this.executionEnv = e;
  }
  parseExpression(e = 0) {
    let t = this.consume();
    if (t.getType() === "EOF")
      return new d();
    const s = this.prefixParselets.get(t.getType());
    if (!s)
      throw new Error(
        `Cannot parse ${t.getType()} expression "${t.getType()}"`
      );
    let n = s.parse(this, t);
    return this.parseInfixExpression(n, e);
  }
  parseInfixExpression(e, t = 0) {
    let s;
    for (; this.getPrecedence() > t; ) {
      s = this.consume();
      let n = s.getType();
      n === "EQUALS" && !this.match("EQUALS") && (n = "ASSIGN");
      const i = this.infixParselets.get(n);
      if (!i)
        throw new Error(`Unknown infix parselet: "${n}"`);
      e = i.parse(this, e, s);
    }
    return e;
  }
  getPrecedence() {
    var t;
    const e = this.infixParselets.get(this.lookAhead(0).getType());
    return (t = e == null ? void 0 : e.precedence) != null ? t : 0;
  }
  consume(e) {
    const t = this.lookAhead(0);
    if (e && t.getType() !== e)
      throw new Error(
        `Expected token "${e}" and found "${t.getType()}"`
      );
    return this.readTokens.shift(), t;
  }
  match(e, t = !0) {
    return this.lookAhead(0).getType() !== e ? !1 : (t && this.consume(), !0);
  }
  lookAhead(e) {
    for (; e >= this.readTokens.length; )
      this.readTokens.push(this.tokenIterator.next());
    return this.readTokens[e];
  }
  registerInfix(e, t) {
    this.infixParselets.set(e, t);
  }
  registerPrefix(e, t) {
    this.prefixParselets.set(e, t);
  }
  getInfix(e) {
    return this.infixParselets.get(e);
  }
  getPrefix(e) {
    return this.prefixParselets.get(e);
  }
}
class c extends u {
  constructor(t, s, n, i) {
    super();
    o(this, "type", "GenericOperatorExpression");
    this.left = t, this.right = s, this.operator = n, this.evalHelper = i;
  }
  get allExpressions() {
    return [this.left, this.right];
  }
  setExpressionAt(t, s) {
    t === 0 ? this.left = s : t === 1 && (this.right = s);
  }
  isStatic() {
    return this.left.isStatic() && this.right.isStatic();
  }
  eval() {
    return this.evalHelper(this.left, this.right);
  }
  toString() {
    return `${this.left.toString()}${this.operator}${this.right.toString()}`;
  }
}
const Te = (r, e) => {
  const t = r.eval(), s = e.eval();
  if (!(typeof t == "number" || typeof t == "boolean") || !(typeof s == "number" || typeof s == "boolean"))
    throw new Error(
      `Cannot use numeric operators for expression "${t} + ${s}"`
    );
  return t + s;
}, Ae = (r, e) => {
  const t = r.eval(), s = e.eval();
  if (!(typeof t == "number" || typeof t == "boolean") || !(typeof s == "number" || typeof s == "boolean"))
    throw new Error(
      `Cannot use numeric operators for expression "${t} - ${s}"`
    );
  return t - s;
}, Ce = (r, e) => {
  const t = r.eval(), s = e.eval();
  if (!(typeof t == "number" || typeof t == "boolean") || !(typeof s == "number" || typeof s == "boolean"))
    throw new Error(
      `Cannot use numeric operators for expression "${t} / ${s}"`
    );
  return t / s;
}, Ne = (r, e) => {
  const t = r.eval(), s = e.eval();
  if (!(typeof t == "number" || typeof t == "boolean") || !(typeof s == "number" || typeof s == "boolean"))
    throw new Error(
      `Cannot use numeric operators for expression "${t} * ${s}"`
    );
  return t * s;
}, ke = (r, e) => {
  if (r.setPointer)
    return r.setPointer(e.eval()), 0;
  throw Error(`Cannot assign to ${r.type}`);
};
class k {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t, s) {
    const n = e.parseExpression(this.precedence), i = s.getText();
    switch (i) {
      case "+":
        return new c(
          t,
          n,
          i,
          Te
        );
      case "-":
        return new c(
          t,
          n,
          i,
          Ae
        );
      case "*":
        return new c(
          t,
          n,
          i,
          Ne
        );
      case "/":
        return new c(
          t,
          n,
          i,
          Ce
        );
      case "=":
        return new c(
          t,
          n,
          "=",
          ke
        );
      default:
        throw new Error("Operator not implemented");
    }
  }
}
var h = /* @__PURE__ */ ((r) => (r[r.SCOPE = 1] = "SCOPE", r[r.STATEMENT = 2] = "STATEMENT", r[r.ASSIGNMENT = 3] = "ASSIGNMENT", r[r.CONDITIONAL = 4] = "CONDITIONAL", r[r.ARRAY_ACCESS = 5] = "ARRAY_ACCESS", r[r.NULLISH_COALESCING = 6] = "NULLISH_COALESCING", r[r.AND = 7] = "AND", r[r.OR = 8] = "OR", r[r.EQUALS_COMPARE = 9] = "EQUALS_COMPARE", r[r.COMPARE = 10] = "COMPARE", r[r.SUM = 11] = "SUM", r[r.PRODUCT = 12] = "PRODUCT", r[r.EXPONENT = 13] = "EXPONENT", r[r.PREFIX = 14] = "PREFIX", r[r.POSTFIX = 15] = "POSTFIX", r[r.FUNCTION = 16] = "FUNCTION", r))(h || {});
class X extends u {
  constructor(t, s) {
    super();
    o(this, "type", "PrefixExpression");
    this.tokenType = t, this.expression = s;
  }
  get allExpressions() {
    return [this.expression];
  }
  setExpressionAt(t, s) {
    this.expression = s;
  }
  isStatic() {
    return this.expression.isStatic();
  }
  eval() {
    const t = this.expression.eval();
    if (typeof t != "number")
      throw new Error(
        `Cannot use "${this.tokenType}" operator in front of ${typeof t} "${t}"`
      );
    switch (this.tokenType) {
      case "MINUS":
        return -t;
      case "BANG":
        return !t;
    }
  }
  toString() {
    switch (this.tokenType) {
      case "MINUS":
        return `-${this.expression.toString()}`;
      case "BANG":
        return `!${this.expression.toString()}`;
    }
    throw new Error(`Unknown prefix operator: "${this.tokenType}"`);
  }
}
class Q {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t) {
    return new X(
      t.getType(),
      e.parseExpression(this.precedence)
    );
  }
}
class L extends u {
  constructor(t) {
    super();
    o(this, "type", "NumberExpression");
    this.value = t;
  }
  get allExpressions() {
    return [];
  }
  setExpressionAt() {
  }
  isStatic() {
    return !0;
  }
  eval() {
    return this.value;
  }
  toString() {
    const t = "" + this.value;
    return t.startsWith("0.") ? t.slice(1) : t;
  }
}
class be {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t) {
    return new L(Number(t.getText()));
  }
}
class v extends u {
  constructor(t, s, n = !1) {
    super();
    o(this, "type", "NameExpression");
    this.executionEnv = t, this.name = s, this.isFunctionCall = n;
  }
  get allExpressions() {
    return [];
  }
  setExpressionAt() {
  }
  isStatic() {
    return !1;
  }
  setPointer(t) {
    this.executionEnv.setAt(this.name, t);
  }
  setFunctionCall(t = !0) {
    this.isFunctionCall = t;
  }
  setName(t) {
    this.name = t;
  }
  setExecutionEnv(t) {
    this.executionEnv = t;
  }
  eval() {
    const t = this.executionEnv.getFrom(this.name);
    return !this.isFunctionCall && typeof t == "function" ? t() : t;
  }
  toString() {
    return this.name;
  }
}
class Oe extends u {
  constructor(t, s) {
    super();
    o(this, "type", "NameExpression");
    this.leftExpr = t, this.rightExpr = s;
  }
  get allExpressions() {
    return [this.leftExpr, this.rightExpr];
  }
  setExpressionAt(t, s) {
    if (!(s instanceof v))
      throw new Error(
        `Cannot use context switch operator "->" on ${s.type}`
      );
    t === 0 ? this.leftExpr = s : t === 1 && (this.rightExpr = s);
  }
  isStatic() {
    return !1;
  }
  eval() {
    const t = this.leftExpr.eval();
    return typeof t != "object" ? 0 : (this.rightExpr.setExecutionEnv(
      new I(
        t,
        this.rightExpr.executionEnv.config
      )
    ), this.rightExpr.eval());
  }
  toString() {
    return `${this.leftExpr.toString()}->${this.rightExpr.toString()}`;
  }
}
class Ie {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t) {
    const s = new v(
      e.executionEnv,
      t.getText()
    ), n = [e.lookAhead(0), e.lookAhead(1)];
    if (n[0].getType() === "MINUS" && n[1].getType() === "GREATER") {
      e.consume("MINUS"), e.consume("GREATER");
      const i = e.parseExpression(h.FUNCTION - 1);
      if (i.type !== "NameExpression" && i.type !== "FunctionExpression")
        throw new Error(
          `Cannot use context switch operator "->" on ${i.type}`
        );
      return new Oe(
        s,
        i
      );
    }
    return s;
  }
}
class g extends u {
  constructor(t, s) {
    super();
    o(this, "type", "GroupExpression");
    this.expression = t, this.brackets = s;
  }
  get allExpressions() {
    return [this.expression];
  }
  setExpressionAt(t, s) {
    this.expression = s;
  }
  isStatic() {
    return this.expression.isStatic();
  }
  get isReturn() {
    return this.expression.isReturn;
  }
  get isBreak() {
    return this.expression.isBreak;
  }
  get isContinue() {
    return this.expression.isContinue;
  }
  eval() {
    return this.expression.eval();
  }
  toString() {
    return `${this.brackets[0]}${this.expression.toString()}${this.brackets[1]}`;
  }
}
class Le {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t) {
    const s = e.parseExpression(this.precedence);
    return e.consume("RIGHT_PARENT"), e.config.keepGroups ? new g(s, "()") : s;
  }
}
class w extends u {
  constructor(t) {
    super();
    o(this, "type", "ReturnExpression");
    o(this, "isReturn", !0);
    this.expression = t;
  }
  get allExpressions() {
    return [this.expression];
  }
  setExpressionAt(t, s) {
    this.expression = s;
  }
  isStatic() {
    return !1;
  }
  eval() {
    return this.expression.eval();
  }
  toString() {
    return `return ${this.expression.toString()}`;
  }
}
class Pe {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t) {
    const s = e.parseExpression(h.STATEMENT + 1);
    return new w(
      e.match("SEMICOLON", !1) ? s : new L(0)
    );
  }
}
class S extends u {
  constructor(t, s = !1) {
    super();
    o(this, "type", "StaticExpression");
    this.value = t, this.isReturn = s;
  }
  get allExpressions() {
    return [];
  }
  setExpressionAt() {
  }
  isStatic() {
    return !0;
  }
  eval() {
    return this.value;
  }
  toString() {
    let t = this.value;
    return typeof t == "string" && (t = `'${t}'`), this.isReturn ? `return ${t}` : "" + t;
  }
}
class x extends u {
  constructor(t) {
    super();
    o(this, "type", "StatementExpression");
    o(this, "didReturn");
    o(this, "wasLoopBroken", !1);
    o(this, "wasLoopContinued", !1);
    this.expressions = t;
  }
  get allExpressions() {
    return this.expressions;
  }
  setExpressionAt(t, s) {
    this.expressions[t] = s;
  }
  get isReturn() {
    if (this.didReturn !== void 0)
      return this.didReturn;
    let t = 0;
    for (; t < this.expressions.length; ) {
      const s = this.expressions[t];
      if (s.isBreak || s.isContinue)
        return !1;
      if (s.isReturn)
        return this.didReturn = !0, !0;
      t++;
    }
    return this.didReturn = !1, !1;
  }
  get isBreak() {
    return this.wasLoopBroken ? (this.wasLoopBroken = !1, !0) : !1;
  }
  get isContinue() {
    return this.wasLoopContinued ? (this.wasLoopContinued = !1, !0) : !1;
  }
  isStatic() {
    let t = 0;
    for (; t < this.expressions.length; ) {
      if (!this.expressions[t].isStatic())
        return !1;
      t++;
    }
    return !0;
  }
  eval() {
    this.didReturn = !1, this.wasLoopBroken = !1, this.wasLoopContinued = !1;
    let t = 0;
    for (; t < this.expressions.length; ) {
      let s = this.expressions[t].eval();
      if (this.expressions[t].isReturn)
        return this.didReturn = !0, s;
      if (this.expressions[t].isContinue) {
        this.wasLoopContinued = !0;
        return;
      } else if (this.expressions[t].isBreak) {
        this.wasLoopBroken = !0;
        return;
      }
      t++;
    }
    return 0;
  }
  toString() {
    let t = "";
    for (const s of this.expressions) {
      if (s instanceof d || s instanceof S && !s.isReturn)
        continue;
      const n = s.toString();
      n && (t += `${n};`);
    }
    return t;
  }
}
class Me {
  constructor(e = 0) {
    this.precedence = e;
  }
  findReEntryPoint(e) {
    let t = 1, s = e.lookAhead(0).getType();
    for (; s !== "EOF" && (s == "CURLY_RIGHT" ? t-- : s === "CURLY_LEFT" && t++, t !== 0); )
      e.consume(), s = e.lookAhead(0).getType();
  }
  parse(e, t, s) {
    if (e.config.useOptimizer && (t.isStatic() && (t = new S(t.eval(), t.isReturn)), e.config.earlyReturnsSkipParsing && t.isReturn))
      return e.config.earlyReturnsSkipTokenization || this.findReEntryPoint(e), new x([t]);
    const n = [t];
    if (!e.match("CURLY_RIGHT", !1))
      do {
        let a = e.parseExpression(this.precedence);
        if (e.config.useOptimizer) {
          if (a.isStatic()) {
            if (e.config.useAgressiveStaticOptimizer && !a.isReturn)
              continue;
            a = new S(a.eval(), a.isReturn);
          }
          if (e.config.earlyReturnsSkipParsing && (a.isBreak || a.isContinue || a.isReturn))
            return n.push(a), e.config.earlyReturnsSkipTokenization || this.findReEntryPoint(e), new x(n);
        }
        n.push(a);
      } while (e.match("SEMICOLON") && !e.match("EOF") && !e.match("CURLY_RIGHT", !1));
    return e.match("SEMICOLON"), new x(n);
  }
}
class O extends u {
  constructor(t) {
    super();
    o(this, "type", "StringExpression");
    this.name = t;
  }
  get allExpressions() {
    return [];
  }
  setExpressionAt() {
  }
  isStatic() {
    return !0;
  }
  eval() {
    return this.name.substring(1, this.name.length - 1);
  }
  toString() {
    return this.name;
  }
}
class $e {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t) {
    return new O(t.getText());
  }
}
class W extends u {
  constructor(t, s) {
    super();
    o(this, "type", "FunctionExpression");
    this.name = t, this.args = s;
  }
  get allExpressions() {
    return [this.name, ...this.args];
  }
  setExpressionAt(t, s) {
    t === 0 ? this.name = s : t > 0 && (this.args[t - 1] = s);
  }
  setExecutionEnv(t) {
    this.name.setExecutionEnv(t);
  }
  get executionEnv() {
    return this.name.executionEnv;
  }
  isStatic() {
    return !1;
  }
  eval() {
    const t = [];
    let s = 0;
    for (; s < this.args.length; )
      t.push(this.args[s++].eval());
    const n = this.name.eval();
    if (typeof n != "function")
      throw new Error(
        `${this.name.toString()} is not callable!`
      );
    return n(...t);
  }
  toString() {
    let t = `${this.name.toString()}(`;
    for (let s = 0; s < this.args.length; s++)
      t += `${this.args[s].toString()}${s + 1 < this.args.length ? "," : ""}`;
    return `${t})`;
  }
}
class _e {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t, s) {
    const n = [];
    if (!t.setFunctionCall)
      throw new Error(`${t.type} is not callable!`);
    if (t.setFunctionCall(!0), !e.match("RIGHT_PARENT")) {
      do
        n.push(e.parseExpression());
      while (e.match("COMMA"));
      e.consume("RIGHT_PARENT");
    }
    return new W(t, n);
  }
}
class K extends u {
  constructor(t, s) {
    super();
    o(this, "type", "ArrayAccessExpression");
    this.name = t, this.lookup = s;
  }
  get allExpressions() {
    return [this.name, this.lookup];
  }
  setExpressionAt(t, s) {
    t === 0 ? this.name = s : t === 1 && (this.lookup = s);
  }
  isStatic() {
    return !1;
  }
  setPointer(t) {
    this.name.eval()[this.lookup.eval()] = t;
  }
  eval() {
    return this.name.eval()[this.lookup.eval()];
  }
  toString() {
    return `${this.name.toString()}[${this.lookup.toString()}]`;
  }
}
class Ue {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t, s) {
    const n = e.parseExpression(this.precedence - 1);
    if (!t.setPointer)
      throw new Error(`"${t.type}" is not an array`);
    if (!e.match("ARRAY_RIGHT"))
      throw new Error(
        `No closing bracket for opening bracket "[${n.eval()}"`
      );
    return new K(t, n);
  }
}
class Fe {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t) {
    let s = e.parseExpression(this.precedence);
    return e.config.useOptimizer && e.config.earlyReturnsSkipTokenization && s.isReturn ? e.match("CURLY_RIGHT") : e.consume("CURLY_RIGHT"), e.config.keepGroups ? new g(s, "{}") : s;
  }
}
class Z extends u {
  constructor(t, s) {
    super();
    o(this, "type", "LoopExpression");
    this.count = t, this.expression = s;
  }
  get allExpressions() {
    return [this.count, this.expression];
  }
  get isNoopLoop() {
    return this.count.isStatic() && this.count.eval() === 0;
  }
  setExpressionAt(t, s) {
    t === 0 ? this.count = s : t === 1 && (this.expression = s);
  }
  get isReturn() {
    return this.isNoopLoop ? !1 : this.expression.isReturn;
  }
  isStatic() {
    return this.count.isStatic() && this.expression.isStatic();
  }
  eval() {
    const t = Number(this.count.eval());
    if (t === 0)
      return 0;
    if (Number.isNaN(t))
      throw new Error(
        `First loop() argument must be of type number, received "${typeof this.count.eval()}"`
      );
    if (t > 1024)
      throw new Error(
        `Cannot loop more than 1024x times, received "${t}"`
      );
    let s = 0;
    for (; s < t; ) {
      s++;
      const n = this.expression.eval();
      if (this.expression.isBreak)
        break;
      if (this.expression.isContinue)
        continue;
      if (this.expression.isReturn)
        return n;
    }
    return 0;
  }
  toString() {
    return this.isNoopLoop ? "" : `loop(${this.count.toString()},${this.expression.toString()})`;
  }
}
class Ge {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t) {
    e.consume("LEFT_PARENT");
    const s = [];
    if (e.match("RIGHT_PARENT"))
      throw new Error("loop() called without arguments");
    do
      s.push(e.parseExpression());
    while (e.match("COMMA"));
    if (e.consume("RIGHT_PARENT"), s.length !== 2)
      throw new Error(
        `There must be exactly two loop() arguments; found ${s.length}`
      );
    return new Z(s[0], s[1]);
  }
}
class J extends u {
  constructor(t, s, n) {
    super();
    o(this, "type", "ForEachExpression");
    if (this.variable = t, this.arrayExpression = s, this.expression = n, !this.variable.setPointer)
      throw new Error(
        `First for_each() argument must be a variable, received "${typeof this.variable.eval()}"`
      );
  }
  get isReturn() {
    return this.expression.isReturn;
  }
  get allExpressions() {
    return [this.variable, this.arrayExpression, this.expression];
  }
  setExpressionAt(t, s) {
    t === 0 ? this.variable = s : t === 1 ? this.arrayExpression = s : t === 2 && (this.expression = s);
  }
  isStatic() {
    return this.variable.isStatic() && this.arrayExpression.isStatic() && this.expression.isStatic();
  }
  eval() {
    var n, i;
    const t = this.arrayExpression.eval();
    if (!Array.isArray(t))
      throw new Error(
        `Second for_each() argument must be an array, received "${typeof t}"`
      );
    let s = 0;
    for (; s < t.length; ) {
      (i = (n = this.variable).setPointer) == null || i.call(n, t[s++]);
      const a = this.expression.eval();
      if (this.expression.isBreak)
        break;
      if (this.expression.isContinue)
        continue;
      if (this.expression.isReturn)
        return a;
    }
    return 0;
  }
  toString() {
    return `for_each(${this.variable.toString()},${this.arrayExpression.toString()},${this.expression.toString()})`;
  }
}
class Be {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t) {
    e.consume("LEFT_PARENT");
    const s = [];
    if (e.match("RIGHT_PARENT"))
      throw new Error("for_each() called without arguments");
    do
      s.push(e.parseExpression());
    while (e.match("COMMA"));
    if (e.consume("RIGHT_PARENT"), s.length !== 3)
      throw new Error(
        `There must be exactly three for_each() arguments; found ${s.length}`
      );
    return new J(s[0], s[1], s[2]);
  }
}
class ee extends u {
  constructor() {
    super();
    o(this, "type", "ContinueExpression");
    o(this, "isContinue", !0);
  }
  get allExpressions() {
    return [];
  }
  setExpressionAt() {
  }
  isStatic() {
    return !1;
  }
  eval() {
    return 0;
  }
  toString() {
    return "continue";
  }
}
class ze {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t) {
    return new ee();
  }
}
class te extends u {
  constructor() {
    super();
    o(this, "type", "BreakExpression");
    o(this, "isBreak", !0);
  }
  get allExpressions() {
    return [];
  }
  setExpressionAt() {
  }
  isStatic() {
    return !1;
  }
  eval() {
    return 0;
  }
  isString() {
    return "break";
  }
}
class He {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t) {
    return new te();
  }
}
class se extends u {
  constructor(t) {
    super();
    o(this, "type", "BooleanExpression");
    this.value = t;
  }
  get allExpressions() {
    return [];
  }
  setExpressionAt() {
  }
  isStatic() {
    return !0;
  }
  eval() {
    return this.value;
  }
}
class Y {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t) {
    return new se(t.getText() === "true");
  }
}
class qe {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t, s) {
    return new c(
      t,
      e.parseExpression(this.precedence),
      "==",
      (n, i) => n.eval() === i.eval()
    );
  }
}
class Qe {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t, s) {
    if (e.match("EQUALS"))
      return new c(
        t,
        e.parseExpression(this.precedence),
        "!=",
        (n, i) => n.eval() !== i.eval()
      );
    throw new Error("! was used as a binary operator");
  }
}
class Ye {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t, s) {
    if (e.match("AND"))
      return new c(
        t,
        e.parseExpression(this.precedence),
        "&&",
        (n, i) => n.eval() && i.eval()
      );
    throw new Error('"&" not followed by another "&"');
  }
}
class De {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t, s) {
    if (e.match("OR"))
      return new c(
        t,
        e.parseExpression(this.precedence),
        "||",
        (n, i) => n.eval() || i.eval()
      );
    throw new Error('"|" not followed by another "|"');
  }
}
class Ve {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t, s) {
    return e.match("EQUALS") ? new c(
      t,
      e.parseExpression(this.precedence),
      "<=",
      (n, i) => n.eval() <= i.eval()
    ) : new c(
      t,
      e.parseExpression(this.precedence),
      "<",
      (n, i) => n.eval() < i.eval()
    );
  }
}
class je {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t, s) {
    return e.match("EQUALS") ? new c(
      t,
      e.parseExpression(this.precedence),
      ">=",
      (n, i) => n.eval() >= i.eval()
    ) : new c(
      t,
      e.parseExpression(this.precedence),
      ">",
      (n, i) => n.eval() > i.eval()
    );
  }
}
class P extends u {
  constructor(t, s, n) {
    super();
    o(this, "type", "TernaryExpression");
    o(this, "leftResult");
    this.leftExpression = t, this.thenExpression = s, this.elseExpression = n;
  }
  get allExpressions() {
    return this.leftExpression.isStatic() ? [
      this.leftExpression,
      this.leftExpression.eval() ? this.thenExpression : this.elseExpression
    ] : [this.leftExpression, this.thenExpression, this.elseExpression];
  }
  setExpressionAt(t, s) {
    t === 0 ? this.leftExpression = s : t === 1 ? this.thenExpression = s : t === 2 && (this.elseExpression = s);
  }
  get isReturn() {
    return this.leftResult === void 0 ? this.thenExpression.isReturn && this.elseExpression.isReturn : this.leftResult ? this.thenExpression.isReturn : this.elseExpression.isReturn;
  }
  get hasReturn() {
    return this.thenExpression.isReturn || this.elseExpression.isReturn;
  }
  get isContinue() {
    return this.leftResult === void 0 ? this.thenExpression.isContinue && this.elseExpression.isContinue : this.leftResult ? this.thenExpression.isContinue : this.elseExpression.isContinue;
  }
  get isBreak() {
    return this.leftResult === void 0 ? this.thenExpression.isBreak && this.elseExpression.isBreak : this.leftResult ? this.thenExpression.isBreak : this.elseExpression.isBreak;
  }
  isStatic() {
    return this.leftExpression.isStatic() && this.thenExpression.isStatic() && this.elseExpression.isStatic();
  }
  eval() {
    return this.leftResult = this.leftExpression.eval(), this.leftResult ? this.thenExpression.eval() : this.elseExpression.eval();
  }
  toString() {
    return this.elseExpression instanceof d ? `${this.leftExpression.toString()}?${this.thenExpression.toString()}` : `${this.leftExpression.toString()}?${this.thenExpression.toString()}:${this.elseExpression.toString()}`;
  }
}
class Xe {
  constructor(e = 0) {
    o(this, "exprName", "Ternary");
    this.precedence = e;
  }
  parse(e, t, s) {
    let n = e.parseExpression(this.precedence - 1), i;
    return e.match("COLON") ? i = e.parseExpression(this.precedence - 1) : i = new d(), e.config.useOptimizer && t.isStatic() ? t.eval() ? n : i : new P(t, n, i);
  }
}
const We = new Xe(h.CONDITIONAL);
class Ke {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t, s) {
    return e.match("QUESTION") ? new c(
      t,
      e.parseExpression(this.precedence),
      "??",
      (n, i) => {
        var a;
        return (a = n.eval()) != null ? a : i.eval();
      }
    ) : We.parse(e, t, s);
  }
}
class re extends ye {
  constructor(e) {
    super(e), this.registerPrefix("NAME", new Ie()), this.registerPrefix("STRING", new $e()), this.registerPrefix("NUMBER", new be()), this.registerPrefix("TRUE", new Y(h.PREFIX)), this.registerPrefix("FALSE", new Y(h.PREFIX)), this.registerPrefix("RETURN", new Pe()), this.registerPrefix("CONTINUE", new ze()), this.registerPrefix("BREAK", new He()), this.registerPrefix("LOOP", new Ge()), this.registerPrefix("FOR_EACH", new Be()), this.registerInfix(
      "QUESTION",
      new Ke(h.CONDITIONAL)
    ), this.registerPrefix("LEFT_PARENT", new Le()), this.registerInfix(
      "LEFT_PARENT",
      new _e(h.FUNCTION)
    ), this.registerInfix(
      "ARRAY_LEFT",
      new Ue(h.ARRAY_ACCESS)
    ), this.registerPrefix("CURLY_LEFT", new Fe(h.SCOPE)), this.registerInfix(
      "SEMICOLON",
      new Me(h.STATEMENT)
    ), this.registerPrefix("MINUS", new Q(h.PREFIX)), this.registerPrefix("BANG", new Q(h.PREFIX)), this.registerInfix("PLUS", new k(h.SUM)), this.registerInfix("MINUS", new k(h.SUM)), this.registerInfix("ASTERISK", new k(h.PRODUCT)), this.registerInfix("SLASH", new k(h.PRODUCT)), this.registerInfix(
      "EQUALS",
      new qe(h.EQUALS_COMPARE)
    ), this.registerInfix(
      "BANG",
      new Qe(h.EQUALS_COMPARE)
    ), this.registerInfix("GREATER", new je(h.COMPARE)), this.registerInfix("SMALLER", new Ve(h.COMPARE)), this.registerInfix("AND", new Ye(h.AND)), this.registerInfix("OR", new De(h.OR)), this.registerInfix("ASSIGN", new k(h.ASSIGNMENT));
  }
}
class Ze {
  constructor(e = 0) {
    this.precedence = e;
  }
  parse(e, t) {
    if (e.consume("LEFT_PARENT"), e.match("RIGHT_PARENT"))
      throw new Error("function() called without arguments");
    let s = [], n, i;
    do {
      const a = e.parseExpression();
      if (a instanceof O)
        i ? s.push(a.eval()) : i = a.eval();
      else if (a instanceof x || a instanceof g)
        n = a;
      else
        throw new Error(
          `Unexpected expresion: found "${a.constructor.name}"`
        );
    } while (e.match("COMMA"));
    if (e.consume("RIGHT_PARENT"), !i)
      throw new Error(
        `Missing function() name (argument 1); found "${i}"`
      );
    if (!n)
      throw new Error(
        `Missing function() body (argument ${s.length + 2})`
      );
    if (e.lookAhead(0).getType() !== "SEMICOLON")
      throw new Error("Missing semicolon after function expression");
    return new Je(
      e.functions,
      i,
      s,
      n
    );
  }
}
class Je extends u {
  constructor(t, s, n, i) {
    super();
    o(this, "type", "CustomFunctionExpression");
    this.functionBody = i, t.set(s.toLowerCase(), [
      n,
      i instanceof g ? i.allExpressions[0].toString() : i.toString()
    ]);
  }
  get allExpressions() {
    return [this.functionBody];
  }
  setExpressionAt(t, s) {
    this.functionBody = s;
  }
  get isReturn() {
    return !1;
  }
  isStatic() {
    return !0;
  }
  eval() {
    return 0;
  }
}
class et extends u {
  constructor(t, s) {
    super();
    o(this, "type", "PostfixExpression");
    this.expression = t, this.tokenType = s;
  }
  get allExpressions() {
    return [this.expression];
  }
  setExpressionAt(t, s) {
    this.expression = s;
  }
  isStatic() {
    return this.expression.isStatic();
  }
  eval() {
    switch (this.tokenType) {
    }
  }
}
const ht = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ArrayAccessExpression: K,
  BooleanExpression: se,
  BreakExpression: te,
  ContinueExpression: ee,
  ForEachExpression: J,
  FunctionExpression: W,
  GenericOperatorExpression: c,
  GroupExpression: g,
  LoopExpression: Z,
  NameExpression: v,
  NumberExpression: L,
  PostfixExpression: et,
  PrefixExpression: X,
  ReturnExpression: w,
  StatementExpression: x,
  StaticExpression: S,
  StringExpression: O,
  TernaryExpression: P,
  VoidExpression: d
}, Symbol.toStringTag, { value: "Module" }));
class tt {
  constructor(e = {}, t = {}) {
    o(this, "expressionCache", {});
    o(this, "totalCacheEntries", 0);
    o(this, "executionEnvironment");
    o(this, "parser");
    this.config = t, t.useOptimizer === void 0 && (this.config.useOptimizer = !0), t.useCache === void 0 && (this.config.useCache = !0), t.earlyReturnsSkipParsing === void 0 && (this.config.earlyReturnsSkipParsing = !0), t.earlyReturnsSkipTokenization === void 0 && (this.config.earlyReturnsSkipTokenization = !0), t.convertUndefined === void 0 && (this.config.convertUndefined = !1), this.parser = new re({
      ...this.config,
      tokenizer: void 0
    }), this.updateExecutionEnv(e, t.assumeFlatEnvironment);
  }
  updateConfig(e) {
    e = Object.assign(this.config, e), e.tokenizer && this.parser.setTokenizer(e.tokenizer), this.parser.updateConfig({ ...this.config, tokenizer: void 0 }), this.executionEnvironment.updateConfig(e);
  }
  updateExecutionEnv(e, t = !1) {
    this.executionEnvironment = new I(e, {
      useRadians: this.config.useRadians,
      convertUndefined: this.config.convertUndefined,
      isFlat: t,
      variableHandler: this.config.variableHandler
    }), this.parser.setExecutionEnvironment(this.executionEnvironment);
  }
  clearCache() {
    this.expressionCache = {}, this.totalCacheEntries = 0;
  }
  execute(e) {
    this.parser.setExecutionEnvironment(this.executionEnvironment);
    const s = this.parse(e).eval();
    return s === void 0 ? 0 : typeof s == "boolean" ? Number(s) : s;
  }
  executeAndCatch(e) {
    try {
      return this.execute(e);
    } catch {
      return 0;
    }
  }
  parse(e) {
    var s, n, i;
    if ((s = this.config.useCache) == null || s) {
      const a = this.expressionCache[e];
      if (a)
        return a;
    }
    this.parser.init(e);
    let t = this.parser.parseExpression();
    return ((n = this.config.useOptimizer) != null ? n : !0) && t.isStatic() && (t = new S(t.eval())), ((i = this.config.useCache) == null || i) && (this.totalCacheEntries > (this.config.maxCacheSize || 256) && this.clearCache(), this.expressionCache[e] = t, this.totalCacheEntries++), t;
  }
  resolveStatic(e) {
    return e = e.walk((t) => {
      if (!(t instanceof O) && t.isStatic())
        return new S(t.eval());
    }), e = e.walk((t) => {
      if (t instanceof c)
        switch (t.operator) {
          case "+":
          case "-": {
            const s = t.allExpressions.find(
              (n) => n.isStatic() && n.eval() === 0
            );
            if (s)
              return t.allExpressions.find(
                (n) => n !== s
              );
            break;
          }
          case "*":
            if (t.allExpressions.find(
              (n) => n.isStatic() && n.eval() === 0
            ))
              return new S(0);
          case "*":
          case "/": {
            const s = t.allExpressions.find(
              (n) => n.isStatic() && n.eval() === 1
            );
            if (s)
              return t.allExpressions.find(
                (n) => n !== s
              );
            break;
          }
        }
    }), e;
  }
  minimize(e) {
    e = this.resolveStatic(e);
    const t = /* @__PURE__ */ new Map([
      ["query.", "q."],
      ["variable.", "v."],
      ["context.", "c."],
      ["temp.", "t."]
    ]);
    e = e.walk((n) => {
      if (n instanceof v) {
        const i = n.toString();
        for (const [a, y] of t)
          i.startsWith(a) && n.setName(i.replace(a, y));
        return n;
      }
    });
    const s = /* @__PURE__ */ new Map();
    return e = e.walk((n) => {
      if (n instanceof v) {
        const i = n.toString();
        if (!i.startsWith("v.") && !i.startsWith("t."))
          return;
        if (s.has(i))
          n.setName(s.get(i));
        else {
          const a = `v.v${s.size}`;
          s.set(i, a), n.setName(a);
        }
        return n;
      }
    }), e;
  }
  getParser() {
    return this.parser;
  }
}
function st(r) {
  if (r instanceof w)
    return new g(r.allExpressions[0], "()");
  if (!(r instanceof x) || r.allExpressions.length > 1)
    return r;
  const e = r.allExpressions[0];
  return e instanceof w ? new g(e.allExpressions[0], "()") : r;
}
class rt extends re {
  constructor(t) {
    super(t);
    o(this, "functions", /* @__PURE__ */ new Map());
    o(this, "classes", /* @__PURE__ */ new Map());
    this.registerPrefix("FUNCTION", new Ze());
  }
  reset() {
    this.functions.clear();
  }
}
class ut {
  constructor(e) {
    o(this, "parser");
    this.parser = new rt({
      useCache: !1,
      useOptimizer: !0,
      useAgressiveStaticOptimizer: !0,
      keepGroups: !0,
      earlyReturnsSkipParsing: !1,
      earlyReturnsSkipTokenization: !1
    }), this.parser.setExecutionEnvironment(
      new I(this.parser, e)
    ), this.parser.setTokenizer(
      new D(/* @__PURE__ */ new Set(["function"]))
    );
  }
  get functions() {
    return this.parser.functions;
  }
  parse(e) {
    return this.parser.init(e.replace(/\"/g, "'")), this.parser.parseExpression();
  }
  transform(e) {
    const t = new tt(
      {},
      {
        useCache: !1,
        keepGroups: !0,
        useOptimizer: !0,
        useAgressiveStaticOptimizer: !0,
        earlyReturnsSkipParsing: !0,
        earlyReturnsSkipTokenization: !1
      }
    );
    let s = 0, n = t.parse(e), i = !1;
    n instanceof x && (i = !0);
    let a = !1;
    n = n.walk((T) => {
      var _, U, F, G, B;
      if (T.type !== "FunctionExpression" || !((U = (_ = T.name.name).startsWith) != null && U.call(_, "f.")) && !((G = (F = T.name.name).startsWith) != null && G.call(F, "function.")))
        return;
      const ne = T.name.name.replace(/(f|function)\./g, ""), ie = T.args;
      let [M, A] = (B = this.functions.get(ne)) != null ? B : [];
      if (!A || !M)
        return;
      A = A.replace(
        /(a|arg)\.(\w+)/g,
        (p, E, l) => {
          var R, C;
          return ((C = (R = ie[M.indexOf(l)]) == null ? void 0 : R.toString()) != null ? C : "0").replace(/(t|temp)\./, "outer_temp.");
        }
      );
      let m = st(t.parse(A));
      if (m instanceof x) {
        const p = m.allExpressions.some(
          (l) => l instanceof w
        ), E = p || m.some((l) => l instanceof w);
        m = t.parse(
          `({${A}}+${E ? p ? "t.return_value" : "(t.return_value??0)" : "0"})`
        ), a = !0;
      }
      const $ = /* @__PURE__ */ new Map();
      return m = m.walk((p) => {
        if (p instanceof v) {
          let l = p.toString().split(".");
          const f = l.shift(), [R, ...C] = l, z = C.length > 0 ? "." + C.join(".") : "";
          if (f === "t" || f === "temp") {
            let b = $.get(R);
            b || (b = `t.__scvar${s++}`, $.set(R, b)), p.setName(`${b}${z}`);
          } else
            f === "outer_temp" && p.setName(`t.${R}${z}`);
          return;
        } else if (p instanceof w) {
          const E = new v(
            t.getParser().executionEnv,
            "t.return_value"
          ), l = p.allExpressions[0];
          return new c(
            E,
            l,
            "=",
            () => {
              E.setPointer(l.eval());
            }
          );
        } else if (p instanceof x) {
          const E = [];
          for (let l = 0; l < p.allExpressions.length; l++) {
            const f = p.allExpressions[l];
            if (f instanceof P && f.hasReturn) {
              nt(
                f,
                p.allExpressions.slice(l + 1)
              ), E.push(f);
              break;
            } else if (f.isReturn) {
              E.push(f);
              break;
            }
            E.push(f);
          }
          return new x(E);
        }
      }), m;
    });
    const y = t.parse(n.toString());
    return t.resolveStatic(y), !i && a ? `return ${y.toString()};` : y.toString();
  }
  reset() {
    this.functions.clear();
  }
}
function nt(r, e) {
  if (r.isReturn)
    return;
  const t = r.allExpressions[2].isReturn ? 1 : 2, s = r.allExpressions[t];
  s instanceof d || (s instanceof g && s.allExpressions[0] instanceof x ? e.unshift(...s.allExpressions) : e.unshift(s)), e.length > 0 && r.setExpressionAt(
    t,
    new g(
      new x(e),
      "{}"
    )
  );
}
export {
  at as Context,
  ut as CustomMolang,
  tt as Molang,
  D as Tokenizer,
  ht as expressions
};
