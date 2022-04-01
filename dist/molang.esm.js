const e={"!":"BANG","&":"AND","(":"LEFT_PARENT",")":"RIGHT_PARENT","*":"ASTERISK","+":"PLUS",",":"COMMA","-":"MINUS","/":"SLASH",":":"COLON",";":"SEMICOLON","<":"SMALLER","=":"EQUALS",">":"GREATER","?":"QUESTION","[":"ARRAY_LEFT","]":"ARRAY_RIGHT","{":"CURLY_LEFT","|":"OR","}":"CURLY_RIGHT"},t=new Set(["return","continue","break","for_each","loop","false","true"]);class s{constructor(e,t,s,r){this.type=e,this.text=t,this.startColumn=s,this.startLine=r}getType(){return this.type}getText(){return this.text}getPosition(){return{startColumn:this.startColumn,startLineNumber:this.startLine,endColumn:this.startColumn+this.text.length,endLineNumber:this.startLine}}}class r{constructor(e){this.i=0,this.currentColumn=0,this.currentLine=0,this.lastColumns=0,this.keywordTokens=e?new Set([...t,...e]):t}init(e){this.currentLine=0,this.currentColumn=0,this.lastColumns=0,this.i=0,this.expression=e}next(){for(this.currentColumn=this.i-this.lastColumns;this.i<this.expression.length&&(" "===this.expression[this.i]||"\t"===this.expression[this.i]||"\n"===this.expression[this.i]);)"\n"===this.expression[this.i]&&(this.currentLine++,this.currentColumn=0,this.lastColumns=this.i+1),this.i++;if("#"===this.expression[this.i]){const e=this.expression.indexOf("\n",this.i+1);return this.i=-1===e?this.expression.length:e,this.currentLine++,this.lastColumns=this.i+1,this.currentColumn=0,this.next()}let t=e[this.expression[this.i]];if(t)return new s(t,this.expression[this.i++],this.currentColumn,this.currentLine);if(this.isLetter(this.expression[this.i])||"_"===this.expression[this.i]){let e=this.i+1;for(;e<this.expression.length&&(this.isLetter(this.expression[e])||this.isNumber(this.expression[e])||"_"===this.expression[e]||"."===this.expression[e]);)e++;const t=this.expression.substring(this.i,e).toLowerCase();return this.i=e,new s(this.keywordTokens.has(t)?t.toUpperCase():"NAME",t,this.currentColumn,this.currentLine)}if(this.isNumber(this.expression[this.i])){let e=this.i+1,t=!1;for(;e<this.expression.length&&(this.isNumber(this.expression[e])||"."===this.expression[e]&&!t);)"."===this.expression[e]&&(t=!0),e++;const r=new s("NUMBER",this.expression.substring(this.i,e),this.currentColumn,this.currentLine),i=t&&"f"===this.expression[e];return this.i=i?e+1:e,r}if("'"===this.expression[this.i]){let e=this.i+1;for(;e<this.expression.length&&"'"!==this.expression[e];)e++;e++;const t=new s("STRING",this.expression.substring(this.i,e),this.currentColumn,this.currentLine);return this.i=e,t}return this.hasNext()?(this.i++,this.next()):new s("EOF","",this.currentColumn,this.currentLine)}hasNext(){return this.i<this.expression.length}isLetter(e){return e>="a"&&e<="z"||e>="A"&&e<="Z"}isNumber(e){return e>="0"&&e<="9"}}const i=(e,t,s)=>"number"!=typeof e||Number.isNaN(e)?t:e>s?s:e<t?t:e,n=(e,t,s)=>{let r=0;for(;0<e;)r+=p(t,s);return r},o=(e,t,s)=>{let r=0;for(;0<e;)r+=l(t,s);return r},a=e=>3*e**2-2*e**3,h=(e,t,s)=>(s<0?s=0:s>1&&(s=1),e+(t-e)*s),c=(e,t,s)=>{const r=e=>((e+180)%360+180)%360;if((e=r(e))>(t=r(t))){let s=e;e=t,t=s}return t-e>180?r(t+s*(360-(t-e))):e+s*(t-e)},u=(e,t)=>e%t,p=(e,t)=>e+Math.random()*(t-e),l=(e,t)=>Math.round(e+Math.random()*(t-e)),x=e=>((e=((e%=360)+360)%360)>179&&(e-=360),e),E=e=>{const t=e?1:Math.PI/180;return{"math.abs":Math.abs,"math.acos":e=>Math.acos(e)/t,"math.asin":e=>Math.asin(e)/t,"math.atan":e=>Math.atan(e)/t,"math.atan2":(e,s)=>Math.atan2(e,s)/t,"math.ceil":Math.ceil,"math.clamp":i,"math.cos":e=>Math.cos(e*t),"math.die_roll":n,"math.die_roll_integer":o,"math.exp":Math.exp,"math.floor":Math.floor,"math.hermite_blend":a,"math.lerp":h,"math.lerp_rotate":c,"math.ln":Math.log,"math.max":Math.max,"math.min":Math.min,"math.min_angle":x,"math.mod":u,"math.pi":Math.PI,"math.pow":Math.pow,"math.random":p,"math.random_integer":l,"math.round":Math.round,"math.sin":e=>Math.sin(e*t),"math.sqrt":Math.sqrt,"math.trunc":Math.trunc}},f={"query.in_range":(e,t,s)=>"number"!=typeof e||"number"!=typeof t||"number"!=typeof s?(console.error('"query.in_range": value, min and max must be numbers'),!1):e>=t&&e<=s,"query.all":(e,...t)=>t.every(t=>t===e),"query.any":(e,...t)=>t.some(t=>t===e),"query.count":e=>Array.isArray(e)?e.length:1},g=e=>({...E(e),...f});class m{constructor(e,t){if(this.config=t,!e)throw new Error("Provided environment must be an object");this.env={...g(t.useRadians??!1),"query.self":()=>this.env,...t.isFlat?e:this.flattenEnv(e)}}updateConfig({variableHandler:e,convertUndefined:t,useRadians:s}){void 0!==t&&(this.config.convertUndefined=t),"function"==typeof e&&(this.config.variableHandler=e),!!this.config.useRadians!=!!s&&(this.env=Object.assign(this.env,g(!!s)))}flattenEnv(e,t="",s={}){for(let r in e){let i=r;if("."===r[1])switch(r[0]){case"q":i="query"+r.substring(1,r.length);break;case"t":i="temp"+r.substring(1,r.length);break;case"v":i="variable"+r.substring(1,r.length);break;case"c":i="context"+r.substring(1,r.length);break;case"f":i="function"+r.substring(1,r.length)}e[r].__isContext?s[`${t}${i}`]=e[r].env:"object"!=typeof e[r]||Array.isArray(e[r])?s[`${t}${i}`]=e[r]:this.flattenEnv(e[r],`${t}${r}.`,s)}return s}setAt(e,t){if("."===e[1])switch(e[0]){case"q":e="query"+e.substring(1,e.length);break;case"t":e="temp"+e.substring(1,e.length);break;case"v":e="variable"+e.substring(1,e.length);break;case"c":e="context"+e.substring(1,e.length);break;case"f":e="function"+e.substring(1,e.length)}return this.env[e]=t}getFrom(e){if("."===e[1])switch(e[0]){case"q":e="query"+e.substring(1,e.length);break;case"t":e="temp"+e.substring(1,e.length);break;case"v":e="variable"+e.substring(1,e.length);break;case"c":e="context"+e.substring(1,e.length);break;case"f":e="function"+e.substring(1,e.length)}const t=this.env[e]??this.config.variableHandler?.(e,this.env);return void 0===t&&this.config.convertUndefined?0:t}}class d{constructor(e){this.env=e,this.__isContext=!0}}class w{toString(){return""+this.eval()}walk(e,t=new Set){let s=e(this)??this;return s.iterate(e,t),s}iterate(e,t){for(let s=0;s<this.allExpressions.length;s++){const r=this.allExpressions[s];if(t.has(r))continue;t.add(r);const i=e(r)??r;i!==r&&t.has(i)||(t.add(i),this.setExpressionAt(s,i),i.iterate(e,t))}}}class S extends w{constructor(){super(...arguments),this.type="VoidExpression"}get allExpressions(){return[]}setExpressionAt(){}isStatic(){return!0}eval(){return 0}toString(){return""}}class v extends w{constructor(e,t,s,r){super(),this.left=e,this.right=t,this.operator=s,this.evalHelper=r,this.type="GenericOperatorExpression"}get allExpressions(){return[this.left,this.right]}setExpressionAt(e,t){0===e?this.left=t:1===e&&(this.right=t)}isStatic(){return this.left.isStatic()&&this.right.isStatic()}eval(){return this.evalHelper(this.left,this.right)}toString(){return`${this.left.toString()}${this.operator}${this.right.toString()}`}}const R=(e,t)=>{const s=e.eval(),r=t.eval();if("number"!=typeof s&&"boolean"!=typeof s||"number"!=typeof r&&"boolean"!=typeof r)throw new Error(`Cannot use numeric operators for expression "${s} + ${r}"`);return s+r},A=(e,t)=>{const s=e.eval(),r=t.eval();if("number"!=typeof s&&"boolean"!=typeof s||"number"!=typeof r&&"boolean"!=typeof r)throw new Error(`Cannot use numeric operators for expression "${s} - ${r}"`);return s-r},y=(e,t)=>{const s=e.eval(),r=t.eval();if("number"!=typeof s&&"boolean"!=typeof s||"number"!=typeof r&&"boolean"!=typeof r)throw new Error(`Cannot use numeric operators for expression "${s} / ${r}"`);return s/r},C=(e,t)=>{const s=e.eval(),r=t.eval();if("number"!=typeof s&&"boolean"!=typeof s||"number"!=typeof r&&"boolean"!=typeof r)throw new Error(`Cannot use numeric operators for expression "${s} * ${r}"`);return s*r},T=(e,t)=>{if(e.setPointer)return e.setPointer(t.eval()),0;throw Error("Cannot assign to "+e.type)};class N{constructor(e=0){this.precedence=e}parse(e,t,s){const r=e.parseExpression(this.precedence),i=s.getText();switch(i){case"+":return new v(t,r,i,R);case"-":return new v(t,r,i,A);case"*":return new v(t,r,i,C);case"/":return new v(t,r,i,y);case"=":return new v(t,r,"=",T);default:throw new Error("Operator not implemented")}}}var b;!function(e){e[e.SCOPE=1]="SCOPE",e[e.STATEMENT=2]="STATEMENT",e[e.ASSIGNMENT=3]="ASSIGNMENT",e[e.CONDITIONAL=4]="CONDITIONAL",e[e.ARRAY_ACCESS=5]="ARRAY_ACCESS",e[e.NULLISH_COALESCING=6]="NULLISH_COALESCING",e[e.AND=7]="AND",e[e.OR=8]="OR",e[e.EQUALS_COMPARE=9]="EQUALS_COMPARE",e[e.COMPARE=10]="COMPARE",e[e.SUM=11]="SUM",e[e.PRODUCT=12]="PRODUCT",e[e.EXPONENT=13]="EXPONENT",e[e.PREFIX=14]="PREFIX",e[e.POSTFIX=15]="POSTFIX",e[e.FUNCTION=16]="FUNCTION"}(b||(b={}));class k extends w{constructor(e,t){super(),this.tokenType=e,this.expression=t,this.type="PrefixExpression"}get allExpressions(){return[this.expression]}setExpressionAt(e,t){this.expression=t}isStatic(){return this.expression.isStatic()}eval(){const e=this.expression.eval();if("number"!=typeof e)throw new Error(`Cannot use "${this.tokenType}" operator in front of ${typeof e} "${e}"`);switch(this.tokenType){case"MINUS":return-e;case"BANG":return!e}}toString(){switch(this.tokenType){case"MINUS":return"-"+this.expression.toString();case"BANG":return"!"+this.expression.toString()}throw new Error(`Unknown prefix operator: "${this.tokenType}"`)}}class P{constructor(e=0){this.precedence=e}parse(e,t){return new k(t.getType(),e.parseExpression(this.precedence))}}class I extends w{constructor(e){super(),this.value=e,this.type="NumberExpression"}get allExpressions(){return[]}setExpressionAt(){}isStatic(){return!0}eval(){return this.value}toString(){return""+this.value}}class O{constructor(e=0){this.precedence=e}parse(e,t){return new I(Number(t.getText()))}}class L extends w{constructor(e,t,s=!1){super(),this.executionEnv=e,this.name=t,this.isFunctionCall=s,this.type="NameExpression"}get allExpressions(){return[]}setExpressionAt(){}isStatic(){return!1}setPointer(e){this.executionEnv.setAt(this.name,e)}setFunctionCall(e=!0){this.isFunctionCall=e}setName(e){this.name=e}setExecutionEnv(e){this.executionEnv=e}eval(){const e=this.executionEnv.getFrom(this.name);return this.isFunctionCall||"function"!=typeof e?e:e()}toString(){return this.name}}class M extends w{constructor(e,t){super(),this.leftExpr=e,this.rightExpr=t,this.type="NameExpression"}get allExpressions(){return[this.leftExpr,this.rightExpr]}setExpressionAt(e,t){if(!(t instanceof L))throw new Error('Cannot use context switch operator "->" on '+t.type);0===e?this.leftExpr=t:1===e&&(this.rightExpr=t)}isStatic(){return!1}eval(){const e=this.leftExpr.eval();return"object"!=typeof e?0:(this.rightExpr.setExecutionEnv(new m(e,this.rightExpr.executionEnv.config)),this.rightExpr.eval())}toString(){return`${this.leftExpr.toString()}->${this.rightExpr.toString()}`}}class _{constructor(e=0){this.precedence=e}parse(e,t){const s=new L(e.executionEnv,t.getText()),r=[e.lookAhead(0),e.lookAhead(1)];if("MINUS"===r[0].getType()&&"GREATER"===r[1].getType()){e.consume("MINUS"),e.consume("GREATER");const t=e.parseExpression(b.FUNCTION-1);if("NameExpression"!==t.type&&"FunctionExpression"!==t.type)throw new Error('Cannot use context switch operator "->" on '+t.type);return new M(s,t)}return s}}class U extends w{constructor(e,t){super(),this.expression=e,this.brackets=t,this.type="GroupExpression"}get allExpressions(){return[this.expression]}setExpressionAt(e,t){this.expression=t}isStatic(){return this.expression.isStatic()}get isReturn(){return this.expression.isReturn}get isBreak(){return this.expression.isBreak}get isContinue(){return this.expression.isContinue}eval(){return this.expression.eval()}toString(){return`${this.brackets[0]}${this.expression.toString()}${this.brackets[1]}`}}class ${constructor(e=0){this.precedence=e}parse(e,t){const s=e.parseExpression(this.precedence);return e.consume("RIGHT_PARENT"),e.config.keepGroups?new U(s,"()"):s}}class F extends w{constructor(e){super(),this.expression=e,this.type="ReturnExpression",this.isReturn=!0}get allExpressions(){return[this.expression]}setExpressionAt(e,t){this.expression=t}isStatic(){return!1}eval(){return this.expression.eval()}toString(){return"return "+this.expression.toString()}}class G{constructor(e=0){this.precedence=e}parse(e,t){const s=e.parseExpression(b.STATEMENT+1);return new F(e.match("SEMICOLON",!1)?s:new I(0))}}class B extends w{constructor(e,t=!1){super(),this.value=e,this.isReturn=t,this.type="StaticExpression"}get allExpressions(){return[]}setExpressionAt(){}isStatic(){return!0}eval(){return this.value}toString(){let e=this.value;return"string"==typeof e&&(e=`'${e}'`),this.isReturn?"return "+e:""+e}}class H extends w{constructor(e){super(),this.expressions=e,this.type="StatementExpression",this.didReturn=void 0,this.wasLoopBroken=!1,this.wasLoopContinued=!1}get allExpressions(){return this.expressions}setExpressionAt(e,t){this.expressions[e]=t}get isReturn(){if(void 0!==this.didReturn)return this.didReturn;let e=0;for(;e<this.expressions.length;){const t=this.expressions[e];if(t.isBreak)return!1;if(t.isContinue)return!1;if(t.isReturn)return this.didReturn=!0,!0;e++}return this.didReturn=!1,!1}get isBreak(){return!!this.wasLoopBroken&&(this.wasLoopBroken=!1,!0)}get isContinue(){return!!this.wasLoopContinued&&(this.wasLoopContinued=!1,!0)}isStatic(){let e=0;for(;e<this.expressions.length;){if(!this.expressions[e].isStatic())return!1;e++}return!0}eval(){this.didReturn=!1,this.wasLoopBroken=!1,this.wasLoopContinued=!1;let e=0;for(;e<this.expressions.length;){let t=this.expressions[e].eval();if(this.expressions[e].isReturn)return this.didReturn=!0,t;if(this.expressions[e].isContinue)return void(this.wasLoopContinued=!0);if(this.expressions[e].isBreak)return void(this.wasLoopBroken=!0);e++}return 0}toString(){let e="";for(const t of this.expressions)t instanceof S||t instanceof B&&!t.isReturn||(e+=t.toString()+";");return e}}class z{constructor(e=0){this.precedence=e}findReEntryPoint(e){let t=1,s=e.lookAhead(0).getType();for(;"EOF"!==s&&("CURLY_RIGHT"==s?t--:"CURLY_LEFT"===s&&t++,0!==t);)e.consume(),s=e.lookAhead(0).getType()}parse(e,t,s){if(e.config.useOptimizer&&(t.isStatic()&&(t=new B(t.eval(),t.isReturn)),e.config.earlyReturnsSkipParsing&&t.isReturn))return e.config.earlyReturnsSkipTokenization||this.findReEntryPoint(e),new H([t]);const r=[t];if(!e.match("CURLY_RIGHT",!1))do{let t=e.parseExpression(this.precedence);if(e.config.useOptimizer){if(t.isStatic()){if(e.config.useAgressiveStaticOptimizer&&!t.isReturn)continue;t=new B(t.eval(),t.isReturn)}if(e.config.earlyReturnsSkipParsing&&(t.isBreak||t.isContinue||t.isReturn))return r.push(t),e.config.earlyReturnsSkipTokenization||this.findReEntryPoint(e),new H(r)}r.push(t)}while(e.match("SEMICOLON")&&!e.match("EOF")&&!e.match("CURLY_RIGHT",!1));e.match("SEMICOLON");return new H(r)}}class Y extends w{constructor(e){super(),this.name=e,this.type="StringExpression"}get allExpressions(){return[]}setExpressionAt(){}isStatic(){return!0}eval(){return this.name.substring(1,this.name.length-1)}toString(){return this.name}}class q{constructor(e=0){this.precedence=e}parse(e,t){return new Y(t.getText())}}class D extends w{constructor(e,t){super(),this.name=e,this.args=t,this.type="FunctionExpression"}get allExpressions(){return[this.name,...this.args]}setExpressionAt(e,t){0===e?this.name=t:e>0&&(this.args[e-1]=t)}setExecutionEnv(e){this.name.setExecutionEnv(e)}get executionEnv(){return this.name.executionEnv}isStatic(){return!1}eval(){const e=[];let t=0;for(;t<this.args.length;)e.push(this.args[t++].eval());const s=this.name.eval();if("function"!=typeof s)throw new Error(this.name.toString()+" is not callable!");return s(...e)}toString(){let e=this.name.toString()+"(";for(let t=0;t<this.args.length;t++)e+=`${this.args[t].toString()}${t+1<this.args.length?",":""}`;return e+")"}}class Q{constructor(e=0){this.precedence=e}parse(e,t,s){const r=[];if(!t.setFunctionCall)throw new Error(t.type+" is not callable!");if(t.setFunctionCall(!0),!e.match("RIGHT_PARENT")){do{r.push(e.parseExpression())}while(e.match("COMMA"));e.consume("RIGHT_PARENT")}return new D(t,r)}}class X extends w{constructor(e,t){super(),this.name=e,this.lookup=t,this.type="ArrayAccessExpression"}get allExpressions(){return[this.name,this.lookup]}setExpressionAt(e,t){0===e?this.name=t:1===e&&(this.lookup=t)}isStatic(){return!1}setPointer(e){this.name.eval()[this.lookup.eval()]=e}eval(){return this.name.eval()[this.lookup.eval()]}toString(){return`${this.name.toString()}[${this.lookup.toString()}]`}}class j{constructor(e=0){this.precedence=e}parse(e,t,s){const r=e.parseExpression(this.precedence-1);if(!t.setPointer)throw new Error(`"${t.type}" is not an array`);if(!e.match("ARRAY_RIGHT"))throw new Error(`No closing bracket for opening bracket "[${r.eval()}"`);return new X(t,r)}}class K{constructor(e=0){this.precedence=e}parse(e,t){let s=e.parseExpression(this.precedence);return e.config.useOptimizer&&e.config.earlyReturnsSkipTokenization&&s.isReturn?e.match("CURLY_RIGHT"):e.consume("CURLY_RIGHT"),e.config.keepGroups?new U(s,"{}"):s}}class V extends w{constructor(e,t){super(),this.count=e,this.expression=t,this.type="LoopExpression"}get allExpressions(){return[this.count,this.expression]}setExpressionAt(e,t){0===e?this.count=t:1===e&&(this.expression=t)}get isReturn(){return this.expression.isReturn}isStatic(){return this.count.isStatic()&&this.expression.isStatic()}eval(){const e=Number(this.count.eval());if(Number.isNaN(e))throw new Error(`First loop() argument must be of type number, received "${typeof this.count.eval()}"`);if(e>1024)throw new Error(`Cannot loop more than 1024x times, received "${e}"`);let t=0;for(;t<e;){t++;const e=this.expression.eval();if(this.expression.isBreak)break;if(!this.expression.isContinue&&this.expression.isReturn)return e}return 0}toString(){return`loop(${this.count.toString()},${this.expression.toString()})`}}class Z{constructor(e=0){this.precedence=e}parse(e,t){e.consume("LEFT_PARENT");const s=[];if(e.match("RIGHT_PARENT"))throw new Error("loop() called without arguments");do{s.push(e.parseExpression())}while(e.match("COMMA"));if(e.consume("RIGHT_PARENT"),2!==s.length)throw new Error("There must be exactly two loop() arguments; found "+s.length);return new V(s[0],s[1])}}class J extends w{constructor(e,t,s){if(super(),this.variable=e,this.arrayExpression=t,this.expression=s,this.type="ForEachExpression",!this.variable.setPointer)throw new Error(`First for_each() argument must be a variable, received "${typeof this.variable.eval()}"`)}get isReturn(){return this.expression.isReturn}get allExpressions(){return[this.variable,this.arrayExpression,this.expression]}setExpressionAt(e,t){0===e?this.variable=t:1===e?this.arrayExpression=t:2===e&&(this.expression=t)}isStatic(){return this.variable.isStatic()&&this.arrayExpression.isStatic()&&this.expression.isStatic()}eval(){const e=this.arrayExpression.eval();if(!Array.isArray(e))throw new Error(`Second for_each() argument must be an array, received "${typeof e}"`);let t=0;for(;t<e.length;){this.variable.setPointer?.(e[t++]);const s=this.expression.eval();if(this.expression.isBreak)break;if(!this.expression.isContinue&&this.expression.isReturn)return s}return 0}toString(){return`loop(${this.variable.toString()},${this.arrayExpression.toString()},${this.expression.toString()})`}}class W{constructor(e=0){this.precedence=e}parse(e,t){e.consume("LEFT_PARENT");const s=[];if(e.match("RIGHT_PARENT"))throw new Error("for_each() called without arguments");do{s.push(e.parseExpression())}while(e.match("COMMA"));if(e.consume("RIGHT_PARENT"),3!==s.length)throw new Error("There must be exactly three for_each() arguments; found "+s.length);return new J(s[0],s[1],s[2])}}class ee extends w{constructor(){super(),this.type="ContinueExpression",this.isContinue=!0}get allExpressions(){return[]}setExpressionAt(){}isStatic(){return!1}eval(){return 0}toString(){return"continue"}}class te{constructor(e=0){this.precedence=e}parse(e,t){return new ee}}class se extends w{constructor(){super(),this.type="BreakExpression",this.isBreak=!0}get allExpressions(){return[]}setExpressionAt(){}isStatic(){return!1}eval(){return 0}isString(){return"break"}}class re{constructor(e=0){this.precedence=e}parse(e,t){return new se}}class ie extends w{constructor(e){super(),this.value=e,this.type="BooleanExpression"}get allExpressions(){return[]}setExpressionAt(){}isStatic(){return!0}eval(){return this.value}}class ne{constructor(e=0){this.precedence=e}parse(e,t){return new ie("true"===t.getText())}}class oe{constructor(e=0){this.precedence=e}parse(e,t,s){return new v(t,e.parseExpression(this.precedence),"==",(e,t)=>e.eval()===t.eval())}}class ae{constructor(e=0){this.precedence=e}parse(e,t,s){if(e.match("EQUALS"))return new v(t,e.parseExpression(this.precedence),"!=",(e,t)=>e.eval()!==t.eval());throw new Error("! was used as a binary operator")}}class he{constructor(e=0){this.precedence=e}parse(e,t,s){if(e.match("AND"))return new v(t,e.parseExpression(this.precedence),"&&",(e,t)=>e.eval()&&t.eval());throw new Error('"&" not followed by another "&"')}}class ce{constructor(e=0){this.precedence=e}parse(e,t,s){if(e.match("OR"))return new v(t,e.parseExpression(this.precedence),"||",(e,t)=>e.eval()||t.eval());throw new Error('"|" not followed by another "|"')}}class ue{constructor(e=0){this.precedence=e}parse(e,t,s){return e.match("EQUALS")?new v(t,e.parseExpression(this.precedence),"<=",(e,t)=>e.eval()<=t.eval()):new v(t,e.parseExpression(this.precedence),"<",(e,t)=>e.eval()<t.eval())}}class pe{constructor(e=0){this.precedence=e}parse(e,t,s){return e.match("EQUALS")?new v(t,e.parseExpression(this.precedence),">=",(e,t)=>e.eval()>=t.eval()):new v(t,e.parseExpression(this.precedence),">",(e,t)=>e.eval()>t.eval())}}class le extends w{constructor(e,t,s){super(),this.leftExpression=e,this.thenExpression=t,this.elseExpression=s,this.type="TernaryExpression"}get allExpressions(){return this.leftExpression.isStatic()?[this.leftExpression,this.leftExpression.eval()?this.thenExpression:this.elseExpression]:[this.leftExpression,this.thenExpression,this.elseExpression]}setExpressionAt(e,t){0===e?this.leftExpression=t:1===e?this.thenExpression=t:2===e&&(this.elseExpression=t)}get isReturn(){return void 0===this.leftResult?this.thenExpression.isReturn&&this.elseExpression.isReturn:this.leftResult?this.thenExpression.isReturn:this.elseExpression.isReturn}get hasReturn(){return this.thenExpression.isReturn||this.elseExpression.isReturn}get isContinue(){return void 0===this.leftResult?this.thenExpression.isContinue&&this.elseExpression.isContinue:this.leftResult?this.thenExpression.isContinue:this.elseExpression.isContinue}get isBreak(){return void 0===this.leftResult?this.thenExpression.isBreak&&this.elseExpression.isBreak:this.leftResult?this.thenExpression.isBreak:this.elseExpression.isBreak}isStatic(){return this.leftExpression.isStatic()&&this.thenExpression.isStatic()&&this.elseExpression.isStatic()}eval(){return this.leftResult=this.leftExpression.eval(),this.leftResult?this.thenExpression.eval():this.elseExpression.eval()}toString(){return this.elseExpression instanceof S?`${this.leftExpression.toString()}?${this.thenExpression.toString()}`:`${this.leftExpression.toString()}?${this.thenExpression.toString()}:${this.elseExpression.toString()}`}}const xe=new class{constructor(e=0){this.precedence=e,this.exprName="Ternary"}parse(e,t,s){let r,i=e.parseExpression(this.precedence-1);return r=e.match("COLON")?e.parseExpression(this.precedence-1):new S,e.config.useOptimizer&&t.isStatic()?t.eval()?i:r:new le(t,i,r)}}(b.CONDITIONAL);class Ee{constructor(e=0){this.precedence=e}parse(e,t,s){return e.match("QUESTION")?new v(t,e.parseExpression(this.precedence),"??",(e,t)=>e.eval()??t.eval()):xe.parse(e,t,s)}}class fe extends class{constructor(e){this.config=e,this.prefixParselets=new Map,this.infixParselets=new Map,this.readTokens=[],this.tokenIterator=new r}updateConfig(e){this.config=e}init(e){this.tokenIterator.init(e),this.readTokens=[]}setTokenizer(e){this.tokenIterator=e}setExecutionEnvironment(e){this.executionEnv=e}parseExpression(e=0){let t=this.consume();if("EOF"===t.getType())return new S;const s=this.prefixParselets.get(t.getType());if(!s)throw new Error(`Cannot parse ${t.getType()} expression "${t.getType()}"`);let r=s.parse(this,t);return this.parseInfixExpression(r,e)}parseInfixExpression(e,t=0){let s;for(;this.getPrecedence()>t;){s=this.consume();let t=s.getType();"EQUALS"!==t||this.match("EQUALS")||(t="ASSIGN");const r=this.infixParselets.get(t);if(!r)throw new Error(`Unknown infix parselet: "${t}"`);e=r.parse(this,e,s)}return e}getPrecedence(){const e=this.infixParselets.get(this.lookAhead(0).getType());return e?.precedence??0}consume(e){const t=this.lookAhead(0);if(e&&t.getType()!==e)throw new Error(`Expected token "${e}" and found "${t.getType()}"`);return this.readTokens.shift(),t}match(e,t=!0){return this.lookAhead(0).getType()===e&&(t&&this.consume(),!0)}lookAhead(e){for(;e>=this.readTokens.length;)this.readTokens.push(this.tokenIterator.next());return this.readTokens[e]}registerInfix(e,t){this.infixParselets.set(e,t)}registerPrefix(e,t){this.prefixParselets.set(e,t)}getInfix(e){return this.infixParselets.get(e)}getPrefix(e){return this.prefixParselets.get(e)}}{constructor(e){super(e),this.registerPrefix("NAME",new _),this.registerPrefix("STRING",new q),this.registerPrefix("NUMBER",new O),this.registerPrefix("TRUE",new ne(b.PREFIX)),this.registerPrefix("FALSE",new ne(b.PREFIX)),this.registerPrefix("RETURN",new G),this.registerPrefix("CONTINUE",new te),this.registerPrefix("BREAK",new re),this.registerPrefix("LOOP",new Z),this.registerPrefix("FOR_EACH",new W),this.registerInfix("QUESTION",new Ee(b.CONDITIONAL)),this.registerPrefix("LEFT_PARENT",new $),this.registerInfix("LEFT_PARENT",new Q(b.FUNCTION)),this.registerInfix("ARRAY_LEFT",new j(b.ARRAY_ACCESS)),this.registerPrefix("CURLY_LEFT",new K(b.SCOPE)),this.registerInfix("SEMICOLON",new z(b.STATEMENT)),this.registerPrefix("MINUS",new P(b.PREFIX)),this.registerPrefix("BANG",new P(b.PREFIX)),this.registerInfix("PLUS",new N(b.SUM)),this.registerInfix("MINUS",new N(b.SUM)),this.registerInfix("ASTERISK",new N(b.PRODUCT)),this.registerInfix("SLASH",new N(b.PRODUCT)),this.registerInfix("EQUALS",new oe(b.EQUALS_COMPARE)),this.registerInfix("BANG",new ae(b.EQUALS_COMPARE)),this.registerInfix("GREATER",new pe(b.COMPARE)),this.registerInfix("SMALLER",new ue(b.COMPARE)),this.registerInfix("AND",new he(b.AND)),this.registerInfix("OR",new ce(b.OR)),this.registerInfix("ASSIGN",new N(b.ASSIGNMENT))}}class ge{constructor(e=0){this.precedence=e}parse(e,t){if(e.consume("LEFT_PARENT"),e.match("RIGHT_PARENT"))throw new Error("function() called without arguments");let s,r,i=[];do{const t=e.parseExpression();if(t instanceof Y)r?i.push(t.eval()):r=t.eval();else{if(!(t instanceof H||t instanceof U))throw new Error(`Unexpected expresion: found "${t.constructor.name}"`);s=t}}while(e.match("COMMA"));if(e.consume("RIGHT_PARENT"),!r)throw new Error(`Missing function() name (argument 1); found "${r}"`);if(!s)throw new Error(`Missing function() body (argument ${i.length+2})`);if("SEMICOLON"!==e.lookAhead(0).getType())throw new Error("Missing semicolon after function expression");return new me(e.functions,r,i,s)}}class me extends w{constructor(e,t,s,r){super(),this.functionBody=r,this.type="CustomFunctionExpression",e.set(t.toLowerCase(),[s,r instanceof U?r.allExpressions[0].toString():r.toString()])}get allExpressions(){return[this.functionBody]}setExpressionAt(e,t){this.functionBody=t}get isReturn(){return!1}isStatic(){return!0}eval(){return 0}}class de{constructor(e={},t={}){this.config=t,this.expressionCache={},this.totalCacheEntries=0,void 0===t.useOptimizer&&(this.config.useOptimizer=!0),void 0===t.useCache&&(this.config.useCache=!0),void 0===t.earlyReturnsSkipParsing&&(this.config.earlyReturnsSkipParsing=!0),void 0===t.earlyReturnsSkipTokenization&&(this.config.earlyReturnsSkipTokenization=!0),void 0===t.convertUndefined&&(this.config.convertUndefined=!1),this.parser=new fe({...this.config,tokenizer:void 0}),this.updateExecutionEnv(e)}updateConfig(e){(e=Object.assign(this.config,e)).tokenizer&&this.parser.setTokenizer(e.tokenizer),this.parser.updateConfig({...this.config,tokenizer:void 0}),this.executionEnvironment.updateConfig(e)}updateExecutionEnv(e,t=!1){this.executionEnvironment=new m(e,{useRadians:this.config.useRadians,convertUndefined:this.config.convertUndefined,isFlat:t,variableHandler:this.config.variableHandler}),this.parser.setExecutionEnvironment(this.executionEnvironment)}clearCache(){this.expressionCache={},this.totalCacheEntries=0}execute(e){this.parser.setExecutionEnvironment(this.executionEnvironment);const t=this.parse(e).eval();return void 0===t?0:"boolean"==typeof t?Number(t):t}executeAndCatch(e){try{return this.execute(e)}catch{return 0}}parse(e){if(this.config.useCache??1){const t=this.expressionCache[e];if(t)return t}this.parser.init(e);let t=this.parser.parseExpression();return(this.config.useOptimizer??1)&&t.isStatic()&&(t=new B(t.eval())),(this.config.useCache??1)&&(this.totalCacheEntries>(this.config.maxCacheSize||256)&&this.clearCache(),this.expressionCache[e]=t,this.totalCacheEntries++),t}resolveStatic(e){e.walk(e=>{if(!(e instanceof Y))return e.isStatic()?new B(e.eval()):void 0})}getParser(){return this.parser}}class we extends fe{constructor(e){super(e),this.functions=new Map,this.registerPrefix("FUNCTION",new ge)}reset(){this.functions.clear()}}class Se{constructor(e){this.parser=new we({useCache:!1,useOptimizer:!0,useAgressiveStaticOptimizer:!0,keepGroups:!0,earlyReturnsSkipParsing:!1,earlyReturnsSkipTokenization:!1}),this.parser.setExecutionEnvironment(new m(this.parser,e)),this.parser.setTokenizer(new r(new Set(["function"])))}get functions(){return this.parser.functions}parse(e){this.parser.init(e.replace(/\"/g,"'"));return this.parser.parseExpression()}transform(e){const t=new de({},{useCache:!1,keepGroups:!0,useOptimizer:!0,useAgressiveStaticOptimizer:!0,earlyReturnsSkipParsing:!0,earlyReturnsSkipTokenization:!1});let s=0,r=t.parse(e),i=!1;r instanceof H&&(i=!0);let n=!1;r=r.walk(e=>{if("FunctionExpression"!==e.type)return;const r=e.name.name.replace(/(f|function)\./g,""),i=e.args;let[o,a]=this.functions.get(r)??[];if(!a||!o)return;a=a.replace(/(a|arg)\.(\w+)/g,(e,t,s)=>(i[o.indexOf(s)]?.toString()??"0").replace(/(t|temp)\./,"outer_temp."));let h=function(e){if(e instanceof F)return new U(e.allExpressions[0],"()");if(!(e instanceof H))return e;if(e.allExpressions.length>1)return e;const t=e.allExpressions[0];return t instanceof F?new U(t.allExpressions[0],"()"):e}(t.parse(a));h instanceof H&&(h=t.parse(`({${a}}+t.return_value)`),n=!0);const c=new Map;return h=h.walk(e=>{if(e instanceof L){let t=e.toString().split(".");const r=t.shift(),[i,...n]=t,o=n.length>0?"."+n.join("."):"";if("t"===r||"temp"===r){let t=c.get(i);t||(t="t.__scvar"+s++,c.set(i,t)),e.setName(`${t}${o}`)}else"outer_temp"===r&&e.setName(`t.${i}${o}`)}else{if(e instanceof F){const s=new L(t.getParser().executionEnv,"t.return_value"),r=e.allExpressions[0];return new v(s,r,"=",()=>{s.setPointer(r.eval())})}if(e instanceof H){const t=[];for(let s=0;s<e.allExpressions.length;s++){const r=e.allExpressions[s];if(r instanceof le&&r.hasReturn){ve(r,e.allExpressions.slice(s+1)),t.push(r);break}if(r.isReturn){t.push(r);break}t.push(r)}return new H(t)}}}),h});const o=t.parse(r.toString());return t.resolveStatic(o),!i&&n?`return ${o.toString()};`:o.toString()}reset(){this.functions.clear()}}function ve(e,t){if(e.isReturn)return;const s=e.allExpressions[2].isReturn?1:2,r=e.allExpressions[s];r instanceof S||(r instanceof U&&r.allExpressions[0]instanceof H?t.unshift(...r.allExpressions):t.unshift(r)),t.length>0&&e.setExpressionAt(s,new U(new H(t),"{}"))}var Re=Object.freeze({__proto__:null,ArrayAccessExpression:X,BooleanExpression:ie,BreakExpression:se,ContinueExpression:ee,ForEachExpression:J,FunctionExpression:D,GenericOperatorExpression:v,GroupExpression:U,LoopExpression:V,NameExpression:L,NumberExpression:I,PostfixExpression:class extends w{constructor(e,t){super(),this.expression=e,this.tokenType=t,this.type="PostfixExpression"}get allExpressions(){return[this.expression]}setExpressionAt(e,t){this.expression=t}isStatic(){return this.expression.isStatic()}eval(){this.tokenType}},PrefixExpression:k,ReturnExpression:F,StatementExpression:H,StaticExpression:B,StringExpression:Y,TernaryExpression:le,VoidExpression:S});export{d as Context,Se as CustomMoLang,de as MoLang,r as Tokenizer,Re as expressions};
