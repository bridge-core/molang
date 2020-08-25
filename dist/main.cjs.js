"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class e{constructor(e){this.value=e}isStatic(){return!0}eval(){return this.value}}class t{constructor(e,t,r){this.left=e,this.right=t,this.evalHelper=r}isStatic(){return this.left.isStatic()&&this.right.isStatic()}eval(){return this.evalHelper()}}class r{constructor(e=0){this.precedence=e}parse(e,r,s){const n=e.parseExpression(this.precedence);switch(s[1]){case"+":return new t(r,n,()=>{const e=r.eval(),t=n.eval();if("number"!=typeof e&&"boolean"!=typeof e||"number"!=typeof t&&"boolean"!=typeof t)throw new Error(`Cannot use numeric operators for expression "${e} ${s[1]} ${t}"`);return e+t});case"-":return new t(r,n,()=>{const e=r.eval(),t=n.eval();if("number"!=typeof e&&"boolean"!=typeof e||"number"!=typeof t&&"boolean"!=typeof t)throw new Error(`Cannot use numeric operators for expression "${e} ${s[1]} ${t}"`);return e-t});case"*":return new t(r,n,()=>{const e=r.eval(),t=n.eval();if("number"!=typeof e&&"boolean"!=typeof e||"number"!=typeof t&&"boolean"!=typeof t)throw new Error(`Cannot use numeric operators for expression "${e} ${s[1]} ${t}"`);return e*t});case"/":return new t(r,n,()=>{const e=r.eval(),t=n.eval();if("number"!=typeof e&&"boolean"!=typeof e||"number"!=typeof t&&"boolean"!=typeof t)throw new Error(`Cannot use numeric operators for expression "${e} ${s[1]} ${t}"`);return e/t});case"&&":return new t(r,n,()=>r.eval()&&n.eval());case"||":return new t(r,n,()=>r.eval()||n.eval());case"<":return new t(r,n,()=>r.eval()<n.eval());case"<=":return new t(r,n,()=>r.eval()<=n.eval());case">":return new t(r,n,()=>r.eval()>n.eval());case">=":return new t(r,n,()=>r.eval()>=n.eval());case"==":return new t(r,n,()=>r.eval()===n.eval());case"!=":return new t(r,n,()=>r.eval()!==n.eval());case"??":return new t(r,n,()=>r.eval()??n.eval());case"=":return new t(r,n,()=>{if(r.setPointer)return r.setPointer(n.eval()),0;throw Error(`Cannot assign to "${r.eval()}"`)});default:throw new Error("Operator not implemented")}}}var s;!function(e){e[e.SCOPE=1]="SCOPE",e[e.STATEMENT=2]="STATEMENT",e[e.PROPERTY_ACCESS=3]="PROPERTY_ACCESS",e[e.ARRAY_ACCESS=4]="ARRAY_ACCESS",e[e.ASSIGNMENT=5]="ASSIGNMENT",e[e.CONDITIONAL=6]="CONDITIONAL",e[e.NULLISH_COALESCING=7]="NULLISH_COALESCING",e[e.AND=8]="AND",e[e.OR=9]="OR",e[e.COMPARE=10]="COMPARE",e[e.SUM=11]="SUM",e[e.PRODUCT=12]="PRODUCT",e[e.EXPONENT=13]="EXPONENT",e[e.PREFIX=14]="PREFIX",e[e.POSTFIX=15]="POSTFIX",e[e.FUNCTION=16]="FUNCTION"}(s||(s={}));class n{constructor(e,t){this.tokenType=e,this.expression=t}isStatic(){return this.expression.isStatic()}eval(){const e=this.expression.eval();switch(this.tokenType){case"MINUS":if("number"!=typeof e)throw new Error(`Cannot use "-" operator in front of ${typeof e}: "-${e}"`);return-e;case"BANG":if("string"==typeof e)throw new Error(`Cannot use "!" operator in front of string: "!${e}"`);return!e}}}class i{constructor(e=0){this.precedence=e}parse(e,t){return new n(t[0],e.parseExpression(this.precedence))}}class o{constructor(e=0){this.precedence=e}parse(t,r){return new e(Number(r[1]))}}const a=(e,t)=>e+Math.random()*(t-e),h=(e,t)=>Math.round(e+Math.random()*(t-e)),c={"math.abs":Math.abs,"math.acos":Math.acos,"math.asin":Math.asin,"math.atan":Math.atan,"math.atan2":Math.atan2,"math.ceil":Math.ceil,"math.clamp":(e,t,r)=>"number"!=typeof e||Number.isNaN(e)?t:e>r?r:e<t?t:e,"math.cos":Math.cos,"math.die_roll":(e,t,r)=>{let s=0;for(;0<e;)s+=a(t,r);return s},"math.die_roll_integer":(e,t,r)=>{let s=0;for(;0<e;)s+=h(t,r);return s},"math.exp":Math.exp,"math.floor":Math.floor,"math.hermite_blend":e=>3*e^2-2*e^3,"math.lerp":(e,t,r)=>(r<0?r=0:r>1&&(r=1),e+(t-e)*r),"math.lerp_rotate":(e,t,r)=>{const s=e=>((e+180)%360+180)%360;if((e=s(e))>(t=s(t))){let r=e;e=t,t=r}return t-e>180?s(t+r*(360-(t-e))):e+r*(t-e)},"math.ln":Math.log,"math.max":Math.max,"math.min":Math.min,"math.mod":(e,t)=>e%t,"math.pi":Math.PI,"math.pow":Math.pow,"math.random":a,"math.random_integer":h,"math.round":Math.round,"math.sin":Math.sin,"math.sqrt":Math.sqrt,"math.trunc":Math.trunc};let u={};function l(e,t="",r={}){for(let s in e)"object"!=typeof e[s]||Array.isArray(e[s])?r[`${t}${s}`]=e[s]:l(e[s],`${t}${s}.`,r);return r}class p{constructor(e,t=!1){this.name=e,this.isFunctionCall=t}isStatic(){return!1}setPointer(e){!function(e,t){if("."===e[1])switch(e[0]){case"q":e="query"+e.substring(1,e.length);case"t":e="temp"+e.substring(1,e.length);case"v":e="variable"+e.substring(1,e.length);case"c":e="context"+e.substring(1,e.length)}u[e]=t}(this.name,e)}setFunctionCall(e=!0){this.isFunctionCall=e}eval(){const e=function(e){if("."===e[1])switch(e[0]){case"q":e="query"+e.substring(1,e.length);case"t":e="temp"+e.substring(1,e.length);case"v":e="variable"+e.substring(1,e.length);case"c":e="context"+e.substring(1,e.length)}return u[e]}(this.name);return this.isFunctionCall||"function"!=typeof e?e:e()}}class f{constructor(e=0){this.precedence=e}parse(e,t){return new p(t[1])}}class E{constructor(e=0){this.precedence=e}parse(e,t){const r=e.parseExpression(this.precedence);return e.consume("RIGHT_PARENT"),r}}class w{constructor(e,t,r){this.leftExpression=e,this.thenExpression=t,this.elseExpression=r}get isReturn(){return this.leftResult?this.thenExpression.isReturn:this.elseExpression.isReturn}get isContinue(){return this.leftResult?this.thenExpression.isContinue:this.elseExpression.isContinue}get isBreak(){return this.leftResult?this.thenExpression.isBreak:this.elseExpression.isBreak}isStatic(){return this.leftExpression.isStatic()&&this.thenExpression.isStatic()&&this.elseExpression.isStatic()}eval(){return this.leftResult=this.leftExpression.eval(),this.leftResult?this.thenExpression.eval():this.elseExpression.eval()}}class x{constructor(e=0){this.precedence=e}parse(t,r,s){let n,i=t.parseExpression(this.precedence-1);if(t.match("COLON"))n=t.parseExpression(this.precedence-1);else{if(!t.match("SEMICOLON",!1))throw new Error("Binary conditional operator without ending semicolon.");n=new e(0)}return new w(r,i,n)}}class R{constructor(e){this.expression=e,this.isReturn=!0}isStatic(){return!1}eval(){return this.expression.eval()}}class m{constructor(e=0){this.precedence=e}parse(t,r){const n=t.parseExpression(s.STATEMENT);return new R(t.match("SEMICOLON")?n:new e(0))}}class g{constructor(e){this.expressions=e,this.didReturn=!1,this.wasLoopBroken=!1,this.wasLoopContinued=!1}get isReturn(){return this.didReturn}get isBreak(){return!!this.wasLoopBroken&&(this.wasLoopBroken=!1,!0)}get isContinue(){return!!this.wasLoopContinued&&(this.wasLoopContinued=!1,!0)}isStatic(){let e=0;for(;e<this.expressions.length;){if(!this.expressions[e].isStatic())return!1;e++}return!0}eval(){this.didReturn=!1,this.wasLoopBroken=!1,this.wasLoopContinued=!1;let e=0;for(;e<this.expressions.length;){let t=this.expressions[e].eval();if(this.expressions[e].isReturn)return this.didReturn=!0,t;if(this.expressions[e].isContinue)return void(this.wasLoopContinued=!0);if(this.expressions[e].isBreak)return void(this.wasLoopBroken=!0);e++}return 0}getExpression(){return this.expressions[0]}}class S{constructor(e,t=!1){this.value=e,this.isReturn=t}isStatic(){return!0}eval(){return this.value}}class A{constructor(e=0){this.precedence=e}parse(e,t,r){if(e.useOptimizer&&(t.isStatic()&&(t=new S(t.eval(),t.isReturn)),t.isReturn))return t;let s,n=[t];do{if(s=e.parseExpression(this.precedence),e.useOptimizer){if(s.isStatic()){if(!s.isReturn&&e.agressiveStaticOptimizer)continue;s=new S(s.eval(),s.isReturn)}if(s.isReturn){n.push(s);break}}n.push(s)}while(e.match("SEMICOLON")||s.isReturn);return new g(n)}}class v{constructor(e){this.name=e}isStatic(){return!0}eval(){return this.name.substring(1,this.name.length-1)}}class C{constructor(e=0){this.precedence=e}parse(e,t){return new v(t[1])}}class N{constructor(e,t){this.name=e,this.args=t}isStatic(){return!1}eval(){const e=[];let t=0;for(;t<this.args.length;)e.push(this.args[t++].eval());return this.name.eval()(...e)}}class d{constructor(e=0){this.precedence=e}parse(e,t,r){const s=[];if(!t.setFunctionCall)throw new Error(`Expression "${t.eval()}" is not callable!`);if(t.setFunctionCall(!0),!e.match("RIGHT_PARENT")){do{s.push(e.parseExpression())}while(e.match("COMMA"));e.consume("RIGHT_PARENT")}return new N(t,s)}}class T{constructor(e,t){this.name=e,this.lookup=t}isStatic(){return!1}setPointer(e){this.name.eval()[this.lookup.eval()]=e}eval(){return this.name.eval()[this.lookup.eval()]}}class I{constructor(e=0){this.precedence=e}parse(e,t,r){const s=e.parseExpression(this.precedence-1);if(!t.setPointer)throw new Error(`"${t.eval()}" is not an array`);if(!e.match("ARRAY_RIGHT"))throw new Error(`No closing bracket for opening bracket "[${s.eval()}"`);return new T(t,s)}}class P{constructor(e=0){this.precedence=e}parse(e,t){let r,n=!1,i=[];do{if(e.match("CURLY_RIGHT")){n=!0;break}if(r=e.parseExpression(s.STATEMENT),e.useOptimizer&&(r.isStatic()&&(r=new S(r.eval(),r.isReturn)),r.isReturn)){i.push(r);break}i.push(r)}while(e.match("SEMICOLON")||r.isReturn);if(!n&&!e.match("CURLY_RIGHT"))throw new Error("Missing closing curly bracket");return new g(i)}}class O{constructor(e,t){this.count=e,this.expression=t}get isReturn(){return this.expression.isReturn}isStatic(){return this.count.isStatic()&&this.expression.isStatic()}eval(){const e=Number(this.count.eval());if(Number.isNaN(e))throw new Error(`First loop() argument must be of type number, received "${typeof this.count.eval()}"`);if(e>1024)throw new Error(`Cannot loop more than 1024x times, received "${e}"`);let t=0;for(;t<e;){t++;const e=this.expression.eval();if(this.expression.isBreak)break;if(!this.expression.isContinue&&this.expression.isReturn)return e}return 0}}class L{constructor(e=0){this.precedence=e}parse(e,t){e.consume("LEFT_PARENT");const r=[];if(e.match("RIGHT_PARENT"))throw new Error("loop() called without arguments");do{r.push(e.parseExpression())}while(e.match("COMMA"));if(e.consume("RIGHT_PARENT"),2!==r.length)throw new Error("There must be exactly two loop() arguments; found "+r.length);return new O(r[0],r[1])}}class M{constructor(e,t,r){if(this.variable=e,this.arrayExpression=t,this.expression=r,!this.variable.setPointer)throw new Error(`First for_each() argument must be a variable, received "${typeof this.variable.eval()}"`)}get isReturn(){return this.expression.isReturn}isStatic(){return this.variable.isStatic()&&this.arrayExpression.isStatic()&&this.expression.isStatic()}eval(){const e=this.arrayExpression.eval();if(!Array.isArray(e))throw new Error(`Second for_each() argument must be an array, received "${typeof e}"`);let t=0;for(;t<e.length;){this.variable.setPointer(e[t++]);const r=this.expression.eval();if(this.expression.isBreak)break;if(!this.expression.isContinue&&this.expression.isReturn)return r}return 0}}class b{constructor(e=0){this.precedence=e}parse(e,t){e.consume("LEFT_PARENT");const r=[];if(e.match("RIGHT_PARENT"))throw new Error("for_each() called without arguments");do{r.push(e.parseExpression())}while(e.match("COMMA"));if(e.consume("RIGHT_PARENT"),3!==r.length)throw new Error("There must be exactly three loop() arguments; found "+r.length);return new M(r[0],r[1],r[2])}}class _{constructor(){this.isContinue=!0}isStatic(){return!1}eval(){return 0}}class y{constructor(e=0){this.precedence=e}parse(e,t){return new _}}class U{constructor(){this.isBreak=!0}isStatic(){return!1}eval(){return 0}}class k{constructor(e=0){this.precedence=e}parse(e,t){return new U}}class F{constructor(e){this.value=e}isStatic(){return!0}eval(){return this.value}}class G{constructor(e=0){this.precedence=e}parse(e,t){return new F("true"===t[1])}}class $ extends class{constructor(e,t=!1,r=!0){this.tokenIterator=e,this.useOptimizer=t,this.agressiveStaticOptimizer=r,this.prefixParselets=new Map,this.infixParselets=new Map,this.readTokens=[],this.lastConsumed=["SOF",""]}parseExpression(t=0){let r=this.consume();if("EOF"===r[0])return new e(0);const s=this.prefixParselets.get(r[0]);if(!s)throw new Error(`Cannot parse ${r[0]} expression "${r[1]}"`);let n=s.parse(this,r);return n.isReturn?n:this.parseInfixExpression(n,t)}parseInfixExpression(e,t=0){let r;for(;t<this.getPrecedence();){r=this.consume();e=this.infixParselets.get(r[0]).parse(this,e,r)}return e}getPrecedence(){const e=this.infixParselets.get(this.lookAhead(0)?.[0]);return e?.precedence??0}getLastConsumed(){return this.lastConsumed}consume(e){this.tokenIterator.step();const t=this.lookAhead(0);if(e){if(t[0]!==e)throw new Error(`Expected token "${e}" and found "${t[0]}"`);this.consume()}return this.lastConsumed=this.readTokens.pop(),this.lastConsumed}match(e,t=!0){return this.lookAhead(0)[0]===e&&(t&&this.consume(),!0)}lookAhead(e){for(;e>=this.readTokens.length;)this.readTokens.push(this.tokenIterator.next());return this.readTokens[e]}registerInfix(e,t){this.infixParselets.set(e,t)}registerPrefix(e,t){this.prefixParselets.set(e,t)}getInfix(e){return this.infixParselets.get(e)}getPrefix(e){return this.prefixParselets.get(e)}getTokenizerPosition(){return this.tokenIterator.getPosition()}}{constructor(e,t=!0){super(e,t),this.registerPrefix("NAME",new f),this.registerPrefix("STRING",new C),this.registerPrefix("NUMBER",new o),this.registerPrefix("TRUE",new G(s.PREFIX)),this.registerPrefix("FALSE",new G(s.PREFIX)),this.registerPrefix("RETURN",new m),this.registerPrefix("CONTINUE",new y),this.registerPrefix("BREAK",new k),this.registerPrefix("LOOP",new L),this.registerPrefix("FOR_EACH",new b),this.registerInfix("QUESTION",new x(s.CONDITIONAL)),this.registerPrefix("LEFT_PARENT",new E),this.registerInfix("LEFT_PARENT",new d(s.FUNCTION)),this.registerInfix("ARRAY_LEFT",new I(s.ARRAY_ACCESS)),this.registerPrefix("CURLY_LEFT",new P(s.SCOPE)),this.registerInfix("SEMICOLON",new A(s.STATEMENT)),this.registerPrefix("MINUS",new i(s.PREFIX)),this.registerPrefix("BANG",new i(s.PREFIX)),this.registerInfix("PLUS",new r(s.SUM)),this.registerInfix("MINUS",new r(s.SUM)),this.registerInfix("ASTERISK",new r(s.PRODUCT)),this.registerInfix("SLASH",new r(s.PRODUCT)),this.registerInfix("EQUALS",new r(s.COMPARE)),this.registerInfix("NOT_EQUALS",new r(s.COMPARE)),this.registerInfix("GREATER_OR_EQUALS",new r(s.COMPARE)),this.registerInfix("GREATER",new r(s.COMPARE)),this.registerInfix("SMALLER_OR_EQUALS",new r(s.COMPARE)),this.registerInfix("SMALLER",new r(s.COMPARE)),this.registerInfix("AND",new r(s.AND)),this.registerInfix("OR",new r(s.OR)),this.registerInfix("NULLISH_COALESCING",new r(s.NULLISH_COALESCING)),this.registerInfix("ASSIGN",new r(s.ASSIGNMENT))}}const H=new Map([["==","EQUALS"],["!=","NOT_EQUALS"],["??","NULLISH_COALESCING"],["&&","AND"],["||","OR"],[">=","GREATER_OR_EQUALS"],["<=","SMALLER_OR_EQUALS"],[">","GREATER"],["<","SMALLER"],["(","LEFT_PARENT"],[")","RIGHT_PARENT"],["[","ARRAY_LEFT"],["]","ARRAY_RIGHT"],["{","CURLY_LEFT"],["}","CURLY_RIGHT"],[",","COMMA"],["=","ASSIGN"],["+","PLUS"],["-","MINUS"],["*","ASTERISK"],["/","SLASH"],["?","QUESTION"],[":","COLON"],[";","SEMICOLON"],["!","BANG"]]),B=new Set(["return","continue","break","for_each","loop","false","true"]);function Y(e){return e>="a"&&e<="z"}function D(e){return e>="0"&&e<="9"}let Q={};function X(e,t=!0,r=!0){if(t){const t=Q[e];if(t)return t}const s=new $(function(e){let t=0,r=0,s=0,n=0;return{getPosition:()=>({startLineNumber:n,endLineNumber:s,startColumn:r,endColumn:t}),step(){r=t,n=s},next(){for(;t<e.length;){let r=t+1<e.length?H.get(e[t]+e[t+1]):void 0;if(r)return t++,[r,e[t-1]+e[t++]];if(r=H.get(e[t]),r)return[r,e[t++]];if("'"===e[t]){let r=t+1;for(;r<e.length&&"'"!==e[r];)r++;r++;const s=["STRING",e.substring(t,r)];return t=r,s}if(Y(e[t])){let r=t+1;for(;r<e.length&&(Y(e[r])||D(e[r])||"_"===e[r]||"."===e[r]);)r++;const s=e.substring(t,r).toLowerCase(),n=[B.has(s)?s.toUpperCase():"NAME",s];return t=r,n}if(D(e[t])){let r=t+1,s=!1;for(;r<e.length&&(D(e[r])||"."===e[r]&&!s);)"."===e[r]&&(s=!0),r++;const n=["NUMBER",e.substring(t,r)];return t=r,n}"\n"!==e[t]&&"\r"!==e[t]||s++,t++}return["EOF",""]},hasNext:()=>t<e.length}}(e),r).parseExpression();return t&&(Q[e]=r&&s.isStatic()?new S(s.eval()):s),s}exports.clearCache=function(){Q={}},exports.execute=function(e,t=!0,r=!0){const s=X(e,t,r).eval();return void 0===s?0:"boolean"==typeof s?Number(s):s},exports.parse=X,exports.setEnv=function(e){u={...c,...l(e)}};
