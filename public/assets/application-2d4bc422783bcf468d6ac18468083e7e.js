/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/* ========================================================================
 * Bootstrap: transition.js v3.1.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition'    : 'transitionend',
      'OTransition'      : 'oTransitionEnd otransitionend',
      'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.1.1
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.1.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal', '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.1.1
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role=menu]' + desc + ', [role=listbox]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).focus()
  }

  function clearMenus(e) {
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu], [role=listbox]', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.1.1
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.1.1
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.1.1
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return
      var that = this;

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.hoverState = null

      var complete = function() {
        that.$element.trigger('shown.bs.' + that.type)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one($.support.transition.end, complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth,
      height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.1.1
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.1.1
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.1.1
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.1.1
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return this.sliding = false

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })
    this.$element.trigger(e)
    if (e.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid.bs.carousel', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid.bs.carousel') }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid.bs.carousel')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: affix.js v3.1.1
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$window.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (this.affixed == 'top') position.top += scrollTop

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({ top: scrollHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(jQuery);












/*

$.Link (part of noUiSlider) - WTFPL */

(function(c) {
    function m(a, c, d) {
        if ((a[c] || a[d]) && a[c] === a[d]) throw Error("(Link) '" + c + "' can't match '" + d + "'.'");
    }

    function r(a) {
        void 0 === a && (a = {});
        if ("object" !== typeof a) throw Error("(Format) 'format' option must be an object.");
        var h = {};
        c(u).each(function(c, n) {
            if (void 0 === a[n]) h[n] = A[c];
            else if (typeof a[n] === typeof A[c]) {
                if ("decimals" === n && (0 > a[n] || 7 < a[n])) throw Error("(Format) 'format.decimals' option must be between 0 and 7.");
                h[n] = a[n]
            } else throw Error("(Format) 'format." + n + "' must be a " + typeof A[c] +
                ".");
        });
        m(h, "mark", "thousand");
        m(h, "prefix", "negative");
        m(h, "prefix", "negativeBefore");
        this.r = h
    }

    function k(a, h) {
        "object" !== typeof a && c.error("(Link) Initialize with an object.");
        return new k.prototype.p(a.target || function() {}, a.method, a.format || {}, h)
    }
    var u = "decimals mark thousand prefix postfix encoder decoder negative negativeBefore to from".split(" "),
        A = [2, ".", "", "", "", function(a) {
            return a
        }, function(a) {
            return a
        }, "-", "", function(a) {
            return a
        }, function(a) {
            return a
        }];
    r.prototype.a = function(a) {
        return this.r[a]
    };
    r.prototype.L = function(a) {
        function c(a) {
            return a.split("").reverse().join("")
        }
        a = this.a("encoder")(a);
        var d = this.a("decimals"),
            n = "",
            k = "",
            m = "",
            r = "";
        0 === parseFloat(a.toFixed(d)) && (a = "0");
        0 > a && (n = this.a("negative"), k = this.a("negativeBefore"));
        a = Math.abs(a).toFixed(d).toString();
        a = a.split(".");
        this.a("thousand") ? (m = c(a[0]).match(/.{1,3}/g), m = c(m.join(c(this.a("thousand"))))) : m = a[0];
        this.a("mark") && 1 < a.length && (r = this.a("mark") + a[1]);
        return this.a("to")(k + this.a("prefix") + n + m + r + this.a("postfix"))
    };
    r.prototype.w =
        function(a) {
            function c(a) {
                return a.replace(/[\-\/\\\^$*+?.()|\[\]{}]/g, "\\$&")
            }
            var d;
            if (null === a || void 0 === a) return !1;
            a = this.a("from")(a);
            a = a.toString();
            d = a.replace(RegExp("^" + c(this.a("negativeBefore"))), "");
            a !== d ? (a = d, d = "-") : d = "";
            a = a.replace(RegExp("^" + c(this.a("prefix"))), "");
            this.a("negative") && (d = "", a = a.replace(RegExp("^" + c(this.a("negative"))), "-"));
            a = a.replace(RegExp(c(this.a("postfix")) + "$"), "").replace(RegExp(c(this.a("thousand")), "g"), "").replace(this.a("mark"), ".");
            a = this.a("decoder")(parseFloat(d +
                a));
            return isNaN(a) ? !1 : a
        };
    k.prototype.K = function(a, h) {
        this.method = h || "html";
        this.j = c(a.replace("-tooltip-", "") || "<div/>")[0]
    };
    k.prototype.H = function(a) {
        this.method = "val";
        this.j = document.createElement("input");
        this.j.name = a;
        this.j.type = "hidden"
    };
    k.prototype.G = function(a) {
        function h(a, c) {
            return [c ? null : a, c ? a : null]
        }
        var d = this;
        this.method = "val";
        this.target = a.on("change", function(a) {
            d.B.val(h(c(a.target).val(), d.t), {
                link: d,
                set: !0
            })
        })
    };
    k.prototype.p = function(a, h, d, k) {
        this.g = d;
        this.update = !k;
        if ("string" ===
            typeof a && 0 === a.indexOf("-tooltip-")) this.K(a, h);
        else if ("string" === typeof a && 0 !== a.indexOf("-")) this.H(a);
        else if ("function" === typeof a) this.target = !1, this.method = a;
        else {
            if (a instanceof c || c.zepto && c.zepto.isZ(a)) {
                if (!h) {
                    if (a.is("input, select, textarea")) {
                        this.G(a);
                        return
                    }
                    h = "html"
                }
                if ("function" === typeof h || "string" === typeof h && a[h]) {
                    this.method = h;
                    this.target = a;
                    return
                }
            }
            throw new RangeError("(Link) Invalid Link.");
        }
    };
    k.prototype.write = function(a, c, d, k) {
        if (!this.update || !1 !== k)
            if (this.u = a, this.F = a =
                this.format(a), "function" === typeof this.method) this.method.call(this.target[0] || d[0], a, c, d);
            else this.target[this.method](a, c, d)
    };
    k.prototype.q = function(a) {
        this.g = new r(c.extend({}, a, this.g instanceof r ? this.g.r : this.g))
    };
    k.prototype.J = function(a) {
        this.B = a
    };
    k.prototype.I = function(a) {
        this.t = a
    };
    k.prototype.format = function(a) {
        return this.g.L(a)
    };
    k.prototype.A = function(a) {
        return this.g.w(a)
    };
    k.prototype.p.prototype = k.prototype;
    c.Link = k
})(window.jQuery || window.Zepto);
/*

$.fn.noUiSlider - WTFPL - refreshless.com/nouislider/ */
(function(c) {
    function m(e) {
        return "number" === typeof e && !isNaN(e) && isFinite(e)
    }

    function r(e) {
        return c.isArray(e) ? e : [e]
    }

    function k(e, b) {
        e.addClass(b);
        setTimeout(function() {
            e.removeClass(b)
        }, 300)
    }

    function u(e, b) {
        return 100 * b / (e[1] - e[0])
    }

    function A(e, b) {
        if (b >= e.d.slice(-1)[0]) return 100;
        for (var a = 1, c, f, d; b >= e.d[a];) a++;
        c = e.d[a - 1];
        f = e.d[a];
        d = e.c[a - 1];
        c = [c, f];
        return d + u(c, 0 > c[0] ? b + Math.abs(c[0]) : b - c[0]) / (100 / (e.c[a] - d))
    }

    function a(e, b) {
        if (100 <= b) return e.d.slice(-1)[0];
        for (var a = 1, c, f, d; b >= e.c[a];) a++;
        c =
            e.d[a - 1];
        f = e.d[a];
        d = e.c[a - 1];
        c = [c, f];
        return 100 / (e.c[a] - d) * (b - d) * (c[1] - c[0]) / 100 + c[0]
    }

    function h(a, b) {
        for (var c = 1, g;
            (a.dir ? 100 - b : b) >= a.c[c];) c++;
        if (a.m) return g = a.c[c - 1], c = a.c[c], b - g > (c - g) / 2 ? c : g;
        a.h[c - 1] ? (g = a.h[c - 1], c = a.c[c - 1] + Math.round((b - a.c[c - 1]) / g) * g) : c = b;
        return c
    }

    function d(a, b) {
        if (!m(b)) throw Error("noUiSlider: 'step' is not numeric.");
        a.h[0] = b
    }

    function n(a, b) {
        if ("object" !== typeof b || c.isArray(b)) throw Error("noUiSlider: 'range' is not an object.");
        if (void 0 === b.min || void 0 === b.max) throw Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
        c.each(b, function(b, g) {
            var d;
            "number" === typeof g && (g = [g]);
            if (!c.isArray(g)) throw Error("noUiSlider: 'range' contains invalid value.");
            d = "min" === b ? 0 : "max" === b ? 100 : parseFloat(b);
            if (!m(d) || !m(g[0])) throw Error("noUiSlider: 'range' value isn't numeric.");
            a.c.push(d);
            a.d.push(g[0]);
            d ? a.h.push(isNaN(g[1]) ? !1 : g[1]) : isNaN(g[1]) || (a.h[0] = g[1])
        });
        c.each(a.h, function(b, c) {
            if (!c) return !0;
            a.h[b] = u([a.d[b], a.d[b + 1]], c) / (100 / (a.c[b + 1] - a.c[b]))
        })
    }

    function E(a, b) {
        "number" === typeof b && (b = [b]);
        if (!c.isArray(b) || !b.length ||
            2 < b.length) throw Error("noUiSlider: 'start' option is incorrect.");
        a.b = b.length;
        a.start = b
    }

    function I(a, b) {
        a.m = b;
        if ("boolean" !== typeof b) throw Error("noUiSlider: 'snap' option must be a boolean.");
    }

    function J(a, b) {
        if ("lower" === b && 1 === a.b) a.i = 1;
        else if ("upper" === b && 1 === a.b) a.i = 2;
        else if (!0 === b && 2 === a.b) a.i = 3;
        else if (!1 === b) a.i = 0;
        else throw Error("noUiSlider: 'connect' option doesn't match handle count.");
    }

    function D(a, b) {
        switch (b) {
            case "horizontal":
                a.k = 0;
                break;
            case "vertical":
                a.k = 1;
                break;
            default:
                throw Error("noUiSlider: 'orientation' option is invalid.");
        }
    }

    function K(a, b) {
        if (2 < a.c.length) throw Error("noUiSlider: 'margin' option is only supported on linear sliders.");
        a.margin = u(a.d, b);
        if (!m(b)) throw Error("noUiSlider: 'margin' option must be numeric.");
    }

    function L(a, b) {
        switch (b) {
            case "ltr":
                a.dir = 0;
                break;
            case "rtl":
                a.dir = 1;
                a.i = [0, 2, 1, 3][a.i];
                break;
            default:
                throw Error("noUiSlider: 'direction' option was not recognized.");
        }
    }

    function M(a, b) {
        if ("string" !== typeof b) throw Error("noUiSlider: 'behaviour' must be a string containing options.");
        var c = 0 <= b.indexOf("snap");
        a.n = {
            s: 0 <= b.indexOf("tap") || c,
            extend: 0 <= b.indexOf("extend"),
            v: 0 <= b.indexOf("drag"),
            fixed: 0 <= b.indexOf("fixed"),
            m: c
        }
    }

    function N(a, b, d) {
        a.o = [b.lower, b.upper];
        a.g = b.format;
        c.each(a.o, function(a, e) {
            if (!c.isArray(e)) throw Error("noUiSlider: 'serialization." + (a ? "upper" : "lower") + "' must be an array.");
            c.each(e, function() {
                if (!(this instanceof c.Link)) throw Error("noUiSlider: 'serialization." + (a ? "upper" : "lower") + "' can only contain Link instances.");
                this.I(a);
                this.J(d);
                this.q(b.format)
            })
        });
        a.dir && 1 < a.b && a.o.reverse()
    }

    function O(a, b) {
        var f = {
                c: [],
                d: [],
                h: [!1],
                margin: 0
            },
            g;
        g = {
            step: {
                e: !1,
                f: d
            },
            start: {
                e: !0,
                f: E
            },
            connect: {
                e: !0,
                f: J
            },
            direction: {
                e: !0,
                f: L
            },
            range: {
                e: !0,
                f: n
            },
            snap: {
                e: !1,
                f: I
            },
            orientation: {
                e: !1,
                f: D
            },
            margin: {
                e: !1,
                f: K
            },
            behaviour: {
                e: !0,
                f: M
            },
            serialization: {
                e: !0,
                f: N
            }
        };
        a = c.extend({
            connect: !1,
            direction: "ltr",
            behaviour: "tap",
            orientation: "horizontal"
        }, a);
        a.serialization = c.extend({
            lower: [],
            upper: [],
            format: {}
        }, a.serialization);
        c.each(g, function(c, d) {
            if (void 0 === a[c]) {
                if (d.e) throw Error("noUiSlider: '" + c + "' is required.");
                return !0
            }
            d.f(f, a[c], b)
        });
        f.style = f.k ? "top" : "left";
        return f
    }

    function P(a, b) {
        var d = c("<div><div/></div>").addClass(f[2]),
            g = ["-lower", "-upper"];
        a.dir && g.reverse();
        d.children().addClass(f[3] + " " + f[3] + g[b]);
        return d
    }

    function Q(a, b) {
        b.j && (b = new c.Link({
            target: c(b.j).clone().appendTo(a),
            method: b.method,
            format: b.g
        }, !0));
        return b
    }

    function R(a, b) {
        var d, f = [];
        for (d = 0; d < a.b; d++) {
            var k = f,
                h = d,
                m = a.o[d],
                n = b[d].children(),
                r = a.g,
                s = void 0,
                v = [],
                s = new c.Link({}, !0);
            s.q(r);
            v.push(s);
            for (s = 0; s < m.length; s++) v.push(Q(n, m[s]));
            k[h] = v
        }
        return f
    }

    function S(a, b, c) {
        switch (a) {
            case 1:
                b.addClass(f[7]);
                c[0].addClass(f[6]);
                break;
            case 3:
                c[1].addClass(f[6]);
            case 2:
                c[0].addClass(f[7]);
            case 0:
                b.addClass(f[6])
        }
    }

    function T(a, b) {
        var c, d = [];
        for (c = 0; c < a.b; c++) d.push(P(a, c).appendTo(b));
        return d
    }

    function U(a, b) {
        b.addClass([f[0], f[8 + a.dir], f[4 + a.k]].join(" "));
        return c("<div/>").appendTo(b).addClass(f[1])
    }

    function V(d, b, m) {
        function g() {
            return t[["width", "height"][b.k]]()
        }

        function n(a) {
            var b, c = [q.val()];
            for (b = 0; b < a.length; b++) q.trigger(a[b],
                c)
        }

        function u(d, p, e) {
            var g = d[0] !== l[0][0] ? 1 : 0,
                H = x[0] + b.margin,
                k = x[1] - b.margin;
            e && 1 < l.length && (p = g ? Math.max(p, H) : Math.min(p, k));
            100 > p && (p = h(b, p));
            p = Math.max(Math.min(parseFloat(p.toFixed(7)), 100), 0);
            if (p === x[g]) return 1 === l.length ? !1 : p === H || p === k ? 0 : !1;
            d.css(b.style, p + "%");
            d.is(":first-child") && d.toggleClass(f[17], 50 < p);
            x[g] = p;
            b.dir && (p = 100 - p);
            c(y[g]).each(function() {
                this.write(a(b, p), d.children(), q)
            });
            return !0
        }

        function B(a, b, c) {
            c || k(q, f[14]);
            u(a, b, !1);
            n(["slide", "set", "change"])
        }

        function w(a, c, d, e) {
            a =
                a.replace(/\s/g, ".nui ") + ".nui";
            c.on(a, function(a) {
                var c = q.attr("disabled");
                if (q.hasClass(f[14]) || void 0 !== c && null !== c) return !1;
                a.preventDefault();
                var c = 0 === a.type.indexOf("touch"),
                    p = 0 === a.type.indexOf("mouse"),
                    F = 0 === a.type.indexOf("pointer"),
                    g, k, l = a;
                0 === a.type.indexOf("MSPointer") && (F = !0);
                a.originalEvent && (a = a.originalEvent);
                c && (g = a.changedTouches[0].pageX, k = a.changedTouches[0].pageY);
                if (p || F) F || void 0 !== window.pageXOffset || (window.pageXOffset = document.documentElement.scrollLeft, window.pageYOffset =
                    document.documentElement.scrollTop), g = a.clientX + window.pageXOffset, k = a.clientY + window.pageYOffset;
                l.C = [g, k];
                l.cursor = p;
                a = l;
                a.l = a.C[b.k];
                d(a, e)
            })
        }

        function C(a, c) {
            var b = c.b || l,
                d, e = !1,
                e = 100 * (a.l - c.start) / g(),
                f = b[0][0] !== l[0][0] ? 1 : 0;
            var k = c.D;
            d = e + k[0];
            e += k[1];
            1 < b.length ? (0 > d && (e += Math.abs(d)), 100 < e && (d -= e - 100), d = [Math.max(Math.min(d, 100), 0), Math.max(Math.min(e, 100), 0)]) : d = [d, e];
            e = u(b[0], d[f], 1 === b.length);
            1 < b.length && (e = u(b[1], d[f ? 0 : 1], !1) || e);
            e && n(["slide"])
        }

        function s(a) {
            c("." + f[15]).removeClass(f[15]);
            a.cursor && c("body").css("cursor", "").off(".nui");
            G.off(".nui");
            q.removeClass(f[12]);
            n(["set", "change"])
        }

        function v(a, b) {
            1 === b.b.length && b.b[0].children().addClass(f[15]);
            a.stopPropagation();
            w(z.move, G, C, {
                start: a.l,
                b: b.b,
                D: [x[0], x[l.length - 1]]
            });
            w(z.end, G, s, null);
            a.cursor && (c("body").css("cursor", c(a.target).css("cursor")), 1 < l.length && q.addClass(f[12]), c("body").on("selectstart.nui", !1))
        }

        function D(a) {
            var d = a.l,
                e = 0;
            a.stopPropagation();
            c.each(l, function() {
                e += this.offset()[b.style]
            });
            e = d < e / 2 || 1 === l.length ?
                0 : 1;
            d -= t.offset()[b.style];
            d = 100 * d / g();
            B(l[e], d, b.n.m);
            b.n.m && v(a, {
                b: [l[e]]
            })
        }

        function E(a) {
            var c = (a = a.l < t.offset()[b.style]) ? 0 : 100;
            a = a ? 0 : l.length - 1;
            B(l[a], c, !1)
        }
        var q = c(d),
            x = [-1, -1],
            t, y, l;
        if (q.hasClass(f[0])) throw Error("Slider was already initialized.");
        t = U(b, q);
        l = T(b, t);
        y = R(b, l);
        S(b.i, q, l);
        (function(a) {
            var b;
            if (!a.fixed)
                for (b = 0; b < l.length; b++) w(z.start, l[b].children(), v, {
                    b: [l[b]]
                });
            a.s && w(z.start, t, D, {
                b: l
            });
            a.extend && (q.addClass(f[16]), a.s && w(z.start, q, E, {
                b: l
            }));
            a.v && (b = t.find("." + f[7]).addClass(f[10]),
                a.fixed && (b = b.add(t.children().not(b).children())), w(z.start, b, v, {
                    b: l
                }))
        })(b.n);
        d.vSet = function() {
            var a = Array.prototype.slice.call(arguments, 0),
                d, e, g, h, m, s, t = r(a[0]);
            "object" === typeof a[1] ? (d = a[1].set, e = a[1].link, g = a[1].update, h = a[1].animate) : !0 === a[1] && (d = !0);
            b.dir && 1 < b.b && t.reverse();
            h && k(q, f[14]);
            a = 1 < l.length ? 3 : 1;
            1 === t.length && (a = 1);
            for (m = 0; m < a; m++) h = e || y[m % 2][0], h = h.A(t[m % 2]), !1 !== h && (h = A(b, h), b.dir && (h = 100 - h), !0 !== u(l[m % 2], h, !0) && c(y[m % 2]).each(function(a) {
                if (!a) return s = this.u, !0;
                this.write(s,
                    l[m % 2].children(), q, g)
            }));
            !0 === d && n(["set"]);
            return this
        };
        d.vGet = function() {
            var a, c = [];
            for (a = 0; a < b.b; a++) c[a] = y[a][0].F;
            return 1 === c.length ? c[0] : b.dir ? c.reverse() : c
        };
        d.destroy = function() {
            c.each(y, function() {
                c.each(this, function() {
                    this.target && this.target.off(".nui")
                })
            });
            c(this).off(".nui").removeClass(f.join(" ")).empty();
            return m
        };
        q.val(b.start)
    }

    function W(a) {
        if (!this.length) throw Error("noUiSlider: Can't initialize slider on empty selection.");
        var b = O(a, this);
        return this.each(function() {
            V(this,
                b, a)
        })
    }

    function X(a) {
        return this.each(function() {
            var b = c(this).val(),
                d = this.destroy(),
                f = c.extend({}, d, a);
            c(this).noUiSlider(f);
            d.start === f.start && c(this).val(b)
        })
    }

    function B() {
        return this[0][arguments.length ? "vSet" : "vGet"].apply(this[0], arguments)
    }
    var G = c(document),
        C = c.fn.val,
        z = window.navigator.pointerEnabled ? {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup"
        } : window.navigator.msPointerEnabled ? {
            start: "MSPointerDown",
            move: "MSPointerMove",
            end: "MSPointerUp"
        } : {
            start: "mousedown touchstart",
            move: "mousemove touchmove",
            end: "mouseup touchend"
        },
        f = "noUi-target noUi-base noUi-origin noUi-handle noUi-horizontal noUi-vertical noUi-background noUi-connect noUi-ltr noUi-rtl noUi-dragable  noUi-state-drag  noUi-state-tap noUi-active noUi-extended noUi-stacking".split(" ");
    c.fn.val = function() {
        var a = arguments,
            b = c(this[0]);
        return arguments.length ? this.each(function() {
            (c(this).hasClass(f[0]) ? B : C).apply(c(this), a)
        }) : (b.hasClass(f[0]) ? B : C).call(b)
    };
    c.noUiSlider = {
        Link: c.Link
    };
    c.fn.noUiSlider = function(a, b) {
        return (b ? X : W).call(this,
            a)
    }
})(window.jQuery || window.Zepto);
/* globals jQuery */


(function($) {
  // Selector to select only not already processed elements
  $.expr[":"].notmdproc = function(obj){
    if ($(obj).data("mdproc")) {
      return false;
    } else {
      return true;
    }
  };

  function _isChar(evt) {
    if (typeof evt.which == "undefined") {
      return true;
    } else if (typeof evt.which == "number" && evt.which > 0) {
      return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8 && evt.which != 9;
    }
    return false;
  }

  $.material =  {
    "options": {
      // These options set what will be started by $.material.init()
      "input": true,
      "ripples": true,
      "checkbox": true,
      "togglebutton": true,
      "radio": true,
      "arrive": true,
      "autofill": false,

      "withRipples": [
        ".btn:not(.btn-link)",
        ".card-image",
        ".navbar a:not(.withoutripple)",
        ".dropdown-menu a",
        ".nav-tabs a:not(.withoutripple)",
        ".withripple",
        ".pagination li:not(.active, .disabled) a:not(.withoutripple)"
      ].join(","),
      "inputElements": "input.form-control, textarea.form-control, select.form-control",
      "checkboxElements": ".checkbox > label > input[type=checkbox]",
      "togglebuttonElements": ".togglebutton > label > input[type=checkbox]",
      "radioElements": ".radio > label > input[type=radio]"
    },
    "checkbox": function(selector) {
      // Add fake-checkbox to material checkboxes
      $((selector) ? selector : this.options.checkboxElements)
      .filter(":notmdproc")
      .data("mdproc", true)
      .after("<span class=checkbox-material><span class=check></span></span>");
    },
    "togglebutton": function(selector) {
      // Add fake-checkbox to material checkboxes
      $((selector) ? selector : this.options.togglebuttonElements)
      .filter(":notmdproc")
      .data("mdproc", true)
      .after("<span class=toggle></span>");
    },
    "radio": function(selector) {
      // Add fake-radio to material radios
      $((selector) ? selector : this.options.radioElements)
      .filter(":notmdproc")
      .data("mdproc", true)
      .after("<span class=circle></span><span class=check></span>");
    },
    "input": function(selector) {
      $((selector) ? selector : this.options.inputElements)
      .filter(":notmdproc")
      .data("mdproc", true)
      .each( function() {
        var $this = $(this);

        if (!$(this).attr("data-hint") && !$this.hasClass("floating-label")) {
          return;
        }
        $this.wrap("<div class=form-control-wrapper></div>");
        $this.after("<span class=material-input></span>");

        // Add floating label if required
        if ($this.hasClass("floating-label")) {
          var placeholder = $this.attr("placeholder");
          $this.attr("placeholder", null).removeClass("floating-label");
          $this.after("<div class=floating-label>" + placeholder + "</div>");
        }

        // Add hint label if required
        if ($this.attr("data-hint")) {
          $this.after("<div class=hint>" + $this.attr("data-hint") + "</div>");
        }

        // Set as empty if is empty (damn I must improve this...)
        if ($this.val() === null || $this.val() == "undefined" || $this.val() === "") {
          $this.addClass("empty");
        }

        // Support for file input
        if ($this.parent().next().is("[type=file]")) {
          $this.parent().addClass("fileinput");
          var $input = $this.parent().next().detach();
          $this.after($input);
        }
      });

      $(document)
      .on("change", ".checkbox input[type=checkbox]", function() { $(this).blur(); })
      .on("keydown paste", ".form-control", function(e) {
        if(_isChar(e)) {
          $(this).removeClass("empty");
        }
      })
      .on("keyup change", ".form-control", function() {
        var $this = $(this);
        if ($this.val() === "" && (typeof $this[0].checkValidity != "undefined" && $this[0].checkValidity())) {
          $this.addClass("empty");
        } else {
          $this.removeClass("empty");
        }
      })
      .on("focus", ".form-control-wrapper.fileinput", function() {
        $(this).find("input").addClass("focus");
      })
      .on("blur", ".form-control-wrapper.fileinput", function() {
        $(this).find("input").removeClass("focus");
      })
      .on("change", ".form-control-wrapper.fileinput [type=file]", function() {
        var value = "";
        $.each($(this)[0].files, function(i, file) {
          value += file.name + ", ";
        });
        value = value.substring(0, value.length - 2);
        if (value) {
          $(this).prev().removeClass("empty");
        } else {
          $(this).prev().addClass("empty");
        }
        $(this).prev().val(value);
      });
    },
    "ripples": function(selector) {
      $((selector) ? selector : this.options.withRipples).ripples();
    },
    "autofill": function() {

      // This part of code will detect autofill when the page is loading (username and password inputs for example)
      var loading = setInterval(function() {
        $("input[type!=checkbox]").each(function() {
          if ($(this).val() && $(this).val() !== $(this).attr("value")) {
            $(this).trigger("change");
          }
        });
      }, 100);

      // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
      setTimeout(function() {
        clearInterval(loading);
      }, 10000);
      // Now we just listen on inputs of the focused form (because user can select from the autofill dropdown only when the input has focus)
      var focused;
      $(document)
      .on("focus", "input", function() {
        var $inputs = $(this).parents("form").find("input").not("[type=file]");
        focused = setInterval(function() {
          $inputs.each(function() {
            if ($(this).val() !== $(this).attr("value")) {
              $(this).trigger("change");
            }
          });
        }, 100);
      })
      .on("blur", "input", function() {
        clearInterval(focused);
      });
    },
    "init": function() {
      if ($.fn.ripples && this.options.ripples) {
        this.ripples();
      }
      if (this.options.input) {
        this.input();
      }
      if (this.options.checkbox) {
        this.checkbox();
      }
      if (this.options.togglebutton) {
        this.togglebutton();
      }
      if (this.options.radio) {
        this.radio();
      }
      if (this.options.autofill) {
        this.autofill();
      }

      if (document.arrive && this.options.arrive) {
        if ($.fn.ripples && this.options.ripples) {
          $(document).arrive(this.options.withRipples, function() {
            $.material.ripples($(this));
          });
        }
        if (this.options.input) {
          $(document).arrive(this.options.inputElements, function() {
            $.material.input($(this));
          });
        }
        if (this.options.checkbox) {
          $(document).arrive(this.options.checkboxElements, function() {
            $.material.checkbox($(this));
          });
        }
        if (this.options.radio) {
          $(document).arrive(this.options.radioElements, function() {
            $.material.radio($(this));
          });
        }
        if (this.options.togglebutton) {
          $(document).arrive(this.options.togglebuttonElements, function() {
            $.material.togglebutton($(this));
          });
        }

      }
    }
  };

})(jQuery);
/* Copyright 2014+, Federico Zivolo, LICENSE at https://github.com/FezVrasta/bootstrap-material-design/blob/master/LICENSE.md */
/* globals jQuery, navigator */


(function($, window, document, undefined) {

  "use strict";

  /**
   * Define the name of the plugin
   */
  var ripples = "ripples";


  /**
   * Get an instance of the plugin
   */
  var self = null;


  /**
   * Define the defaults of the plugin
   */
  var defaults = {};


  /**
   * Create the main plugin function
   */
  function Ripples(element, options) {
    self = this;

    this.element = $(element);

    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = ripples;

    this.init();
  }


  /**
   * Initialize the plugin
   */
  Ripples.prototype.init = function() {
    var $element  = this.element;

    $element.on("mousedown touchstart", function(event) {
      /**
       * Verify if the user is just touching on a device and return if so
       */
      if(self.isTouch() && event.type === "mousedown") {
        return;
      }


      /**
       * Verify if the current element already has a ripple wrapper element and
       * creates if it doesn't
       */
      if(!($element.find(".ripple-wrapper").length)) {
        $element.append("<div class=\"ripple-wrapper\"></div>");
      }


      /**
       * Find the ripple wrapper
       */
      var $wrapper = $element.children(".ripple-wrapper");


      /**
       * Get relY and relX positions
       */
      var relY = self.getRelY($wrapper, event);
      var relX = self.getRelX($wrapper, event);


      /**
       * If relY and/or relX are false, return the event
       */
      if(!relY && !relX) {
        return;
      }


      /**
       * Get the ripple color
       */
      var rippleColor = self.getRipplesColor($element);


      /**
       * Create the ripple element
       */
      var $ripple = $("<div></div>");

      $ripple
      .addClass("ripple")
      .css({
        "left": relX,
        "top": relY,
        "background-color": rippleColor
      });


      /**
       * Append the ripple to the wrapper
       */
      $wrapper.append($ripple);


      /**
       * Make sure the ripple has the styles applied (ugly hack but it works)
       */
      (function() { return window.getComputedStyle($ripple[0]).opacity; })();


      /**
       * Turn on the ripple animation
       */
      self.rippleOn($element, $ripple);


      /**
       * Call the rippleEnd function when the transition "on" ends
       */
      setTimeout(function() {
        self.rippleEnd($ripple);
      }, 500);


      /**
       * Detect when the user leaves the element
       */
      $element.on("mouseup mouseleave touchend", function() {
        $ripple.data("mousedown", "off");

        if($ripple.data("animating") === "off") {
          self.rippleOut($ripple);
        }
      });

    });
  };


  /**
   * Get the new size based on the element height/width and the ripple width
   */
  Ripples.prototype.getNewSize = function($element, $ripple) {

    return (Math.max($element.outerWidth(), $element.outerHeight()) / $ripple.outerWidth()) * 2.5;
  };


  /**
   * Get the relX
   */
  Ripples.prototype.getRelX = function($wrapper,  event) {
    var wrapperOffset = $wrapper.offset();

    if(!self.isTouch()) {
      /**
       * Get the mouse position relative to the ripple wrapper
       */
      return event.pageX - wrapperOffset.left;
    } else {
      /**
       * Make sure the user is using only one finger and then get the touch
       * position relative to the ripple wrapper
       */
      event = event.originalEvent;

      if(event.touches.length === 1) {
        return event.touches[0].pageX - wrapperOffset.left;
      }

      return false;
    }
  };


  /**
   * Get the relY
   */
  Ripples.prototype.getRelY = function($wrapper, event) {
    var wrapperOffset = $wrapper.offset();

    if(!self.isTouch()) {
      /**
       * Get the mouse position relative to the ripple wrapper
       */
      return event.pageY - wrapperOffset.top;
    } else {
      /**
       * Make sure the user is using only one finger and then get the touch
       * position relative to the ripple wrapper
       */
      event = event.originalEvent;

      if(event.touches.length === 1) {
        return event.touches[0].pageY - wrapperOffset.top;
      }

      return false;
    }
  };


  /**
   * Get the ripple color
   */
  Ripples.prototype.getRipplesColor = function($element) {

    var color = $element.data("ripple-color") ? $element.data("ripple-color") : window.getComputedStyle($element[0]).color;

    return color;
  };


  /**
   * Verify if the client browser has transistion support
   */
  Ripples.prototype.hasTransitionSupport = function() {
    var thisBody  = document.body || document.documentElement;
    var thisStyle = thisBody.style;

    var support = (
      thisStyle.transition !== undefined ||
      thisStyle.WebkitTransition !== undefined ||
      thisStyle.MozTransition !== undefined ||
      thisStyle.MsTransition !== undefined ||
      thisStyle.OTransition !== undefined
    );

    return support;
  };


  /**
   * Verify if the client is using a mobile device
   */
  Ripples.prototype.isTouch = function() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };


  /**
   * End the animation of the ripple
   */
  Ripples.prototype.rippleEnd = function($ripple) {
    $ripple.data("animating", "off");

    if($ripple.data("mousedown") === "off") {
      self.rippleOut($ripple);
    }
  };


  /**
   * Turn off the ripple effect
   */
  Ripples.prototype.rippleOut = function($ripple) {
    $ripple.off();

    if(self.hasTransitionSupport()) {
      $ripple.addClass("ripple-out");
    } else {
      $ripple.animate({"opacity": 0}, 100, function() {
        $ripple.trigger("transitionend");
      });
    }

    $ripple.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
      $ripple.remove();
    });
  };


  /**
   * Turn on the ripple effect
   */
  Ripples.prototype.rippleOn = function($element, $ripple) {
    var size = self.getNewSize($element, $ripple);

    if(self.hasTransitionSupport()) {
      $ripple
      .css({
        "-ms-transform": "scale(" + size + ")",
        "-moz-transform": "scale(" + size + ")",
        "-webkit-transform": "scale(" + size + ")",
        "transform": "scale(" + size + ")"
      })
      .addClass("ripple-on")
      .data("animating", "on")
      .data("mousedown", "on");
    } else {
      $ripple.animate({
        "width": Math.max($element.outerWidth(), $element.outerHeight()) * 2,
        "height": Math.max($element.outerWidth(), $element.outerHeight()) * 2,
        "margin-left": Math.max($element.outerWidth(), $element.outerHeight()) * (-1),
        "margin-top": Math.max($element.outerWidth(), $element.outerHeight()) * (-1),
        "opacity": 0.2
      }, 500, function() {
        $ripple.trigger("transitionend");
      });
    }
  };


  /**
   * Create the jquery plugin function
   */
  $.fn.ripples = function(options) {
    return this.each(function() {
      if(!$.data(this, "plugin_" + ripples)) {
        $.data(this, "plugin_" + ripples, new Ripples(this, options));
      }
    });
  };

})(jQuery, window, document);
/* SnackbarJS - MIT LICENSE (https://github.com/FezVrasta/snackbarjs/blob/master/LICENSE.md) */


(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function( $ ){

    $(document).ready(function() {
        $("body").append("<div id=snackbar-container/>");
    });

    function isset(variable) {
        if (typeof variable !== "undefined" && variable !== null) {
            return true;
        } else {
            return false;
        }
    }

    $(document)
    .on("click", "[data-toggle=snackbar]", function() {
        $(this).snackbar("toggle");
    })
    .on("click", "#snackbar-container .snackbar", function() {
        $(this).snackbar("hide");
    });

    $.snackbar = function(options) {

        if (isset(options) && options === Object(options)) {
            var $snackbar;

            if (!isset(options.id)) {
                $snackbar = $("<div/>").attr("id", "snackbar" + Date.now()).attr("class", "snackbar");
            } else {
                $snackbar = $("#" + options.id);
            }

            var snackbarStatus = $snackbar.hasClass("snackbar-opened");

            if (isset(options.style)) {
                $snackbar.attr("class", "snackbar " + options.style);
            } else {
                $snackbar.attr("class", "snackbar");
            }

            options.htmlAllowed = isset(options.htmlAllowed) ? options.htmlAllowed : false;

            options.timeout = (isset(options.timeout)) ? options.timeout : 3000;

            options.content = (options.htmlAllowed) ? options.content : $("<p>" + options.content + "</p>").text();

            if (isset(options.content)) {
                if ($snackbar.find(".snackbar-content").length) {
                    $snackbar.find(".snackbar-content").html(options.content);
                } else {
                    $snackbar.prepend("<span class=snackbar-content>" + options.content + "</span>");
                }
            }

            if (!isset(options.id)) {
                $snackbar.appendTo("#snackbar-container");
            } else {
                $snackbar.insertAfter("#snackbar-container .snackbar:last-child");
            }

            // Show or hide item
            if (isset(options.action) && options.action == "toggle") {
                if (snackbarStatus) {
                    options.action = "hide";
                } else {
                    options.action = "show";
                }
            }

            var animationId1 = Date.now();
            $snackbar.data("animationId1", animationId1);
            setTimeout(function() {
                if ($snackbar.data("animationId1") === animationId1) {
                    if (!isset(options.action) || options.action == "show") {
                        $snackbar.addClass("snackbar-opened");
                    } else if (isset(options.action) && options.action == "hide") {
                        $snackbar.removeClass("snackbar-opened");
                    }
                }
            }, 50);

            // Set timer for item autohide
            var animationId2 = Date.now();
            $snackbar.data("animationId2", animationId2);

            if (options.timeout !== 0) {
                setTimeout(function() {
                    if ($snackbar.data("animationId2") === animationId2) {
                        $snackbar.removeClass("snackbar-opened");
                    }
                }, options.timeout);
            }

            return $snackbar;

        } else {
            return false;
        }
    };

    $.fn.snackbar = function(action) {

        var options = {};

        if (!this.hasClass("snackbar")) {

            if (!isset(action) || action === "show" || action === "hide" || action == "toggle") {
                options = {
                    content: $(this).attr("data-content"),
                    style: $(this).attr("data-style"),
                    timeout: $(this).attr("data-timeout"),
                    htmlAllowed: $(this).attr("data-html-allowed")
                };
            }

            if (isset(action)) {
                options.id = this.attr("data-snackbar-id");

                if(action === "show" || action === "hide" || action == "toggle") {
                    options.action = action;
                }
            }

            var $snackbar = $.snackbar(options);
            this.attr("data-snackbar-id", $snackbar.attr("id"));

            return $snackbar;

        } else {

            options.id = this.attr("id");
            if(action === "show" || action === "hide" || action == "toggle") {
                options.action = action;
            }
            return $.snackbar(options);
        }

    };
}));




var Envelope = function(amplitude, context) {
  var self = this;

  var amplitude = amplitude;
  var DEFAULT_ATTACK_SETTING  = 0.01;
  var DEFAULT_RELEASE_SETTING = 1.1;

  self.attackTime   = DEFAULT_ATTACK_SETTING;
  self.sustainTime  = 0.1;
  self.releaseTime  = DEFAULT_RELEASE_SETTING;
  var parma = null;

  self.connect = function(parmameter) { //Intentionally spelled wrong, I like ham.
    parma = parmameter;
  }

  self.triggerOn = function() { 
    var now = context.currentTime;
    parma.cancelScheduledValues(now);
    parma.setValueAtTime(0, now);
    parma.linearRampToValueAtTime(amplitude, now + self.attackTime);
    // parma.linearRampToValueAtTime(0, now + self.sustainTime + self.releaseTime);
  }

  self.triggerOff = function() { 
    var now = context.currentTime;
    parma.cancelScheduledValues(now);
    parma.linearRampToValueAtTime(0, now + self.releaseTime);
    return now + self.releaseTime;
  }


  self.setASR = function (settings) { // TODO ask are optionals and hash args ok in Grace
    self.attackTime = settings["A"] || self.attackTime;
    self.sustainTime = settings["S"] || self.sustainTime;
    self.releaseTime = settings["R"] || self.releaseTime;
  }
}
;
$(function(){
  var fileNames = ['kick',
                   'snare',
                   'hat',
                   'sample_1',
                   'sample_2',
                   'sample_3',
                   'sample_4',
                   'sample_5',
                   'sample_6',
                   'sample_7',
                   'sample_8',
                   'verb_impulse'];

  var sampleFiles   = [ window.FileUtils.fileLocation("kick"),
                        window.FileUtils.fileLocation("snare"),
                        window.FileUtils.fileLocation("hat"),
                        window.FileUtils.fileLocation("sample_1"),
                        window.FileUtils.fileLocation("sample_2"),
                        window.FileUtils.fileLocation("sample_3"),
                        window.FileUtils.fileLocation("sample_4"),
                        window.FileUtils.fileLocation("sample_5"),
                        window.FileUtils.fileLocation("sample_6"),
                        window.FileUtils.fileLocation("sample_7"),
                        window.FileUtils.fileLocation("sample_8"),
                        window.FileUtils.fileLocation("verb_impulse")];

  console.log("Loading Audio Environment")
  window.AudioEnvironment = function(){};
  window.AudioEnvironment.context = new window.AudioContext();
  if(!window.AudioEnvironment.context){
    window.AudioEnvironment.context = new window.webkitAudioContext();
  }

  if (!window.AudioEnvironment.context.createGain)
    window.AudioEnvironment.context.createGain = context.createGainNode;
  if (!window.AudioEnvironment.context.createDelay)
    window.AudioEnvironment.context.createDelay = context.createDelayNode;
  if (!window.AudioEnvironment.context.createScriptProcessor)
    window.AudioEnvironment.context.createScriptProcessor = context.createJavaScriptNode;

  window.AudioEnvironment.sampleBuffers = {};

  function setUpSampleBuffers() {
    for (var i = sampleFiles.length - 1; i >= 0; i--) {
      window.AudioEnvironment.sampleBuffers[fileNames[i]] =
      window.AudioEnvironment.loadSampleFile(sampleFiles[i], i);
    };
  }

  window.AudioEnvironment.loadSampleFile = function(file, idx) {
    var request = new XMLHttpRequest();
    request.open("GET", file, true);
    request.responseType = "arraybuffer";

    request.onload = function() {
      window.AudioEnvironment.context.decodeAudioData(request.response, function(buffer) {
          var sampleBuffer    = window.AudioEnvironment.context.createBufferSource();
          sampleBuffer.buffer = buffer;
          window.AudioEnvironment.sampleBuffers[fileNames[idx]] = sampleBuffer;
          console.log(window.AudioEnvironment.sampleBuffers);
        });
      };
    request.send();
  }

 setUpSampleBuffers();
});
(function(){
  var nameSeperator = '-';
  var OCTAVE = 12;
  var tonalities = {
    'MAJ'   : [0, 4, 7],
    'MAJ7'  : [0, 4, 7, 9],
    'MAJ9'  : [0, 4, 7, 9, 11],
    'DOM7'  : [0, 4, 7, 8, 11],
    'MIN'   : [0, 3, 7],
    'MIN7'  : [0, 3, 7, 9],
    'MIN9'  : [0, 3, 7, 9, 11],
    'MIN11' : [0, 3, 7, 9, 11, 13],
    'DIM'   : [0, 3, 6],
    'AUG'   : [0, 4, 8],};

  var HarmonyUtil = {

    chordFromName: function (chordName) {
      var note = chordName.split(nameSeperator)[0].toUpperCase();
      var tonality = chordName.split(nameSeperator)[1].toUpperCase();
      var pitchGroup = "";
      note.length == 2 ? pitchGroup = "4" : pitchGroup = "-4";
      var noteNumber = MIDIUtils.noteNameToNoteNumber(note + pitchGroup);

      return constructChordNotes(noteNumber, tonality);
    },

    frequencyFromNoteNumber: function(number) {
      return MIDIUtils.noteNumberToFrequency(number);
    },

    invertChord: function (chord) {
      inverted = chord.slice(1);
      inverted.push(chord[0] + OCTAVE);
      return inverted;
    }
  };

  function constructChordNotes (noteNumber, tonality){
    var chord = [];
    tonalities[tonality].forEach(function(interval) {
      chord.push(noteNumber + interval);
    });
    return chord;
  }

  window.HarmonyUtil = HarmonyUtil;
}).call(this);
jQuery(function() {
  $("a[rel~=popover], .has-popover").popover();
  $("a[rel~=tooltip], .has-tooltip").tooltip();
});
$(function(){
  var started = false;
  var t = null;
  var hopperWrapper = null;

  $('#play-button').on('click', function(e){
    e.preventDefault();
    $("#error-div").text("");
    $('#play-button').addClass('disabled');
    $('#stop-button').removeClass('disabled');
    var input = $('#text-area').val();
    hopperWrapper = new HopperWrapper();
    hopperWrapper.interpret(input);
  });

  $('#stop-button').on('click', function(e){
    e.preventDefault();
    $('#play-button').removeClass('disabled');
    $('#stop-button').addClass('disabled');
    window.AudioEnvironment.Performance.stop();
  });

  $('#man-button').on('click', function(e){
    e.preventDefault();
    window.open(window.FileUtils.fileLocation("docs"), '_blank');
    window.open(window.FileUtils.fileLocation("expproc"), '_blank');
  });

  $('#done-button').on('click', function(e){
    e.preventDefault();
    window.open("http://goo.gl/forms/pg63lYcKza", '_blank');
  });

  $('#noteoff-button').on('click', function(e){
    e.preventDefault();
    $("#error-div").text(window.AudioEnvironment.MidiController.toggleNoteOffThres());
  });
});
function Distortion() {
  var self = this;
  Effect.apply(self);
  var distortion = self.getContext().createWaveShaper();
  distortion.curve = createCurve(200);

  function createCurve(amount) {
    var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;

    for ( ; i < n_samples; ++i ) {
      x = i * 2 / n_samples - 1;
      curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
  }

  return distortion;
}
;
"use strict";

function Effect (name) {
  var self = this;
  var audioContext = window.AudioEnvironment.context;

  self.getContext = function(){
    return audioContext;
  }
}
;
(function () {

  var EffectFactory = {
    createEffect: function(effectType){
      switch(effectType){
        case 'reverb' :
          return new Reverb();
        case 'distortion' :
          return new Distortion();
      }
    }
  }

  window.EffectFactory = EffectFactory;
}).call(this);


function Filter (settings) {
  var self = this;
  Effect.apply(self, [name]);
  self.filter = self.getContext().createBiquadFilter();
  self.filter.frequency.value = settings["frequency"];
  self.filter.Q.value = settings["Q"];
  self.filter.type = settings["type"];


  self.setFrequency = function(frequency) {
    self.filter.frequency.value  = frequency;
  }

  self.setQ = function(Q) {
    self.filter.Q.value  = Q;
  }

  self.setType = function(type) {
    self.filter.type = type;
  }

  self.connect = function(node) {
    self.filter.connect(node);
  }
}
;
function Panner(sourceNode) {
  var self = this;
  var context = window.AudioEnvironment.context;
  var panningNode = context.createStereoPanner();

  sourceNode.connect(panningNode);
  panningNode.connect(connext.destination);

  sourceNode.pan = function(panValue) {
    if(validPanValue(panValue)){
      panningNode.pan.value = panValue;
    }
  }

  sourceNode.currentPan = function() {
    return panningNode.pan.value;
  }

  function validPanValue(panValue) {
    return panValue > -1 && panValue < 1;
  }
}
;
function Reverb() {
  var self = this;
  Effect.apply(self);
  var reverb = self.getContext().createConvolver();
  reverb.buffer = window.AudioEnvironment.sampleBuffers['verb_impulse'].buffer;
  return reverb;
}
;
function DrumMachine(name) {
  var self = this;
  Instrument.apply(self, [name]);

  var drums = {};
  init();

  self.hithat = drums['hat'];
  self.snare  = drums['snare'];
  self.kick   = drums['kick'];

  self.drums = function(){
    var samplers = [];
    for(var key in drums){
      console.log(key);
      samplers.push(drums[key]);
    }
    return samplers;
  }
    //TODO add a drum
  self.addDrum = function() {
    console.log('not yet implemented');
  }

  //Private
  function init() {
    drums['hat']   = new Sampler('hat', null, window.AudioEnvironment.sampleBuffers['hat']);
    drums['snare'] = new Sampler('snare', null, window.AudioEnvironment.sampleBuffers['snare']);
    drums['kick']  = new Sampler('kick', null, window.AudioEnvironment.sampleBuffers['kick']);
  }
}
;
"use strict";

function Instrument () {
  var self = this;
  var audioContext = window.AudioEnvironment.context;
  var name = arguments[0];

  self.getContext = function(){
    return audioContext;
  }

  self.name = function() {
    return name;
  }
}


;
function LoopPlayer(name, sampleName) {
  var self = this;
  Instrument.apply(self);

  var name = name;
  var loaded        = false;
  var playing       = false;
  var file          = sampleName;
  var audioBuffer   = window.AudioEnvironment.sampleBuffers[sampleName].buffer;
  self.sampleBuffer = null;
  // loadSampleFile(file);

  self.name = function() {
    return name;
  }

  self.sampleLength = function() {
    return sampleBuffer.duration();
  }

  self.syncWithTempo = function() {
    while(!loaded){console.log('waiting')};
    var clock = window.AudioEnvironment.Clock;
    var numberOfBeats = duration() / clock.beat();
    console.log("NOB" + numberOfBeats);
    console.log(16 / numberOfBeats);
    updatePlayRate(16 / numberOfBeats);
    numberOfBeats = duration() / clock.beat();
    console.log(duration() * self.sampleBuffer.playbackRate.value);
  }

  self.play = function() {
    // if(loaded){
      if(playing){
        self.stop();
      }
      playing = !playing;
      assignBuffer();
      self.sampleBuffer.start();
      // console.log('playing');
    // }
  }

  self.stop = function() {
    if(playing){
      self.sampleBuffer.stop();
      playing = !playing;
    }
  }

  //Private
  function updatePlayRate(rate) {
    console.log("updating playbackrate" + rate);
    self.sampleBuffer.playbackRate.value = rate;
    console.log(self.sampleBuffer.playbackRate.value);
  }

  function duration() {
    return self.sampleBuffer.buffer.duration;
  }

  function loadSampleFile(file) {
    self.sampleBuffer = self.getContext().createBufferSource();
    self.sampleBuffer.buffer = window.AudioEnvironment.sampleBuffers[sampleName].buffer;
    // var request = new XMLHttpRequest();
    // request.open("GET", file, true);
    // request.responseType = "arraybuffer";

    // request.onload = function() {
    //   window.AudioEnvironment.context.decodeAudioData(request.response, function(buffer) {
    //       audioBuffer = buffer;
    //       self.sampleBuffer = self.getContext().createBufferSource();
    //       self.sampleBuffer.buffer = audioBuffer;
    //       loaded = true;
    //       console.log('loaded');
    //     });
    //   };
    // request.send();
  }

  function assignBuffer() { // TODO kill me
    self.sampleBuffer = self.getContext().createBufferSource();
    self.sampleBuffer.buffer = audioBuffer;
    self.sampleBuffer.connect(self.getContext().destination);
  }

  function cloneBuffer(buffer) {
    var clonedBuffer = $.extend(true, {}, buffer);
    return clonedBuffer
  }
}
;
'use strict'

function Osc (context, waveform, note) {
  var self = this;
  self.waveform   = waveform;
  self.frequency  = MIDIUtils.noteNumberToFrequency(note);
  var oscillator  = null;
  var gain        = null;
  var GAIN_VALUE  = 0.05;
  var env         = new Envelope(GAIN_VALUE, context);
  var pan         = null;
  var panning     = 0;


  self.init = function(envSettings) {
    env.setASR(envSettings);
    createVoice();
  }

//Live functions
  self.playNote = function() {
    env.triggerOn();
    oscillator.start();
  };

  self.stopNote = function() {
    oscillator.stop(env.triggerOff());
  };

//Loopbased functions
  self.play = function(startTime) {
    env.triggerOn();
    oscillator.start(startTime);
  };

  self.stop = function(endTime) {
    oscillator.stop(endTime);
  };

  self.connect = function(node) {
    gain.connect(node);
    node.connect(pan);
  };

  self.adjustPanning = function(panValue) {
    panning = panValue;
  }

  self.setASR = function(settings) {
    envAsr = settings;
  };

  function createVoice() {
    initOscillator();
    routeNodes();
  };

  function initOscillator() {
    oscillator = context.createOscillator();
    oscillator.frequency.value = self.frequency;
    oscillator.type = self.waveform;
  };

  function routeNodes() {
    gain = context.createGain();
    pan  = context.createStereoPanner();

    pan.pan.value = panning;
    gain.value = GAIN_VALUE;

    oscillator.connect(gain);
    env.connect(gain.gain);
    gain.connect(pan);
    pan.connect(context.destination);
  };
}
;
function Sampler(name, fileName, buffer) {
  var self = this;
  Instrument.apply(self);

  var name = name;
  var loaded        = false;
  var playing       = false;
  var file          = window.FileUtils.fileLocation(fileName);
  var audioBuffer   = buffer.buffer || null;
  self.sampleBuffer = null;

  audioBuffer ? assignBuffer() : loadSampleFile(file);

  self.sampleLength = function() {
    return sampleBuffer.duration();
  }

  self.syncWithTempo = function() {
    var clock = window.AudioEnvironment.Clock;
    var numberOfBeats = duration() / clock.beat();

    updatePlayRate(16 / numberOfBeats);
    numberOfBeats = duration() / clock.beat();
  }

  self.play = function(startTime, endTime) {
    if(loaded){
      playing = !playing;
      assignBuffer();
      self.sampleBuffer.start(startTime);
      console.log('playing');
    }
  }

  self.stop = function() {
    if(playing){
      self.sampleBuffer.stop();
    }
  }

  self.name = function(){
    return name;
  }
  //Private
  function updatePlayRate(rate) {
    self.sampleBuffer.playbackRate.value = rate;
  }

  function duration() {
    return self.sampleBuffer.buffer.duration;
  }

  function loadSampleFile(file) {
    var request = new XMLHttpRequest();
    request.open("GET", file, true);
    request.responseType = "arraybuffer";

    request.onload = function() {
      window.AudioEnvironment.context.decodeAudioData(request.response, function(buffer) {
          audioBuffer = buffer;
          self.sampleBuffer = self.getContext().createBufferSource();
          self.sampleBuffer.buffer = audioBuffer;
          loaded = true;
        });
      };
    request.send();
  }

  function assignBuffer() {
    loaded = true;
    self.sampleBuffer = self.getContext().createBufferSource();
    self.sampleBuffer.buffer = audioBuffer;
    self.sampleBuffer.connect(self.getContext().destination);
  }
}
;
'use strict';

var Synth = function(name, wave, chord) {
  var self = this;
  Instrument.apply(self, [name]);

  var oscWaveform     = wave;
  var voices          = [];
  var onNotes         = {};
  var filterSettings  = { "frequency" : 1000, "type" : 'highpass', "Q" : 10 };
  var envSettings     = { "A" : 0.1, "S" : 0.11, "R" : 0.5 };
  var effectsInserted = false;
  var insertedEffects = [];
  var chord           = chord || null;
  var notes;
  chord ? notes = HarmonyUtil.chordFromName(chord) : notes = null;
  var oscPanValue     = 0;
  var voicePanValue   = 0;
  // var voiceBuss     = self.getContext().createChannelMerger(notes.length);

  //**** Live play functions ****//
  self.noteOn = function(noteNumber){
    console.log("PLAYING A NOTES");
    var voice = new Osc(self.getContext(), oscWaveform, noteNumber);
    voice.init(envSettings);
    connectEffects(voice);
    voice.playNote();
    onNotes[noteNumber] = voice;
  }

 self.noteOff = function(noteNumber){
    onNotes[noteNumber].stopNote();
  }

  //**** Loop based functions ****//
  self.play = function(startTime, endTime) { //TODO reconsider this naming, couldbe called schedule gets called by playing
    self.createVoice();
    voices.forEach(function(voice) {
      voice.adjustPanning(voicePanValue);
      voice.play(startTime);
      voice.stop(endTime);
    });
  };

  self.stop = function(endTime) {
    voices.forEach(function(voice) {
      voice.stop(endTime);
    });
  };

  self.invertChord = function() {
    notes = HarmonyUtil.invertChord(notes);
  };

  self.insert = function(effectType) {
    console.log("creating effects with: " + effectType);
    insertedEffects.push(effectType);
    effectsInserted = true;
  };

  function connectEffects(voice) {
    if (effectsInserted) {
      insertedEffects.forEach(function(effectType){
        voice.connect(EffectFactory.createEffect(effectType));
      });
    }
  }

  self.setEnvelopeAttack = function(attackSetting) {
    envSettings["A"] = attackSetting;
  };

  self.setEnvelopeSustain = function(sustainSetting) {
    envSettings["S"] = sustainSetting;
  };

  self.setEnvelopeRelease = function(releaseSetting) {
    envSettings["R"] = releaseSetting;
  };

  self.pan = function(panValue) {
    oscPanValue = panValue;
  };

  Synth.prototype.createVoice = function() {
    voices = [];
    notes.forEach(function(note){
      var voice = new Osc(self.getContext(), oscWaveform, note);
      voice.init(envSettings);
      voices.push(voice)
    });
  };
}
;
'use strict';

var TestSynth = function (id, waveform, chord) {
  Instrument.apply(this, arguments);
  var self = this;
  var id = id;
  var oscWaveform = waveform;
  var oscillators = [];
  var notes = HarmonyUtil.chordFromName(chord);

  self.play = function (time){
    console.log("playing" + time);
  }

  self.stop = function (time) {
   console.log("stopping" + time);
  }
}
;
function Voice(note, waveform) {
  var self = this;

  var context     = window.AudioEnvironment.context;
  var note        = note;
  var waveform    = waveform;
  var GAIN_VALUE  = 0.3;

  var osc  = new Osc(context, waveform, note);
  var gain = context.createGain();
  var env  = new Envelope(GAIN_VALUE, context);

  self.trigger = function(startTime, endTime) {
    console.log('playing a thing')
      createOsc();
      // env.trigger();
      osc.play(startTime, endTime);
  }

  self.setADSR = function(settings) {
    env.set(settings);
  }

  function createOsc() {
    osc = new Osc(context, waveform, note);
    routeNodes();
  }

  function routeNodes() {
    // gain.value = GAIN_VALUE;
    // osc.connect(gain);
    // env.connect(gain.gain);
    // gain.connect(context.destination);
    osc.connect(context.destination);
  }
}
;
function MidiController(midiConnection) {
  var self = this;
  var connection =  midiConnection;
  var instrumentConnected = false;
  var instrument;
  var noteOffThresh = 65;

  self.connectInstrument = function(inst) {
    instrument = inst;
    instrumentConnected = true;
  }

  function onMIDIMessage( event ) {
    if(instrumentConnected){
      if(event.data[2] > noteOffThresh){
          instrument.noteOn(event.data[1]);
      }
      else{
          instrument.noteOff(event.data[1]);
      }
    }
  }

  self.toggleNoteOffThres = function(){
    console.log("Current note off val: " + noteOffThresh);
    noteOffThresh === 65 ? noteOffThresh = 0 : noteOffThresh = 65;
    console.log("Note off value changed to: " + noteOffThresh);
    return "Note off threshold changed to: " + noteOffThresh;
  }
}
;
$(function () {
  window.AudioEnvironment.midi = null;

  function onMidiSucess (midiAccess) {
    console.log("Midi connected");
    window.AudioEnvironment.midi = midiAccess;
    window.AudioEnvironment.MidiController = new MidiController(window.AudioEnvironment.midi)
  }

  function onMidiFailure(message){
    console.log(message);
  }

  navigator.requestMIDIAccess().then(onMidiSucess, onMidiFailure);
});
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// The abstract syntax tree of Grace. Consists primarily of constructors.

"use strict";

var Task, util;

Task = require("./task");
util = require("./util");

// (this : Request | Signature).name() : String
//   Builds a name from the signature of a Request or Method.
function buildName() {
  var i, l, part, parts, signature, value;

  signature = this.parts;

  if (signature.length === 1) {
    part = signature[0];
    value = part.name;

    if (value.isOperator ||
        (part.parameters || part["arguments"]).length === 0) {
      return value.value;
    }
  }

  parts = [];

  for (i = 0, l = signature.length; i < l; i += 1) {
    parts.push(signature[i].name + "()");
  }

  return parts.join(" ");
}

// commas(left : String, list : [Object], right : String) : String
//   Build a comma separated list separated by the given arguments, or an empty
//   string if there is nothing in the list.
function commas(left, list, right) {
  return list.length === 0 ? "" : left + list.join(", ") + right;
}

// acceptAll(nodes : [Node], visitor : Visitor) : Task
//   Call the accept method on all of the nodes with the given visitor.
function acceptAll(nodes, visitor) {
  return Task.each(nodes, function (node) {
    return node.accept(visitor);
  });
}

// Top-level Node type, used as a type in Grace.
function Node(token) {
  this.location = token.location;
}

// Abstract expression constructor, used as a type in Grace.
function Expression(token) {
  Node.call(this, token);
}

util.inherits(Expression, Node);

// new Dialect(path : String)
//   A dialect directive.
function Dialect(path, token) {
  Node.call(this, token);

  this.path = path;
}

util.inherits(Dialect, Node);

Dialect.prototype.accept = function (visitor) {
  return visitor.visitDialect(this);
};

Dialect.prototype.toString = function () {
  return "dialect " + this.path;
};

// new Import(path : String, ident : Identifier)
//   An import directive.
function Import(path, ident, token) {
  Node.call(this, token);

  this.path = path;
  this.identifier = ident;
}

util.inherits(Import, Node);

Import.prototype.accept = function (visitor) {
  var self = this;

  return visitor.visitImport(this).then(function () {
    return self.identifier.accept(visitor);
  });
};

Import.prototype.toString = function () {
  return "import " + this.path + " as " + this.identifier;
};

// new Identifier(value : String, isOperator : Boolean = false)
//   An identifier.
function Identifier(value, isOperator, token) {
  Node.call(this, token);

  this.value = value;
  this.isOperator = isOperator === true;
}

util.inherits(Identifier, Node);

Identifier.prototype.accept = function (visitor) {
  return visitor.visitIdentifier(this);
};

Identifier.prototype.toString = function () {
  return this.value;
};

// An abstract Request constructor, used as a type in Grace.
function Request(signature, node) {
  Expression.call(this, node);

  this.parts = signature;
}

util.inherits(Request, Expression);

Request.prototype.name = buildName;

Request.prototype.toString = function () {
  return this.parts.join(" ");
};

// new UnqualifiedRequest(signature : [RequestPart])
//   A variable lookup or method request without a receiver.
function UnqualifiedRequest(signature) {
  Request.call(this, signature, signature[0]);
}

util.inherits(UnqualifiedRequest, Request);

UnqualifiedRequest.prototype.accept = function (visitor) {
  var self = this;

  return visitor.visitUnqualifiedRequest(this).then(function () {
    return acceptAll(self.parts, visitor);
  });
};

// new Request(receiver : Expression, signature : [RequestPart])
//   A method request or variable lookup.
function QualifiedRequest(receiver, signature) {
  Request.call(this, signature, receiver);

  this.receiver = receiver;
}

util.inherits(QualifiedRequest, Request);

QualifiedRequest.prototype.isBinaryOperator = function () {
  var name = this.parts[0].name;

  return name.isOperator && name.value.substring(0, 6) !== "prefix";
};

QualifiedRequest.prototype.isPrefixOperator = function () {
  var name = this.parts[0].name;

  return name.isOperator && name.value.substring(0, 6) === "prefix";
};

QualifiedRequest.prototype.accept = function (visitor) {
  var self = this;

  return visitor.visitQualifiedRequest(this).then(function () {
    return self.receiver.accept(visitor);
  }).then(function () {
    return acceptAll(self.parts, visitor);
  });
};

QualifiedRequest.prototype.toString = function () {
  var parts, receiver;

  receiver = this.receiver;
  parts = this.parts;

  if (this.isBinaryOperator()) {
    return (receiver.constructor === Request && receiver.isBinaryOperator() ?
      "(" + receiver + ")" : receiver) + " " + parts[0];
  }

  if (this.isPrefixOperator()) {
    return parts[0].name.value.substring(6) +
      (receiver.constructor === Request && receiver.isPrefixOperator() ?
        "(" + receiver + ")" : receiver);
  }

  return (receiver === null ? "" : receiver + ".") + parts.join(" ");
};

// new RequestPart(name : String,
//     generics : [Expression], arguments : [Expression])
//   A part of a request's signature.
function RequestPart(name, generics, args) {
  Node.call(this, name);

  this.name = name;
  this.generics = generics;
  this["arguments"] = args;
}

util.inherits(RequestPart, Node);

RequestPart.prototype.accept = function (visitor) {
  var self = this;

  return visitor.visitRequestPart(this).then(function () {
    return acceptAll(self.generics, visitor);
  }).then(function () {
    return acceptAll(self["arguments"], visitor);
  });
};

RequestPart.prototype.toString = function () {
  var arg, args, name;

  name = this.name;
  args = this["arguments"];

  if (name.isOperator) {
    // This can't come up unless toString is called directly on the part.
    if (name.value.substring(0, 6) === "prefix") {
      return name.value;
    }

    arg = args[0];

    if (arg.constructor === Request && arg.isBinaryOperator()) {
      args = " (" + args + ")";
    } else {
      args = " " + arg;
    }
  } else {
    args = commas("(", args, ")");
  }

  return name + commas("<", this.generics, ">") + args;
};

// new BooleanLiteral(value : Boolean)
//   A boolean literal, from a JavaScript boolean.
function BooleanLiteral(value, token) {
  Node.call(this, token);

  this.value = value;
}

util.inherits(BooleanLiteral, Expression);

BooleanLiteral.prototype.name = function () {
  return this.value.toString();
};

BooleanLiteral.prototype.accept = function (visitor) {
  return visitor.visitBooleanLiteral(this);
};

BooleanLiteral.prototype.toString = function () {
  return this.value.toString();
};

// new NumberLiteral(value : Number)
//   A number literal from a JavaScript number.
function NumberLiteral(value, token) {
  Node.call(this, token);

  this.value = value;
}

util.inherits(NumberLiteral, Expression);

NumberLiteral.prototype.accept = function (visitor) {
  return visitor.visitNumberLiteral(this);
};

NumberLiteral.prototype.toString = function () {
  return this.value.toString();
};

// new StringLiteral(value : String)
//   An object wrapping a string literal.
function StringLiteral(value, token) {
  Node.call(this, token);

  this.value = value;
}

util.inherits(StringLiteral, Expression);

StringLiteral.prototype.accept = function (visitor) {
  return visitor.visitStringLiteral(this);
};

StringLiteral.prototype.toString = function () {
  return '"' + this.value.replace(new RegExp('"', "g"), '\\"') + '"';
};

// An abstract constructor for variable declarations.
function Declaration(token) {
  Node.call(this, token);
}

util.inherits(Declaration, Node);

Declaration.prototype.patternOrIfAbsent = function (onAbsent) {
  if (this.pattern === null) {
    return onAbsent.apply();
  }

  return this.pattern;
};

Declaration.prototype.accept = function (visitor) {
  var self = this;

  return self.name.accept(visitor).then(function () {
    if (self.pattern !== null) {
      return self.pattern.accept(visitor);
    }
  }).then(function () {
    return acceptAll(self.annotations, visitor);
  }).then(function () {
    return self.value.accept(visitor);
  });
};

// new Def(name : Identifier, pattern : Expression,
//     annotations : [Expression], value : Expression)
//   A definition declaration.
function Def(name, pattern, annotations, value, token) {
  Declaration.call(this, token);

  this.name = name;
  this.pattern = pattern;
  this.annotations = annotations;
  this.value = value;
}

util.inherits(Def, Declaration);

Def.prototype.accept = function (visitor) {
  var self = this;

  return visitor.visitDef(self).then(function () {
    return Declaration.prototype.accept.call(self, visitor);
  });
};

Def.prototype.toString = function () {
  var pattern = this.pattern;

  return "def " + this.name + (pattern === null ? "" : " : " + pattern) +
    commas(" is ", this.annotations, "") + " = " + this.value;
};

// new Var(name : Identifier, pattern : Expression,
//     annotations : [Expression], value : Expression)
//   A variable declaration.
function Var(name, pattern, annotations, value, token) {
  Declaration.call(this, token);

  this.name = name;
  this.pattern = pattern;
  this.annotations = annotations;
  this.value = value;
}

util.inherits(Var, Declaration);

Var.prototype.accept = function (visitor) {
  var self = this;

  return visitor.visitVar(self).then(function () {
    return Declaration.prototype.accept.call(self, visitor);
  });
};

Var.prototype.toString = function () {
  var pattern, value;

  pattern = this.pattern;
  value = this.value;

  return "var " + this.name + (pattern === null ? "" : " : " + pattern) +
    commas(" is ", this.annotations, "") +
    (value === null ? "" : " := " + value);
};

// new ObjectConstructor(annotations : [Expression],
//     body : [Statement | Method])
//   An object constructor.
function ObjectConstructor(annotations, body, token) {
  Node.call(this, token);

  this.annotations = annotations;
  this.body = body;
}

util.inherits(ObjectConstructor, Expression);

ObjectConstructor.prototype.accept = function (visitor) {
  var self = this;

  return visitor.visitObjectConstructor(self).then(function () {
    return acceptAll(self.body, visitor);
  });
};

ObjectConstructor.prototype.toString = function () {
  var body = this.body;

  return "object" + commas(" is ", this.annotations, "") +
    " {" + (body.length === 0 ? "" : "\n  " + body.join("\n  ") + "\n") + "}";
};

// new Method(signature : Signature,
//     annotations : [Expression], body: [Statement])
function Method(signature, annotations, body, token) {
  Node.call(this, token);

  this.signature = signature;
  this.annotations = annotations;
  this.body = body;
}

util.inherits(Method, Node);

Method.prototype.accept = function (visitor) {
  var self = this;

  return visitor.visitMethod(self).then(function () {
    return self.signature.accept(visitor);
  }).then(function () {
    return acceptAll(self.annotations, visitor);
  }).then(function () {
    return acceptAll(self.body, visitor);
  });
};

Method.prototype.toString = function () {
  var body, braceSep;

  body = this.body;
  braceSep = body.length > 0 ? "\n" : "";

  return "method " + this.signature + commas(" is ", this.annotations, "") +
    " {" + braceSep + body.join("\n") + braceSep + "}";
};

// new Class(name : Identifier, signature : Signature,
//     annotations : [Expression], body : [Statement])
function Class(name, signature, annotations, body, token) {
  Node.call(this, token);

  this.name = name;
  this.signature = signature;
  this.annotations = annotations;
  this.body = body;
}

util.inherits(Class, Node);

Class.prototype.accept = function (visitor) {
  var self = this;

  return visitor.visitClass(self).then(function () {
    return self.name.accept(visitor);
  }).then(function () {
    return self.signature.accept(visitor);
  }).then(function () {
    return acceptAll(self.annotations, visitor);
  }).then(function () {
    return acceptAll(self.body, visitor);
  });
};

Class.prototype.toString = function () {
  var body, braceSep;

  body = this.body;
  braceSep = body.length > 0 ? "\n" : "";

  return "class " + this.name + "." + this.signature +
    commas(" is ", this.annotations, "") +
    " {" + braceSep + body.join("\n") + braceSep + "}";
};

// new Signature(parts : [SignaturePart], pattern : Expression)
//   A list of signature parts combined with an optional return pattern.
function Signature(parts, pattern, token) {
  Node.call(this, token);

  this.parts = parts;
  this.pattern = pattern;
}

util.inherits(Signature, Node);

Signature.prototype.name = buildName;

Signature.prototype.patternOrIfAbsent = function (onAbsent) {
  if (this.pattern === null) {
    return onAbsent.apply();
  }

  return this.pattern;
};

Signature.prototype.accept = function (visitor) {
  var self = this;

  return visitor.visitSignature(self).then(function () {
    return acceptAll(self.parts, visitor);
  }).then(function () {
    if (self.pattern !== null) {
      return self.pattern.accept(visitor);
    }
  });
};

Signature.prototype.toString = function () {
  var pattern = this.pattern;

  return this.parts.join(" ") + (pattern ? " -> " + pattern : "");
};

// new SignaturePart(name : Identifier,
//     generics : [Identifier], parameters : [Parameter])
//   A part of a method's signature.
function SignaturePart(name, generics, parameters) {
  Node.call(this, name);

  this.name = name;
  this.generics = generics;
  this.parameters = parameters;
}

util.inherits(SignaturePart, Node);

SignaturePart.prototype.accept = function (visitor) {
  var self = this;

  return visitor.visitSignaturePart(self).then(function () {
    return self.name.accept(visitor);
  }).then(function () {
    return acceptAll(self.generics, visitor);
  }).then(function () {
    return acceptAll(self.parameters, visitor);
  });
};

SignaturePart.prototype.toString = function () {
  return this.name + commas("<", this.generics, ">") +
    commas("(", this.parameters, ")");
};

// new Parameter(name : Identifier, pattern : Expression, isVarArg : Boolean)
//   A parameter in a method signature.
function Parameter(name, pattern, isVarArg, token) {
  Node.call(this, token);

  this.name = name;
  this.pattern = pattern;
  this.isVarArg = isVarArg;
}

util.inherits(Parameter, Node);

Parameter.prototype.patternOrIfAbsent = function (onAbsent) {
  if (this.pattern === null) {
    return onAbsent.apply();
  }

  return this.pattern;
};

Parameter.prototype.accept = function (visitor) {
  var self = this;

  return visitor.visitParameter(self).then(function () {
    return self.name.accept(visitor);
  }).then(function () {
    if (self.pattern !== null) {
      return self.pattern.accept(visitor);
    }
  });
};

Parameter.prototype.toString = function () {
  var pattern = this.pattern;

  return (this.isVarArg ? "*" : "") + this.name +
    (pattern === null ? "" : " : " + pattern);
};

// new Block(parameters : [Parameter], body : [Statement])
//   A block literal.
function Block(parameters, body, token) {
  Node.call(this, token);

  this.parameters = parameters;
  this.body = body;
}

util.inherits(Block, Expression);

Block.prototype.accept = function (visitor) {
  var self = this;

  return visitor.visitBlock(self).then(function () {
    return acceptAll(self.parameters, visitor);
  }).then(function () {
    return acceptAll(self.body, visitor);
  });
};

Block.prototype.toString = function () {
  var body, braceSep, newline;

  body = this.body;
  newline = body.length > 1;
  braceSep = body.length === 0 ? "" : newline ? "\n" : " ";

  return "{" + commas("", this.parameters, " ->") +
    braceSep + body.join("\n") + braceSep + "}";
};

// new Return(expression : Expression)
//   A return statement with an optional expression.
function Return(expression, token) {
  Node.call(this, token);

  this.expression = expression;
}

util.inherits(Return, Node);

Return.prototype.accept = function (visitor) {
  var self = this;

  return visitor.visitReturn(self).then(function () {
    return self.expression.accept(visitor);
  });
};

Return.prototype.toString = function () {
  var expression = this.expression;
  return "return" + (expression === null ? "" : " " + expression);
};

// new Inherits(request : Request)
//   An inherits statement with a required super-object request.
function Inherits(request, token) {
  Node.call(this, token);

  this.request = request;
}

util.inherits(Inherits, Node);

Inherits.prototype.accept = function (visitor) {
  var self = this;

  return visitor.visitInherits(self).then(function () {
    return self.request.accept(visitor);
  });
};

Inherits.prototype.toString = function () {
  return "inherits " + this.request;
};

// new Type(signatures : [Signature])
//   A type literal of method signatures.
function Type(signatures, token) {
  Node.call(this, token);

  this.signatures = signatures;
}

util.inherits(Type, Expression);

Type.prototype.nameOf = function (i) {
  return buildName.call(this.signatures[i]);
};

Type.prototype.accept = function (visitor) {
  var self = this;

  return visitor.visitType(self).then(function () {
    return acceptAll(self.signatures, visitor);
  });
};

Type.prototype.toString = function () {
  var sep, signatures;

  signatures = this.signatures;
  sep = signatures.length === 0 ? "" : " ";

  return "type {" + sep + signatures.join("; ") + sep + "}";
};

// new TypeDeclaration(name : Identifier, generics : [Type],
//     annotations : [Expression], value : Type)
//   A new type declaration.
function TypeDeclaration(name, generics, annotations, value, token) {
  Node.call(this, token);

  this.name = name;
  this.generics = generics;
  this.annotations = annotations;
  this.value = value;
}

util.inherits(TypeDeclaration, Node);

TypeDeclaration.prototype.accept = function (visitor) {
  var self = this;

  return visitor.visitTypeDeclaration(self).then(function () {
    return self.name.accept(visitor);
  }).then(function () {
    return acceptAll(self.generics, visitor);
  }).then(function () {
    return acceptAll(self.annotations, visitor);
  }).then(function () {
    return self.value.accept(visitor);
  });
};

TypeDeclaration.prototype.toString = function () {
  return "type " + this.name + commas("<", this.generics, ">") +
    commas(" is ", this.annotations, "") + " = " + this.value;
};

// new Self()
//   A reference to the local self value.
function Self(token) {
  Node.call(this, token);
}

util.inherits(Self, Expression);

Self.prototype.accept = function (visitor) {
  return visitor.visitSelf(this);
};

Self.prototype.toString = function () {
  return "self";
};

// new Super()
//   The receiver of a request on super. Only appropriate in that context: this
//   is not an expression.
function Super(token) {
  Node.call(this, token);
}

util.inherits(Super, Node);

Super.prototype.accept = function (visitor) {
  return visitor.visitSuper(this);
};

Super.prototype.toString = function () {
  return "super";
};

// new Outer()
//   The receiver of a request on outer. Only appropriate in that context: this
//   is not as expression.
function Outer(token) {
  Node.call(this, token);
}

util.inherits(Outer, Node);

Outer.prototype.accept = function (visitor) {
  return visitor.visitOuter(this);
};

Outer.prototype.toString = function () {
  return "outer";
};

exports.Node = Node;
exports.Expression = Expression;
exports.Dialect = Dialect;
exports.Identifier = Identifier;
exports.Import = Import;
exports.Request = Request;
exports.UnqualifiedRequest = UnqualifiedRequest;
exports.QualifiedRequest = QualifiedRequest;
exports.RequestPart = RequestPart;
exports.BooleanLiteral = BooleanLiteral;
exports.NumberLiteral = NumberLiteral;
exports.StringLiteral = StringLiteral;
exports.Def = Def;
exports.Var = Var;
exports.ObjectConstructor = ObjectConstructor;
exports.Signature = Signature;
exports.SignaturePart = SignaturePart;
exports.Method = Method;
exports.Class = Class;
exports.Parameter = Parameter;
exports.Block = Block;
exports.Return = Return;
exports.Inherits = Inherits;
exports.Type = Type;
exports.TypeDeclaration = TypeDeclaration;
exports.Self = Self;
exports.Super = Super;
exports.Outer = Outer;

},{"./task":19,"./util":21}],2:[function(require,module,exports){
// Defines a base visitor class for building AST visitors in Grace.

"use strict";

var ast, defs, prim, rt, util, visitor;

ast = require("../ast");
rt = require("../runtime");
defs = require("../runtime/definitions");
prim = require("../runtime/primitives");
util = require("../util");

function Visitor() {}

util.inherits(Visitor, prim.Object);

function visit(node) {
  return this.visitNode(node);
}

util.forProperties(ast, function (name) {
  name = "visit" + name;

  Visitor.prototype[name] = rt.method(name, 1, visit);
});

Visitor.prototype.visitNode = rt.method("visitNode", 1, function () {
  return defs.bool(true);
});

function EmptyVisitor() {}

util.inherits(EmptyVisitor, Visitor);

EmptyVisitor.prototype.visitNode = rt.method("visitNode", 1, function () {
  return defs.bool(false);
});

visitor = defs.object();

function makeConstructor(name, Ctor) {
  visitor[name] = rt.constructor(name, 0, function (inheritor) {
    if (inheritor === null) {
      return new Ctor();
    }

    util.extend(inheritor, Ctor.prototype);

    return inheritor;
  });
}

makeConstructor("base", Visitor);
makeConstructor("empty", EmptyVisitor);

module.exports = visitor;

},{"../ast":1,"../runtime":10,"../runtime/definitions":11,"../runtime/primitives":16,"../util":21}],3:[function(require,module,exports){
// The core module of the library, exposing an interpreter that takes Grace code
// and executes it. It also exposes the constructor for the underlying
// Interpreter object, which allows for the preservation of state between
// multiple executions.

"use strict";

var Task, interpreter, loader, parser, rt, util;

parser = require("./parser");
Task = require("./task");
util = require("./util");

function parseAndHandle(text, path) {
  return parser.parse(text).then(null, function (error) {
    if (error instanceof parser.ParseError) {
      return rt.ParseFailure.raise(rt.string(error.message))
        .then(null, function (packet) {
          packet.object.stackTrace = [
            rt.trace(null, null, {
              "module": path,
              "line": error.line,
              "column": error.column
            })
          ];

          throw packet;
        });
    }

    return rt.InternalError.raiseFromPrimitiveError(error);
  });
}

function CheckResult(isSuccess, name, result, line, column) {
  this.isSuccess = isSuccess;
  this.name = name;

  if (isSuccess) {
    this.value = result;
  } else {
    this.message = result;
    this.line = line;
    this.column = column;
  }
}

CheckResult.prototype.toString = function () {
  return this.name + (this.message ? ": " + this.message : "");
};

// new Interpreter(preludeGen : Task<Object> | Object = <sys>,
//     moduleLoader : Function<Interpreter, Path, Callback<Object>> = <fs>)
//   A new interpreter, with internal state preserved between executions. The
//   prelude generator may either be a task to build the prelude object, or just
//   the object itself.
function Interpreter(preludeGen, moduleLoader) {
  var self = this;

  if (moduleLoader === undefined && typeof preludeGen === "function") {
    moduleLoader = preludeGen;
    preludeGen = rt.prelude;
  }

  this.prelude = Task.resolve(preludeGen || rt.prelude);
  moduleLoader = moduleLoader || loader.defaultLoader;

  self.prelude.then(function (prelude) {
    self.interpreter = new interpreter.Interpreter(prelude,
      function (path, callback) {
        moduleLoader.apply(null, [ self, path, callback ]);
      });
  });
}

function makeInterpret(method, optionalPath, parse, onSuccess, onFailure) {
  return function (path, code, callback) {
    var self = this;

    if (optionalPath && typeof code !== "string") {
      callback = code;
      code = path;
      path = null;
    }

    function next(ast) {
      return self.prelude.then(function () {
        delete self.interpreter.modulePath;

        if (path !== null) {
          self.interpreter.modulePath = path;
        }

        return self.interpreter[method](ast, path);
      });
    }

    return (util.isArray(code) ? next(code) : parse(code, path).then(next))
      .then(onSuccess || null, onFailure || null).callback(callback).stopify();
  };
}

// interpret(path : Path = undefined,
//     code : String, callback : Callback<Object>) -> Function<Boolean>
//   Interpret Grace code with the existing state of this interpreter, returning
//   the result of the final expression. Takes an optional module path that will
//   be used to report problems. Returns a function that will attempt to stop
//   the execution when called.
Interpreter.prototype.interpret =
  makeInterpret("interpret", true, parseAndHandle);

// check(path : Path = undefined,
//     code : String, callback : Callback<StaticError>) -> Function<Boolean>
//   Parse and check the given code, returning an object with information about
//   the problem if the code fails to parse or fails its check. Takes an
//   optional module path that will be used to report problems. Returns a
//   function that will attempt to stop the execution when called.
Interpreter.prototype.check =
  makeInterpret("check", true, parser.parse, function (result) {
    if (util.isArray(result)) {
      return new CheckResult(true, "Success", result);
    }

    return result.message().then(function (message) {
      return message.asPrimitiveString();
    }).then(function (message) {
      var location, node;

      node = result.object.node;
      location = node && node.location;

      return new CheckResult(false, "Checker Failure",
        message, location && location.line, location && location.column);
    });
  }, function (packet) {
    if (packet instanceof parser.ParseError) {
      return new CheckResult(false, "Parse Failure",
        packet.message, packet.line, packet.column);
    }

    throw packet;
  });

// module(path : Path, code : String,
//     callback : Callback<Object>) -> Function<Boolean>
//   Interpret Grace code as a module body and cache it based on the given path
//   so a request for the same module does not occur again. Returns a function
//   that will attempt to stop the execution when called.
Interpreter.prototype.module =
  makeInterpret("module", false, parseAndHandle);

// load(path : Path, callback : Callback<Object>) -> Function<Boolean>
//   Run the interpreter module loader on the given path. Returns a function
//   that will attempt to stop the execution when called.
Interpreter.prototype.load = function (path, callback) {
  var self = this;

  return self.prelude.then(function () {
    return self.interpreter.load(path);
  }).callback(callback).stopify();
};

// enter(Callback<Object> = null)
//   Enter into an object scope and stay in that state, passing the newly
//   created self value to the given callback. This is useful for implementing
//   an interactive mode.
Interpreter.prototype.enter = function (callback) {
  var self = this;

  self.prelude.then(function () {
    return self.interpreter.enter();
  }).callback(callback);
};

function buildAndApply(method, args) {
  var built, len, required;

  function Build() {
    Interpreter.apply(this, util.slice(args, required, len));
  }

  Build.prototype = Interpreter.prototype;

  required = typeof args[1] === "string" || util.isArray(args[1]) ? 2 : 1;

  len = args.length - 1;
  built = new Build();
  return built[method].apply(built,
    util.slice(args, 0, required).concat([ args[len] ]));
}

exports.Interpreter = Interpreter;

// interpret(path : Path = undefined, code : String, prelude : Object = <sys>,
//     moduleLoader : Function<Interpreter, Path, Callback<Object>> = <fs>,
//     callback : Callback<Object>)
//   Interpret Grace code standalone.
exports.interpret = function () {
  return buildAndApply("interpret", arguments);
};

// check(path : Path = undefined, code : String, prelude : Object = <sys>,
//     moduleLoader : Function<Interpreter, Path, Callback<Object>> = <fs>,
//     callback : Callback<Object>)
//   Check Grace code standalone.
exports.check = function () {
  return buildAndApply("check", arguments);
};

// module(path : Path, code : String, prelude : Object = <sys>,
//     moduleLoader : Function<Interpreter, Path, Callback<Object>> = <fs>,
//     callback : Callback<Object>)
//   Interpret Grace code standalone as a module body and cache it based on the
//   given path so a request for the same module does not occur again.
exports.module = function () {
  return buildAndApply("module", arguments);
};

// load(path : Path, prelude : Object = <sys>,
//     moduleLoader : Function<Interpreter, Path, Callback<Object>> = <fs>,
//     callback : Callback<Object>)
//   Run a new interpreter with a module loader on the given path.
exports.load = function () {
  return buildAndApply("load", arguments);
};

rt = require("./runtime");
interpreter = require("./interpreter");

loader = require("./loader");

exports.Task = Task;
exports.runtime = rt;
exports.defaultLoader = loader.defaultLoader;
exports.prelude = rt.prelude;

util.extend(exports, parser);

},{"./interpreter":4,"./loader":5,"./parser":6,"./runtime":10,"./task":19,"./util":21}],4:[function(require,module,exports){
(function (global){
// The Grace interpreter. Exposes both the Interpreter constructor and the
// helper function 'interpret' which executes on an anonymous Interpreter.
//
// Almost every function in the interpreter runs asynchronously, taking a
// callback as its last argument that expects an error and a result as its
// parameters. This asynchronous behaviour allows the interpreter to take
// single-tick breaks on each method request, freeing up the event loop.
// Standard JavaScript functions can be marked as asynchronous by attaching an
// 'asynchronous' property with a truthy value to the function. All functions
// built by the interpreter from Method nodes in the AST are asynchronous by
// default, but a user will be able to disable this in the future with an
// annotation (this functionality is necessary for interacting with standard
// JavaScript).
//
// The asynchronous behaviour of the whole interpreter can be turned off
// wholesale by passing false to the constructor or by setting the
// 'asynchronous' property to false. The interface will still asynchronous, but
// the 'asynchronous' property of functions will be ignored and the interpreter
// will not take single-tick breaks. This can also be achieved with the
// 'interpret' helper by simply not passing a callback.

"use strict";

var Task, ast, path, rt, util;

path = require("path");

Task = require("./task");
ast = require("./ast");
rt = require("./runtime");
util = require("./util");

// new Interpreter(prelude : Object,
//     moduleLoader : Function<Path, Callback<Object>>)
//   A new interpreter, with internal state preserved between executions.
function Interpreter(prelude, moduleLoader) {
  util.makeCloneable(this, "scope");

  this.modules = {};
  this.load = Task.taskify(this, moduleLoader);

  this.scope = {
    "outer": null,
    "self": prelude
  };
}

// Interprets a list of AST nodes asynchronously, passing the result of
// interpreting the final node in the list (or done, if the list is empty).
Interpreter.prototype.interpret = function (nodes) {
  function handleObject() {
    var context, isConfidential, method, name, outer;

    if (this.scope.object &&
        (nodes.length === 0 || nodes[0].constructor !== ast.Inherits)) {
      delete this.scope.object;

      context = this.self();

      for (name in context) {
        if (typeof context[name] === "function") {
          method = context[name];

          isConfidential = method.isConfidential;

          while (util.owns(method, "super")) {
            method = method["super"];

            if (method.isConfidential) {
              isConfidential = true;
            } else if (isConfidential) {
              name = rt.string(method.identifier);
              return rt.InvalidMethod.raiseConfidentialOverrideForName(name);
            }
          }
        }
      }

      if (context.asString === rt.base.asString) {
        outer = this.searchScope("self", true);
        method = this.searchScope("method", true);

        if (method !== null) {
          name = method.identifier;

          context.asString = rt.method("asString", 0, function () {
            return outer.asString().then(function (string) {
              return string.asPrimitiveString().then(function (pstring) {
                return rt.string("object(" + pstring + "." + name + ")");
              });
            });
          });
        } else if (this.modulePath !== undefined) {
          name = this.modulePath;

          context.asString = rt.method("asString", 0, function () {
            return rt.string("object(" + name + ")");
          });
        }
      }
    }

    return this.resolve(rt.done);
  }

  if (nodes.length === 0) {
    return handleObject.call(this);
  }

  return this.imports(nodes).then(function () {
    // Methods and variables are hoisted to the top of their scope.
    return this.each(nodes, function (node) {
      var constructor = node.constructor;

      if (constructor === ast.Method || constructor === ast.Class) {
        return this.evaluate(node);
      }

      if (constructor === ast.Def || constructor === ast.Var) {
        return this.putVariable(node, rt.pattern(function () {
          // It's an error to assign to a hoisted var before its actual
          // location in code has been reached.
          return rt.UndefinedValue.raiseForName(rt.string(node.name.value));
        }));
      }
    });
  }).then(function () {
    return this.decls(nodes);
  }).then(function () {
    return this.annotations(nodes);
  }).then(handleObject).then(function () {
    return this.each(nodes, function (node) {
      // Imports, methods, and types have already been hoisted. Variables still
      // need their contents to be evaluated.
      if (node.constructor !== ast.Dialect &&
          node.constructor !== ast.Import &&
          node.constructor !== ast.Method &&
          node.constructor !== ast.Class &&
          node.constructor !== ast.TypeDeclaration) {
        return this.evaluate(node);
      }

      return rt.done;
    });
  }).then(function (results) {
    return results.pop();
  });
};

// Enter into an object scope and stay in that state, returning the newly
// created self value. This is useful for an interactive mode.
Interpreter.prototype.enter = function () {
  var object = rt.object();
  this.push(object);
  return object;
};

// Interpret a list of nodes as a module body and cache it based on a path so a
// request for the same module does not occur again.
Interpreter.prototype.module = function (nodes, key) {
  var interpreter, module;

  key = path.normalize(key);
  interpreter = this.clone();
  interpreter.modulePath = key;

  module = rt.object();

  module.asString = rt.method("asString", 0, function () {
    return rt.string(key);
  });

  return interpreter.objectBody(nodes, module).bind(this).then(function () {
    this.modules[path.normalize(key)] = module;
    return module;
  }, rt.handleInternalError);
};

Interpreter.prototype.evaluate = function (node) {
  var constructor = node.constructor;

  if (constructor === ast.Method) {
    return this.method(node);
  }

  if (constructor === ast.Class) {
    return this["class"](node);
  }

  if (constructor === ast.Def || constructor === ast.Var) {
    return this.variable(node, false);
  }

  if (constructor === ast.Return) {
    return this["return"](node);
  }

  if (constructor === ast.Inherits) {
    return this.inherits(node);
  }

  return this.expression(node);
};

Interpreter.prototype.expression = function (node) {
  var constructor = node.constructor;

  if (constructor === ast.UnqualifiedRequest ||
      constructor === ast.QualifiedRequest) {
    return this.request(node);
  }

  if (constructor === ast.Self) {
    if (this.scope.object) {
      return rt.IncompleteObject.raiseForSelf()
        .bind(this).then(null, function (packet) {
          return this.report(packet, "self", null, node);
        });
    }

    return this.resolve(this.searchScope("self"));
  }

  if (constructor === ast.ObjectConstructor) {
    return this.object(node);
  }

  if (constructor === ast.Block) {
    return this.task(function () {
      return this.block(node);
    });
  }

  if (constructor === ast.Type) {
    return this.type(node);
  }

  if (constructor === ast.BooleanLiteral) {
    return this.bool(node);
  }

  if (constructor === ast.NumberLiteral) {
    return this.number(node);
  }

  if (constructor === ast.StringLiteral) {
    return this.string(node);
  }

  return this.raise("Unrecognised node of type " + constructor.name);
};

Interpreter.prototype.inheriting = function (node, inheriting) {
  var constructor = node.constructor;

  if (constructor === ast.UnqualifiedRequest ||
      constructor === ast.QualifiedRequest) {
    return this.request(node, inheriting);
  }

  if (constructor === ast.BooleanLiteral) {
    return this.bool(node, inheriting);
  }

  return this.raise(rt.string("Unrecognised node of type " +
      constructor.name + " in inheritance")).bind(this);
};

Interpreter.prototype.imports = function (nodes) {
  return this.each(nodes, function (node) {
    var constructor = node.constructor;

    if (constructor === ast.Dialect) {
      return this.dialect(node, nodes);
    }

    if (constructor === ast.Import) {
      return this["import"](node);
    }
  });
};

Interpreter.prototype.check = function (nodes) {
  var name;

  if (nodes.length > 0 && nodes[0].constructor === ast.Dialect) {
    name = nodes[0].path.value;

    return this.dialect(nodes[0], nodes).then(function () {
      return nodes;
    }, function (packet) {
      if (packet instanceof rt.CheckerFailure.object.Packet &&
          packet.object.module === name) {
        return packet;
      }

      throw packet;
    });
  }

  return Task.resolve(nodes);
};

Interpreter.prototype.dialect = function (node, nodes) {
  var name = node.path.value;

  return this.load(name).bind(this).then(function (module) {
    return this.task(function () {
      if (typeof module.check === "function") {
        return module.check(rt.list(nodes));
      }
    }).then(function () {
      this.scope.outer = {
        "outer": null,
        "self": module
      };
    }, function (packet) {
      var object = packet.object;

      if (packet instanceof rt.CheckerFailure.object.Packet &&
          object.module === undefined) {
        object.stackTrace = [];
        object.module = name;

        if (object.node) {
          return this.reportNode(packet, object.node);
        }
      }

      throw packet;
    });
  }).then(null, function (packet) {
    return this.report(packet, 'dialect "' + node.path.value + '"', null, node);
  });
};

Interpreter.prototype["import"] = function (node) {
  return this.load(node.path.value).bind(this).then(function (module) {
    var name = node.identifier.value;

    if (name !== "_") {
      return this.put(name, this.newVar(name, module), node);
    }
  }, function (packet) {
    return this.report(packet, 'import "' + node.path.value + '"', null, node);
  });
};

Interpreter.prototype.annotations = function (nodes) {
  return this.each(nodes, function (node) {
    return this.task(function () {
      var scope = this.scope;

      function getDefinition(name) {
        return scope[name || node.name.value];
      }

      if (node.constructor === ast.TypeDeclaration ||
          node.constructor === ast.Def || node.constructor === ast.Class) {
        return this.annotate([ getDefinition() ], node.annotations,
          node.constructor === ast.Def ? "Def" :
              node.constructor === ast.Class ? "Class" : "Type");
      }

      if (node.constructor === ast.Method) {
        return this
          .annotate([ getDefinition(util.uglify(node.signature.name())) ],
            node.annotations, "Method");
      }

      if (node.constructor === ast.Var) {
        return this.annotate([
          getDefinition(),
          getDefinition(node.name.value + ":=")
        ], node.annotations, "Var");
      }
    }).then(null, function (packet) {
      return this.reportNode(packet, node);
    });
  });
};

Interpreter.prototype.annotate = function (values, annotations, name) {
  return this.each(annotations, function (annNode) {
    return this.expression(annNode).then(function (annotation) {
      return this.assert(annotation, rt[name + "Annotator"])
        .then(function () {
          return this.apply(annotation, "annotate" + name, [ values ]);
        });
    });
  });
};

Interpreter.prototype.object = function (node, inheriting) {
  return this.objectBody(node.body, inheriting).then(function (object) {
    // This is the only set of annotations that is evaluated at the point where
    // it appears in the code. All other annotations are hoisted.
    return this.annotate([ object ], node.annotations, "Object")
      .then(function () {
        return object;
      });
  }).then(null, function (packet) {
    return this.report(packet, "object", null, node);
  });
};

Interpreter.prototype.objectBody = function (body, inheriting) {
  var object = inheriting || rt.object();

  return this.scoped(object, function () {
    this.scope.object = true;

    return this.interpret(body);
  }).then(function () {
    return object;
  });
};

Interpreter.prototype.block = function (node) {
  var block, interpreter, parameter, parameters, patternNode, signature;

  parameters = node.parameters;
  signature = new ast.Signature([
    new ast.SignaturePart(new ast.Identifier("apply", false, node),
      [], parameters)
  ], null, node);

  interpreter = this.clone();

  block = rt.block([ 0, parameters.length ], function () {
    var args = [ util.slice(arguments) ];

    return interpreter.clone().scoped(function () {
      return this.parts(signature, args, node).then(function () {
        return this.interpret(node.body);
      });
    });
  });

  if (parameters.length === 1) {
    parameter = parameters[0];
    patternNode = parameter.pattern;

    if (patternNode !== null) {
      block.match = rt.method("match()", 1, function (object) {
        return interpreter.pattern(patternNode).then(function (pattern) {
          return pattern.match(object).then(function (match) {
            return match.andAlso(rt.block(0, function () {
              // Reimplement apply(), without testing the pattern.
              return interpreter.clone().scoped(function () {
                var name = parameter.name.value;

                return this.task(function () {
                  if (name !== "_") {
                    return this.put(name, this.newVar(name, object), parameter);
                  }
                }).then(function () {
                  return this.interpret(node.body).then(function (result) {
                    return rt.success(result, block);
                  });
                });
              });
            }));
          });
        });
      });
    }
  }

  return block;
};

Interpreter.prototype.assert = function (value, pattern) {
  if (pattern !== rt.Unknown) {
    return this.apply(pattern, "assert()", [ [ value ] ]);
  }

  return this.resolve(null);
};

Interpreter.prototype.decls = function (nodes) {
  return this.each(nodes, function (node) {
    var name;

    if (node.constructor === ast.TypeDeclaration) {
      name = node.name.value;

      return this.put(name, this.newType(name, node.generics.length), node)
        .then(function () {
          return node;
        });
    }
  }).then(function (declNodes) {
    return this.each(declNodes, this.decl).then(function (decls) {
      return this.each(declNodes, decls, this.putDecl);
    }).then(function () {
      return this.each(declNodes, function (node) {
        if (this.scope[node.name.value].value.object.become) {
          return rt.InvalidType
            .raiseSelfDependencyForType(rt.string(node.name.value))
            .bind(this).then(null, this.reportDecl(node));
        }
      });
    });
  });
};

Interpreter.prototype.decl = function (node) {
  function evaluate() {
    if (node.value.constructor === ast.Type) {
      return this.type(node.value, node.name.value);
    }

    return this.expression(node.value);
  }

  return this.task(function () {
    if (node.generics.length !== 0) {
      // TODO Build a better semantics for recursive types.
      return this.scoped(function () {
        return this.each(node.generics, function (parameter) {
          var name = parameter.value;
          return this.put(name, this.newVar(name, rt.Unknown), node);
        }).then(evaluate);
      });
    }

    return evaluate.call(this);
  }).then(null, this.reportDecl(node));
};

Interpreter.prototype.putDecl = function (node, pattern) {
  // TODO Should assert that the value is statically known, not just
  // that it is a pattern.
  return this.assert(pattern, rt.Pattern).then(function () {
    // We need to retain the references of the hoisted values, so we
    // need to copy the properties of the resulting expression into
    // the referenced value.
    var decl, proxy;

    // This is safe because types cannot be overridden.
    decl = this.scope[node.name.value];
    proxy = decl.value;

    return proxy.object.become(pattern);
  }).then(null, this.reportDecl(node));
};

Interpreter.prototype.reportDecl = function (node) {
  return function (packet) {
    var trace;

    // Remove the report about the anonymous type when it appears directly in a
    // type alias declaration.
    if (typeof packet.object === "object") {
      trace = packet.object.stackTrace;
      if (trace.length > 0 && trace[0].name === "type") {
        trace.shift();
      }
    }

    return this.report(packet, "type " + node.name.value, null, node);
  };
};

Interpreter.prototype.type = function (node, decl) {
  var i, j, l, name, names, nsignatures, tsignatures;

  function report(packet) {
    return this.report(packet, "type", null, node);
  }

  nsignatures = node.signatures;
  names = [];
  tsignatures = [];

  for (i = 0, l = nsignatures.length; i < l; i += 1) {
    name = node.nameOf(i);

    for (j = 0; j < i; j += 1) {
      if (names[j] === name) {
        decl = decl === undefined ? node : rt.string(decl);

        return rt.InvalidType
          .raiseDuplicateMethodName_inType([ rt.string(name) ], [ decl ])
          .bind(this).then(null, report);
      }
    }

    names.push(name);

    tsignatures.push(this.typeSignature(nsignatures[i]));
  }

  return this.resolve(rt.type(tsignatures));
};

Interpreter.prototype.typeSignature = function (signature) {
  var generics, hasVarArg, i, l, parameters, part, parts;

  function getValue(node) {
    return node.value;
  }

  function getName(node) {
    if (node.isVarArg) {
      hasVarArg = true;
      return "*" + node.name.value;
    }

    return node.name.value;
  }

  parts = [];

  for (i = 0, l = signature.parts.length; i < l; i += 1) {
    hasVarArg = false;
    part = signature.parts[i];
    generics = util.map(part.generics, getValue);
    parameters = util.map(part.parameters, getName);

    parts.push(rt.sigPart(part.name.value, hasVarArg, generics, parameters));
  }

  return rt.signature(parts);
};

Interpreter.prototype.bool = function (node, inheriting) {
  var method = rt[node.value ? "mtrue" : "mfalse"];

  if (inheriting !== undefined) {
    return this.inherit(null, method, inheriting);
  }

  return method().bind(this);
};

Interpreter.prototype.number = function (node) {
  return this.resolve(rt.number(node.value));
};

Interpreter.prototype.string = function (node) {
  return this.resolve(rt.string(node.value));
};

// Handles both synchronous and asynchronous requests.
Interpreter.prototype.apply = function () {
  return rt.apply.apply(null, arguments).bind(this);
};

// Handles both synchronous and asynchronous inherit requests.
Interpreter.prototype.inherit = function () {
  return rt.inherit.apply(null, arguments).bind(this);
};

Interpreter.prototype.request = function (node, inheriting) {
  var name, pretty;

  pretty = node.name();
  name = util.uglify(pretty);

  return this.task(function () {
    if (node.constructor === ast.UnqualifiedRequest) {
      return this.unqualifiedRequest(node, name, pretty);
    }

    return this.qualifiedRequest(node, name, pretty);
  }).then(function (pair) {
    var method, receiver;

    receiver = pair[0];
    method = pair[1];

    return this.each(node.parts, function (part) {
      if (method.isVariable && part.generics.length > 0) {
        return rt.InvalidRequest.raiseGenericsForVariable(rt.string(name));
      }

      return this.each(part.generics, function (param) {
        return this.expression(param);
      }).then(function (generics) {
        if (part["arguments"].length > 0) {
          if (method.isVariable) {
            return rt.InvalidRequest.raiseArgumentsForVariable(rt.string(name));
          }

          if (method.isStatic) {
            return rt.InvalidRequest.raiseArgumentsForType(rt.string(name));
          }
        }

        return this.each(part["arguments"], this.expression)
          .then(function (args) {
            args.generics = generics;
            return args;
          });
      });
    }).then(function (args) {
      return this.task(function () {
        if (inheriting !== undefined) {
          return this.inherit(receiver, method, inheriting, args);
        }

        return this.apply(receiver, method, args);
      }).then(null, rt.handleInternalError).then(null, function (packet) {
        if (node.constructor === ast.QualifiedRequest &&
            node.receiver.constructor === ast.Super) {
          receiver = "super";
        }

        packet.object.stackTrace.pop();
        return this.report(packet, pretty, receiver, node);
      });
    });
  });
};

Interpreter.prototype.unqualifiedRequest = function (node, name, pretty) {
  return this.search(name).then(function (pair) {
    var l, rec, ref;

    if (pair === null) {
      // Produce a more specific error message for missing assignment.
      l = name.length - 2;
      if (name.substring(l) === ":=") {

        // The pretty name has a space in it that moves the index to split
        // at forward by one, but the increased length of the total string
        // means that 'l' is still the correct index.
        pretty = rt.string(pretty.substring(0, l));

        return this.search(name.substring(0, l)).then(function (found) {
          if (found === null) {
            return rt.UnresolvedRequest
              .raiseForAssignToUnresolvedName(pretty);
          }

          return rt.UnresolvedRequest.raiseForAssignToName(pretty);
        });
      }

      return rt.UnresolvedRequest.raiseForName(rt.string(pretty));
    }

    rec = pair[0];
    ref = pair[1];

    if (rec !== null && this.scope.object &&
        rec === this.searchScope("self") && !util.owns(ref, "value")) {
      return rt.IncompleteObject.raiseForName(rt.string(pretty));
    }

    return pair;
  }).then(null, function (packet) {
    return this.report(packet, pretty, null, node);
  });
};

Interpreter.prototype.qualifiedRequest = function (node, name, pretty) {
  var context, method, rnode, sup;

  rnode = node.receiver;

  if (rnode.constructor === ast.Super) {
    sup = this.searchScope("super", false);
    context = this.searchScope("self");

    return this.task(function () {
      if (sup !== null) {
        if (util.owns(sup, name)) {
          // This super is attempting to request the method above the one that
          // was defined when this scope was first entered.
          method = sup[name]["super"];
        } else {
          // No method with that name had appeared in the object when the
          // inheritance at this level ocurred. Attempt to recover by pulling
          // the method directly out of self: if it appears there, then it
          // must have been defined further up the inheritance chain, so it's
          // safe to say it's a super method.
          method = context[name];
        }
      }

      if (method === undefined) {
        // Either the method didn't appear on the object at all, or there was
        // no overridden method to request.
        return rt.UnresolvedSuperRequest
          .raiseForName_inObject([ rt.string(pretty) ], [ context ]);
      }

      return [ context, method ];
    }).bind(this).then(null, function (packet) {
      return this.report(packet, pretty, "super", node);
    });
  }

  if (rnode.constructor === ast.Outer) {
    method = this.searchScope(name, true);

    if (method === null) {
      return rt.UnresolvedRequest.raiseForName(rt.string(pretty))
        .bind(this).then(null, function (packet) {
          return this.report(packet, pretty, "outer", node);
        });
    }

    return [ null, method ];
  }

  return this.expression(rnode).then(function (receiver) {
    return rt.lookup(receiver, pretty, rnode.constructor === ast.Self)
      .bind(this).then(function (foundMethod) {
        return [ receiver, foundMethod ];
      }, function (packet) {
        return this.report(packet, pretty, receiver, node);
      });
  });
};

Interpreter.prototype["class"] = function (node) {
  var object = rt.object();

  return this.scoped(object, function () {
    return this.method(node);
  }).then(function () {
    var def, name, string;

    name = node.name.value;
    def = this.newVar(name, object, true);
    string = rt.string(name);

    object.asString = rt.method("asString", 0, function () {
      return string;
    });

    return this.put(name, def, node);
  });
};

Interpreter.prototype.method = function (node) {
  var body, constructor, init, interpreter, last, method, pretty, signature;

  pretty = node.signature.name();
  signature = node.signature;
  body = node.body;

  // Save the state of the surrounding scope at the point where the method
  // is defined.
  interpreter = this.clone();

  function buildMethod(isInherits, func) {
    return function (inheriting) {
      var argParts, clone;

      argParts = util.slice(arguments, isInherits ? 1 : 0);

      if (signature.parts.length === 1) {
        argParts = [ argParts ];
      }

      // Reclone the interpreter to get a unique scope for this execution.
      clone = interpreter.clone();
      if (this !== null && this !== global && this !== clone.scope.self) {
        clone.scope.self = this;
      }

      return clone.scoped(function () {
        return new Task(this, function (resolve, reject) {
          this.parts(signature, argParts, node).then(function (pattern) {
            var exit, top;

            // Ensures that the postcondition of the method holds before
            // exiting the method.
            exit = function (value) {
              top["return"] = function () {
                return rt.InvalidReturn
                  .raiseForCompletedMethod(rt.string(pretty));
              };

              this.assert(value, pattern).then(function () {
                resolve(value);
              }, function (packet) {
                return this.reportNode(packet, signature.pattern)
                  .then(null, reject);
              });

              return new Task(function () {
                return;
              });
            };

            top = this.scope;
            top["return"] = exit;
            top.method = method;

            return func.call(this, inheriting).bind(this).then(exit, reject);
          }, reject);
        });
      }).bind(null);
    };
  }

  return this.signature(signature, pretty).then(function (parts) {
    method = rt.method(pretty, parts,
      buildMethod(false, node.constructor === ast.Class ? function () {
        return this.objectBody(body).bind(null);
      } : function () {
        return this.interpret(body).bind(null);
      }));

    // Build inheritance mechanism.
    if (node.constructor === ast.Class) {
      method.inherit = rt.inheritor(pretty, parts,
        buildMethod(true, function (inheriting) {
          return this.objectBody(body, inheriting);
        }));
    } else if (body.length > 0) {
      last = body[body.length - 1];
      constructor = last.constructor;

      if (constructor === ast.Return) {
        last = last.expression;

        if (last !== null) {
          constructor = last.constructor;
        }
      }

      if (constructor === ast.ObjectConstructor) {
        body = body.concat();
        body.pop();
        init = body;
        body = init.concat([ last ]);

        method.inherit = rt.inheritor(pretty, parts,
          buildMethod(true, function (inheriting) {
            return this.interpret(init).then(function () {
              return this.object(last, inheriting);
            });
          }));
      }
    }

    // Put the resulting method in the local scope and run annotations.
    return this.put(pretty, method, node);
  });
};

// Process a method signature into a runtime parameter count list.
Interpreter.prototype.signature = function (signature, pretty) {
  var hasVarArg, i, j, k, l, param, params, part, parts;

  function report(packet) {
    return this.report(packet, "method", null, part);
  }

  parts = [];

  for (i = 0, l = signature.parts.length; i < l; i += 1) {
    part = signature.parts[i];
    params = part.parameters;
    hasVarArg = false;

    for (j = 0, k = params.length; j < k; j += 1) {
      param = params[j];
      if (param.isVarArg) {
        if (hasVarArg) {
          return rt.InvalidMethod
            .raiseMultipleVariadicParametersForName(rt.string(pretty))
            .bind(this).then(null, report);
        }

        hasVarArg = true;
      }
    }

    parts.push([
      part.generics.length,
      hasVarArg ? rt.gte(params.length - 1) : params.length
    ]);
  }

  return this.resolve(parts);
};

// Handle the joining of a method and a request by adding generics, evaluating
// patterns, and adding parameters, then producing the return pattern.
Interpreter.prototype.parts = function (msig, rsig, node) {
  return this.each(msig.parts, rsig, function (mpart, rpart) {
    return this.part(mpart, rpart, node);
  }).then(function () {
    return this.pattern(msig.pattern);
  });
};

// Handle the joining of individual parts of a method and a request.
Interpreter.prototype.part = function (mpart, rpart, node) {
  var genLength = mpart.generics.length;

  // Add generics, and test if they are patterns.
  return this.generics(mpart.generics, rpart.slice(0, genLength), node)
    .then(function () {
      return this.parameters(mpart.parameters, rpart.slice(genLength), node);
    });
};

// Join a method's generic parameters with the values given by a request.
Interpreter.prototype.generics = function (mgens, rgens, node) {
  return this.each(mgens, rgens, function (mgen, rgen) {
    if (mgen.value !== "_") {
      return this.put(mgen.value, this.newVar(mgen.value, rgen), node);
    }
  });
};

// Evaluate a method part's parameters and join them with part of a request.
Interpreter.prototype.parameters = function (params, args, node) {
  return this.each(params, function (param, i) {
    var varArgSize = args.length - params.length + 1;
    if (param.isVarArg) {
      args.splice(i, 0, rt.list(args.splice(i, varArgSize)));
    }
  }).then(function () {
    return this.patterns(params).then(function (patterns) {
      return this.each(params, function (param) {
        return param.name.value;
      }).then(function (names) {
        return this.args(names, patterns, args, node);
      });
    });
  });
};

// Evaluate a method part's patterns in the scope of its generic arguments.
Interpreter.prototype.patterns = function (parameters) {
  return this.each(parameters, function (parameter) {
    var name = parameter.name.value;

    return this.pattern(parameter.pattern).then(function (pattern) {
      return rt.named(name,
        parameter.isVarArg ? rt.listOf(pattern) : pattern);
    });
  });
};

Interpreter.prototype.pattern = function (expression) {
  if (expression === null) {
    // No pattern given, default to Unknown.
    return this.resolve(rt.Unknown);
  }

  return this.expression(expression).then(function (pattern) {
    // Check that it's actually a pattern.
    return this.assert(pattern, rt.Pattern).then(function () {
      return pattern;
    });
  });
};

// Join parameters and arguments together.
Interpreter.prototype.args = function (names, patterns, args, node) {
  return this.each(names, patterns, args, function (name, pattern, arg) {
    return this.assert(arg, pattern).then(function () {
      if (name !== "_") {
        return this.put(name, this.newVar(name, arg), node);
      }
    });
  });
};

Interpreter.prototype.variable = function (node) {
  return this.pattern(node.pattern).then(function (pattern) {
    var name, variable;

    name = node.name.value;
    variable = this.scope[name];

    while (!variable.isVariable) {
      variable = variable["super"];
    }

    variable.pattern = pattern;

    if (node.value !== null) {
      return this.expression(node.value).then(function (value) {
        return this.assert(value, pattern).then(function () {
          variable.value = value;
        });
      });
    }
  }).then(function () {
    return rt.done;
  }, function (packet) {
    return this.reportNode(packet, node);
  });
};

Interpreter.prototype.putVariable = function (node, pattern) {
  var name, variable;

  name = node.name.value;
  variable = this.newVar(name);

  return this.put(name, variable, node).then(function () {
    var self, setter;

    if (node.constructor === ast.Var) {
      self = this;
      variable.pattern = pattern;

      setter = rt.method(name + " :=", 1, function (value) {
        return self.assert(value, variable.pattern).then(function () {
          variable.value = value;
          return rt.done;
        });
      });

      setter.isConfidential = true;

      return this.put(name + " :=", setter, node);
    }
  }).then(function () {
    return variable;
  });
};

Interpreter.prototype["return"] = function (node) {
  var exprNode = node.expression;

  return this.task(function () {
    if (exprNode === null) {
      return rt.done;
    }

    return this.expression(exprNode);
  }).then(function (expression) {
    var exit = this.searchScope("return", false);

    if (exit === null) {
      return rt.InvalidReturn.raiseInsideOfObject();
    }

    return exit.call(this, expression).bind(this);
  }).then(null, function (packet) {
    return this.report(packet, "return", null, node);
  });
};

Interpreter.prototype.inherits = function (node) {
  var context, sup;

  context = this.self();
  sup = {};

  util.forProperties(context, function (name, method) {
    while (method["super"] !== undefined) {
      method = method["super"];
    }

    sup[name] = method;
  });

  this.scope["super"] = sup;

  return this.inheriting(node.request, context).then(function (value) {
    delete this.scope.object;
    return value;
  }, function (packet) {
    return this.report(packet, "inherits " + node.request.name(), null, node);
  });
};

// Create a new variable accessor that stores the value it is accessing as a
// property.
Interpreter.prototype.newVar = function (name, value, isPublic) {
  var variable = rt.method(name, 0, function () {
    if (util.owns(variable, "value")) {
      return variable.value;
    }

    return rt.UndefinedValue.raiseForName(rt.string(name));
  });

  if (value !== undefined) {
    variable.value = value;
  }

  variable.isVariable = true;
  variable.isConfidential = !isPublic;
  variable.identifier = name;
  variable.modulePath = this.modulePath;

  return variable;
};

// Create a new type accessor that stores the number of generics as a property.
Interpreter.prototype.newType = function (name, generics) {
  var type, value;

  value = rt.proxy(name);

  type = rt.method(name, [ [ generics, 0 ] ], function () {
    return rt.withGenerics
      .apply(null, [ name, value ].concat(util.slice(arguments)));
  });

  type.value = value;
  type.isStatic = true;
  type.modulePath = this.modulePath;

  return type;
};


// scoped(self : Object, action : () -> T) -> Task<T>
//   Push a new layer and a new self context on to the scope stack, execute an
//   action, and then pop it off.
//
// scoped(action : () -> T) -> Task<T>
//   Push a new layer on to the scope stack, execute an action, and then pop it
//   off.
Interpreter.prototype.scoped = function (context, action) {
  if (typeof context === "function") {
    action = context;
    context = undefined;
  }

  this.push(context);
  return this.task(action).then(function (value) {
    this.pop();
    return value;
  }, function (reason) {
    this.pop();
    throw reason;
  });
};

Interpreter.prototype.each = function () {
  return Task.each.apply(Task, [ this ].concat(util.slice(arguments)));
};

Interpreter.prototype.self = function () {
  if (util.owns(this.scope, "self")) {
    return this.scope.self;
  }

  return null;
};

Interpreter.prototype.put = function (pretty, method, node) {
  var context, existing, name, sub, top;

  name = util.uglify(pretty);
  top = this.scope;

  // Because method creation happens bottom upwards, if an invalid override
  // occurs it can't be detected until the super method is evaluated. By saving
  // the node with the method, the lower, erroneous method can be reported
  // rather than the non-erroneous super method.
  method.node = node;

  return this.task(function () {
    if (util.owns(top, name)) {
      existing = top[name] && top[name].identifier || pretty;

      return rt.Redefinition.raiseForName(rt.string(existing));
    }

    context = this.self();
    if (context === null) {
      top[name] = method;
    } else if (context[name] !== undefined) {
      if (util.owns(context, name)) {
        sub = context[name];
      } else {
        sub = method;
        method = context[name];
        context[name] = sub;
      }

      if (method.isStatic) {
        node = sub.node;
        return rt.InvalidMethod.raiseStaticOverrideForName(rt.string(pretty));
      }

      if (sub.isVariable) {
        node = sub.node;
        return rt.InvalidMethod
          .raiseOverridingVariableForName(rt.string(pretty));
      }

      while (util.owns(sub, "super")) {
        sub = sub["super"];
      }

      if (!rt.isSubMethod(sub.parts, method.parts)) {
        node = sub.node;
        return rt.InvalidMethod
          .raiseMismatchedParametersForName(rt.string(pretty));
      }

      sub["super"] = method;
    } else {
      context[name] = method;
    }

    top[name] = method;
  }).bind(this).then(null, function (packet) {
    return this.reportNode(packet, node);
  });
};

Interpreter.prototype.push = function (context) {
  var frame = {};

  if (context !== undefined) {
    frame.self = context;
  }

  frame.outer = this.scope;
  this.scope = frame;
};

Interpreter.prototype.pop = function () {
  this.scope = this.scope.outer;
};

// Search for a value with the given name on self or in scope.
Interpreter.prototype.search = function (name) {
  var context, frame;

  function pair(method) {
    return [ context, method ];
  }

  for (frame = this.scope; frame !== null; frame = frame.outer) {
    if (util.owns(frame, "self")) {
      context = frame.self;

      if (context[name] !== undefined) {
        return rt.lookup(context, name, true).bind(this).then(pair);
      }
    }

    if (util.owns(frame, name)) {
      return this.resolve([ null, frame[name] ]);
    }
  }

  return this.resolve(null);
};

// Find definitions stored in scope without searching through self. Takes an
// optional boolean where false indicates that the search should stop once
// it encounters a self value, and true indicates that the search should begin
// after the first self value.
Interpreter.prototype.searchScope = function (name, passSelf) {
  var frame;

  for (frame = this.scope; frame !== null; frame = frame.outer) {
    if (!passSelf && util.owns(frame, name)) {
      return frame[name];
    }

    if (util.owns(frame, "self")) {
      if (frame.outer === null && frame.self[name] !== undefined) {
        return frame.self[name];
      }

      if (passSelf === false) {
        return null;
      }

      if (passSelf === true) {
        passSelf = undefined;
      }
    }
  }

  return null;
};

// Resolve to a task with this Interperter as the context.
Interpreter.prototype.resolve = function (value) {
  return Task.resolve(this, value);
};

// Safely wrap an action as a task.
Interpreter.prototype.task = function (action) {
  return this.resolve(null).then(function () {
    return action.call(this);
  });
};

Interpreter.prototype.raise = function (message) {
  return rt.InternalError.raise(rt.string(message)).bind(this);
};

Interpreter.prototype.report = function (packet, name, object, node) {
  return this.task(function () {
    return rt.handleInternalError(packet);
  }).then(null, function (internalError) {
    internalError.object.stackTrace.push(rt.trace(name, object, {
      "module": this.modulePath || null,
      "line": node.location.line,
      "column": node.location.column
    }));

    throw internalError;
  });
};

Interpreter.prototype.reportNode = function (packet, node) {
  var type;

  if (node.constructor === ast.Def) {
    type = "def " + node.name.value;
  } else if (node.constructor === ast.Var) {
    type = "var " + node.name.value;
  } else if (node.constructor === ast.Method) {
    type = "method " + node.signature.name();
  } else if (node.constructor === ast.Class) {
    type = "class " + node.name.value;
  } else if (node.constructor === ast.TypeDeclaration) {
    type = "type " + node.name.value;
  } else if (node.constructor === ast.Import) {
    type = 'import "..." as ' + node.identifier.value;
  } else {
    type = node.toString();
  }

  return this.report(packet, type, null, node);
};

exports.Interpreter = Interpreter;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ast":1,"./runtime":10,"./task":19,"./util":21,"path":26}],5:[function(require,module,exports){
(function (process){
// Handles locating and loading imported Grace modules in Node.js. Browsers
// should override the loading mechanism when using the external interpreter
// API.

"use strict";

var Task, fs, path, readFile, rt;


path = require("path");

Task = require("./task");
rt = require("./runtime");

function loadGrace(interpreter, name) {
  readFile = readFile || Task.taskify(fs.readFile);

  return readFile(name + ".grace").then(function (code) {
    code = code.toString();

    // Ignore hashbang.
    if (code[0] === "#" && code[1] === "!") {
      while (code[0] === "#") {
        code = code.substring(code.indexOf("\n") + 1 || code.length);
      }
    }

    return Task.taskify(interpreter.module).call(interpreter, name, code);
  });
}

exports.loadGrace = loadGrace;

function loadJavaScript(name) {
  try {
    return Task.resolve(require(name));
  } catch (reason) {
    return Task.reject(reason);
  }
}

exports.defaultLoader = function (interpreter, name, callback) {
  name = path.join(path.dirname(name), path.basename(name, ".grace"));

  loadGrace(interpreter, name).then(null, function (graceError) {
    var local;

    if (rt.isGraceExceptionPacket(graceError)) {
      throw graceError;
    }

    local = path.join(process.cwd(), name);

    return loadJavaScript(local).then(null, function (jsError) {
      if (jsError.code !== "MODULE_NOT_FOUND") {
        return rt.InternalError.raiseFromPrimitiveError(jsError);
      }

      return loadJavaScript(name);
    }).then(null, function (jsError) {
      if (jsError.code !== "MODULE_NOT_FOUND") {
        return rt.InternalError.raiseFromPrimitiveError(jsError);
      }

      return rt.UnresolvedModule
        .raiseForPath(rt.string(name)).then(null, callback);
    });
  }).callback(callback);
};

}).call(this,require('_process'))
},{"./runtime":10,"./task":19,"_process":27,"path":26}],6:[function(require,module,exports){
// Provides the 'parse' function, which transforms a list of lexed tokens into a
// list of Grace AST nodes.

"use strict";

var Task, ast, error, lexer, lookahead, tokens, util;

Task = require("./task");
ast = require("./ast");
error = require("./parser/error");
lexer = require("./parser/lexer");
tokens = require("./parser/tokens");
util = require("./util");

function isMathOperator(op) {
  return op === "^" || op === "/" || op === "*" || op === "+" || op === "-";
}

function precedence(lhs, rhs) {
  var left, right;

  left = lhs.value;
  right = rhs.value;

  if (left === right) {
    return true;
  }

  if (!isMathOperator(left) || !isMathOperator(right)) {
    error.raise(lhs, "Mismatched operators " + left + " and " + right);
  }

  return left === "^" || (left === "/" || left === "*") && right !== "^" ||
    (left === "+" || left === "-") && (right === "+" || right === "-");
}

function slice(ctx, from, to) {
  return Array.prototype.slice.call(ctx, from, to);
}

lookahead = {

  "keyword": function (value, parser) {
    return this.value(tokens.Keyword, value, parser);
  },

  "symbol": function (value, parser) {
    return this.value(tokens.Symbol, value, parser);
  },

  "punctuation": function (value, parser) {
    return this.value(tokens.Punctuation, value, parser);
  },

  "newline": function (parser) {
    parser.test = function () {
      var token = this.peek("newline");
      return token &&
        (token.constructor === tokens.Newline || token.value === ";");
    };

    return parser;
  },

  "identifier": function (parser) {
    return this.type(tokens.Identifier, parser);
  },

  "operator": function (parser) {
    return this.type(tokens.Symbol, parser);
  },

  "string": function (parser) {
    return this.type(tokens.StringLiteral, parser);
  },

  "number": function (parser) {
    return this.type(tokens.NumberLiteral, parser);
  },

  "value": function (type, value, parser) {
    parser.test = function () {
      var token = this.peek(type);

      return token.constructor === type &&
        (typeof value === "string" && token.value === value ||
          typeof value === "function" && value(token.value));
    };

    return parser;
  },

  "type": function (type, parser) {
    parser.test = function (value) {
      var token = this.peek(type);

      return token.constructor === type &&
        (typeof value !== "string" || token.value === value);
    };

    return parser;
  },

  "name": function (parser) {
    parser.test = function (value) {
      var token, type;

      token = this.peek();
      type = token.constructor;

      return (type === tokens.Identifier || type === tokens.Symbol) &&
        (typeof value !== "string" || token.value === value);
    };

    return parser;
  },

  "parsers": function (name) {
    var after, i, l, parser, parsers;

    function run(test, failure) {
      return function () {
        var pName;

        function then(result) {
          return after ? after.call(this, result) : result;
        }

        for (i = 0; i < l; i += 1) {
          pName = parsers[i];
          if (this.test(pName)) {
            if (test) {
              return test;
            }

            return this.one(pName).then(then);
          }
        }

        return failure.call(this);
      };
    }

    l = arguments.length;

    if (typeof arguments[l - 1] === "function") {
      after = arguments[l - 1];
      l -= 1;
    }

    parsers = Array.prototype.slice.call(arguments, 1, l);
    l = parsers.length;

    parser = run(false, function () {
      this.raise(name);
    });

    parser.test = run(true, function () {
      return false;
    });

    return parser;
  }

};

function Parser(lex) {
  this.lexer = lex;
  this.indent = 0;
  this.token = null;
}

util.inherits(Parser, Task.Async);

Parser.prototype.module = function () {
  return this.lone("dialect").then(function (dialect) {
    return this.any("import").then(function (imports) {
      if (dialect !== null) {
        imports.unshift(dialect);
      }

      return imports;
    });
  }).then(function (head) {
    return this.objectBody().then(function (body) {
      return head.concat(body);
    });
  });
};

Parser.prototype.newline = lookahead.newline(function () {
  var indent, token;

  token = this.peek("newline");

  // A close brace counts as an implicit newline and may change indentation,
  // otherwise indentation must match.
  if (token.value !== "}") {
    if (token.value === ";") {
      this.poll();
    } else if (token.constructor !== tokens.EndOfInput) {
      token = this.poll();

      if (token.constructor !== tokens.Newline) {
        error.raise(token, "Unexpected appearance of " + token);
      }

      indent = token.indent;

      if (indent !== this.indent && this.peek().value !== "}") {
        error.raise(token, "Indent must match previous line");
      }
    }
  }
});

Parser.prototype.def = lookahead.keyword("def", function () {
  var ident, token;

  token = this.keyword("def");
  ident = this.identifier();

  this.inDef = true;

  return this.on("symbol", ":", function () {
    return this.expression();
  }).then(function (pattern) {
    return this.lone("annotations").then(function (annotations) {
      this.inDef = false;

      if (this.test("symbol", ":=")) {
        error.raise(this.poll(), "A constant declaration must use " +
          new tokens.Symbol("=") + " instead of " + new tokens.Symbol(":="));
      }

      if (!this.test("symbol", "=")) {
        error.raise(this.poll(), "A constant declaration must have " +
          new tokens.Symbol("=") + " and a value");
      }

      this.symbol("=");

      return this.expression().then(function (value) {
        this.newline();

        return new ast.Def(ident, pattern, annotations || [], value, token);
      });
    });
  });
});

Parser.prototype["var"] = lookahead.keyword("var", function () {
  var ident, token;

  token = this.keyword("var");
  ident = this.identifier();

  return this.on("symbol", ":", function () {
    return this.strict(this.expression);
  }).then(function (pattern) {
    return this.lone("annotations", true).then(function (annotations) {
      if (this.test("symbol", "=")) {
        error.raise(this.poll(), "A variable declaration must use " +
          new tokens.Symbol(":=") + " instead of " + new tokens.Symbol("="));
      }

      return this.on("symbol", ":=", function () {
        return this.expression();
      }).then(function (value) {
        this.newline();

        return new ast.Var(ident, pattern, annotations || [], value, token);
      });
    });
  });
});

Parser.prototype.declOrLiteral = lookahead.keyword("type", function () {
  return this.attempt(function () {
    var keyword = this.keyword("type");

    if (this.test("punctuation", "{")) {
      // Whoops, we thought this was a declaration but it's actually a literal.
      // Push the keyword back and reparse as an expression line.
      error.raise("Attempt to parse type literal as type declaration");
    }

    return keyword;
  }).then(function (token) {
    var name;

    if (token === null) {
      return this.expressionLine();
    }

    name = this.identifier();

    this.inDef = true;

    return this.on("symbol", "<", function () {
      return this.commas("identifier").then(function (generics) {
        this.symbol(">");
        return generics;
      });
    }).then(function (generics) {
      return this.lone("annotations").then(function (annotations) {
        this.inDef = false;

        this.symbol("=");

        return this.lone("typeBraces").then(function (type) {
          return type || this.expression();
        }).then(function (value) {
          this.newline();

          return new ast.TypeDeclaration(name,
            generics || [], annotations || [], value, token);
        });
      });
    });
  });
});

Parser.prototype.type = lookahead.keyword("type", function () {
  this.keyword("type");
  return this.typeBraces();
});

Parser.prototype.typeBraces = lookahead.punctuation("{", function () {
  return this.braces(function (token) {
    return this.any("typeBody").then(function (body) {
      return new ast.Type(body, token);
    });
  });
});

Parser.prototype.typeBody = lookahead.parsers("signature", "signature",
  function (signature) {
    this.newline();
    return signature;
  });

Parser.prototype.object = lookahead.keyword("object", function () {
  var token = this.keyword("object");

  return this.lone("annotations", true).then(function (annotations) {
    return this.braces(function () {
      return this.objectBody().then(function (body) {
        return new ast.ObjectConstructor(annotations || [], body, token);
      });
    });
  });
});

Parser.prototype["class"] = lookahead.keyword("class", function () {
  var name, token;

  token = this.keyword("class");
  name = this.identifier();
  this.punctuation(".");

  return this.methodRest("objectBody", function (signature, annotations, body) {
    return new ast.Class(name, signature, annotations, body, token);
  });
});

Parser.prototype.method = lookahead.keyword("method", function () {
  var token = this.keyword("method");

  return this.methodRest("methodBody", function (signature, annotations, body) {
    return new ast.Method(signature, annotations, body, token);
  });
});

Parser.prototype.constructor = lookahead.keyword("constructor", function () {
  var token = this.keyword("constructor");

  return this.methodRest("objectBody", function (signature, annotations, body) {
    return new ast.Method(signature, annotations,
      [ new ast.ObjectConstructor([], body, token) ], token);
  });
});

Parser.prototype.methodRest = lookahead.name(function (parser, make) {
  return this.signature().then(function (signature) {
    return this.lone("annotations").then(function (annotations) {
      annotations = annotations || [];

      return this.braces(function () {
        return this.one(parser).then(function (result) {
          return make.call(this, signature, annotations, result);
        });
      });
    });
  });
});

Parser.prototype.signature = lookahead.name(function () {
  return this.signaturePartFirst().then(function (first) {
    return this.task(function () {
      if (first.parameters.length === 0 || first.name.isOperator) {
        return [ first ];
      }

      return this.any("signaturePartRest").then(function (rest) {
        rest.unshift(first);
        return rest;
      });
    }).then(function (parts) {
      return this.on("symbol", "->", function () {
        return this.strict(this.expression);
      }).then(function (pattern) {
        return new ast.Signature(parts, pattern, first);
      });
    });
  });
});

Parser.prototype.signaturePartFirst = lookahead.name(function () {
  return this.lone("operator").then(function (operator) {
    if (operator === null) {
      return this.identifier();
    }

    return operator;
  }).then(function (name) {
    if (!name.isOperator) {
      if (name.value === "prefix") {
        return this.on("operator", function (operator) {
          name.isOperator = true;
          name.value += operator.value;
        }).then(function () {
          return new ast.SignaturePart(name, [], []);
        });
      }

      if (this.test("symbol", ":=")) {
        this.poll();
        name.isOperator = true;
        name.value += " :=";

        return this.parentheses(this.parameter).then(function (parameter) {
          return new ast.SignaturePart(name, [], [ parameter ]);
        });
      }
    }

    return this.signaturePartPost(name, true);
  });
});

Parser.prototype.signaturePartRest = lookahead.identifier(function () {
  var name = this.identifier();

  return this.signaturePartPost(name, false);
});

Parser.prototype.signaturePartPost = function (name, first) {
  return this.task(function () {
    if (!name.isOperator) {
      return this.on("symbol", "<", function () {
        return this.commas("identifier").then(function (generics) {
          this.symbol(">");
          return generics;
        });
      });
    }
  }).then(function (generics) {
    return this[first ? "lone" : "one"]("parentheses", function () {
      if (name.isOperator) {
        return this.parameter().then(function (parameter) {
          return [ parameter ];
        });
      }

      return this.commas("parameter");
    }).then(function (parameters) {
      return new ast.SignaturePart(name, generics || [], parameters || []);
    });
  });
};

Parser.prototype.parameter =
  lookahead.parsers("parameter", "vararg", "binding");

Parser.prototype.vararg = lookahead.symbol("*", function () {
  var token = this.symbol("*");

  return this.parameterName().then(function (name) {
    return this.parameterType().then(function (type) {
      return new ast.Parameter(name, type, true, token);
    });
  });
});

Parser.prototype.binding =
  lookahead.parsers("parameter", "parameterName", function (name) {
    return this.parameterType().then(function (type) {
      return new ast.Parameter(name, type, false, name);
    });
  });

Parser.prototype.parameterName =
  lookahead.parsers("parameter", "identifier", "underscore");

Parser.prototype.parameterType = function () {
  return this.on("symbol", ":", function () {
    return this.expression();
  });
};

// Require one or more of the given parsings, separated by commas.
Parser.prototype.commas = function (parser) {
  function comma(results) {
    return this.on("punctuation", ",", function () {
      return this.one(parser).then(function (result) {
        results.push(result);
        return comma.call(this, results);
      });
    }).then(function (next) {
      return next || results;
    });
  }

  return this.one(parser).then(function (first) {
    return comma.call(this, [ first ]);
  });
};

Parser.prototype.braces = lookahead.punctuation("{", function (f) {
  var state = this.indent;

  return this.wrapped("{", "}", function (token) {
    this.postBraceIndent();
    return this.resolve(f.call(this, token));
  }).then(function (result) {
    this.indent = state;
    return result;
  });
});

Parser.prototype.postBraceIndent = function () {
  var indent, next;

  next = this.peek("newline");

  if (next.constructor === tokens.Newline) {
    next = this.poll();
    indent = next.indent;

    if (indent < this.indent && this.peek().value !== "}") {
      error.raise(next, "Invalid indent following opening brace");
    }

    this.indent = indent;
  }
};

Parser.prototype.parentheses = lookahead.punctuation("(", function (f) {
  return this.wrapped("(", ")", function () {
    return this.resolve((f || this.expression).call(this))
      .then(function (expr) {
        return this.lone("newline").then(function () {
          return expr;
        });
      });
  });
});

Parser.prototype.wrapped = function (o, c, f) {
  return this.resolve(f.call(this, this.punctuation(o)))
    .then(function (result) {
      var token;

      if (!this.test("punctuation", c)) {
        token = this.poll();

        error.raise(token, "Unexpected appearance of " + token);
      }

      this.punctuation(c);

      return result;
    });
};

Parser.prototype.dialect = lookahead.keyword("dialect", function () {
  var token = this.keyword("dialect");

  return this.string().then(function (path) {
    this.newline();

    return new ast.Dialect(path, token);
  });
});

Parser.prototype["import"] = lookahead.keyword("import", function () {
  var token = this.keyword("import");

  return this.string().then(function (path) {
    var ident;

    this.contextualKeyword("as");
    ident = this.identifier();
    this.newline();

    return new ast.Import(path, ident, token);
  });
});

Parser.prototype.inherits = lookahead.keyword("inherits", function () {
  var token = this.keyword("inherits");

  return this.expression().then(function (request) {
    if (request.constructor !== ast.UnqualifiedRequest &&
        request.constructor !== ast.QualifiedRequest &&
        request.constructor !== ast.BooleanLiteral) {
      this.raise("request", request);
    }

    this.newline();

    return new ast.Inherits(request, token);
  });
});

Parser.prototype["return"] = lookahead.keyword("return", function () {
  var token = this.keyword("return");

  return this.lone("expression").then(function (expression) {
    this.newline();

    return new ast.Return(expression, token);
  });
});

Parser.prototype.statement = lookahead.parsers("statement",
  "def", "var", "declOrLiteral", "return", "expressionLine", "newline");

Parser.prototype.expression = lookahead.parsers("expression",
  "preBinaryOperator", function (expression) {
    var token;

    function buildBinary(lhs, op, rhs) {
      return new ast.QualifiedRequest(lhs,
        [ new ast.RequestPart(op, [], [ rhs ]) ]);
    }

    // Parse trailing binary operator requests.
    function operators(lhs, lop, rhs) {
      return this.on("operator", function (rop) {
        return this.preBinaryOperator().then(function (pre) {
          if (precedence(lop, rop)) {
            return operators.call(this, buildBinary(lhs, lop, rhs), rop, pre);
          }

          return operators.call(this, lhs, lop, buildBinary(rhs, rop, pre));
        });
      }).then(function (op) {
        return op || buildBinary(lhs, lop, rhs);
      });
    }

    // Avoid consuming generic closing parameters.
    if (this.generics && this.peek().value[0] === ">") {
      return expression;
    }

    if (!this.inDef && this.test("symbol", "=")) {
      token = this.poll();

      error.raise(token, "Assignment must use " +
        new tokens.Symbol(":=") + ", not " + token);
    }

    return this.on("operator", function (op) {
      return this.preBinaryOperator().then(function (pre) {
        return operators.call(this, expression, op, pre);
      });
    }).then(function (op) {
      return op || expression;
    });
  });

// Parse an expression up to a binary operator.
Parser.prototype.preBinaryOperator = lookahead.parsers("expression",
  "object", "type", "unqualifiedRequest", "literal", "bool", "outer",
  "self", "super", "parentheses", "prefixOperator", function (expression) {
    // Parse trailing dot requests.
    function requests(receiver) {
      return this.on("dotRequest", function (signature) {
        return requests.call(this,
          new ast.QualifiedRequest(receiver, signature));
      }).then(function (request) {
        return request || receiver;
      });
    }

    return requests.call(this, expression);
  });

// Expressions may appear alone on a single line, in which case they become a
// statement.
Parser.prototype.expressionLine = lookahead.parsers("expression line",
  "expression", function (expression) {
    this.newline();
    return expression;
  });

Parser.prototype.bool = lookahead.parsers("boolean", "true", "false");

Parser.prototype["true"] = lookahead.keyword("true", function () {
  return new ast.BooleanLiteral(true, this.keyword("true"));
});

Parser.prototype["false"] = lookahead.keyword("false", function () {
  return new ast.BooleanLiteral(false, this.keyword("false"));
});

Parser.prototype.outer = lookahead.keyword("outer", function () {
  var keyword = this.keyword("outer");

  return this.request().then(function (request) {
    return new ast.QualifiedRequest(new ast.Outer(keyword), request);
  });
});

Parser.prototype.prefixOperator = lookahead.operator(function () {
  var prefix = this.operator();

  prefix.value = "prefix" + prefix.value;

  return this.preBinaryOperator().then(function (receiver) {
    return new ast.QualifiedRequest(receiver,
      [ new ast.RequestPart(prefix, [], []) ]);
  });
});

// Parse a request with no receiver.
Parser.prototype.unqualifiedRequest = lookahead.identifier(function () {
  return this.requestSignature().then(function (signature) {
    return new ast.UnqualifiedRequest(signature);
  });
});

// Parse the signature part of a request, resulting in a list of signature
// parts.
Parser.prototype.request = lookahead.parsers("request signature",
  "dotRequest", "binaryRequestSignature");

// Parse a dot-requested signature.
Parser.prototype.dotRequest = lookahead.punctuation(".", function () {
  this.punctuation(".");
  return this.requestSignature();
});

// Parse a request signature whose parts are identifiers.
Parser.prototype.requestSignature = lookahead.identifier(function () {
  return this.requestPart(false).then(function (first) {
    if (first["arguments"].length === 0) {
      return [ first ];
    }

    return this.any("requestPart", true).then(function (parts) {
      parts.unshift(first);
      return parts;
    });
  });
});

Parser.prototype.requestPart = lookahead.identifier(function (required) {
  var name = this.identifier();

  return this.task(function () {
    var state;

    if (this.test("symbol", "<") && !this.peek().spaced) {
      state = this.generics;

      return this.attempt(function () {
        this.symbol("<");
        this.generics = true;

        return this.commas("expression").then(function (types) {
          var after, next;

          next = this.peek();
          if (next.value[0] === ">" && next.value.length > 1) {
            // The lexer got confused and attached the closing chevron to some
            // following symbols. Rip out the chevron and leave the symbols.
            next.value = next.value.substring(1);
          } else {
            this.symbol(">");
          }

          after = this.peek();

          if (after.constructor === tokens.Identifier ||
              after.constructor === tokens.Keyword && after.value !== "is" &&
                after.value !== "true" && after.value !== "false") {
            error.raise(after, "Invalid token following generic parameters");
          }

          return types;
        });
      }).then(function (generics) {
        this.generics = state;
        return generics;
      });
    }
  }).then(function (generics) {
    return this.on(this.isStrict ? "strictLiteral" : "literal", function (arg) {
      if (arg.constructor !== ast.Block && this.test("punctuation", ".")) {
        error.raise(this.punctuation("."),
          "Method requests on literal parameters must be wrapped");
      }

      return [ arg ];
    }).then(function (args) {
      if (!required && !this.isStrict && args === null) {
        return this.on("symbol", ":=", function () {
          name.isOperator = true;
          name.value += " :=";

          return this.expression().then(function (expression) {
            return [ expression ];
          });
        });
      }

      return args;
    }).then(function (args) {
      if (args === null) {
        return this[required ? "one" : "lone"]("parentheses", function () {
          return this.commas("expression");
        });
      }

      return args;
    }).then(function (args) {
      return new ast.RequestPart(name, generics || [], args || []);
    });
  });
});

// Parse the signature of a binary operator request.
Parser.prototype.binaryRequestSignature = lookahead.operator(function () {
  var operator = this.operator();

  return this.expression().then(function (rhs) {
    return [ new ast.RequestPart(operator, [], [ rhs ]) ];
  });
});

Parser.prototype.self = lookahead.keyword("self", function () {
  return new ast.Self(this.keyword("self"));
});

Parser.prototype["super"] = lookahead.keyword("super", function () {
  var keyword = this.keyword("super");

  return this.request().then(function (request) {
    return new ast.QualifiedRequest(new ast.Super(keyword), request);
  });
});

Parser.prototype.block = lookahead.punctuation("{", function () {
  return this.braces(function (token) {
    return this.attempt(function () {
      return this.task(function () {
        if (!this.test("identifier") && !this.test("punctuation", "_")) {
          return this.expression().then(function (params) {
            return [
              new ast.Parameter(new ast.Identifier("_", false, params),
                params, false, params)
            ];
          });
        }

        return this.commas("parameter");
      }).then(function (params) {
        this.symbol("->");
        this.postBraceIndent();

        return params;
      });
    }).then(function (params) {
      return this.any("statement").then(function (body) {
        return new ast.Block(params || [], body, token);
      });
    });
  });
});

Parser.prototype.annotations = lookahead.keyword("is", function (isStrict) {
  this.keyword("is");

  return this.strict(function () {
    return this.commas("expression");
  }, isStrict);
});

Parser.prototype.literal =
  lookahead.parsers("literal", "strictLiteral", "block");

Parser.prototype.strictLiteral =
  lookahead.parsers("literal", "bool", "string", "number");

Parser.prototype.string = lookahead.string(function () {
  var concat, string, token;

  token = this.expect(tokens.StringLiteral);
  string = new ast.StringLiteral(token.value, token);

  if (token.interpolation) {
    concat = new ast.Identifier("++", true, token);

    return this.expression().then(function (expression) {
      var interpolation = new ast.QualifiedRequest(string,
        [ new ast.RequestPart(concat, [], [ expression ]) ]);

      // The newline allows the string to return to its previous indentation.
      this.lone("newline");
      this.punctuation("}");
      this.token = this.lexer.nextToken(true);

      return this.string().then(function (rest) {
        return new ast.QualifiedRequest(interpolation,
          [ new ast.RequestPart(concat, [], [ rest ]) ]);
      });
    });
  }

  return this.resolve(string);
});

Parser.prototype.number = lookahead.number(function () {
  var base, token, value, x;

  token = this.expect(tokens.NumberLiteral);
  value = token.value;

  x = value.match(/[xX]/);

  if (x !== null) {
    base = Number(value.substring(0, x.index));

    if (base > 1 && base < 37) {
      value = parseInt(value.substring(x.index + 1), base);
    }
  }

  return new ast.NumberLiteral(value, token);
});

Parser.prototype.objectBody = function () {
  return this.lone("inherits").then(function (inherits) {
    return this.any("statementOrMethod").then(function (body) {
      if (inherits !== null) {
        body.unshift(inherits);
      }

      return body;
    });
  });
};

Parser.prototype.methodBody = function () {
  return this.any("statement");
};

Parser.prototype.statementOrMethod =
  lookahead.parsers("statement", "method", "class", "constructor", "statement");

// Expect and consume a certain keyword.
Parser.prototype.keyword = lookahead.type(tokens.Keyword, function (key) {
  var token = this.expect(tokens.Keyword, key);

  if (token.value !== key) {
    this.raise("keyword " + key, token);
  }

  return token;
});

// Expect and parse the given identifier as a keyword.
Parser.prototype.contextualKeyword = lookahead.type(tokens.Identifier,
  function (key) {
    var token = this.expect(tokens.Identifier, key);

    if (token.value !== key) {
      this.raise("keyword " + key, token);
    }

    return token;
  });

// Expect and consume a certain symbol.
Parser.prototype.symbol = lookahead.type(tokens.Symbol, function (sym) {
  var token = this.expect(tokens.Symbol, sym);

  if (token.value !== sym) {
    this.raise("symbol " + sym, token);
  }

  return token;
});

// Expect and consume a certain piece of punctuation.
Parser.prototype.punctuation = lookahead.type(tokens.Punctuation,
  function (sym) {
    var token = this.expect(tokens.Punctuation, sym);

    if (token.value !== sym) {
      this.raise(new tokens.Punctuation(sym, null), token);
    }

    return token;
  });

// Expect and parse an operator.
Parser.prototype.operator = lookahead.value(tokens.Symbol, function (symbol) {
  return symbol !== "=" && symbol !== "->" && symbol !== ":=" && symbol !== ":";
}, function () {
  var token = this.expect(tokens.Symbol, "operator");

  return new ast.Identifier(token.value, true, token);
});

// Expect and parse an identifier.
Parser.prototype.identifier = lookahead.identifier(function () {
  var token = this.expect(tokens.Identifier);

  return new ast.Identifier(token.value, false, token);
});

Parser.prototype.underscore = lookahead.punctuation("_", function () {
  var token = this.punctuation("_");

  return new ast.Identifier("_", false, token);
});

// Expect a certain type of token, throwing away newlines in between. May be
// provided with a second type which will be used instead of the first for
// error reporting.
Parser.prototype.expect = function (Type, etype) {
  var token;

  if (Type !== tokens.Newline) {
    this.trim();
  }

  token = this.poll();

  if (token === null || token.constructor !== Type) {
    if (typeof etype === "string") {
      etype = new Type(etype, token.location);
    }

    this.raise(etype || Type, token);
  }

  return token;
};

// Trim out leading newlines from the token queue whose indent is greater than
// the current indent.
Parser.prototype.trim = function () {
  var token = this.peek("newline");

  while (token.constructor === tokens.Newline && token.indent > this.indent) {
    this.poll();
    token = this.peek("newline");
  }
};

// Poll the token queue, removing and returning the first element.
Parser.prototype.poll = function () {
  var token = this.token;

  if (token !== null) {
    if (token.constructor !== tokens.EndOfInput) {
      this.token = null;
    }
  } else {
    token = this.lexer.nextToken();
    this.token = token;
  }

  return token;
};

// Peek at the token queue, returning the first element, skipping over
// newlines whose indent is greater than the current indent. Optionally takes
// the type of the token to search for, to avoid skipping over newlines when
// newlines are being searched for.
Parser.prototype.peek = function (type) {
  var lex, token;

  token = this.token;

  if (token !== null) {
    return this.token;
  }

  lex = this.lexer;
  token = lex.nextToken();

  if (type !== "newline") {
    while (token.constructor === tokens.Newline && token.indent > this.indent) {
      token = lex.nextToken();
    }
  }

  this.token = token;
  return token;
};

Parser.prototype.raise = function (type, token) {
  if (token === undefined) {
    token = this.peek();
  }

  error.raise(token, "Expected " + type + ", but found " + token);
};

Parser.prototype.test = function (parser) {
  return this[parser].test.apply(this, slice(arguments, 1));
};

Parser.prototype.one = function (parser) {
  return this.resolve(this[parser].apply(this, slice(arguments, 1)));
};

Parser.prototype.lone = function () {
  return this.test.apply(this, arguments) ?
      this.one.apply(this, arguments) : this.resolve(null);
};

Parser.prototype.any = function () {
  var args = arguments;

  function any(results) {
    if (this.test.apply(this, args)) {
      return this.one.apply(this, args).then(function (result) {
        if (typeof result === "object") {
          results.push(result);
        }

        return any.call(this, results);
      });
    }

    return this.resolve(results);
  }

  return any.call(this, []);
};

Parser.prototype.many = function () {
  return this.one.apply(this, arguments).then(function (result) {
    return this.any.apply(this, arguments).then(function (results) {
      results.unshift(result);
      return results;
    });
  });
};

Parser.prototype.on = function () {
  var args, l;

  l = arguments.length - 1;
  args = slice(arguments, 0, l);

  if (this.test.apply(this, args)) {
    return this.one.apply(this, args).then(arguments[l]);
  }

  return this.resolve(null);
};

Parser.prototype.attempt = function (f) {
  var lex, token;

  lex = this.lexer;
  token = this.token;

  this.lexer = lex.clone();

  return this.task(function () {
    return f.call(this);
  }).then(null, function () {
    this.lexer = lex;
    this.token = token;
    return null;
  });
};

Parser.prototype.strict = function (func, isStrict) {
  var state = this.isStrict;

  this.isStrict = isStrict === false ? false : true;

  return this.resolve(func.call(this)).then(function (result) {
    this.isStrict = state;

    return result;
  });
};

// Parse a token stream.
function parse(code) {
  var parser, token;

  try {
    parser = new Parser(new lexer.Lexer(code));

    while (parser.peek().constructor === tokens.Newline) {
      parser.poll();
    }

    return parser.module().then(function (module) {
      do {
        token = parser.poll();
      } while (token.constructor !== tokens.EndOfInput &&
        token.constructor === tokens.Newline);

      if (token.constructor !== tokens.EndOfInput) {
        error.raise(token, "Unexpected appearance of " + token);
      }

      return module;
    }).bind(null);
  } catch (reason) {
    return Task.reject(reason);
  }
}

exports.parse = parse;
exports.ParseError = error.ParseError;
exports.isSymbol = lexer.isSymbol;

},{"./ast":1,"./parser/error":7,"./parser/lexer":8,"./parser/tokens":9,"./task":19,"./util":21}],7:[function(require,module,exports){
// The ParseError definition and the 'raise' helper, which are used by both the
// lexer and the parser.

"use strict";

var util = require("../util");

function ParseError(token, message) {
  this.message = message;
  this.line = token.location.line;
  this.column = token.location.column;
}

util.inherits(ParseError, Error);

ParseError.prototype.toString = function () {
  return "ParseError: " + this.message;
};

function raise(token, message) {
  throw new ParseError(token, message);
}

exports.ParseError = ParseError;
exports.raise = raise;

},{"../util":21}],8:[function(require,module,exports){
// Provides the 'lex' function, which transforms a string into a list of tokens,
// preparing it for parsing.

"use strict";

var error, puncSymbols, tokens, unicode, util;

error = require("./error");
tokens = require("./tokens");
unicode = require("../unicode");
util = require("../util");

puncSymbols = [ "-", "&", "|", ":", "%", "^", "@", "?", "*", "/", "+", "!" ];

function isSymbol(c) {
  return unicode.isSymbol(c) || util.contains(puncSymbols, c);
}

function Lexer(text) {
  this.text = text;
  this.index = 0;
  this.length = text.length;

  util.makeCloneable(this, "index");
}

Lexer.prototype.raise = function (message) {
  error.raise({
    "location": {
      "line": this.line(),
      "column": this.column()
    }
  }, message);
};

Lexer.prototype.newToken = function (Constructor) {
  var args = util.slice(arguments, 1);

  args.push({
    "line": this.line(),
    "column": this.column()
  });

  return util.newApply(Constructor, args);
};

Lexer.prototype.line = function () {
  var match = this.text.substring(0, this.index).match(/\n/g);

  if (match === null) {
    return 1;
  }

  return match.length + 1;
};

Lexer.prototype.column = function () {
  var text = this.text.substring(0, this.index);

  return text.substring(text.lastIndexOf("\n") + 1).length + 1;
};

Lexer.prototype.nextToken = function (interpolating) {
  var c, dot, e, escaped, i, l, self, spaced, text, token, value, x;

  function raise(message) {
    self.index = i;
    self.raise(message);
  }

  function update(result) {
    self.index = i;
    return (result || token).validate(self);
  }

  function increment(result) {
    i += 1;
    return update(result);
  }

  function step() {
    token.value += c;
    i += 1;
    c = text[i];
  }

  // Test if the current character is a newline.
  function testNewline() {
    c = text[i];

    if (c === "\r") {
      if (text[i + 1] !== "\n") {
        raise("Invalid Unicode character «\\r» without corresponding «\\n»");
      }

      // Adjust text accordingly.
      i += 1;
      c = "\r\n";

      return true;
    }

    return c === "\n" || c === "\u2028";
  }

  function countSpaces() {
    var count = 0;

    while (text[i] === " ") {
      count += 1;
      i += 1;
    }

    return count;
  }

  function handleNewline() {
    var old, spaces;

    old = null;

    // Consecutive newlines are irrelevant. Remove them and any intervening
    // whitespace.
    do {
      i += 1;
      spaces = countSpaces();

      // Ignore comments.
      if (text[i] === "/" && text[i + 1] === "/") {
        if (old !== null) {
          spaces = old;
        }

        while (i < l && !testNewline()) {
          i += 1;
        }
      }
    } while (testNewline());

    return update(self.newToken(tokens.Newline, spaces));
  }

  // This is called when a error with a control character is present in a
  // string, but we want to finish lexing the rest of the string so that it can
  // be reported in the resulting error.
  function futureControlError(message, offending) {
    if (token.validate === tokens.StringLiteral.prototype.validate) {
      token.validate = function (lexer) {
        lexer.raise(message + " «" + offending + "» in " + this);
      };
    }
  }

  self = this;
  i = this.index;
  l = this.length;

  text = this.text;
  c = text[i];

  spaced = c === " ";

  if (!interpolating) {
    while (c === " ") {
      i += 1;
      c = text[i];
    }

    this.index = i;
  }

  if (i >= l) {
    return this.newToken(tokens.EndOfInput);
  }

  if (!interpolating && c === "/" && text[i + 1] === "/") {
    i -= 1;
    return handleNewline();
  }

  // Pick which token to create based on the current character.
  if (c === '"' || interpolating) {
    token = this.newToken(tokens.StringLiteral, "");
    escaped = false;
  } else if (unicode.isLetter(c) || c === "…") {
    token = this.newToken(tokens.Identifier, c);
  } else if (unicode.isNumber(c)) {
    dot = false;
    e = false;
    x = false;
    token = this.newToken(tokens.NumberLiteral, c);
  } else if (isSymbol(c) || c === "." && text[i + 1] === ".") {
    token = this.newToken(tokens.Symbol, c, spaced);
  } else {
    if (unicode.isPunctuation(c)) {
      return increment(this.newToken(tokens.Punctuation, c, spaced));
    }

    if (testNewline()) {
      return handleNewline();
    }

    if (c === "\t") {
      raise("Invalid tab character: tabs are banned");
    }

    raise("Unrecognised character «" + util.escape(c) + "»");
  }

  // After an interpolation, the current character is the start of the remaining
  // string, and is not used above. Otherwise the current character has been
  // used above to decide which kind of token to lex and should be skipped.
  if (!interpolating) {
    i += 1;
  }

  while (i < l) {
    c = text[i];

    // Token existing: decide what to do depending on the current token.
    if (token.constructor === tokens.Identifier) {
      // Identifier continuations are letters, numbers, apostrophe, primes, and
      // ellipsis.
      if (unicode.isLetter(c) || unicode.isNumber(c) ||
          c === "'" || c === "′" || c === "″" || c === "‴" || c === "…") {
        token.value += c;
      } else {
        return update();
      }
    } else if (token.constructor === tokens.NumberLiteral) {
      if (!e) {
        if (!dot && !x && /[xX.]/.test(c)) {
          if (c === ".") {
            dot = true;
          } else {
            x = true;
          }

          step();
        } else if (/[eE]/.test(c)) {
          e = true;
          step();

          if (c === "+" || c === "-") {
            step();
          }
        }
      }

      if (c && (unicode.isNumber(c) || x && /[a-zA-Z]/.test(c))) {
        token.value += c;
      } else {
        c = token.value[token.value.length - 1];

        if (c === ".") {
          // The dot is for a method call, not a decimal point. Re-lex it.
          token.value = token.value.substring(0, token.value.length - 1);
          i -= 1;
        }

        return update();
      }
    } else if (token.constructor === tokens.Symbol) {
      value = token.value;
      if (isSymbol(c) || c === "." && value[value.length - 1] === ".") {
        token.value += c;
      } else {
        return update();
      }
    } else if (token.constructor === tokens.StringLiteral) {
      if (c === "\n") {
        raise("Missing close quote for " + token);
      } else if (unicode.isControl(c)) {
        token.value += "\ufffd";
        futureControlError("Invalid control character", util.escape(c));
      } else if (escaped) {
        if (new RegExp('["\\\\{}]').test(c)) {
          token.value += c;
        } else if (c === "n") {
          token.value += "\n";
        } else if (c === "t") {
          token.value += "\t";
        } else if (c === "r") {
          token.value += "\r";
        } else if (c === "b") {
          token.value += "\b";
        } else if (c === "f") {
          token.value += "\f";
        } else if (c === "v") {
          token.value += "\v";
        } else if (c === "0") {
          token.value += "\u0000";
        } else if (c === "u") {
          c = text.substr(i + 1, 4).match(/^[0-9a-fA-F]+/);
          c = c && c[0] || "";

          if (c.length < 4) {
            token.value += "\ufffd";

            futureControlError("Invalid Unicode literal value", "\\u" + c);
          } else {
            token.value += String.fromCharCode("0x" + c);
          }

          i += c.length;
        } else {
          futureControlError("Unrecognised escape character", "\\" + c);
          token.value += "\ufffd";
        }
      } else {
        if (c === '"') {
          // Ignore the close quote.
          token.interpolation = false;
          return increment();
        }

        if (c === "{") {
          // Interpolation time!
          token.interpolation = true;
          return increment();
        }

        if (c !== "\\") {
          token.value += c;
        }
      }

      escaped = !escaped && c === "\\";
    }

    i += 1;
  }

  // The text failed to close a string.
  if (token.constructor === tokens.StringLiteral) {
    raise("Missing close quote for " + token);
  }

  // We should only be able to get here if token is set.
  return update();
};

exports.Lexer = Lexer;
exports.isSymbol = isSymbol;

},{"../unicode":20,"../util":21,"./error":7,"./tokens":9}],9:[function(require,module,exports){
// The various lexer token definitions.

"use strict";

var keywords, unicode, util;

unicode = require("../unicode");
util = require("../util");

keywords = [
  "class", "constructor", "def", "dialect", "false",
  "import", "inherits", "is", "method", "object", "outer",
  "return", "self", "super", "true", "type", "var"
];

function isKeyword(value) {
  return util.contains(keywords, value);
}

// new Token(value : String, location : Location, type : String = undefined)
function Token(value, location, type) {
  this.value = value;
  this.location = location;

  if (type !== undefined) {
    this.type = type;
  }
}

Token.prototype.validate = function (lexer) {
  if (this.value.length === 0) {
    lexer.raise("Empty token of type " + this.type);
  }

  return this;
};

Token.prototype.toString = function () {
  return "the " + this.type + " " + this.value;
};

// new Newline(indent : Number)
function Newline(indent, location) {
  Token.call(this, "\n", location);

  this.indent = indent;
}

util.inherits(Newline, Token);

Newline.prototype.toString = function () {
  return "a new line";
};

Newline.toString = Newline.prototype.toString;

// new Keyword(value : String, location : Location)
function Keyword(value, location) {
  Token.call(this, value, location, "keyword");
}

util.inherits(Keyword, Token);

Keyword.prototype.toString = function () {
  return "the keyword «" + this.value + "»";
};

Keyword.toString = function () {
  return "a keyword";
};

// new Identifier(value : String, location : Location)
function Identifier(value, location) {
  Token.call(this, value, location, "identifier");
}

util.inherits(Identifier, Token);

Identifier.prototype.validate = function (lexer) {
  if (isKeyword(this.value)) {
    return new Keyword(this.value, this.location).validate(lexer);
  }

  return Token.prototype.validate.call(this, lexer);
};

Identifier.prototype.toString = function () {
  return "the identifier «" + this.value + "»";
};

Identifier.toString = function () {
  return "an identifier";
};

// new Symbol(value : String, location : Location)
function Symbol(value, spaced, location) {
  Token.call(this, value, location, "symbol");

  this.spaced = spaced;
}

util.inherits(Symbol, Token);

Symbol.toString = function () {
  return "a symbol";
};

function Punctuation(value, spaced, location) {
  Symbol.call(this, value, spaced, location);
}

util.inherits(Punctuation, Token);

Punctuation.toString = function () {
  return "punctuation";
};

// new NumberLiteral(value : String, location : Location)
function NumberLiteral(value, location) {
  Token.call(this, value, location, "number");
}

util.inherits(NumberLiteral, Token);

NumberLiteral.prototype.validate = function (lexer) {
  var base, i, l, last, value, x;

  value = this.value;

  if (value[0] === "0" &&
      value.length > 1 && unicode.isNumber(value[1])) {
    lexer.raise("Leading zero on " + this);
  }

  x = value.match(/[xX]/);
  base = 10;

  if (x !== null && x.index !== value.length - 1) {
    base = Number(value.substring(0, x.index));

    if (base === 0) {
      base = 16;
    }

    if (base < 2 || base > 36 || isNaN(base)) {
      lexer.raise(base + " is not a valid numerical base");
    }

    for (i = x.index + 1, l = value.length; i < l; i += 1) {
      if (isNaN(parseInt(value[i], base))) {

        lexer.raise("'" + value[i] + "' is not a valid digit in base " + base);
      }
    }
  } else {
    last = value[value.length - 1];

    if (/[eExX\+\-]/.test(last)) {
      lexer.raise("Dangling modifier on " + this);
    }

    if (last === ".") {
      lexer.raise("Dangling decimal point on " + this);
    }
  }

  return Token.prototype.validate.call(this, lexer);
};

NumberLiteral.prototype.toString = function () {
  return "the number literal " + this.value;
};

NumberLiteral.toString = function () {
  return "a number";
};

// new StringLiteral(value : String, location : Location)
function StringLiteral(value, location) {
  Token.call(this, value, location, "string");
}

util.inherits(StringLiteral, Token);

StringLiteral.prototype.validate = function () {
  // Do not validate: an empty string is permissible.
  return this;
};

StringLiteral.prototype.toString = function () {
  return 'the string literal "' + util.escape(this.value) + '"';
};

StringLiteral.toString = function () {
  return "a string";
};

// new EndOfInput(location : Location)
function EndOfInput(location) {
  Token.call(this, "end of input", location, "eoi");
}

util.inherits(EndOfInput, Token);

EndOfInput.prototype.toString = function () {
  return "the end of input";
};

EndOfInput.toString = EndOfInput.prototype.toString;

exports.Token = Token;
exports.Newline = Newline;
exports.Keyword = Keyword;
exports.Identifier = Identifier;
exports.Symbol = Symbol;
exports.Punctuation = Punctuation;
exports.NumberLiteral = NumberLiteral;
exports.StringLiteral = StringLiteral;
exports.EndOfInput = EndOfInput;

},{"../unicode":20,"../util":21}],10:[function(require,module,exports){
// Runtime definitions that are independent of an Interpreter instance.

"use strict";

var Task, defs, util;

Task = require("./task");
util = require("./util");

function trace(name, object, location) {
  return {
    "name": name,
    "object": object,
    "location": location || null
  };
}

// gte(count : Number) -> GTE
//   Represents a minimum number of parameters.
function gte(count) {
  return {
    "minimum": count
  };
}

function part(generics, args) {
  args.generics = generics;
  return args;
}

function handleInternalError(error) {
  if (!defs.isGraceExceptionPacket(error)) {
    return defs.InternalError.raiseFromPrimitiveError(error);
  }

  throw error;
}

// method(name : String,
//     parameters : Count = gte(0), func : Function) -> Function
//   Create a single part method of a certain parameter count.
//
// method(name : String,
//     parts : [Count | (generics : Number, parameters : Count = gte(0))],
//     func : Function) -> Function
//   Create an anypart method where each part has a certain generic count and
//   parameter count.
//
// where Count = Number | GTE
function method(name, partCounts, func) {
  var body, i, isGeneric, isMulti, partsLength, unnormalised;

  if (arguments.length < 3) {
    func = partCounts;
    partCounts = [ gte(0) ];
  }

  if (!util.isArray(partCounts)) {
    partCounts = [ partCounts ];
  }

  partsLength = partCounts.length;
  isMulti = partCounts.length > 1;
  isGeneric = false;

  for (i = 0; i < partsLength; i += 1) {
    unnormalised = partCounts[i];

    if (util.isArray(unnormalised)) {
      if (unnormalised.length === 1) {
        unnormalised[1] = gte(0);
      }
    } else {
      partCounts[i] = [ 0, unnormalised ];
    }

    if (unnormalised[0] > 0) {
      isGeneric = true;
    }
  }

  body = function () {
    var argParts, argsLength, first, self;

    argsLength = arguments.length;
    argParts = util.slice(arguments);
    self = this;

    if (partCounts.length === 1) {
      first = argParts[0];

      if (!(util.isArray(first) && util.owns(first, "generics"))) {
        argsLength = 1;
        argParts = [ argParts ];
      }
    }

    // The next two errors can't be caused by the interpreter without an
    // incorrect method definition in JavaScript.

    if (argsLength < partsLength) {
      throw new TypeError('Not enough parts for method "' + name + '"');
    }

    if (argsLength > partsLength) {
      throw new TypeError('Too many parts for method "' + name + '"');
    }

    return Task.each(partCounts, argParts, function (partCount, argPart) {
      if (typeof partCount[1] === "number" && argPart.length < partCount[1] ||
          argPart.length < partCount[1].minimum) {
        return defs.InvalidRequest
          .raiseNotEnoughArgumentsForMethod(defs.string(name));
      }

      if (typeof partCount[1] === "number" && argPart.length > partCount[1]) {
        return defs.InvalidRequest
          .raiseTooManyArgumentsForMethod(defs.string(name));
      }

      if (util.isArray(argPart.generics) && argPart.generics.length !== 0) {
        if (argPart.generics.length < partCount[0]) {
          return defs.InvalidRequest
            .raiseNotEnoughGenericArgumentsForMethod(defs.string(name));
        }

        if (argPart.generics.length > partCount[0]) {
          return defs.InvalidRequest
            .raiseTooManyGenericArgumentsForMethod(defs.string(name));
        }

        return Task.each(argPart.generics, function (generic) {
          return defs.Pattern.assert(generic);
        }).then(function () {
          return argPart.generics.concat(argPart);
        });
      }

      if (isGeneric) {
        // No generics given in the request. Default to Unknown.
        return util.replicate(partCount[0], defs.Unknown).concat(argPart);
      }

      return argPart;
    }).then(function (args) {
      if (!isMulti) {
        args = args[0];
      }

      return func.apply(self, args);
    }).then(function (value) {
      if (value === null || value === undefined) {
        return defs.InternalError.raise(defs
          .string("Method " + body + " returned an undefined value"));
      }

      return value;
    }, handleInternalError).then(null, function (packet) {
      packet.object.stackTrace.push(trace(name, self));

      throw packet;
    });
  };

  body.isGraceMethod = true;
  body.identifier = name;
  body.isAsynchronous = true;
  body.parts = partCounts;

  body.toString = function () {
    return "«" + name + "»";
  };

  return body;
}

// inheritor(name : String,
//     parameters : Count = gte(0), func : Function) -> Function
//   Create a single part inheritor of a certain parameter count.
//
// inheritor(name : String,
//     parts : [Count | (generics : Number, parameters : Count = gte(0))],
//     func : Function) -> Function
//   Create an anypart inheritor where each part has a certain generic count and
//   parameter count.
//
// where Count = Number | GTE
function inheritor(name, parts, func) {
  return method(name, [ 1 ].concat(parts), function (inheriting) {
    var args = util.slice(arguments, 1);

    if (!util.isArray(parts) || parts.length === 1) {
      args = args[0];
    }

    return func.apply(this, [ inheriting[0] ].concat(args));
  });
}

// constructor(name : String,
//     parameters : Count = gte(0), func : Function) -> Function
//   Create a single part constructor of a certain parameter count.
//
// constructor(name : String,
//     parts : [Count | (generics : Number, parameters : Count = gte(0))],
//     func : Function) -> Function
//   Create an anypart constructor where each part has a certain generic count
//   and parameter count.
//
// where Count = Number | GTE
function constructor(name, parts, func) {
  var body = method(name, parts, function () {
    return func.apply(this, [ null ].concat(util.slice(arguments)));
  });

  body.inherit = inheritor(name, parts, func);

  return body;
}

function asPrimitive(object) {
  return Task.resolve(typeof object.asPrimitive === "function" ?
      object.asPrimitive() : object);
}

function fromPrimitive(value) {
  if (typeof value === "boolean") {
    return defs.bool(value);
  }

  if (typeof value === "number") {
    return defs.number(value);
  }

  if (typeof value === "string") {
    return defs.string(value);
  }

  if (typeof value === "function") {
    return defs.block(value);
  }

  if (util.isArray(value)) {
    return defs.list(value);
  }

  if (value === undefined || value === null) {
    return defs.done;
  }

  return value;
}

function lookup(receiver, pretty, fromSelf) {
  var func, l, name, object, orig, type;

  name = util.uglify(pretty);
  func = receiver[name];

  if (!defs.isGraceObject(receiver) &&
      (typeof func !== "function" || !func.isGraceMethod)) {
    if (typeof func === "function") {
      if (!func.isGraceMethod) {
        orig = func;
        func = method(pretty, function () {
          var self = this;

          return Task.each(util.slice(arguments), asPrimitive)
            .then(function (args) {
              return orig.apply(self, args);
            }).then(fromPrimitive);
        });
      }
    } else if (pretty === "asString") {
      // Use the regular toString in place of asString.
      func = method("asString", 0, function () {
        return defs.string(this.toString());
      });
    } else if (pretty === "at()") {
      func = method("at()", 1, function (index) {
        var self = this;

        return defs.asString(index).then(function (primIndex) {
          return fromPrimitive(self[primIndex]);
        });
      });
    } else if (pretty === "at() put()") {
      func = method("at() put()", [ 1, 1 ], function (index, value) {
        var self = this;

        return defs.asString(index).then(function (primIndex) {
          return asPrimitive(value).then(function (primValue) {
            self[primIndex] = primValue;
            return defs.done;
          });
        });
      });
    } else {
      l = name.length - 2;
      if (name.substring(l) === ":=") {
        name = name.substring(0, l);
        orig = receiver[name];

        // Produce a setter. This provides a mechanism for overwriting functions
        // in the object, which means you could assign a Grace block and have it
        // appear as a method rather than an object. You could replicate this
        // behaviour in Grace anyway, and JavaScript objects are always going to
        // appear a little wonky in Grace, so it's considered acceptable.
        if (typeof orig !== "function" || !orig.isGraceMethod) {
          func = method(pretty, 1, function (value) {
            return asPrimitive(value).then(function (primValue) {
              receiver[name] = primValue;
              return defs.done;
            });
          });
        }
      } else {
        func = receiver[name];

        if (func === undefined) {
          type = typeof receiver;

          if (type === "object" && util.isArray(receiver)) {
            type = "list";
          }

          if (type !== "object") {
            object = defs[type === "boolean" ? "bool" : type](receiver);
            orig = object[name];

            if (typeof orig === "function") {
              func = method(orig.identifer, orig.parts, function () {
                return orig.apply(object, arguments).then(fromPrimitive);
              });
            }
          }

          func = func || defs.base[name];
        } else if (func !== null) {
          if (typeof func !== "function") {
            // Produce a getter. We use name here because there must not be
            // parentheses on the method.
            func = method(name, 0, function () {
              return fromPrimitive(receiver[name]);
            });
          }
        }
      }
    }
  }

  if (typeof func !== "function" ||
      defs.isGraceObject(receiver) && func === Object.prototype[name] ||
          typeof func === "function" && func.internal) {
    return defs.UnresolvedRequest
      .raiseForName_inObject([ defs.string(pretty) ], [ receiver ]);
  }

  if (!fromSelf && func.isConfidential) {
    return defs.UnresolvedRequest
      .raiseConfidentialForName_inObject([ defs.string(pretty) ], [ receiver ]);
  }

  return Task.resolve(func);
}

function call(receiver, meth, args) {
  try {
    return Task.resolve(meth.apply(receiver, args))
      .then(null, handleInternalError);
  } catch (reason) {
    return Task.reject(handleInternalError(reason));
  }
}

// Asynchronous method application that works for either synchronous or
// asynchronous methods.
function apply(receiver, meth, args) {
  if (typeof meth === "string") {
    return lookup(receiver, meth).then(function (foundMethod) {
      return apply(receiver, foundMethod, args);
    });
  }

  if (args === undefined) {
    // The user may optionally pass no arguments, signifying a call to a
    // single-part method with no arguments.
    args = [];
  } else if (args.length === 1 && !util.owns(args[0], "generics")) {
    // If the call is to a single-part method with arguments but no generics, it
    // needs to be removed from the part array to avoid confusing it with a
    // single-argument array. Removing  is equivalent to constructing a true
    // 'part' with the part function from above, but avoids having to create an
    // empty generic list.
    args = args[0];
  }

  return call(receiver, meth, args);
}

// Asynchronous inherits method application that works for either synchronous or
// asynchronous methods. The call throws if the method cannot be inherited from.
function inherit(receiver, meth, inheriting, args) {
  if (typeof meth === "string") {
    return lookup(receiver, meth).then(function (foundMethod) {
      return inherit(receiver, foundMethod, inheriting, args);
    });
  }

  if (typeof meth.inherit !== "function") {
    return defs.InvalidInherits.raiseForName(defs.string(meth.identifier));
  }

  if (args === undefined) {
    // As above, but inherited methods are always multi-part due to the
    // invisible part that takes the inheriting object inserted at the start.
    args = [ [] ];
  }

  args.unshift([ inheriting ]);

  return call(receiver, meth.inherit, args);
}

exports.lookup = lookup;
exports.handleInternalError = handleInternalError;
exports.apply = apply;
exports.inherit = inherit;
exports.part = part;
exports.gte = gte;
exports.trace = trace;
exports.method = method;
exports.inheritor = inheritor;
exports.constructor = constructor;

defs = require("./runtime/definitions");

util.extend(exports, defs);

exports.primitives = require("./runtime/primitives");

exports.prelude = require("./runtime/prelude");

},{"./runtime/definitions":11,"./runtime/prelude":15,"./runtime/primitives":16,"./task":19,"./util":21}],11:[function(require,module,exports){
// Individual objects and helper methods for the runtime.

"use strict";

var Task, bools, done, exceptions, prim, rt, types, util;

Task = require("../task");
prim = require("./primitives");
rt = require("../runtime");
util = require("../util");

function object() {
  return new prim.Object();
}

exports.object = object;

exports.asString = prim.asString;

exports.isGraceObject = function (value) {
  return value instanceof prim.Object;
};

exports.base = prim.Object.prototype;

// block(parameters : Count = gte(0), apply : Function) -> Object
//   Construct a block with an apply method of a certain parameter count.
//
// block((generics : Number, parameters : Count = gte(0)),
//     apply : Function) -> Object
//   Construct a block with a generic apply method of a certain generic count
//   and parameter count.
//
// where Count = Number | GTE
function block(parameters, apply) {
  return new prim.Block(parameters, apply);
}

exports.block = block;

function bool(value) {
  if (value) {
    return bools[true];
  }

  return bools[false];
}

exports.bool = bool;

exports.number = function (value) {
  return new prim.Number(value);
};

function string(value) {
  return new prim.String(value);
}

exports.string = string;

function type(name, generics, extending, signatures) {
  return new prim.Type(name, generics, extending, signatures);
}

exports.type = type;

exports.signature = function (parts, hasVarArg, generics, parameters) {
  return new prim.Signature(parts, hasVarArg, generics, parameters);
};

exports.sigPart = function (name, hasVarArg, generics, parameters) {
  return new prim.Part(name, hasVarArg, generics, parameters);
};

exports.proxy = function (name) {
  return new prim.TypeProxy(name);
};

function pattern(name, match) {
  var pat = new prim.AbstractPattern();

  pat.match = rt.method("match()", 1, match);

  name = string(name);

  pat.asString = rt.method("asString", 0, function () {
    return name;
  });

  return pat;
}

exports.pattern = pattern;

exports.named = function (name, patt) {
  return new prim.NamedPattern(name, patt);
};

function success(value, patt) {
  return new prim.Success(value, patt);
}

exports.success = success;

function failure(value, patt) {
  return new prim.Failure(value, patt);
}

exports.failure = failure;

exports.singleton = function (name, value) {
  return pattern(name, function (against) {
    var self = this;

    return value["=="](against).then(function (eq) {
      return eq.ifTrue_ifFalse([
        rt.block(0, function () {
          return success(against, self);
        })
      ], [
        rt.block(0, function () {
          return failure(against, self);
        })
      ]);
    });
  });
};

exports.match = function (cond, value, patt) {
  return cond ? success(value, patt) : failure(value, patt);
};

exports.equalityMatch = function (value, against) {
  return value["=="](against).then(function (eq) {
    return eq.andAlso_orElse([
      block(0, function () {
        return success(against, value);
      })
    ], [
      block(0, function () {
        return failure(against, value);
      })
    ]);
  });
};

exports.list = function (elements) {
  return new prim.List(elements);
};

exports.listOf = function (patt) {
  return new prim.ListPattern(patt || types.Unknown);
};

exports.set = function (elements) {
  return new prim.Set(elements);
};

exports.entry = function (key, value) {
  return new prim.Entry(key, value);
};

exports.dictionary = function (elements) {
  return new prim.Dictionary(elements);
};

bools = {
  "true": new prim.True(),
  "false": new prim.False()
};

function getBoolean(which) {
  var method, value;

  value = bools[which];

  method = rt.constructor(which.toString(), 0, function (inheriting) {
    if (inheriting !== null) {
      util.extendAll(inheriting, value);
    }

    return value;
  });

  return method;
}

exports.mtrue = getBoolean(true);

exports.mfalse = getBoolean(false);

done = object();

done.asString = rt.method("asString", 0, function () {
  return string("done");
});

exports.done = done;

exports.emptyBlock = block(0, function () {
  return done;
});

types = require("./types");

util.extend(exports, types);

exceptions = require("./exceptions");

util.extend(exports, exceptions);

util.extend(exports, require("./methods"));

util.extend(exports, require("./publicity"));

function isGraceExceptionPacket(value) {
  return value instanceof prim.ExceptionPacket;
}

exports.isGraceExceptionPacket = isGraceExceptionPacket;

exports.isInternalError = function (value) {
  return value instanceof Error ||
      value instanceof exceptions.InternalError.object.Packet;
};

exports.isParseError = function (value) {
  return value instanceof exceptions.ParseFailure.object.Packet;
};

exports.isInterruptError = function (value) {
  return value instanceof Task.InterruptError ||
      value instanceof exceptions.InternalError.object.Packet &&
          value.object.error instanceof Task.InterruptError;
};

function addGenerics(name, generics) {
  return rt.method("asString", 0, function () {
    return rt.string(name + "<")["++"](generics[0]).then(function (str) {
      var comma = rt.string(", ");

      return Task.each(util.slice(generics, 1), function (snd) {
        return str["++"](comma).then(function (fst) {
          return fst["++"](snd).then(function (value) {
            str = value;
          });
        });
      }).then(function () {
        return str;
      });
    }).then(function (init) {
      return init["++"](rt.string(">"));
    });
  });
}

exports.withGenerics = function (name, genericType) {
  var args, i, l;

  function GenericType() {
    this.asString = addGenerics(name, args);
  }

  GenericType.prototype = genericType;

  args = util.slice(arguments, 2);

  for (i = 0, l = args.length; i < l; i += 1) {
    // If any of the generic types isn't Unknown, we produce a different
    // type which has a better stringifier.
    if (args[i] !== rt.Unknown) {
      return new GenericType();
    }
  }

  return genericType;
};

exports.isSubMethod = function (mparts, parts) {
  var generics, i, l, mcount, part, scount;

  for (i = 0, l = mparts.length; i < l; i += 1) {
    part = parts[i];
    generics = part.generics !== undefined ? part.generics.length : part[0];

    mcount = mparts[i][1];
    scount = part.parameters !== undefined ? part.parameters.length : part[1];

    if (generics !== 0 && mparts[i][0] !== generics ||
        (typeof mcount === "number" ? part.hasVarArg || mcount !== scount :
            (part.hasVarArg ? scount - 1 : scount) < mcount.minimum)) {
      return false;
    }
  }

  return true;
};

function newComparison(name, impl) {
  var comp = new prim.Comparison();

  name = string(name);

  comp.ifLessThan_ifEqualTo_ifGreaterThan =
    rt.method("ifLessThan() ifEqualTo() ifGreaterThan()", [ 1, 1, 1 ],
      function (onLessThan, onEqualTo, onGreaterThan) {
        return types.Action.assert(onLessThan[0]).then(function () {
          return types.Action.assert(onEqualTo[0]);
        }).then(function () {
          return types.Action.assert(onGreaterThan[0]);
        }).then(function () {
          return impl(onLessThan[0], onEqualTo[0], onGreaterThan[0]);
        });
      });

  comp.asString = rt.method("asString", 0, function () {
    return name;
  });

  return comp;
}

exports.LessThan = newComparison("Less Than", function (onLessThan) {
  return onLessThan.apply();
});

exports.EqualTo = newComparison("Equal To", function (onLessThan, onEqualTo) {
  return onEqualTo.apply();
});

exports.GreaterThan = newComparison("Greater Than",
  function (onLessThan, onEqualTo, onGreaterThan) {
    return onGreaterThan.apply();
  });

},{"../runtime":10,"../task":19,"../util":21,"./exceptions":12,"./methods":13,"./primitives":16,"./publicity":17,"./types":18}],12:[function(require,module,exports){
// Exceptions native to the language or necessary for the interpreter.

"use strict";

var Err, Exception, LErr, RErr, Task, close, defs, open, prim, rt, str, util;

Task = require("../task");
rt = require("../runtime");
defs = require("./definitions");
prim = require("./primitives");
util = require("../util");

str = defs.string;

open = str("«");
close = str("»");

function asString(object) {
  return rt.apply(object, "asString").then(null, function () {
    return "unrenderable object";
  });
}

function join(string) {
  return Task.each(util.slice(arguments, 1), function (next) {
    return string["++"](next).then(function (concat) {
      string = concat;
    }, function () {
      string += "unrenderable object";
    });
  }).then(function () {
    return string;
  });
}

function addRaise(object, name, signature, func) {
  object[util.uglify("raise" + name)] =
    rt.method("raise" + name, signature, function () {
      return func.apply(this, arguments).then(null, function (packet) {
        packet.object.stackTrace = [];
        throw packet;
      });
    });
}

Exception = new prim.Exception(str("Exception"), prim.ExceptionPacket);

exports.Exception = Exception;

Exception.refine(str("Error")).now(function (Error) {
  var raise, raiseDefault;

  raise = Error.raise;
  raiseDefault = Error.raiseDefault;

  function clearTrace(packet) {
    packet.object.stackTrace = [];
    throw packet;
  }

  addRaise(Error, "()", 1, function (message) {
    return raise.call(this, message).then(null, clearTrace);
  });

  addRaise(Error, "Default", 0, function () {
    return raiseDefault.call(this).then(null, clearTrace);
  });

  Err = Error;
  exports.Error = Error;
});

Err.refine(str("Runtime Error")).now(function (RuntimeError) {
  RErr = RuntimeError;
  exports.RuntimeError = RuntimeError;
});

RErr.refine(str("Internal Error")).now(function (InternalError) {
  var match = InternalError.match;

  addRaise(InternalError, "FromPrimitiveError()", 1, function (error) {
    if (error instanceof Error) {
      return this.raise(str(error.message)).then(null, function (packet) {
        packet.object.error = error;
        throw packet;
      });
    }

    return this.raise(str(error.toString()));
  });

  InternalError.match = rt.method("match()", 1, function (value) {
    if (value instanceof Error) {
      return defs.success(value);
    }

    return match.call(this, value);
  });

  exports.InternalError = InternalError;
});

RErr.refine(str("Incomplete Type")).now(function (IncompleteType) {
  var post, pre;

  pre = str("The type «");
  post = str("» was accessed before it was fully instantiated");

  addRaise(IncompleteType, "ForName()", 1, function (name) {
    var self = this;

    return join(pre, name, post).then(function (message) {
      return self.raise(message);
    });
  });

  exports.IncompleteType = IncompleteType;
});

RErr.refine(str("Incomplete Object")).now(function (IncompleteObject) {
  var post, preName, preSelf;

  preName = str("The implicit receiver of «");
  preSelf = str("«self");
  post = str("» was accessed before it was fully instantiated");

  addRaise(IncompleteObject, "ForName()", 1, function (name) {
    var self = this;

    return join(preName, name, post).then(function (message) {
      return self.raise(message);
    });
  });

  addRaise(IncompleteObject, "ForSelf", 0, function () {
    var self = this;

    return join(preSelf, post).then(function (message) {
      return self.raise(message);
    });
  });

  exports.IncompleteObject = IncompleteObject;
});

RErr.refine_defaultMessage([ str("Undefined Value") ],
    [ str("Access of a variable that has not yet had a value defined") ])
  .now(function (UndefinedValue) {
    var post, pre;

    pre = str("Access of a variable «");
    post = str("» that has not yet had a value defined");

    addRaise(UndefinedValue, "ForName()", 1, function (name) {
      var self = this;

      return join(pre, name, post).then(function (message) {
        return self.raise(message);
      });
    });

    exports.UndefinedValue = UndefinedValue;
  });

RErr.refine_defaultMessage([ str("Unmatchable Block") ],
    [ str("Match against a block without exactly one parameter") ])
  .now(function (UnmatchableBlock) {
    exports.UnmatchableBlock = UnmatchableBlock;
  });

RErr.refine(str("Invalid Type")).now(function (InvalidType) {
  var postDep, postDup, preDep, preDup;

  preDup = str("Duplicate method name «");
  postDup = str("» in type «");

  preDep = str("The type «");
  postDep = str("» recursively depends on itself to produce a value");

  addRaise(InvalidType, "DuplicateMethodName() inType()", [ 1, 1 ],
    function (name, type) {
      var self = this;

      return join(preDup, name[0], postDup, type[0], close)
        .then(function (message) {
          return self.raise(message);
        });
    });

  addRaise(InvalidType, "SelfDependencyForType()", 1, function (type) {
    var self = this;

    return join(preDep, type, postDep).then(function (message) {
      return self.raise(message);
    });
  });

  exports.InvalidType = InvalidType;
});

RErr.refine_defaultMessage([ str("Unresolved Request") ],
    [ str("Request for a variable or method which cannot be found") ])
  .now(function (UnresolvedRequest) {
    var post, postAssign, postQualified,
        preAssign, preConf, preMethod, preQualified, preVar;

    preVar = str("Request for a variable or method «");
    preMethod = str("Request for a method «");
    post = str("» which cannot be found");

    preAssign = str("Assignment to variable «");
    postAssign = str("» which cannot be assigned to");

    preQualified = str("Request for an undefined method «");
    postQualified = str("» in «");

    preConf = str("Request for a confidential method «");

    addRaise(UnresolvedRequest, "ForName()", 1, function (rawName) {
      var self = this;

      return rt.String.cast(rawName).then(function (name) {
        return name.asPrimitiveString().then(function (primName) {
          if (/\(\)/.test(primName)) {
            return preMethod;
          }

          return preVar;
        }).then(function (pre) {
          return join(pre, name, post).then(function (message) {
            return self.raise(message);
          });
        });
      });
    });

    addRaise(UnresolvedRequest, "ForAssignToName()", 1, function (name) {
      var self = this;

      return join(preAssign, name, postAssign).then(function (message) {
        return self.raise(message);
      });
    });

    addRaise(UnresolvedRequest, "ForAssignToUnresolvedName()", 1,
      function (name) {
        var self = this;

        return join(preAssign, name, post).then(function (message) {
          return self.raise(message);
        });
      });

    addRaise(UnresolvedRequest, "ForName() inObject()", [ 1, 1 ],
      function (name, obj) {
        var self = this;

        return join(preQualified, name[0], postQualified, obj[0], close)
          .then(function (message) {
            return self.raise(message);
          });
      });

    exports.UnresolvedRequest = UnresolvedRequest;

    addRaise(UnresolvedRequest, "ConfidentialForName() inObject()", [ 1, 1 ],
      function (name, obj) {
        var self = this;

        return join(preConf, name[0], postQualified, obj[0], close)
          .then(function (message) {
            return self.raise(message);
          });
      });
  });

exports.UnresolvedRequest.refine(str("Unresolved Super Request"))
  .now(function (UnresolvedSuperRequest) {
    var post, pre;

    pre = str("Request for an undefined super method «");
    post = str("» in «");

    addRaise(UnresolvedSuperRequest, "ForName() inObject()", [ 1, [ 1 ] ],
      function (name, obj) {
        var self = this;

        return join(pre, name[0], post, obj[0], close).then(function (message) {
          return self.raise(message);
        });
      });

    exports.UnresolvedSuperRequest = UnresolvedSuperRequest;
  });

RErr.refine(str("Invalid Request")).now(function (InvalidRequest) {
  var ne, neGens, postArgVar, postGenVar,
    preMethod, preType, preVar, tm, tmGens;

  preVar = str("Request for variable «");
  preType = str("Request for type «");
  postArgVar = str("» with arguments");
  postGenVar = str("» with generic parameters");

  preMethod = str("Request for method «");
  ne = str("» did not supply enough arguments");
  tm = str("» supplied too many arguments");
  neGens = str("» did not supply enough generic arguments");
  tmGens = str("» supplied too many generic arguments");

  addRaise(InvalidRequest, "GenericsForVariable()", 1, function (name) {
    var self = this;

    return join(preVar, name, postGenVar).then(function (message) {
      return self.raise(message);
    });
  });

  addRaise(InvalidRequest, "ArgumentsForVariable()", 1, function (name) {
    var self = this;

    return join(preVar, name, postArgVar).then(function (message) {
      return self.raise(message);
    });
  });

  addRaise(InvalidRequest, "ArgumentsForType()", 1, function (name) {
    var self = this;

    return join(preType, name, postArgVar).then(function (message) {
      return self.raise(message);
    });
  });

  addRaise(InvalidRequest, "NotEnoughArgumentsForMethod()", 1,
    function (name) {
      var self = this;

      return join(preMethod, name, ne).then(function (message) {
        return self.raise(message);
      });
    });

  addRaise(InvalidRequest, "TooManyArgumentsForMethod()", 1, function (name) {
    var self = this;

    return join(preMethod, name, tm).then(function (message) {
      return self.raise(message);
    });
  });

  addRaise(InvalidRequest, "NotEnoughGenericArgumentsForMethod()", 1,
    function (name) {
      var self = this;

      return join(preMethod, name, neGens).then(function (message) {
        return self.raise(message);
      });
    });

  addRaise(InvalidRequest, "TooManyGenericArgumentsForMethod()", 1,
    function (name) {
      var self = this;

      return join(preMethod, name, tmGens).then(function (message) {
        return self.raise(message);
      });
    });

  exports.InvalidRequest = InvalidRequest;
});

RErr.refine(str("Invalid Method")).now(function (InvalidMethod) {
  var args, postConf, postParam, postStat, postVar, pre, preConf;

  pre = str("Definition «");
  postParam = str("» has mismatched parameters with its overridden method");
  postConf = str("» overrides a public method");
  preConf = str("Confidential definition «");
  postConf = str("» overrides a public method");
  postStat = str("» overrides a static declaration");
  postVar = str("» is an overriding variable");
  args = str("Multiple variadic arguments in method «");

  addRaise(InvalidMethod, "MismatchedParametersForName()", 1, function (name) {
    var self = this;

    return join(pre, name, postParam).then(function (message) {
      return self.raise(message);
    });
  });

  addRaise(InvalidMethod, "ConfidentialOverrideForName()", 1, function (name) {
    var self = this;

    return join(preConf, name, postConf).then(function (message) {
      return self.raise(message);
    });
  });

  addRaise(InvalidMethod, "StaticOverrideForName()", 1, function (name) {
    var self = this;

    return join(pre, name, postStat).then(function (message) {
      return self.raise(message);
    });
  });

  addRaise(InvalidMethod, "OverridingVariableForName()", 1, function (name) {
    var self = this;

    return join(pre, name, postVar).then(function (message) {
      return self.raise(message);
    });
  });

  addRaise(InvalidMethod, "MultipleVariadicParametersForName()", 1,
    function (name) {
      var self = this;

      return join(args, name, close).then(function (message) {
        return self.raise(message);
      });
    });

  exports.InvalidMethod = InvalidMethod;
});

RErr.refine_defaultMessage([ str("Redefinition") ],
    [ str("Definition of a name that already exists") ])
  .now(function (Redefinition) {
    var post, pre;

    pre = str("A definition named «");
    post = str("» already exists");

    addRaise(Redefinition, "ForName()", 1, function (name) {
      var self = this;

      return join(pre, name, post).then(function (message) {
        return self.raise(message);
      });
    });

    exports.Redefinition = Redefinition;
  });

RErr.refine(str("Invalid Return")).now(function (InvalidReturn) {
  var completed, object, outside;

  completed = str("Return from a completed method request for «");
  object = str("Return from inside an object constructor");
  outside = str("Return from outside of a method");

  addRaise(InvalidReturn, "ForCompletedMethod()", 1, function (name) {
    var self = this;

    return join(completed, name, close).then(function (message) {
      return self.raise(message);
    });
  });

  addRaise(InvalidReturn, "InsideOfObject", 0, function () {
    return this.raise(object);
  });

  addRaise(InvalidReturn, "OutsideOfMethod", 0, function () {
    return this.raise(outside);
  });

  exports.InvalidReturn = InvalidReturn;
});

RErr.refine_defaultMessage([ str("Invalid Inherits") ],
    [ str("Inherit from method that does not end in an object constructor") ])
  .now(function (InvalidInherits) {
    var post, pre;

    pre = str("Inherit from method «");
    post = str("» that does not end in an object constructor");

    addRaise(InvalidInherits, "ForName()", 1, function (name) {
      var self = this;

      return join(pre, name, post).then(function (message) {
        return self.raise(message);
      });
    });

    exports.InvalidInherits = InvalidInherits;
  });

RErr.refine_defaultMessage([ str("Unresolved Module") ],
    [ str("Unable to locate a module") ])
  .now(function (UnresolvedModule) {
    var post, pre;

    pre = str('Unable to locate a module at the path "');
    post = str('"');

    addRaise(UnresolvedModule, "ForPath()", 1, function (name) {
      var self = this;

      return join(pre, name, post).then(function (message) {
        return self.raise(message);
      });
    });

    exports.UnresolvedModule = UnresolvedModule;
  });

RErr.refine_defaultMessage([ str("Parse Failure") ],
    [ str("Invalid Grace code failed to parse") ])
  .now(function (ParseFailure) {
    exports.ParseFailure = ParseFailure;
  });

Err.refine(str("Logic Error")).now(function (LogicError) {
  LErr = LogicError;
  exports.LogicError = LogicError;
});

LErr.refine_defaultMessage([ str("Assertion Failure") ],
    [ str("Failed to satisfy a required pattern") ])
  .now(function (AssertionFailure) {
    var mid, miss, post;

    mid = str("» failed to satisfy the required pattern «");
    miss = str("» is missing the required method «");
    post = str("» to satisfy the type «");

    addRaise(AssertionFailure, "ForValue() againstPattern()", [ 1, 1 ],
      function (value, pattern) {
        var self = this;

        return asString(value[0]).then(function (string) {
          return join(open, string, mid, pattern[0], close)
            .then(function (message) {
              return self.raise(message);
            });
        });
      });

    addRaise(AssertionFailure, "ForValue() againstType() missing()",
      [ 1, 1, 1 ], function (value, pattern, signature) {
        var self = this;

        return asString(value[0]).then(function (string) {
          return join(open, string, miss, signature[0], post, pattern[0], close)
            .then(function (message) {
              return self.raise(message);
            });
        });
      });

    exports.AssertionFailure = AssertionFailure;
  });

LErr.refine(str("Match Failure")).now(function (MatchFailure) {
  var pre = str("No case branches matched «");

  addRaise(MatchFailure, "ForObject()", 1, function (value) {
    var self = this;

    return join(pre, value, close).then(function (message) {
      return self.raise(message);
    });
  });

  exports.MatchFailure = MatchFailure;
});

LErr.refine(str("No Such Value")).now(function (NoSuchValue) {
  var mid, pre;

  pre = str("No such value «");
  mid = str("» in object «");

  addRaise(NoSuchValue, "ForName() inObject()", [ 1, 1 ],
    function (name, object) {
      var self = this;

      return join(pre, name[0], mid, object[0], close).then(function (message) {
        return self.raise(message);
      });
    });

  exports.NoSuchValue = NoSuchValue;
});

LErr.refine(str("Failed Search")).now(function (FailedSearch) {
  var pre = str("Could not find the object «");

  addRaise(FailedSearch, "ForObject()", 1, function (object) {
    var self = this;

    return join(pre, object, close).then(function (message) {
      return self.raise(message);
    });
  });

  exports.FailedSearch = FailedSearch;
});

LErr.refine_defaultMessage([ str("Out Of Bounds") ],
    [ str("Access of a collection outside of its bounds") ])
  .now(function (OutOfBounds) {
    var post, pre;

    pre = str("Access of a collection at index «");
    post = str("» outside of its bounds");

    addRaise(OutOfBounds, "ForIndex()", 1, function (rawIndex) {
      var self = this;

      return defs.Number.cast(rawIndex).then(function (index) {
        return join(pre, index, post).then(function (message) {
          return self.raise(message);
        });
      });
    });

    exports.OutOfBounds = OutOfBounds;
  });

LErr.refine(str("Not A Number")).now(function (NotANumber) {
  var divide, mid, postOp, postParse, preOp, preParse;

  divide = str("Division by zero");
  preParse = str("Failed to parse «");
  postParse = str("» to a number");

  preOp = str("Applying «");
  mid = str("» to the number «");
  postOp = str("» is not a real number");

  addRaise(NotANumber, "DivideByZero", 0, function () {
    return this.raise(divide);
  });

  addRaise(NotANumber, "ForParse()", 1, function (rawString) {
    var self = this;

    return rt.String.cast(rawString).then(function (string) {
      return asString(string).then(function (primString) {
        return join(preParse, primString, postParse).then(function (message) {
          return self.raise(message);
        });
      });
    });
  });

  addRaise(NotANumber, "ForOperation() on()", [ 1, 1 ], function (name, num) {
    var self = this;

    return join(preOp, name[0], mid, num[0], postOp).then(function (message) {
      return self.raise(message);
    });
  });

  exports.NotANumber = NotANumber;
});

Exception.refine(str("Checker Failure")).now(function (CheckerFailure) {
  CheckerFailure.object.Packet.prototype.nodeOrIfAbsent =
    rt.method("nodeOrIfAbsent", 1, function (action) {
      return rt.Action.assert(action).then(function () {
        return action.apply();
      });
    });

  addRaise(CheckerFailure, "() forNode()", [ 1, 1 ], function (msg, node) {
    msg = msg[0];
    node = node[0];

    return this.raise(msg).then(null, function (packet) {
      packet.object.node = node;

      packet.nodeOrIfAbsent = rt.method("nodeOrIfAbsent", 1, function (action) {
        return rt.Action.assert(action).then(function () {
          return node;
        });
      });

      throw packet;
    });
  });

  addRaise(CheckerFailure, "ForNode()", 1, function (node) {
    return this.raiseDefault().then(null, function (packet) {
      packet.object.node = node;

      packet.nodeOrIfAbsent = rt.method("nodeOrIfAbsent", 1, function (action) {
        return rt.Action.assert(action).then(function () {
          return node;
        });
      });

      throw packet;
    });
  });

  exports.CheckerFailure = CheckerFailure;
});

},{"../runtime":10,"../task":19,"../util":21,"./definitions":11,"./primitives":16}],13:[function(require,module,exports){
// Built-in method definitions.

"use strict";

var Task, defs, dictionary, list, pattern, prim, rt, set, types, util;

Task = require("../task");
rt = require("../runtime");
util = require("../util");

defs = require("./definitions");
prim = require("./primitives");
types = require("./types");

exports.print = rt.method("print()", 1, function (object) {
  return types.String.match(object).then(function (isString) {
    return isString.ifTrue_ifFalse([
      defs.block(0, function () {
        return object;
      })
    ], [
      defs.block(0, function () {
        return rt.apply(object, "asString");
      })
    ]);
  }).then(function (string) {
    return types.String.cast(string).then(function () {
      return string.asPrimitiveString();
    });
  }).then(function (string) {
    console.log(string);
    return defs.done;
  });
});

exports.while_do = rt.method("while() do()", [ 1, 1 ], function (pWbl, pDbl) {
  return types.Action.cast(pWbl[0]).then(function (wbl) {
    return types.Action.cast(pDbl[0]).then(function (dbl) {
      return new Task(function (resolve, reject, task) {
        var ifFalse, ifTrue;

        function apply() {
          if (!task.isStopped) {
            task.waitingOn = wbl.apply().then(function (bool) {
              return bool.ifTrue_ifFalse([ ifTrue ], [ ifFalse ]);
            }).then(null, reject);
          }
        }

        ifTrue = defs.block(0, function () {
          return dbl.apply().then(function () {
            apply();
            return defs.done;
          });
        });

        ifFalse = defs.block(0, function () {
          resolve(defs.done);
          return defs.done;
        });

        // Stopping the inner task may happen too late to avoid triggering a new
        // iteration, which will cause the outer task to report that it has
        // stopped while the loop actually continues. Overriding stop ensures
        // that the no new task is spawned, and the outer task is successfully
        // rejected with the appropriate error.
        task.stop = function () {
          this.isStopped = true;
          Task.prototype.stop.call(task);
        };

        apply();
      });
    });
  });
});

exports.delegateTo = rt.constructor("delegateTo()", rt.gte(1),
  function (object) {
    var delegates;

    object = object || rt.object();

    delegates = util.slice(arguments, 1);

    return Task.each(delegates, function (delegate) {
      util.forProperties(delegate, function (name, value) {
        var method;

        if (object[name] === undefined &&
            typeof value === "function" && !value.isConfidential) {
          method = function () {
            return value.apply(this || object, arguments);
          };

          util.extend(method, value);

          object[name] = method;
        }
      });
    }).then(function () {
      return object;
    });
  });

list = defs.object();

function withAll(object, generics, coll) {
  var part = rt.part(generics, [ coll ]);

  if (object !== null) {
    return this.withAll.inherit.call(this, object, part);
  }

  return this.withAll(part);
}

list.empty = rt.constructor("empty", [ [ 1, 0 ] ], function (object, T) {
  return withAll.call(this, object, [ T ], defs.list([]));
});

list["with"] = rt.constructor("with", [ [ 1, rt.gte(0) ] ],
  function (object, T) {
    return withAll.call(this, object, [ T ],
      defs.list(util.slice(arguments, 2)));
  });

list.withAll = rt.constructor("withAll", [ [ 1, 1 ] ],
  function (object, T, rawColl) {
    var elements = [];

    return rt.Do.cast(rawColl).then(function (coll) {
      return coll["do"](rt.block(1, function (element) {
        return T.assert(element).then(function () {
          elements.push(element);
          return rt.done;
        });
      }));
    }).then(function () {
      var seq = rt.list(elements);

      if (object !== null) {
        util.extendAll(object, seq);
      }

      return seq;
    });
  });

list.asString = rt.method("asString", 0, function () {
  return rt.string("list");
});

exports.list = rt.method("list", 0, function () {
  return list;
});

set = defs.object();

set.empty = rt.constructor("empty", [ [ 1, 0 ] ], function (object, T) {
  return withAll.call(this, object, [ T ], defs.set([]));
});

set["with"] = rt.constructor("with", [ [ 1, rt.gte(0) ] ],
  function (object, T) {
    return withAll
      .call(this, object, [ T ], defs.set(util.slice(arguments, 2)));
  });

set.withAll = rt.constructor("withAll", [ [ 1, 1 ] ],
  function (object, T, rawColl) {
    var aSet = defs.set([]);

    return rt.Do.cast(rawColl).then(function (coll) {
      return coll["do"](rt.block(1, function (add) {
        return T.assert(add).then(function () {
          return aSet.internalPush(add);
        });
      }));
    }).then(function () {
      if (object !== null) {
        util.extendAll(object, aSet);
      }

      return aSet;
    });
  });

set.asString = rt.method("asString", 0, function () {
  return rt.string("set");
});

exports.set = rt.method("set", 0, function () {
  return set;
});

dictionary = defs.object();

dictionary.empty = rt.constructor("empty", [ [ 2, 0 ] ],
  function (object, K, V) {
    return withAll.call(this, object, [ K, V ], defs.dictionary([]));
  });

dictionary["with"] = rt.constructor("with", [ [ 2, rt.gte(0) ] ],
  function (object, K, V) {
    return withAll
      .call(this, object, [ K, V ], defs.dictionary(util.slice(arguments, 3)));
  });

dictionary.withAll = rt.constructor("withAll", [ [ 2, 1 ] ],
  function (object, K, V, rawColl) {
    var aDict = defs.dictionary([]);

    return rt.Do.cast(rawColl).then(function (coll) {
      return coll["do"](rt.block(1, function (rawAdd) {
        return defs.Entry.cast(rawAdd).then(function (add) {
          return add.key().then(function (key) {
            return add.value().then(function (value) {
              return aDict.internalPush(defs.entry(key, value));
            });
          });
        });
      }));
    }).then(function () {
      if (object !== null) {
        util.extendAll(object, aDict);
      }

      return aDict;
    });
  });

dictionary.asString = rt.method("asString", 0, function () {
  return rt.string("dictionary");
});

exports.dictionary = rt.method("dictionary", 0, function () {
  return dictionary;
});

function generate(i, func) {
  var l;

  for (l = 20 + i; i < l; i += 1) {
    func(i);
  }
}

function makeIfThens(tail) {
  generate(0, function (i) {
    var name, parts, pretty;

    pretty = "if() then()" + util.replicate(i, " elseIf() then()").join("") +
      (tail ? " else()" : "");

    name = util.uglify(pretty);

    if (tail) {
      parts = [ 1, [ 1, 1 ] ].concat(util.repeat(i, [ 1, [ 1, 1 ] ]));
      parts.push([ 1, 1 ]);
    } else {
      parts = [ 1, 1 ].concat(util.replicate(i * 2, 1));
    }

    exports[name] = rt.method(pretty, parts, function (pCond) {
      var rawArgs = util.slice(arguments, 1);

      return defs.Boolean.cast(pCond[0]).then(function (cond) {
        var l = rawArgs.length - 1;

        return Task.each(rawArgs, function (arg, j) {
          if (tail && (j === l || j % 2 === 0)) {
            return defs.Action.cast(arg[1]).then(function (action) {
              return [ arg[0], action ];
            });
          }

          return defs.Action.cast(arg[0]);
        }).then(function (args) {
          function repeat(currCond, j) {
            var action;

            action = tail ? rt.block(0, function () {
              return args[j][1].apply().then(function (result) {
                return args[j][0].assert(result).then(function () {
                  return result;
                });
              });
            }) : args[j];

            return currCond.ifTrue_ifFalse([ action ], rt.block(0, function () {
              if (tail && j + 1 === l) {
                return args[l][1].apply().then(function (result) {
                  return args[l][0].assert(result).then(function () {
                    return result;
                  });
                });
              }

              if (j === l) {
                return rt.done;
              }

              return args[j + 1].apply().then(function (nextCond) {
                return defs.Boolean.cast(nextCond);
              }).then(function (nextCond) {
                return repeat(nextCond, j + 2);
              });
            }));
          }

          return repeat(cond, 0).then(tail ? null : function () {
            return rt.done;
          });
        });
      });
    });
  });
}

makeIfThens(false);
makeIfThens(true);

generate(1, function (i) {
  var name, parts, pretty;

  pretty = "match()" + util.replicate(i, " case()").join("");
  name = util.uglify(pretty);

  parts = [ [ i, 1 ] ].concat(util.replicate(i, [ 1, 1 ]));

  exports[name] = rt.method(pretty, parts, function (match) {
    var args, l, patt;

    patt = match[0];
    args = util.slice(arguments, 1);

    l = match.length - 1;

    return Task.each(match.slice(0, l), function (pat) {
      return patt["|"](pat).then(function (orPat) {
        patt = orPat;
      });
    }).then(function () {
      match = match[l];
      return patt.assert(match);
    }).then(function () {
      return Task.each(args, function (arg) {
        return defs.Function.cast(arg[1]).then(function (func) {
          return [ arg[0], func ];
        });
      }).then(function (cases) {
        function repeat(j) {
          if (j === cases.length) {
            return defs.MatchFailure.raiseForObject(match);
          }

          return cases[j][1].match(match).then(function (result) {
            return result
              .ifTrue_ifFalse(rt.part(cases[j][0], rt.block(0, function () {
                return result.value();
              })), [
                rt.block(0, function () {
                  return repeat(j + 1);
                })
              ]);
          });
        }

        return repeat(0);
      });
    });
  });
});

function makeTryCatches(tail) {
  generate(0, function (i) {
    var name, parts, pretty;

    pretty = "try()" + util.replicate(i, " catch()").join("") +
      (tail ? " finally()" : "");

    name = util.uglify(pretty);

    parts = [ [ 1, 1 ] ].concat(util.replicate(i, [ 1, 1 ]));

    if (tail) {
      parts.push(1);
    }

    exports[name] = rt.method(pretty, parts, function (trybl) {
      var args, rawFin;

      args = util.slice(arguments, 1);

      if (tail) {
        rawFin = args.pop();
      }

      return defs.Action.cast(trybl[1]).then(function (action) {
        return Task.each(args, function (arg) {
          return defs.Function.cast(arg[1]).then(function (cat) {
            return [ arg[0], cat ];
          });
        }).then(function (catches) {
          function next(onFin) {
            return action.apply().then(null, rt.handleInternalError)
              .then(function (value) {
                return trybl[0].assert(value).then(function () {
                  return value;
                });
              }, function (packet) {
                function repeat(j) {
                  if (j === catches.length) {
                    return packet.raise();
                  }

                  return catches[j][1].match(packet).then(function (result) {
                    return result.ifTrue_ifFalse([
                      rt.block(0, function () {
                        return result.value().then(function (value) {
                          return catches[j][0].assert(value).then(function () {
                            return value;
                          });
                        });
                      })
                    ], [
                      rt.block(0, function () {
                        return repeat(j + 1);
                      })
                    ]);
                  });
                }

                return repeat(0);
              }).then(onFin, function (packet) {
                function raise() {
                  return packet.raise();
                }

                return onFin().then(raise, raise);
              });
          }

          if (tail) {
            return defs.Action.cast(rawFin).then(function (fin) {
              return next(function (value) {
                return fin.apply().then(function () {
                  return value;
                }, function () {
                  return value;
                });
              });
            });
          }

          return next(Task.resolve);
        });
      });
    });
  });
}

makeTryCatches(false);
makeTryCatches(true);

pattern = defs.object();

pattern["abstract"] = rt.constructor("abstract", 0, function (object) {
  var abs = new prim.AbstractPattern();

  if (!object) {
    return defs.Pattern.assert(abs);
  }

  util.extendAll(object, abs);
  return object;
});

pattern.singleton = rt.constructor("singleton", 0, function (object) {
  var sing = new prim.Singleton();

  if (object) {
    util.extendAll(object, sing);
    return object;
  }

  return sing;
});

pattern.asString = rt.method("asString", 0, function () {
  return defs.string("pattern");
});

exports.pattern = rt.method("pattern", 0, function () {
  return pattern;
});

},{"../runtime":10,"../task":19,"../util":21,"./definitions":11,"./primitives":16,"./types":18}],14:[function(require,module,exports){
// Defines the reflection API for the interpreter.

"use strict";

var defs, prim, rt, util;

rt = require("../runtime");
util = require("../util");

defs = require("./definitions");
prim = require("./primitives");

function Part(name, parameters) {
  this.object = {
    "name": name,
    "parameters": parameters
  };
}

util.inherits(Part, prim.Object);

Part.prototype.name = rt.method("name", 0, function () {
  return defs.string(this.object.name);
});

Part.prototype.generics = rt.method("generics", 0, function () {
  return defs.number(this.object.parameters[0]);
});

Part.prototype.parameters = rt.method("parameters", 0, function () {
  return defs.number(this.object.parameters[1]);
});

Part.prototype.toString = function () {
  var generics, parameters;

  generics = this.object.parameters[0];
  parameters = this.object.parameters[1];

  return this.object.name +
    (generics === 0 ? "" : "<" + generics + ">") +
    (parameters === 0 ? "" : "(" + parameters + ")");
};

Part.prototype.asString = rt.method("asString", 0, function () {
  return defs.string(this.toString());
});

function Method(method) {
  var i, l, mParts, names, parts;

  names = method.identifier.split(" ");
  mParts = method.parts;

  parts = [];

  for (i = 0, l = names.length; i < l; i += 1) {
    parts.push(new Part(names[i].replace("()", ""), mParts[i]));
  }

  this.object = {
    "method": method,
    "parts": parts
  };
}

util.inherits(Method, prim.Object);

Method.prototype.name = rt.method("name", 0, function () {
  return defs.string(this.object.method.identifier);
});

Method.prototype.signature = rt.method("signature", 0, function () {
  return new prim.List(this.object.parts);
});

Method.prototype.toString = function () {
  return "method " + this.object.parts.join(" ");
};

Method.prototype.asString = rt.method("asString", 0, function () {
  return defs.string(this.toString());
});

function Mirror(object) {
  this.object = object;
}

util.inherits(Mirror, prim.Object);

Mirror.prototype.methodNamed_ifAbsent = rt.method("methodNamed() ifAbsent",
  [ 1, [ 1, 1 ] ], function (rawName, onAbsent) {
    var object = this.object;

    rawName = rawName[0];
    onAbsent = onAbsent[1];

    return rt.String.assert(rawName).then(function () {
      return rt.Action.assert(onAbsent);
    }).then(function () {
      return rawName.asPrimitiveString();
    }).then(function (name) {
      var pName;

      if (rt.isGraceObject(object)) {
        pName = util.uglify(name);

        if (util.owns(object, pName) && object[pName].isGraceMethod) {
          return new Method(object[pName]);
        }

        return onAbsent.apply();
      }

      throw new Error("Mirrors not yet implemented for JavaScript objects");
    });
  });

Mirror.prototype.methodNamed = rt.method("methodNamed()", 1, function (name) {
  return this.methodNamed_ifAbsent([ name ], [ rt.block(0, function () {
    return rt.FailedSearch.raiseForObject(name);
  }) ]);
});

Mirror.prototype.methods = rt.method("methods", 0, function () {
  var methods, object;

  object = this.object;
  methods = [];

  if (rt.isGraceObject(object)) {
    util.forProperties(object, function (name, value) {
      if (value.isGraceMethod) {
        methods.push(new Method(value));
      }
    });
  } else {
    throw new Error("Mirrors not yet implemented for JavaScript objects");
  }

  return new prim.Set(methods);
});

Mirror.prototype.asString = rt.method("asString", 0, function () {
  return this.object.asString().then(function (string) {
    return defs.string("mirror[")["++"](string);
  }).then(function (string) {
    return string["++"](defs.string("]"));
  });
});

exports.reflect = rt.method("reflect()", 1, function (object) {
  return new Mirror(object);
});

exports.Mirror = defs.type("Mirror",
  [ defs.signature([ defs.sigPart("methodNamed", [ "name" ]),
      defs.sigPart("ifAbsent", [ "onAbsent" ]) ]),
    defs.signature("methodNamed", [ "name" ]),
    defs.signature("methods")
  ]);

exports.MirrorMethod = defs.type("MirrorMethod",
  [ defs.signature("name"),
    defs.signature("signature")
  ]);

exports.MirrorPart = defs.type("MirrorMethod",
  [ defs.signature("name"),
    defs.signature("generics"),
    defs.signature("parameters")
  ]);

exports.toString = function () {
  return "mirrors";
};

},{"../runtime":10,"../util":21,"./definitions":11,"./primitives":16}],15:[function(require,module,exports){
(function (process){
// Importing this module concurrently loads the system prelude.

"use strict";

var Task, defs, fs, hopper, prelude, rt, util;



Task = require("../task");
defs = require("./definitions");
hopper = require("../hopper");
rt = require("../runtime");
util = require("../util");

// Set up the built-in prelude values.
prelude = defs.object();

function newVar(name, value) {
  return rt.method(name, 0, function () {
    return value;
  });
}

function newType(name, value) {
  var generics = value.object ? value.object.generics : 0;

  return rt.method(name, [ [ generics, 0 ] ], function () {
    return rt.withGenerics
      .apply(null, [ name, value ].concat(util.slice(arguments)));
  });
}

prelude.done = newVar("done", rt.done);

prelude.LessThan = newVar("LessThan", defs.LessThan);
prelude.EqualTo = newVar("EqualTo", defs.EqualTo);
prelude.GreaterThan = newVar("GreaterThan", defs.GreaterThan);

util.extend(prelude, require("./methods"));

util.forProperties(require("./types"), function (name, value) {
  prelude[name] = newType(name, value);
});

function addProperties(list) {
  util.forProperties(list, function (name, value) {
    prelude[name] = newVar(name, value);
  });
}

addProperties(require("./exceptions"));
addProperties(require("./publicity"));

prelude.mirrors = newVar("mirrors", require("./mirrors"));

// The exported prelude is a task, so other actions can wait for it to be ready
// before proceeding with evaluation. Note that it's safe to stop tasks which
// depend on this one, because there is no explicit dependency between this task
// and the internal interpreter.
module.exports = new Task(function (resolve, reject) {
  // The prelude file is read manually so that brfs can statically deposit the
  // code into this file when rendering the script for the browser.
  process.nextTick(function(){(function (readError, code) {
    if (readError !== null) {
        return reject(readError);
    }
    hopper.interpret('prelude', code.toString(), prelude, function (runError) {
        if (runError !== null) {
            reject(runError);
        } else {
            resolve(prelude);
        }
    });
})(null,"method asString -> String {\n  \"prelude\"\n}\n\n// This has to be a method to account for delegation.\nmethod prelude {\n  self\n}\n\nmethod unless(cond : Boolean) then(then : Action) -> Done {\n  cond.orElse(then)\n  done\n}\n\nmethod unless(cond : Boolean)\n    then<T>(then : Action<T>) else<U>(else : Action<U>) -> T | U {\n  cond.andAlso(else) orElse(then)\n}\n\nmethod until(cond : Action<Boolean>) do(action : Action) -> Done {\n  while { !cond.apply } do(action)\n}\n\nmethod for<T>(in : Do<T>) do(f : Procedure<T>) -> Done {\n  in.do(f)\n}\n\ntype ExceptionPattern = {\n  parent -> ExceptionPattern\n\n  refine(name : String) -> ExceptionPattern\n  refine(name : String) defaultMessage(message : String) -> ExceptionPattern\n\n  raise(message : String) -> None\n  raiseDefault -> None\n}\n\ndef EnvironmentException : ExceptionPattern is public =\n  Exception.refine(\"Environment Exception\")\n\ndef ResourceException : ExceptionPattern is public =\n  Exception.refine(\"Resource Exception\")\n\ndef SubobjectResponsibility : ExceptionPattern is public = object {\n  inherits LogicError.refine(\"Subobject Responsibility\")\n\n  method raiseForMethod(name : String) -> None {\n    raise \"A subobject should have overridden the method «{name}»\"\n  }\n}\n\ntype MutableList<T> = List<T> & type {\n  // Insert an element at the given index, overwriting and returning the element\n  // at that position.\n  // Raises an Out Of Bounds if the index is not within the bounds of the list.\n  at(index : Number) put(element : T) -> T\n\n  // Add an element to the end of the list.\n  // Raises an Out Of Bounds if the index is not within the bounds of the list.\n  add(element : T) -> Done\n\n  // Remove and return the element at the given index.\n  removeAt(index : Number) -> T\n\n  // Remove the given element, returning the index where it was found.\n  // Returns the result of the given action if the element is not present.\n  remove(element : T) ifAbsent<U>(action : Action<U>) -> Number | U\n\n  // Remove the given element, returning the index where it was found.\n  // Raises a Failed Search if the element is not present.\n  remove(element : T) -> Number\n}\n\ndef mutableList is public = object {\n  inherits delegateTo(list)\n\n  constructor withAll<T>(elements : Do<T>) -> MutableList<T> {\n    inherits list.withAll<T>(elements)\n\n    method boundsCheck(index : Number) -> Done is confidential {\n      if ((index < 1) || (index > size)) then {\n        OutOfBounds.raiseForIndex(index)\n      }\n    }\n\n    method at(index : Number) put(element : T) -> T {\n      boundsCheck(index)\n      internalSplice(index - 1, 1, element)\n    }\n\n    method add(element : T) -> Done {\n      internalPush(element)\n    }\n\n    method removeAt(index : Number) -> T {\n      boundsCheck(index)\n      internalSplice(index - 1, 1)\n    }\n\n    method remove(element : T) ifAbsent<U>(action : Action<U>) -> Number | U {\n      internalRemove(element, action)\n    }\n\n    method remove(element : T) -> Number {\n      remove(element) ifAbsent<None> {\n        FailedSearch.raiseForObject(element)\n      }\n    }\n\n    method asImmutable -> List<T> {\n      list.withAll(self)\n    }\n  }\n\n  method asString -> String {\n    \"mutableList\"\n  }\n}\n\n\ntype Set<T> = Collection<T> & type {\n  // Produce the concatenation of this set with another, without modifying\n  // either set.\n  ++(set : Set<T>) -> Set<T>\n\n  // Produce an immutable representation of the current state of this set.\n  asImmutable -> Set<T>\n}\n\ntype MutableSet<T> = Set<T> & type {\n  // Add an element to the set.\n  add(element : T) -> Done\n\n  // Remove the given element. Applies the given action if the element is not\n  // present.\n  remove(element : T) ifAbsent(action : Action) -> Done\n\n  // Remove the given element. Raises a Failed Search if the element is not\n  // present.\n  remove(element : T) -> Done\n}\n\ndef mutableSet is public = object {\n  inherits delegateTo(set)\n\n  constructor withAll<T>(elements : Do<T>) -> MutableSet<T> {\n    inherits set.withAll<T>(elements)\n\n    method add(element : T) -> Done {\n      internalPush(element)\n    }\n\n    method remove(element : T) ifAbsent(action : Action) -> Done {\n      internalRemove(element, action)\n      done\n    }\n\n    method remove(element : T) -> Done {\n      remove(element) ifAbsent {\n        FailedSearch.raiseForObject(element)\n      }\n    }\n\n    method asImmutable -> Set<T> {\n      set.withAll(self)\n    }\n  }\n\n  method asString -> String {\n    \"mutableSet\"\n  }\n}\n\nclass entry.key<K>(key' : K) value<V>(value' : V) -> Entry<K, V> {\n  def key : K is public = key'\n  def value : V is public = value'\n\n  method ==(other : Object) -> Boolean {\n    match (other)\n      case { anEntry : Entry<K, V> ->\n        (key == anEntry.key).andAlso {\n          value == anEntry.value\n        }\n      }\n      case { _ -> false }\n  }\n\n  method asString -> String {\n    \"{key.asString} => {value.asString}\"\n  }\n}\n\ntype Dictionary<K, V> = Set<Entry<K, V>> & type {\n  // Whether the dictionary contains the given key.\n  containsKey(key : K) -> Boolean\n\n  // Whether the dictionary contains the given value.\n  containsValue(value : V) -> Boolean\n\n  // Produce an immutable representation of the current state of this\n  // dictionary.\n  asImmutable -> Dictionary<K, V>\n}\n\ntype MutableDictionary<K, V> = Dictionary<K, V> & type {\n  // Add a value at the given key into the dictionary.\n  // Replaces the existing entry if the key is already present.\n  at(key : K) put(value : V) -> Done\n\n  // Add an entry into the dictionary.\n  // Replaces the existing entry if the key is already present.\n  add(entry : Entry<K, V>) -> Done\n\n  // Remove and return the value at the given key.\n  // Returns the result of the given action if the key is not present.\n  removeAt(key : K) ifAbsent<T>(action : Action<T>) -> V | T\n\n  // Remove and return the value at the given key.\n  // Raises a Failed Search if the key is not present.\n  removeAt(key : K) -> V\n\n  // Remove the given entry.\n  // Runs the given action if the entry is not present.\n  remove(element : Entry<K, V>) ifAbsent(action : Action) -> Done\n\n  // Remove the given entry.\n  // Raises a Failed Search if the entry is not present.\n  remove(element : Entry<K, V>) -> Done\n}\n\ndef mutableDictionary is public = object {\n  inherits delegateTo(dictionary)\n\n  constructor withAll<K, V>(elements : Do<Entry<K, V>>)\n      -> MutableDictionary<K, V> {\n    inherits dictionary.withAll<K, V>(elements)\n\n    method at(key : K) put(value : V) -> Done {\n      internalPush(entry.key(key) value(value))\n    }\n\n    method add(entry : Entry<K, V>) -> Done {\n      internalPush(entry)\n    }\n\n    method removeAt(key : K) ifAbsent<T>(action : Action<T>) -> V | T {\n      internalRemoveAt(key, action)\n    }\n\n    method removeAt(key : K) -> V {\n      removeAt(key) ifAbsent {\n        FailedSearch.raiseForObject(key)\n      }\n    }\n\n    method remove(entry : Entry<K, V>) ifAbsent(action : Action) -> Done {\n      internalRemove(entry, action)\n      done\n    }\n\n    method remove(entry : Entry<K, V>) -> Done {\n      remove(entry) ifAbsent {\n        FailedSearch.raiseForObject(entry)\n      }\n\n      done\n    }\n\n    method asImmutable -> Dictionary<K, V> {\n      dictionary.withAll(self)\n    }\n  }\n\n  method asString -> String {\n    \"mutableDictionary\"\n  }\n}\n\ndef … : Unknown = object {\n  method … {\n    self\n  }\n\n  method asString -> String {\n    \"…\"\n  }\n}\n")});
});

}).call(this,require('_process'))
},{"../hopper":3,"../runtime":10,"../task":19,"../util":21,"./definitions":11,"./exceptions":12,"./methods":13,"./mirrors":14,"./publicity":17,"./types":18,"_process":27}],16:[function(require,module,exports){
// Primitive Grace definitions in JavaScript.

"use strict";

var Task, defs, rt, util;

Task = require("../task");
rt = require("../runtime");
defs = require("./definitions");
util = require("../util");

function addMethod(Constructor, name) {
  Constructor.prototype[util.uglify(name)] =
    rt.method.apply(rt, util.slice(arguments, 1));
}

function addConstructor(Constructor, name) {
  Constructor.prototype[util.uglify(name)] =
    rt.constructor.apply(rt, util.slice(arguments, 1));
}

function toNumber(raw) {
  return defs.Number.cast(raw).then(function (number) {
    return number.asPrimitiveNumber();
  });
}

function toString(raw) {
  return defs.String.cast(raw).then(function (string) {
    return string.asPrimitiveString();
  });
}

function GraceObject() {
  return this;
}

GraceObject.isInternal = true;

addMethod(GraceObject, "==", 1, function (value) {
  return defs.bool(this === value);
});

addMethod(GraceObject, "!=", 1, function (value) {
  return this["=="](value).then(function (result) {
    return result["prefix!"]().then(function (notted) {
      return defs.Boolean.assert(notted).then(function () {
        return notted;
      });
    });
  });
});

addMethod(GraceObject, "asString", 0, function () {
  return defs.string("object");
});

function asString(value) {
  return rt.apply(value, "asString").then(function (string) {
    return toString(string);
  });
}

exports.asString = asString;

GraceObject.prototype.toString = function () {
  var error, string;

  string = null;
  error = null;

  asString(this).now(function (value) {
    string = value;
  }, rt.handleInternalError).then(null, function (reason) {
    error = new Error("Unable to render exception message");

    reason.exception().then(function (exception) {
      return exception.name().then(function (name) {
        return toString(name).then(function (nameString) {
          error.name = nameString;
        });
      });
    }).then(function () {
      return reason.message().then(function (message) {
        return toString(message).then(function (messageString) {
          error.message = messageString;
        });
      });
    }).now();
  });

  if (error !== null) {
    throw error;
  }

  if (string === null || string.toString === GraceObject.prototype.toString) {
    return "object";
  }

  return string.toString();
};

GraceObject.prototype.toString.isInternal = true;

function AbstractPattern() {
  return this;
}

util.inherits(AbstractPattern, GraceObject);

function dirPattern(name, branch) {
  return function (rawRhs) {
    var self = this;

    return defs.Pattern.cast(rawRhs).then(function (rhs) {
      var pattern = new AbstractPattern();

      pattern.match = rt.method("match()", 1, function (value) {
        return self.match(value).then(function (rawMatch) {
          return defs.Boolean.cast(rawMatch).then(function (match) {
            return match[branch](defs.block(0, function () {
              return rhs.match(value);
            }));
          });
        });
      });

      pattern.asString = rt.method("asString", 0, function () {
        return self.asString().then(function (string) {
          return rt.string(name + "(")["++"](string);
        }).then(function (string) {
          return string["++"](rt.string(", "));
        }).then(function (string) {
          return rt.apply(rhs, "asString").then(function (rhsString) {
            return string["++"](rhsString);
          });
        }).then(function (string) {
          return string["++"](rt.string(")"));
        });
      });

      return pattern;
    });
  };
}

addMethod(AbstractPattern, "&", 1, dirPattern("Both", "andAlso"));

addMethod(AbstractPattern, "|", 1, dirPattern("Either", "orElse"));

addMethod(AbstractPattern, "assert()", 1, function (value) {
  var packet, self;

  self = this;
  packet = null;

  return self.match(value).then(function (result) {
    return result.orElse(defs.block(0, function () {
      return defs.AssertionFailure
        .raiseForValue_againstPattern([ value ], [ self ])
        .then(null, function (error) {
          packet = error;
          throw packet;
        });
    }));
  }).then(null, function () {
    var trace;

    if (packet !== null) {
      trace = packet.object.stackTrace;
      trace.splice(trace.length - 3, 3);
    }

    throw packet;
  });
});

addMethod(AbstractPattern, "asString", 0, function () {
  return defs.string("object(pattern.abstract)");
});

function Singleton() {
  AbstractPattern.call(this);
}

util.inherits(Singleton, AbstractPattern);

addMethod(Singleton, "match()", 1, function (value) {
  return this === value ? defs.success(value) : defs.failure(value);
});

addMethod(Singleton, "asString", 0, function () {
  return defs.string("object(pattern.singleton)");
});

function Block(parameters, apply) {
  var paramCount;

  AbstractPattern.call(this);

  paramCount = typeof parameters === "number" ? parameters : parameters[1];

  this.apply =
    rt.method("apply" + (paramCount === 0 ? "" : "()"), [ parameters ], apply);

  this.asString = rt.method("asString", 0, function () {
    return defs.string("block/" + paramCount);
  });

  if (paramCount === 1) {
    this.match = rt.method("match()", 1, function (object) {
      var self = this;

      return self.apply(object).then(function (result) {
        return defs.success(result, self);
      });
    });
  }
}

util.inherits(Block, AbstractPattern);

addMethod(Block, "asPrimitive", function () {
  return this.apply;
});

addMethod(Block, "match()", 1, function () {
  return rt.UnmatchableBlock.raiseDefault();
});

function AbstractBoolean() {
  AbstractPattern.call(this);
}

util.inherits(AbstractBoolean, AbstractPattern);

addMethod(AbstractBoolean, "match()", 1, function (against) {
  return defs.equalityMatch(this, against);
});

addMethod(AbstractBoolean, "ifTrue()", 1, function (action) {
  var self = this;

  return defs.Action.assert(action).then(function () {
    return self.ifTrue_ifFalse([ action ], [ defs.emptyBlock ]);
  }).then(function () {
    return rt.done;
  });
});

addMethod(AbstractBoolean, "ifFalse()", 1, function (action) {
  var self = this;

  return defs.Action.assert(action).then(function () {
    return self.ifTrue_ifFalse([ defs.emptyBlock ], [ action ]);
  }).then(function () {
    return rt.done;
  });
});

addMethod(AbstractBoolean, "andAlso() orElse()", [ 1, 1 ], function (fst, snd) {
  var self = this;

  fst = fst[0];
  snd = snd[0];

  return defs.Action.assert(fst).then(function () {
    return defs.Action.assert(snd);
  }).then(function () {
    return self.ifTrue_ifFalse(rt.part([ defs.Boolean ], fst),
      rt.part([ defs.Boolean ], snd));
  });
});

addMethod(AbstractBoolean, "andAlso()", 1, function (action) {
  var self = this;

  return defs.Action.assert(action).then(function () {
    return self.ifTrue_ifFalse(rt.part([ defs.Boolean ], [ action ]),
      rt.part([ defs.Boolean ], [
        defs.block(0, function () {
          return self;
        })
      ]));
  });
});

addMethod(AbstractBoolean, "orElse()", 1, function (action) {
  var self = this;

  // TODO Type check parameters, pass generics.
  return self.ifTrue_ifFalse([
    defs.block(0, function () {
      return self;
    })
  ], [ action ]);
});

addMethod(AbstractBoolean, "&&", 1, function (rhs) {
  var self = this;

  return defs.Boolean.assert(rhs).then(function () {
    return self.andAlso(defs.block(0, function () {
      return rhs;
    }));
  });
});

addMethod(AbstractBoolean, "||", 1, function (rhs) {
  var self = this;

  return defs.Boolean.assert(rhs).then(function () {
    return self.orElse(defs.block(0, function () {
      return rhs;
    }));
  });
});

addMethod(AbstractBoolean, "prefix!", 0, function () {
  return this.andAlso_orElse([
    defs.block(0, function () {
      return defs.bool(false);
    })
  ], [
    defs.block(0, function () {
      return defs.bool(true);
    })
  ]);
});

addMethod(AbstractBoolean, "asBoolean", 0, function () {
  return this.andAlso_orElse([
    defs.block(0, function () {
      return defs.bool(true);
    })
  ], [
    defs.block(0, function () {
      return defs.bool(false);
    })
  ]);
});

addMethod(AbstractBoolean, "asPrimitive", 0, function () {
  return this.asPrimitiveBoolean();
});

function addIfTrueIfFalse(Ctor, index) {
  addMethod(Ctor, "ifTrue() ifFalse()", [ [ 1, 1 ], [ 1, 1 ] ], function () {
    var action, part;

    part = arguments[index];
    action = part[1];

    // TODO Type check arguments and result.
    return action.apply();
  });
}

function True() {
  return this;
}

util.inherits(True, AbstractBoolean);

addIfTrueIfFalse(True, 0);

addMethod(True, "asPrimitiveBoolean", 0, function () {
  return true;
});

addMethod(True, "asString", 0, function () {
  return defs.string("true");
});

function False() {
  return this;
}

util.inherits(False, AbstractBoolean);

addIfTrueIfFalse(False, 1);

addMethod(False, "asPrimitiveBoolean", 0, function () {
  return false;
});

addMethod(False, "asString", 0, function () {
  return defs.string("false");
});

function binaryOp(func, type) {
  return function (rawRhs) {
    var self = this;

    return defs[type].cast(rawRhs).then(function (rhs) {
      return self["asPrimitive" + type]().then(function (fst) {
        return rhs["asPrimitive" + type]().then(function (snd) {
          return func(fst, snd);
        });
      });
    });
  };
}

function Comparison() {
  AbstractPattern.call(this);
}

util.inherits(Comparison, Singleton);

addMethod(Comparison, "ifLessThan()", 1, function (onLessThan) {
  var self = this;

  return defs.Action.assert(onLessThan).then(function () {
    return self.ifLessThan_ifEqualTo_ifGreaterThan([ onLessThan ],
      [ defs.emptyBlock ], [ defs.emptyBlock ]).then(function () {
        return defs.done;
      });
  });
});

addMethod(Comparison, "ifEqualTo()", 1, function (onEqualTo) {
  var self = this;

  return defs.Action.assert(onEqualTo).then(function () {
    return self.ifLessThan_ifEqualTo_ifGreaterThan([ defs.emptyBlock ],
      [ onEqualTo ], [ defs.emptyBlock ]).then(function () {
        return defs.done;
      });
  });
});

addMethod(Comparison, "ifGreaterThan()", 1, function (onGreaterThan) {
  var self = this;

  return defs.Action.assert(onGreaterThan).then(function () {
    return self.ifLessThan_ifEqualTo_ifGreaterThan([ defs.emptyBlock ],
      [ defs.emptyBlock ], [ onGreaterThan ]).then(function () {
        return defs.done;
      });
  });
});

addMethod(Comparison, "ifLessThan() ifEqualTo()", [ 1, 1 ],
  function (onLessThan, onEqualTo) {
    var self = this;

    return defs.Action.assert(onLessThan[0]).then(function () {
      return defs.Action.assert(onEqualTo[0]);
    }).then(function () {
      return self.ifLessThan_ifEqualTo_ifGreaterThan(onLessThan,
        onEqualTo, [ defs.emptyBlock ]).then(function () {
          return defs.done;
        });
    });
  });

addMethod(Comparison, "ifLessThan() ifGreaterThan()", [ 1, 1 ],
  function (onLessThan, onGreaterThan) {
    var self = this;

    return defs.Action.assert(onLessThan[0]).then(function () {
      return defs.Action.assert(onGreaterThan[0]);
    }).then(function () {
      return self.ifLessThan_ifEqualTo_ifGreaterThan(onLessThan,
        [ defs.emptyBlock ], onGreaterThan).then(function () {
          return defs.done;
        });
    });
  });

addMethod(Comparison, "ifEqualTo() ifGreaterThan()", [ 1, 1 ],
  function (onEqualTo, onGreaterThan) {
    var self = this;

    return defs.Action.assert(onEqualTo[0]).then(function () {
      return defs.Action.assert(onGreaterThan[0]);
    }).then(function () {
      return self.ifLessThan_ifEqualTo_ifGreaterThan([ defs.emptyBlock ],
        onEqualTo, onGreaterThan).then(function () {
          return defs.done;
        });
    });
  });

// TODO Implement arbitrary size.
function GraceNumber(value) {
  AbstractPattern.call(this);

  value = Number(value);

  this.asPrimitiveNumber = rt.method("asPrimitiveNumber", 0, function () {
    return value;
  });
}

util.inherits(GraceNumber, AbstractPattern);

addMethod(GraceNumber, "asPrimitive", 0, function () {
  return this.asPrimitiveNumber();
});

addMethod(GraceNumber, "==", 1, function (rhs) {
  var self = this;

  return defs.Number.match(rhs).then(function (isNumber) {
    return isNumber.andAlso_orElse([
      defs.block(0, function () {
        return self.asPrimitiveNumber().then(function (primSelf) {
          return rhs.asPrimitiveNumber().then(function (primRhs) {
            return defs.bool(primSelf === primRhs);
          });
        });
      })
    ], [
      defs.block(0, function () {
        return defs.bool(false);
      })
    ]);
  });
});

addMethod(GraceNumber, "match()", 1, function (against) {
  return defs.equalityMatch(this, against);
});

addMethod(GraceNumber, "prefix-", 0, function () {
  return this.asPrimitiveNumber().then(function (value) {
    return defs.number(-value);
  });
});

function binaryNum(func) {
  return binaryOp(function (fst, snd) {
    return new GraceNumber(func(fst, snd));
  }, "Number");
}

function binaryNumCmp(func) {
  return binaryOp(function (fst, snd) {
    return defs.bool(func(fst, snd));
  }, "Number");
}

addMethod(GraceNumber, "+", 1, binaryNum(function (fst, snd) {
  return fst + snd;
}));

addMethod(GraceNumber, "-", 1, binaryNum(function (fst, snd) {
  return fst - snd;
}));

addMethod(GraceNumber, "*", 1, binaryNum(function (fst, snd) {
  return fst * snd;
}));

addMethod(GraceNumber, "/", 1, binaryOp(function (fst, snd) {
  if (snd === 0) {
    return rt.NotANumber.raiseDivideByZero().then(null, function (packet) {
      packet.object.stackTrace = [];
      throw packet;
    });
  }

  return new GraceNumber(fst / snd);
}, "Number"));

addMethod(GraceNumber, "%", 1, binaryNum(function (fst, snd) {
  return fst % snd;
}));

addMethod(GraceNumber, "^", 1, binaryNum(function (fst, snd) {
  return Math.pow(fst, snd);
}));

addMethod(GraceNumber, "compareTo()", 1, binaryOp(function (fst, snd) {
  return fst < snd ? defs.LessThan :
    fst > snd ? defs.GreaterThan : defs.EqualTo;
}, "Number"));

addMethod(GraceNumber, "<", 1, binaryNumCmp(function (fst, snd) {
  return fst < snd;
}));

addMethod(GraceNumber, "<=", 1, binaryNumCmp(function (fst, snd) {
  return fst <= snd;
}));

addMethod(GraceNumber, ">", 1, binaryNumCmp(function (fst, snd) {
  return fst > snd;
}));

addMethod(GraceNumber, ">=", 1, binaryNumCmp(function (fst, snd) {
  return fst >= snd;
}));

function addMath(name, method, arg) {
  method = method || name;

  addMethod(GraceNumber, name, 0, function () {
    return this.asPrimitiveNumber().then(function (value) {
      var result = Math[method](value, arg);

      if (isNaN(result)) {
        return defs.NotANumber.raiseForOperation_on([ method ], [ value ]);
      }

      return new GraceNumber(result);
    });
  });
}

addMath("absolute", "abs");
addMath("round");
addMath("floor");
addMath("ceiling", "ceil");
addMath("log");
addMath("exponent", "exp");
addMath("sin");
addMath("cos");
addMath("tan");
addMath("asin");
addMath("acos");
addMath("atan");
addMath("square", "pow", 2);
addMath("cube", "pow", 3);
addMath("squareRoot", "sqrt");

addMethod(GraceNumber, "asString", 0, function () {
  return this.asPrimitiveNumber().then(function (value) {
    return defs.string(value.toString());
  });
});

function GraceString(value) {
  AbstractPattern.call(this);

  value = String(value);
  this.asPrimitiveString = rt.method("asPrimitiveString", function () {
    return value;
  });
}

util.inherits(GraceString, AbstractPattern);

addMethod(GraceString, "asPrimitive", 0, function () {
  return this.asPrimitiveString();
});

addMethod(GraceString, "==", 1, function (rhs) {
  var self = this;

  return defs.String.match(rhs).then(function (isNumber) {
    return isNumber.andAlso_orElse([
      defs.block(0, function () {
        return self.asPrimitiveString().then(function (primSelf) {
          return rhs.asPrimitiveString().then(function (primRhs) {
            return defs.bool(primSelf === primRhs);
          });
        });
      })
    ], [
      defs.block(0, function () {
        return defs.bool(false);
      })
    ]);
  });
});

addMethod(GraceString, "match()", 1, function (against) {
  return defs.equalityMatch(this, against);
});

addMethod(GraceString, "at()", 1, function (rawIndex) {
  return defs.Number.cast(rawIndex).then(function (index) {
    return this.asPrimitiveString().then(function (string) {
      return index.asPrimitiveNumber().then(function (primIndex) {
        return defs.string(string[primIndex - 1]);
      });
    });
  });
});

addMethod(GraceString, "size", 0, function () {
  return this.asPrimitiveString().then(function (string) {
    return rt.number(string.length);
  });
});

addMethod(GraceString, "contains()", 1, function (rawSubString) {
  var self = this;

  return defs.String.cast(rawSubString).then(function (subString) {
    return subString.asPrimitiveString().then(function (primSubString) {
      return self.asPrimitiveString().then(function (primSelf) {
        return defs.bool(primSelf.substring(primSubString) >= 0);
      });
    });
  });
});

addMethod(GraceString, "do()", 1, function (rawAction) {
  var self = this;

  return defs.Function.cast(rawAction).then(function (action) {
    return self.asPrimitiveString().then(function (string) {
      return Task.each(string, function (character) {
        return action.apply(defs.string(character));
      });
    }).then(function () {
      return defs.done;
    });
  });
});

function binaryStrCmp(func) {
  return binaryOp(function (fst, snd) {
    return defs.bool(func(fst, snd));
  }, "String");
}

addMethod(GraceString, "compareTo()", 1, binaryOp(function (fst, snd) {
  return fst < snd ? defs.LessThan :
    fst > snd ? defs.GreaterThan : defs.EqualTo;
}, "String"));

addMethod(GraceString, "<", 1, binaryStrCmp(function (fst, snd) {
  return fst < snd;
}));

addMethod(GraceString, "<=", 1, binaryStrCmp(function (fst, snd) {
  return fst <= snd;
}));

addMethod(GraceString, ">", 1, binaryStrCmp(function (fst, snd) {
  return fst > snd;
}));

addMethod(GraceString, ">=", 1, binaryStrCmp(function (fst, snd) {
  return fst >= snd;
}));

addMethod(GraceString, "++", 1, function (rhs) {
  var self = this;

  return self.asPrimitiveString().then(function (primSelf) {
    return defs.String.match(rhs).then(function (isString) {
      return isString.andAlso_orElse([
        defs.block(0, function () {
          return rhs;
        })
      ], [
        defs.block(0, function () {
          return rt.apply(rhs, "asString");
        })
      ]).then(function (snd) {
        return snd.asPrimitiveString().then(function (primSnd) {
          return defs.string(primSelf + primSnd);
        });
      });
    });
  });
});

addMethod(GraceString, "fold() startingWith()", [ [ 1, 1 ], 1 ],
  function (part, value) {
    var pattern, self;

    self = this;
    pattern = part[0];
    value = value[0];

    return defs.Function2.cast(part[1]).then(function (fold) {
      return self["do"](rt.block(1, function (element) {
        return fold.apply(value, element).then(function (result) {
          return pattern.assert(result).then(function () {
            value = result;
            return rt.done;
          });
        });
      })).then(function () {
        return value;
      });
    });
  });

addMethod(GraceString, "asNumber", 0, function () {
  var self = this;

  return self.asPrimitiveString().then(function (value) {
    var number = Number(value);

    if (isNaN(number)) {
      return rt.NotANumber.raiseForParse(self).then(null, function (packet) {
        packet.object.stackTrace = [];
        throw packet;
      });
    }

    return defs.number(number);
  });
});

addMethod(GraceString, "substringFrom() to()", [ 1, 1 ], function (pFrom, pTo) {
  var self = this;

  return toNumber(pFrom[0]).then(function (from) {
    return toNumber(pTo[0]).then(function (to) {
      return self.asPrimitiveString().then(function (primSelf) {
        if (from < 1 || from > primSelf.length + 1) {
          return defs.OutOfBounds.raiseForIndex(defs.number(from));
        }

        if (to < 1 || to > primSelf.length + 1) {
          return defs.OutOfBounds.raiseForIndex(defs.number(to));
        }

        return defs.string(primSelf.substring(from - 1, to));
      });
    });
  });
});

addMethod(GraceString, "substringFrom() size()", [ 1, 1 ],
  function (pFrom, pSize) {
    var self = this;

    return toNumber(pFrom[0]).then(function (from) {
      return toNumber(pSize[0]).then(function (size) {
        return self.asPrimitiveString().then(function (primSelf) {
          var to = from + size;

          if (from < 1 || from > primSelf.length + 1) {
            return defs.OutOfBounds.raiseForIndex(defs.number(from));
          }

          if (to < 1 || to > primSelf.length + 1) {
            return defs.OutOfBounds.raiseForIndex(defs.number(to));
          }

          return defs.string(primSelf.substring(from - 1, to - 1));
        });
      });
    });
  });

addMethod(GraceString, "substringFrom()", 1, function (from) {
  var self = this;

  return self.asPrimitiveString().then(function (string) {
    return self.substringFrom_to([ from ], [ defs.number(string.length + 1) ]);
  });
});

addMethod(GraceString, "substringTo()", 1, function (to) {
  return this.substringFrom_to([ defs.number(1) ], [ to ]);
});

addMethod(GraceString, "replace() with()", [ 1, 1 ], function (pFrom, pTo) {
  var self = this;

  return toString(pFrom[0]).then(function (from) {
    return toString(pTo[0]).then(function (to) {
      return self.asPrimitiveString().then(function (primSelf) {
        return defs.string(primSelf.replace(from, to));
      });
    });
  });
});

addMethod(GraceString, "startsWith()", 1, function (rawPrefix) {
  var self = this;

  return toString(rawPrefix).then(function (prefix) {
    return self.asPrimitiveString().then(function (primSelf) {
      var index = prefix.length;

      return defs.bool(index > primSelf.length ? false :
        primSelf.lastIndexOf(prefix, index) === 0);
    });
  });
});

addMethod(GraceString, "endsWith()", 1, function (rawSuffix) {
  var self = this;

  return toString(rawSuffix).then(function (suffix) {
    return self.asPrimitiveString().then(function (primSelf) {
      var index = primSelf.length - suffix.length;

      return defs.bool(index < 0 ? false :
        primSelf.indexOf(suffix, index) === index);
    });
  });
});

function addIndexOfs(forwards) {
  var defaultStart, method, name;

  method = forwards ? "indexOf" : "lastIndexOf";
  name = method + "_startingAt_ifAbsent";

  defaultStart = forwards ? function () {
    return Task.resolve(defs.number(1));
  } : function (string) {
    return string.asPrimitiveString().then(function (primString) {
      return defs.number(primString.length);
    });
  };

  addMethod(GraceString, method + "() startingAt() ifAbsent()",
    [ 1, 1, [ 1, 1 ] ], function (pSearch, pFrom, pIfAbsent) {
      var self = this;

      return toString(pSearch[0]).then(function (search) {
        return toNumber(pFrom[0]).then(function (from) {
          return defs.Action.cast(pIfAbsent[1]).then(function (absent) {
            return self.asPrimitiveString().then(function (primSelf) {
              var index;

              if (from < 0 || from > primSelf.length ||
                  from === 0 && primSelf.length !== 0) {
                return defs.OutOfBounds.raiseForIndex(defs.number(from));
              }

              index = primSelf[method](search, from - 1);

              if (index < 0) {
                return absent.apply().then(function (result) {
                  return pIfAbsent[0].assert(result).then(function () {
                    return result;
                  });
                });
              }

              return defs.number(index + 1);
            });
          });
        });
      });
    });

  addMethod(GraceString, method + "()", 1, function (search) {
    var self = this;

    return defaultStart(self).then(function (from) {
      return self[name]([ search ], [ from ], [
        defs.block(0, function () {
          return defs.FailedSearch.raiseForObject(search);
        })
      ]);
    });
  });

  addMethod(GraceString, method + "() startingAt()", [ 1, 1 ],
    function (search, from) {
      var self = this;

      return self[name](search, from, [
        defs.block(0, function () {
          return defs.FailedSearch.raiseForObject(search);
        })
      ]);
    });

  addMethod(GraceString, method + "() ifAbsent()", [ 1, [ 1, 1 ] ],
    function (search, absent) {
      var self = this;

      return defaultStart(self).then(function (from) {
        return self[name](search, [ from ], rt.part(absent[0], absent[1]));
      });
    });
}

addIndexOfs(true);
addIndexOfs(false);

addMethod(GraceString, "asImmutable", 0, function () {
  return this;
});

addMethod(GraceString, "asString", 0, function () {
  return this.asPrimitiveString().then(function (value) {
    return defs.string("\"" + util.escape(value) + "\"");
  });
});

function Part(name, hasVarArg, generics, parameters) {
  if (typeof hasVarArg !== "boolean") {
    parameters = generics;
    generics = hasVarArg;
    hasVarArg = false;
  }

  if (generics === undefined) {
    parameters = [];
    generics = [];
  } else if (parameters === undefined) {
    parameters = generics;
    generics = [];
  }

  this.name = name;
  this.hasVarArg = hasVarArg;
  this.generics = generics;
  this.parameters = parameters;
}

Part.prototype.pretty = function () {
  return this.name + (this.parameters.length > 0 ? "()" : "");
};

Part.prototype.toString = function () {
  var generics, params;

  generics = this.generics;
  params = this.parameters;

  return this.name +
    (generics.length > 0 ? "<" + generics.join(", ") + ">" : "") +
    (params.length > 0 ? "(" + params.join(", ") + ")" : "");
};

function Signature(parts, hasVarArg, generics, parameters) {
  if (typeof parts === "string") {
    this.parts = [ new Part(parts, hasVarArg, generics, parameters) ];
  } else {
    this.parts = util.map(parts, function (part) {
      if (typeof part === "string") {
        return new Part(part, false, [], []);
      }

      return part;
    });
  }
}

Signature.prototype.name = function () {
  var i, l, name, parts;

  parts = this.parts;
  name = [];

  for (i = 0, l = parts.length; i < l; i += 1) {
    name.push(parts[i].pretty());
  }

  return name.join(" ");
};

Signature.prototype.toString = function () {
  return this.parts.join(" ");
};

function hasSignatures(pattern) {
  return pattern.object !== "undefined" &&
    util.isArray(pattern.object.signatures);
}

// A proxy for hoisted type declarations that will be filled out with the values
// of a real type once the actual value is built. As such, the proxy can be
// combined with other patterns and be tested for equality, but it cannot be
// matched or stringified.
function TypeProxy(name) {
  var self = this;

  this.object = {
    "dependents": [],

    "become": function (pattern) {
      var pname;

      if (pattern instanceof TypeProxy && pattern.object.become) {
        pattern.object.dependents.push(this);
        return Task.resolve();
      }

      if (pattern.object && pattern.object.signatures) {
        this.signatures = pattern.object.signatures;
      }

      for (pname in pattern) {
        if (!self.hasOwnProperty(pname) && pattern[pname] !== self[name]) {
          self[pname] = pattern[pname];
        }
      }

      delete this.become;

      return Task.each(this, this.dependents, function (dependent) {
        return dependent.become(self);
      }).then(function () {
        delete this.dependents;
      });
    }
  };

  if (name !== null) {
    this.asString = rt.method("asString", 0, function () {
      return defs.string(name);
    });
  }
}

util.inherits(TypeProxy, AbstractPattern);

addMethod(TypeProxy, "match()", 1, function () {
  return this.asString().then(function (name) {
    return defs.IncompleteType.raiseForName(name);
  });
});

function andWaitOn(andTask, lhs, rhs) {
  return andTask.then(function (and) {
    var become, hasLhs, hasRhs, proxy;

    proxy = new TypeProxy(null);
    proxy.asString = and.asString;

    if (lhs instanceof TypeProxy && lhs.object.become) {
      lhs.object.dependents.push(proxy.object);
      hasLhs = false;
    } else {
      hasLhs = true;
    }

    if (rhs instanceof TypeProxy && rhs.object.become) {
      rhs.object.dependents.push(proxy.object);
      hasRhs = false;
    } else {
      hasRhs = true;
    }

    become = proxy.object.become;
    proxy.object.become = function (becoming) {
      if (becoming === lhs && !hasRhs) {
        hasLhs = true;
      } else if (becoming === rhs && !hasLhs) {
        hasRhs = true;
      } else {
        return lhs["&"](rhs).then(function (joint) {
          return become.call(proxy.object, joint);
        });
      }

      return Task.resolve();
    };

    return proxy;
  });
}

addMethod(TypeProxy, "&", 1, function (pattern) {
  var and = AbstractPattern.prototype["&"].call(this, pattern);

  if (!(pattern instanceof TypeProxy || hasSignatures(pattern))) {
    return and;
  }

  return andWaitOn(and, this, pattern);
});

function Type(name, generics, extending, signatures) {
  var i, l;

  if (typeof name !== "string") {
    signatures = extending;
    extending = generics;
    generics = name;
    name = null;
  }

  if (typeof generics !== "number") {
    signatures = extending;
    extending = generics;
    generics = 0;
  }

  if (signatures === undefined) {
    signatures = extending;
    extending = null;
  } else if (util.isArray(extending)) {
    for (i = 0, l = extending.length; i < l; i += 1) {
      signatures = signatures.concat(extending[i].object.signatures);
    }
  } else {
    signatures = signatures.concat(extending.object.signatures);
  }

  this.object = {
    "generics": generics,
    "signatures": signatures
  };

  if (name !== null) {
    name = defs.string(name);

    this.asString = rt.method("asString", 0, function () {
      return name;
    });
  }
}

util.inherits(Type, AbstractPattern);

function typeMatch(type, value, onFail) {
  var i, l, method, name, parts, signature, signatures;

  signatures = type.object.signatures;

  for (i = 0, l = signatures.length; i < l; i += 1) {
    signature = signatures[i];
    name = signature.name();
    method = value[util.uglify(name)];
    parts = signature.parts;

    if (method === undefined) {
      return onFail(value, type, name);
    }

    if (typeof method === "function" && method.parts !== undefined) {
      if (!defs.isSubMethod(method.parts, parts)) {
        return onFail(value, type, name);
      }
    }
  }

  return defs.success(value, type);
}

addMethod(Type, "match()", 1, function (value) {
  return typeMatch(this, value, defs.failure);
});

addMethod(Type, "assert()", 1, function (value) {
  return typeMatch(this, value, function (val, type, name) {
    return defs.AssertionFailure.raiseForValue_againstType_missing([ val ],
      [ type ], [ rt.string(name) ]);
  });
});

addMethod(Type, "cast()", 1, function (value) {
  var self = this;

  return self.assert(value).then(function () {
    var i, l, name, object, pretty, signatures;

    if (defs.isGraceObject(value)) {
      return value;
    }

    signatures = self.object.signatures;

    object = defs.object();

    function makeMethod(mname) {
      return function () {
        return value[mname].apply(value, arguments);
      };
    }

    for (i = 0, l = signatures.length; i < l; i += 1) {
      pretty = signatures[i].name();
      name = util.uglify(pretty);

      object[name] = rt.method(pretty, makeMethod(name));
    }

    if (typeof value.object === "object") {
      object.object = value.object;
    }

    return object;
  });
});

addMethod(Type, "&", 1, function (pattern) {
  var andTask, self;

  self = this;
  andTask = AbstractPattern.prototype["&"].call(this, pattern);

  if (pattern instanceof TypeProxy && pattern.object.become) {
    return andWaitOn(andTask, this, pattern);
  }

  if (!hasSignatures(pattern)) {
    return andTask;
  }

  return andTask.then(function (and) {
    var type =
      new Type(self.object.signatures.concat(pattern.object.signatures));

    type.asString = and.asString;

    return type;
  });
});

addMethod(Type, "asString", 0, function () {
  var sep, signatures;

  signatures = this.object.signatures;
  sep = signatures.length === 0 ? "" : " ";

  return defs.string("type {" + sep + signatures.join("; ") + sep + "}");
});

function NamedPattern(name, pattern) {
  this.name = rt.method("name", function () {
    return name;
  });

  this.pattern = rt.method("pattern", function () {
    return pattern;
  });
}

util.inherits(NamedPattern, AbstractPattern);

addMethod(NamedPattern, "match()", 1, function (value) {
  return this.pattern().then(function (pattern) {
    return pattern.match(value);
  });
});

addMethod(NamedPattern, "assert()", 1, function (value) {
  return this.pattern().then(function (pattern) {
    return pattern.assert(value);
  });
});

addMethod(NamedPattern, "asString", 0, function () {
  var self = this;

  return this.name().then(function (name) {
    return self.pattern().then(function (pattern) {
      return defs.string(name.toString() +
          (pattern === defs.Unknown ? "" : " : " + pattern));
    });
  });
});

function matchAsString(name) {
  return function () {
    return this.value().then(function (value) {
      return asString(value).then(function (string) {
        return defs.string(name + "(" + string + ")");
      });
    });
  };
}

function Success(value, pattern) {
  True.call(this);

  this.value = rt.method("value", 0, function () {
    return value;
  });

  this.pattern = rt.method("pattern", 0, function () {
    return pattern;
  });
}

util.inherits(Success, True);

addMethod(Success, "asString", 0, matchAsString("success"));

function Failure(value, pattern) {
  False.call(this);

  this.value = rt.method("value", 0, function () {
    return value;
  });

  this.pattern = rt.method("pattern", 0, function () {
    return pattern;
  });
}

util.inherits(Failure, False);

addMethod(Failure, "asString", 0, matchAsString("failure"));

// Collects the elements of a collection using the do() method.
function getElements(value) {
  var elements = [];

  return value["do"](defs.block(1, function (element) {
    elements.push(element);
    return rt.done;
  })).then(function () {
    return elements;
  });
}

// A private definition used for all collections which store their elements
// internally in an array.
function InternalArray(elements, open, close) {
  this.object = {
    "elements": elements,
    "open": open,
    "close": close
  };
}

util.inherits(InternalArray, GraceObject);

addMethod(InternalArray, "size", 0, function () {
  return defs.number(this.object.elements.length);
});

addMethod(InternalArray, "isEmpty", 0, function () {
  return defs.bool(this.object.elements.length === 0);
});

addMethod(InternalArray, "do()", 1, function (action) {
  var elements = this.object.elements;

  return defs.Function.assert(action).then(function () {
    return Task.each(elements, function (element) {
      return action.apply(element);
    });
  }).then(function () {
    return defs.done;
  });
});

addMethod(InternalArray, "contains()", 1, function (value) {
  return new Task(this, function (resolve, reject) {
    return Task.each(this.object.elements, function (element) {
      return rt.apply(element, "==", [ [ value ] ]).then(function (isEqual) {
        return isEqual.andAlso(rt.block(0, function () {
          resolve(isEqual);
          return Task.never();
        }));
      });
    }).then(function () {
      resolve(defs.bool(false));
    }, reject);
  });
});

addMethod(InternalArray, "concatenate", 0, function () {
  var joining = defs.string("");

  return this["do"](rt.block(1, function (element) {
    return joining["++"](element).then(function (joined) {
      joining = joined;
      return defs.done;
    });
  })).then(function () {
    return joining;
  });
});

addMethod(InternalArray, "concatenateSeparatedBy()", 1, function (sep) {
  var joining, once;

  joining = defs.string("");
  once = false;

  return this["do"](rt.block(1, function (element) {
    return (once ? joining["++"](sep) : (once = true, Task.resolve(joining)))
      .then(function (part) {
        return part["++"](element);
      }).then(function (joined) {
        joining = joined;
        return defs.done;
      });
  })).then(function () {
    return joining;
  });
});

addMethod(InternalArray, "fold() startingWith()", [ [ 1, 1 ], 1 ],
  function (fold, value) {
    var pattern = fold[0];

    fold = fold[1];
    value = value[0];

    return this["do"](rt.block(1, function (element) {
      return fold.apply(value, element).then(function (result) {
        return pattern.assert(result).then(function () {
          value = result;
          return rt.done;
        });
      });
    })).then(function () {
      return value;
    });
  });

addMethod(InternalArray, "asPrimitiveArray", 0, function () {
  return this.object.elements.concat();
});

addMethod(InternalArray, "asPrimitive", 0, function () {
  return Task.each(this.object.elements, function (element) {
    if (typeof element.asPrimitive === "function") {
      return element.asPrimitive();
    }

    return element;
  });
});

addMethod(InternalArray, "asString", 0, function () {
  var close, comma, elements, open;

  elements = this.object.elements;

  open = this.object.open;
  close = this.object.close;

  if (elements.length === 0) {
    return defs.string(open + close);
  }

  elements = elements.concat();
  comma = defs.string(", ");

  return defs.string(open)["++"](elements.shift()).then(function (string) {
    return Task.each(elements, function (element) {
      return rt.apply(element, "asString").then(function (stringified) {
        return string["++"](comma).then(function (commaed) {
          return commaed["++"](stringified).then(function (replacement) {
            string = replacement;
          });
        });
      });
    }).then(function () {
      return string["++"](defs.string(close));
    });
  });
});

addMethod(InternalArray, "internalPush()", 1, function (element) {
  this.object.elements.push(element);
  return rt.done;
});

InternalArray.prototype.internalPush.isConfidential = true;

addMethod(InternalArray, "internalRemove()", 2, function (remove, rawAction) {
  var elements = this.object.elements;

  return defs.Action.cast(rawAction).then(function (action) {
    return new Task(function (resolve, reject) {
      return Task.each(elements, function (element, i) {
        return rt.apply(element, "==", [ remove ]).then(function (bool) {
          return bool.ifTrue(rt.block(0, function () {
            elements.splice(i, 1);
            resolve(defs.number(i + 1));
            return Task.never();
          }));
        });
      }).then(function () {
        return action.apply().then(function (result) {
          resolve(result);
        });
      }).then(null, reject);
    });
  });
});

InternalArray.prototype.internalRemove.isConfidential = true;

addMethod(InternalArray, "internalSplice()", rt.gte(2),
  function (rawIndex, rawAmount) {
    var additions, elements;

    elements = this.object.elements;
    additions = util.slice(arguments, 2);

    return toNumber(rawIndex).then(function (index) {
      return toNumber(rawAmount).then(function (amount) {
        return elements
          .splice.apply(elements, [ index, amount ].concat(additions))[0];
      });
    });
  });

InternalArray.prototype.internalSplice.isConfidential = true;

addMethod(InternalArray, "asImmutable", 0, function () {
  return this;
});

function List(elements) {
  InternalArray.call(this, elements, "[", "]");
}

util.inherits(List, InternalArray);

addMethod(List, "at()", 1, function (num) {
  var elements = this.object.elements;

  return toNumber(num).then(function (index) {
    if (index < 1 || index > elements.length) {
      return defs.OutOfBounds.raiseForIndex(num);
    }

    return elements[index - 1];
  });
});

addMethod(List, "first", 0, function () {
  return this.at(defs.number(1));
});

addMethod(List, "last", 0, function () {
  return this.at(defs.number(this.object.elements.length));
});

addMethod(List, "indices", 0, function () {
  var i, indices, l;

  indices = [];

  for (i = 1, l = this.object.elements.length; i <= l; i += 1) {
    indices.push(defs.number(i));
  }

  return new List(indices);
});

addMethod(List, "++", 1, function (rhs) {
  var elements = this.object.elements;

  return defs.Do.cast(rhs).then(function () {
    return getElements(rhs).then(function (rhsElements) {
      return defs.list(elements.concat(rhsElements));
    });
  });
});

addMethod(List, "sliceFrom() to()", [ 1, 1 ], function (rawFrom, rawTo) {
  var elements = this.object.elements;

  return toNumber(rawFrom).then(function (from) {
    if (from < 1 || from > elements.length + 1) {
      return defs.OutOfBounds.raiseForIndex(defs.number(from));
    }

    return toNumber(rawTo).then(function (to) {
      if (to < 1 || to > elements.length + 1) {
        return defs.OutOfBounds.raiseForIndex(defs.number(to));
      }

      return new List(elements.slice(from - 1, to - 1));
    });
  });
});

addMethod(List, "sliceFrom() to()", [ 1, 1 ], function (rawFrom, rawTo) {
  var elements = this.object.elements;

  return toNumber(rawFrom).then(function (from) {
    if (from < 1 || from > elements.length + 1) {
      return defs.OutOfBounds.raiseForIndex(defs.number(from));
    }

    return toNumber(rawTo).then(function (to) {
      if (to < 1 || to > elements.length + 1) {
        return defs.OutOfBounds.raiseForIndex(defs.number(to));
      }

      return new List(elements.slice(from - 1, to - 1));
    });
  });
});

addMethod(List, "sliceFrom()", 1, function (from) {
  return this.sliceFrom_to(from, defs.number(this.object.elements.length + 1));
});

addMethod(List, "sliceTo()", 1, function (to) {
  return this.sliceFrom_to(defs.number(1), to);
});

function ListPattern(pattern) {
  this.pattern = rt.method("pattern", 0, function () {
    return pattern;
  });
}

util.inherits(ListPattern, AbstractPattern);

addMethod(ListPattern, "match()", 1, function (list) {
  var self = this;

  return self.pattern().then(function (pattern) {
    return new Task(function (resolve, reject) {
      defs.List.match(list).then(function (isList) {
        return isList.ifTrue_ifFalse([
          defs.block(0, function () {
            return list["do"](defs.block(1, function (value) {
              return new Task(function (next, rejectIter) {
                pattern.match(value).then(function (matched) {
                  return matched.ifTrue_ifFalse([
                    defs.block(0, function () {
                      next(rt.done);
                      return Task.never();
                    })
                  ], [
                    defs.block(0, function () {
                      resolve(defs.failure(list, self));
                      return Task.never();
                    })
                  ]);
                }).then(null, rejectIter);
              });
            })).then(function () {
              return defs.success(list, self);
            });
          })
        ], [
          defs.block(0, function () {
            return defs.failure(list, self);
          })
        ]);
      }).then(resolve, reject);
    });
  });
});

addMethod(ListPattern, "asString", 0, function () {
  return this.pattern().then(function (pattern) {
    return asString(pattern).then(function (string) {
      return defs.string("List<" + string + ">");
    });
  });
});

function Set(elements) {
  InternalArray.call(this, elements, "{", "}");
}

util.inherits(Set, InternalArray);

addMethod(Set, "++", 1, function (rhs) {
  var newElements, self;

  self = this;
  newElements = this.object.elements.concat();

  return defs.Do.cast(rhs).then(function () {
    return rhs["do"](rt.block(1, function (element) {
      return self.contains(element).then(function (bool) {
        return bool.ifFalse(rt.block(0, function () {
          newElements.push(element);
          return rt.done;
        }));
      });
    }));
  }).then(function () {
    return defs.set(newElements);
  });
});

addMethod(Set, "internalPush", 1, function (value) {
  var self = this;

  return this.contains(value).then(function (bool) {
    return bool.ifFalse(rt.block(0, function () {
      return InternalArray.prototype.internalPush.call(self, value);
    }));
  });
});

function Entry(key, value) {
  this.object = {
    "key": key,
    "value": value
  };
}

addMethod(Entry, "key", 0, function () {
  return this.object.key;
});

addMethod(Entry, "value", 0, function () {
  return this.object.value;
});

addMethod(Entry, "==", 1, function (rawRhs) {
  var key, value;

  key = this.object.key;
  value = this.object.value;

  return defs.Entry.match(rawRhs).then(function (isEntry) {
    return isEntry.ifTrue_ifFalse([ rt.block(0, function () {
      return defs.Entry.cast(rawRhs).then(function (rhs) {
        return rhs.key().then(function (rhsKey) {
          return rt.apply(key, "==", [ [ rhsKey ] ]);
        }).then(function (bool) {
          return bool.andAlso(rt.block(0, function () {
            return rhs.value().then(function (rhsValue) {
              return rt.apply(value, "==", [ [ rhsValue ] ]);
            });
          }));
        });
      });
    }) ], [ rt.block(0, function () {
      return defs.bool(false);
    }) ]);
  });
});

addMethod(Entry, "asString", 0, function () {
  var key, value;

  key = this.object.key;
  value = this.object.value;

  return rt.apply(key, "asString").then(function (keyString) {
    return rt.apply(value, "asString").then(function (valueString) {
      return keyString["++"](defs.string(" => ")).then(function (cat) {
        return cat["++"](valueString);
      });
    });
  });
});

function internalEntry(entry) {
  if (entry instanceof Entry) {
    return Task.resolve(entry);
  }

  return entry.key().then(function (key) {
    return entry.value().then(function (value) {
      return new Entry(key, value);
    });
  });
}

function Dictionary(elements) {
  InternalArray.call(this, elements, "{", "}");
}

util.inherits(Dictionary, InternalArray);

addMethod(Dictionary, "keys", 0, function () {
  return Task.each(this.object.elements, function (entry) {
    return entry.key();
  }).then(function (keys) {
    return new Set(keys);
  });
});

addMethod(Dictionary, "values", 0, function () {
  return Task.each(this.object.elements, function (entry) {
    return entry.value();
  }).then(function (keys) {
    return new Set(keys);
  });
});

addMethod(Dictionary, "at() ifAbsent()", [ 1, 1 ],
  function (key, onAbsent) {
    var elements = this.object.elements;

    return rt.Action.assert(onAbsent).then(function () {
      return new Task(function (resolve, reject) {
        return Task.each(elements, function (entry) {
          return entry.key().then(function (rawKey) {
            return rt.Object.cast(rawKey);
          }).then(function (eKey) {
            return rt.apply(eKey, "==", [ key ]).then(function (bool) {
              return bool.ifTrue(rt.block(0, function () {
                return entry.value().then(function (value) {
                  resolve(value);
                  return Task.never();
                });
              }));
            });
          });
        }).then(function () {
          return onAbsent[0].apply();
        }).then(resolve, reject);
      });
    });
  });

addMethod(Dictionary, "at()", 1, function (key) {
  return this.at_ifAbsent([ key ], [ rt.block(0, function () {
    return defs.FailedSearch.raiseForObject(key);
  }) ]);
});

addMethod(Dictionary, "at() do()", [ 1, 1 ], function (key, proc) {
  var elements = this.object.elements;

  return defs.Procedure.assert(proc[0]).then(function () {
    return new Task(function (resolve, reject) {
      return Task.each(elements, function (entry) {
        return entry.key().then(function (eKey) {
          return rt.apply(eKey, "==", [ key ]).then(function (bool) {
            return bool.ifTrue(rt.block(0, function () {
              return entry.value().then(function (value) {
                return proc[0].apply(value);
              }).then(function () {
                resolve(rt.done);
                return Task.never();
              });
            }));
          });
        });
      }).then(function () {
        resolve(rt.done);
      }, reject);
    });
  });
});

addMethod(Dictionary, "containsKey()", 1, function (key) {
  var elements = this.object.elements;

  return new Task(function (resolve, reject) {
    return Task.each(elements, function (entry) {
      return entry.key().then(function (eKey) {
        return rt.apply(eKey, "==", [ [ key ] ]).then(function (bool) {
          return bool.ifTrue(rt.block(0, function () {
            resolve(bool);
            return Task.never();
          }));
        });
      });
    }).then(function () {
      resolve(defs.bool(false));
    }).then(null, reject);
  });
});

addMethod(Dictionary, "containsValue()", 1, function (value) {
  var elements = this.object.elements;

  return new Task(function (resolve, reject) {
    return Task.each(elements, function (entry) {
      return entry.value().then(function (eValue) {
        return rt.apply(eValue, "==", [ [ value ] ]).then(function (bool) {
          return bool.ifTrue(rt.block(0, function () {
            resolve(bool);
            return Task.never();
          }));
        });
      });
    }).then(function () {
      resolve(defs.bool(false));
    }).then(null, reject);
  });
});

addMethod(Dictionary, "++", 1, function (rhs) {
  var newElements, self;

  self = this;
  newElements = this.object.elements.concat();

  return defs.Do.assert(rhs).then(function () {
    return rhs["do"](rt.block(1, function (entry) {
      return entry.key().then(function (key) {
        return self.containsKey(key).then(function (bool) {
          return bool.ifFalse(rt.block(0, function () {
            return internalEntry(entry).then(function (intEntry) {
              newElements.push(intEntry);
              return rt.done;
            });
          }));
        });
      });
    }));
  }).then(function () {
    return defs.dictionary(newElements);
  });
});

addMethod(Dictionary, "internalPush()", 1, function (entry) {
  var elements = this.object.elements;

  return entry.key().then(function (key) {
    return new Task(function (resolve, reject) {
      return Task.each(elements, function (element, i) {
        return element.key().then(function (elKey) {
          return rt.apply(elKey, "==", [ [ key ] ]).then(function (bool) {
            return bool.ifTrue(rt.block(0, function () {
              return internalEntry(entry).then(function (intEntry) {
                elements.splice(i, 1, intEntry);
                resolve(rt.done);
                return Task.never();
              });
            }));
          });
        });
      }).then(function () {
        return internalEntry(entry).then(function (intEntry) {
          elements.push(intEntry);
          resolve(rt.done);
        });
      }).then(null, reject);
    });
  });
});

addMethod(Dictionary, "internalRemoveAt()", 2, function (key, rawAction) {
  var elements = this.object.elements;

  return defs.Action.cast(rawAction).then(function (action) {
    return new Task(function (resolve, reject) {
      return Task.each(elements, function (element, i) {
        return element.key().then(function (elKey) {
          return rt.apply(elKey, "==", [ [ key ] ]).then(function (bool) {
            return bool.ifTrue(rt.block(0, function () {
              resolve(elements.splice(i, 1)[0]);
              return Task.never();
            }));
          });
        });
      }).then(function () {
        return action.apply().then(resolve);
      }).then(null, reject);
    });
  });
});

function Trace(name, object, location) {
  var self = this;

  if (location === undefined) {
    location = object;
    object = null;
  }

  this.name = rt.method("name", 0, function () {
    return defs.string(name);
  });

  this.receiver = rt.method("receiver", 0, object === null ? function () {
    return defs.NoSuchValue
      .raiseForName_inObject([ defs.string("receiver") ], [ this ]);
  } : function () {
    return defs.string(object);
  });

  this.receiverOrIfAbsent = rt.method("receiverOrIfAbsent()", [ [ 1, 1 ] ],
    function (pAbsent) {
      var pattern = pAbsent[0];

      return defs.Action.cast(pAbsent[1]).then(function (absent) {
        if (object === null) {
          return absent.apply().then(function (result) {
            return pattern.assert(result).then(function () {
              return result;
            });
          });
        }

        return defs.string(object);
      });
    });

  function fromLocation(mname, type, prop) {
    self[mname] = rt.method(mname, 0,
      location === null || location[prop] === null ? function () {
        return defs.NoSuchValue
          .raiseForName_inObject([ defs.string(mname) ], [ self ]);
      } : function () {
        return defs[type](location[prop]);
      });

    self[mname + "OrIfAbsent"] = rt.method(mname + "OrIfAbsent", [ [ 1, 1 ] ],
      function (pAbsent) {
        var pattern = pAbsent[0];

        return defs.Action.cast(pAbsent[1]).then(function (absent) {
          if (location === null || location[prop] === null) {
            return absent.apply().then(function (result) {
              return pattern.assert(result).then(function () {
                return result;
              });
            });
          }

          return defs[type](location[prop]);
        });
      });
  }

  fromLocation("moduleName", "string", "module");
  fromLocation("lineNumber", "number", "line");
  fromLocation("columnNumber", "number", "column");

  this.asString = rt.method("asString", 0, function () {
    var trace = "at «" + name + "»";

    if (object !== null) {
      trace += " in «" + object + "»";
    }

    if (location !== null) {
      trace += " from ";

      if (location.module !== null) {
        trace += '"' + location.module + '" ';
      }

      trace += "(line " + location.line + ", column " + location.column + ")";
    }

    return defs.string(trace);
  });
}

util.inherits(Trace, GraceObject);

function Backtrace(traces) {
  List.call(this, traces);
}

util.inherits(Backtrace, List);

addMethod(Backtrace, "asString", 0, function () {
  var nl, once;

  nl = defs.string("\n");
  once = false;

  return this.fold_startingWith(rt.part(defs.String,
    rt.block(2, function (string, next) {
      return (once ? string["++"](nl) : Task.resolve(string))
        .then(function (preString) {
          once = true;
          return preString["++"](next);
        });
    })), [ defs.string("") ]);
});

function ExceptionPacket(exception, message) {
  if (message === undefined) {
    this.asString = rt.method("asString", 0, function () {
      return exception.name();
    });
  }

  message = message || defs.string("");

  this.exception = rt.method("exception", 0, function () {
    return exception;
  });

  this.message = rt.method("message", 0, function () {
    return message;
  });

  this.object = {
    "stackTrace": []
  };
}

util.inherits(ExceptionPacket, GraceObject);

function traceProperty(packet, name, type) {
  var i, l, location, trace;

  trace = packet.object.stackTrace;

  for (i = 0, l = trace.length; i < l; i += 1) {
    location = trace[i].location;

    if (location !== null && location[name] !== null) {
      return defs[type](location[name]);
    }
  }

  return defs.NoSuchValue
    .raiseForName_inObject([ defs.string(name) ], [ packet ]);
}

addMethod(ExceptionPacket, "moduleName", 0, function () {
  return traceProperty(this, "module", "string");
});

addMethod(ExceptionPacket, "lineNumber", 0, function () {
  return traceProperty(this, "line", "number");
});

addMethod(ExceptionPacket, "columnNumber", 0, function () {
  return traceProperty(this, "column", "number");
});

addMethod(ExceptionPacket, "backtrace", 0, function () {
  var backtrace, i, l, stack, trace;

  stack = this.object.stackTrace;
  backtrace = [];

  for (i = 0, l = stack.length; i < l; i += 1) {
    trace = stack[i];
    backtrace.push(new Trace(trace.name, trace.object, trace.location));
  }

  return new Backtrace(backtrace);
});

addMethod(ExceptionPacket, "raise", 0, function () {
  throw this;
});

addMethod(ExceptionPacket, "asString", 0, function () {
  var self = this;

  return self.exception().then(function (exception) {
    return exception.name().then(function (name) {
      return self.message().then(function (message) {
        return defs.string(": ")["++"](message).then(function (string) {
          return name["++"](string);
        });
      });
    });
  });
});

function Exception(name, Packet, parent) {
  this.object = {
    "name": name,
    "Packet": Packet
  };

  this.parent = rt.method("parent", 0, parent === undefined ? function () {
    return this;
  } : function () {
    return parent;
  });
}

util.inherits(Exception, AbstractPattern);

addMethod(Exception, "name", 0, function () {
  return this.object.name;
});

addMethod(Exception, "raise()", 1, function (message) {
  throw new this.object.Packet(this, message);
});

addMethod(Exception, "raiseDefault", 0, function () {
  throw new this.object.Packet(this);
});

addConstructor(Exception, "refine()", 1, function (inherit, name) {
  var Packet, self;

  self = this;
  Packet = this.object.Packet;

  function ChildPacket(exception, message) {
    Packet.call(this, exception, message);
  }

  util.inherits(ChildPacket, Packet);

  function ChildException() {
    Exception.call(this, name, ChildPacket, self);
  }

  ChildException.prototype = this;

  if (inherit !== null) {
    util.extendAll(inherit, ChildException.prototype);
    ChildException.call(inherit);
  }

  return Task.resolve(new ChildException());
});

addConstructor(Exception, "refine() defaultMessage()", [ 1, 1 ],
  function (inherit, name, defMessage) {
    var Packet, self;

    self = this;
    Packet = this.object.Packet;

    name = name[0];
    defMessage = defMessage[0];

    function ChildPacket(exception, message) {
      Packet.call(this, exception, message || defMessage);
    }

    util.inherits(ChildPacket, Packet);

    function ChildException() {
      Exception.call(this, name, ChildPacket, self);
    }

    ChildException.prototype = this;

    if (inherit !== null) {
      util.extendAll(inherit, ChildException.prototype);
      ChildException.call(inherit);
    }

    return Task.resolve(new ChildException());
  });

addMethod(Exception, "match()", 1, function (value) {
  return Task.resolve(defs.match(value instanceof this.object.Packet,
    value, this));
});

addMethod(Exception, "asString", 0, function () {
  return this.name();
});

exports.Object = GraceObject;
exports.Block = Block;
exports.AbstractBoolean = AbstractBoolean;
exports.True = True;
exports.False = False;
exports.Comparison = Comparison;
exports.String = GraceString;
exports.Number = GraceNumber;
exports.AbstractPattern = AbstractPattern;
exports.Singleton = Singleton;
exports.Part = Part;
exports.Signature = Signature;
exports.Type = Type;
exports.TypeProxy = TypeProxy;
exports.NamedPattern = NamedPattern;
exports.Success = Success;
exports.Failure = Failure;
exports.List = List;
exports.ListPattern = ListPattern;
exports.Set = Set;
exports.Entry = Entry;
exports.Dictionary = Dictionary;
exports.Exception = Exception;
exports.ExceptionPacket = ExceptionPacket;

},{"../runtime":10,"../task":19,"../util":21,"./definitions":11}],17:[function(require,module,exports){
// Publicity annotation definitions.

"use strict";

var defs, rt, util;

rt = require("../runtime");
defs = require("./definitions");
util = require("../util");

function setName(name, object) {
  name = defs.string(name);
  object.asString = rt.method("asString", 0, function () {
    return name;
  });

  return object;
}

function addMethod(object, name, func, params) {
  object[util.uglify(name)] = rt.method(name, params || 1, func);
  return object;
}

function newAnnotation(name, func) {
  var annotation = defs.object();

  setName(name, annotation);

  addMethod(annotation, "annotateMethod()", func);
  addMethod(annotation, "annotateDef()", func);
  addMethod(annotation, "annotateClass()", func);
  addMethod(annotation, "annotateType()", func);

  addMethod(annotation, "annotateVar()", function (reader, writer) {
    func(reader);
    return func(writer);
  }, 2);

  return annotation;
}

function makePublic(method) {
  delete method.isConfidential;
  return rt.done;
}

exports["public"] = newAnnotation("public", makePublic);

exports.confidential = newAnnotation("confidential", function (method) {
  method.isConfidential = true;
  return rt.done;
});

exports.readable = setName("readable",
  addMethod(defs.object(), "annotateVar()", makePublic, 2));

exports.writable = setName("writable",
  addMethod(defs.object(), "annotateVar()", function (reader, writer) {
    return makePublic(writer);
  }, 2));

},{"../runtime":10,"../util":21,"./definitions":11}],18:[function(require,module,exports){
// Built-in type definitions.

"use strict";

var Bool, Collection, Do, Foreign, List, Node, Ordered, Pattern,
    ast, defs, rt, type, util, visitor;

ast = require("../ast");
visitor = require("../ast/visitor");
rt = require("../runtime");
util = require("../util");

defs = require("./definitions");
type = require("./definitions").type;

exports.Object = type("Object", [ ]);

exports.None = defs.pattern("None", defs.failure);

exports.Unknown = defs.pattern("Unknown", function (object) {
  return defs.success(object);
});

Foreign = defs.pattern("Foreign", function (object) {
  return defs.match(!defs.isGraceObject(object), object, Foreign);
});

exports.Foreign = Foreign;

exports.Done = defs.singleton("Done", defs.done);

Ordered = type("Ordered",
    [ defs.signature("compareTo", [ "value" ]),
      defs.signature("<", [ "than" ]),
      defs.signature("<=", [ "than" ]),
      defs.signature(">", [ "than" ]),
      defs.signature(">=", [ "than" ])
    ]);

exports.Ordered = Ordered;

Pattern = type("Pattern",
    [ defs.signature("match", [ "value" ]),
      defs.signature("assert", [ "value" ]),
      defs.signature("&", [ "and" ]),
      defs.signature("|", [ "or" ])
    ]);

exports.Pattern = Pattern;

exports.Action = type("Action", 1, [ defs.signature("apply") ]);

exports.Function =
  type("Function", 2, Pattern, [ defs.signature("apply", [ "value" ]) ]);

exports.Procedure =
  type("Procedure", 1, [ defs.signature("apply", [ "value" ]) ]);

(function () {
  var i, j, params;

  for (i = 2; i < 10; i += 1) {
    params = [ ];

    for (j = 1; j < i + 1; j += 1) {
      params.push("value" + j);
    }

    exports["Function" + i] =
      type("Function" + i, i + 1, [ defs.signature("apply", params) ]);

    exports["Procedure" + i] =
      type("Procedure" + i, i, [ defs.signature("apply", params) ]);
  }
}());

exports.Comparison = type("Comparison", Pattern,
    [ defs.signature("ifLessThan", [ "onLessThan" ]),
      defs.signature("ifEqualTo", [ "onEqualTo" ]),
      defs.signature("ifGreaterThan", [ "onGreaterThan" ]),
      defs.signature([ defs.sigPart("ifLessThan", [ "onLessThan" ]),
        defs.sigPart("ifEqualTo", [ "onEqualTo" ]) ]),
      defs.signature([ defs.sigPart("ifLessThan", [ "onLessThan" ]),
        defs.sigPart("ifGreaterThan", [ "onGreaterThan" ]) ]),
      defs.signature([ defs.sigPart("ifEqualTo", [ "onEqualTo" ]),
        defs.sigPart("ifGreaterThan", [ "onGreaterThan" ]) ]),
      defs.signature([ defs.sigPart("ifLessThan", [ "onLessThan" ]),
        defs.sigPart("ifEqualTo", [ "onEqualTo" ]),
        defs.sigPart("ifGreaterThan", [ "onGreaterThan" ]) ])
    ]);

Bool = type("Boolean",
    [ defs.signature([ defs.sigPart("ifTrue", [ "T" ], [ "then" ]),
        defs.sigPart("ifFalse", [ "E" ], [ "else" ]) ]),
      defs.signature("ifTrue", [ "then" ]),
      defs.signature("ifFalse", [ "else" ]),
      defs.signature([ defs.sigPart("andAlso", [ "then" ]),
        defs.sigPart("orElse", [ "else" ]) ]),
      defs.signature([ defs.sigPart("andAlso", [ "then" ]) ]),
      defs.signature([ defs.sigPart("orElse", [ "else" ]) ]),
      defs.signature("&&", [ "and" ]),
      defs.signature("||", [ "or" ]),
      defs.signature("prefix!")
    ]);

exports.Boolean = Bool;

exports.Match =
  type("Match", Bool, [ defs.signature("value"), defs.signature("pattern") ]);

exports.Number = type("Number", [ Ordered, Pattern ],
    [ defs.signature("prefix-"),
      defs.signature("+", [ "addene" ]),
      defs.signature("-", [ "subtrahend" ]),
      defs.signature("*", [ "multiplier" ]),
      defs.signature("/", [ "divisor" ]),
      defs.signature("%", [ "divisor" ]),
      defs.signature("^", [ "exponent" ]),
      defs.signature("absolute"),
      defs.signature("round"),
      defs.signature("floor"),
      defs.signature("ceiling"),
      defs.signature("log"),
      defs.signature("exponent"),
      defs.signature("sin"),
      defs.signature("cos"),
      defs.signature("tan"),
      defs.signature("asin"),
      defs.signature("acos"),
      defs.signature("atan"),
      defs.signature("square"),
      defs.signature("cube"),
      defs.signature("squareRoot"),
      defs.signature("asPrimitiveNumber")
    ]);

Do = type("Do", 1, [ defs.signature("do", [ "function" ]) ]);

exports.Do = Do;

Collection = type("Collection", 1, Do,
    [ defs.signature("size"),
      defs.signature([ defs.sigPart("fold", [ "T" ], [ "f" ]),
        defs.sigPart("startingWith", [ "a" ]) ])
    ]);

exports.Collection = Collection;

List = type("List", 1, Collection, [
  defs.signature("at", [ "index" ]),
  defs.signature("++", [ "list" ]),
  defs.signature("contains", [ "element" ]),
  defs.signature("asImmutable")
]);

exports.List = List;

exports.Entry = type("Entry", 2,
    [ defs.signature("key"),
      defs.signature("value")
    ]);

exports.String =
  type("String", [ Ordered, Pattern, List ],
      [ defs.signature([ defs.sigPart("substringFrom", [ "from" ]),
          defs.sigPart("to", [ "to" ]) ]),
        defs.signature([ defs.sigPart("substringFrom", [ "from" ]),
          defs.sigPart("size", [ "size" ]) ]),
        defs.signature("substringFrom", [ "from" ]),
        defs.signature("substringTo", [ "to" ]),
        defs.signature([ defs.sigPart("replace", [ "substring" ]),
          defs.sigPart("with", [ "inserting" ]) ]),
        defs.signature("startsWith", [ "prefix" ]),
        defs.signature("endsWith", [ "suffix" ]),
        defs.signature("indexOf", [ "needle" ]),
        defs.signature([ defs.sigPart("indexOf", [ "needle" ]),
          defs.sigPart("startingAt", [ "from" ]) ]),
        defs.signature([ defs.sigPart("indexOf", [ "needle" ]),
          defs.sigPart("ifAbsent", [ "action" ]) ]),
        defs.signature([ defs.sigPart("indexOf", [ "needle" ]),
          defs.sigPart("startingAt", [ "from" ]),
          defs.sigPart("ifAbsent", [ "action" ]) ]),
        defs.signature("lastIndexOf", [ "needle" ]),
        defs.signature([ defs.sigPart("lastIndexOf", [ "needle" ]),
          defs.sigPart("startingAt", [ "from" ]) ]),
        defs.signature([ defs.sigPart("lastIndexOf", [ "needle" ]),
          defs.sigPart("ifAbsent", [ "action" ]) ]),
        defs.signature([ defs.sigPart("lastIndexOf", [ "needle" ]),
          defs.sigPart("startingAt", [ "from" ]),
          defs.sigPart("ifAbsent", [ "action" ]) ]),
        defs.signature("asPrimitiveString")
      ]);

exports.ObjectAnnotator =
  type("ObjectAnnotator", [ defs.signature("annotateObject", [ "obj" ]) ]);

exports.MethodAnnotator =
  type("MethodAnnotator", [ defs.signature("annotateMethod", [ "meth" ]) ]);

exports.DefAnnotator =
  type("DefAnnotator", [ defs.signature("annotateDef", [ "definition" ]) ]);

exports.VarAnnotator = type("VarAnnotator",
  [ defs.signature("annotateVar", [ "reader", "writer" ]) ]);

exports.ClassAnnotator =
  type("ClassAnnotator", [ defs.signature("annotateClass", [ "cls" ]) ]);

exports.TypeAnnotator =
  type("TypeAnnotator", [ defs.signature("annotateType", [ "typ" ]) ]);

Node = defs.pattern("Node", function (value) {
  return defs.match(value instanceof ast.Node, value, this);
});

util.forProperties(ast, function (name, Ctor) {
  var pattern = defs.pattern(name, function (value) {
    return defs.match(value instanceof Ctor, value, this);
  });

  Node[name] = rt.method(name, 0, function () {
    return pattern;
  });
});

Node.visitor = rt.method("visitor", 0, function () {
  return visitor;
});

exports.Node = Node;

},{"../ast":1,"../ast/visitor":2,"../runtime":10,"../util":21,"./definitions":11}],19:[function(require,module,exports){
// A Promise-like implementation of asynchronous tasks. Tasks are compatible
// with Promise's 'thenable' definition, but are not compliant with the Promises
// specification.

"use strict";

var asap, timer, util;

require("setimmediate");

asap = require("asap");

util = require("./util");

timer = Date.now();

function DeferralError(message) {
  var error;

  if (message !== undefined) {
    this.message = message;
  }

  error = new TypeError(this.message);
  error.name = this.name;
  this.stack = error.stack;
}

util.inherits(DeferralError, TypeError);

DeferralError.prototype.name = "DeferralError";

DeferralError.prototype.message = "A purely asynchronous task cannot be forced";

function InterruptError(message) {
  var error;

  if (message !== undefined) {
    this.message = message;
  }

  error = new Error(this.message);
  error.name = this.name;
  this.stack = error.stack;
}

util.inherits(InterruptError, Error);

InterruptError.prototype.name = "InterruptError";

InterruptError.prototype.message = "A task was stopped before it completed";

// Pump the task dependency queue and remove both queues when done.
function pump(task, list, arg) {
  task.isPending = false;

  while (list.length > 0) {
    list.shift()(arg);
  }

  delete task.onFulfilled;
  delete task.onRejected;
}

// Handle passing the outcome of a task to the next.
function completion(task, fresh, next, passthrough, resolve, reject) {
  return function (result) {
    // Regardless of whether or not the fresh task still depended on the outcome
    // of the previous task, it can't be waiting on it any longer (because it's
    // finished). This property may be reinstated by the call to 'next' below,
    // as the fresh task can now depend on the result of one of the functions
    // passed to 'next' (or 'now').
    delete fresh.waitingOn;

    // Due to the presence of 'stop', the fresh task may have already completed
    // before the task it depended on did. In this case, don't perform the next
    // action.
    if (fresh.isPending) {
      if (typeof next === "function") {
        try {
          result = next.call(task.context, result);
        } catch (error) {
          reject(error);
          return;
        }

        resolve(result);
      } else {
        passthrough(result);
      }
    }
  };
}

// new Task(context : Object = null, func : (Object -> (), Error -> ()) -> ())
//   Build a new task, running the given function with a resolve and reject
//   callback, optionally in the given context.
function Task(context, func) {
  var self = this;

  if (arguments.length < 2) {
    func = context;
    context = null;
  }

  this.isPending = true;
  this.context = context;

  this.onFulfilled = [];
  this.onRejected = [];

  func.call(context, function (value) {
    if (self.isPending) {
      self.value = value;
      pump(self, self.onFulfilled, value);
    }
  }, function (reason) {
    if (self.isPending) {
      self.reason = reason;
      pump(self, self.onRejected, reason);
    }
  }, this);
}

function then(task, run) {
  return new Task(task.context, function (resolve, reject, fresh) {
    // A task can be waiting on one of two tasks: either it is waiting for a
    // value to be produced by the original task the 'then' method was called
    // on, or it is waiting for the task created by the function passed to
    // 'then'. In this case, it is waiting for the former. Note that the
    // original task may have already completed, in which case it will switch to
    // waiting on the latter.
    fresh.waitingOn = task;

    run.call(task, function (value, force) {
      if (value === fresh) {
        throw new TypeError("A task must not resolve to itself");
      }

      if (value instanceof Task) {
        if (value.isPending) {
          // The original task is done, and the function that ran as a result
          // has produced a new task, meaning the fresh task now depends on that
          // instead. Note that we cannot get here if the fresh task is stopped
          // before the original task completes.
          fresh.waitingOn = value;
          value[force ? "now" : "then"](resolve).then(null, reject);
        } else if (util.owns(value, "value")) {
          resolve(value.value);
        } else {
          reject(value.reason);
        }
      } else {
        resolve(value);
      }
    }, reject, fresh);
  });
}

Task.prototype.then = function (onFulfilled, onRejected) {
  return then(this, function (res, reject, fresh) {
    var deferred, self;

    self = this;

    deferred = util.once(function (force) {
      delete fresh.deferred;

      function resolve(value) {
        res(value, force);
      }

      function fulfiller() {
        return completion(self, fresh, onFulfilled, resolve, resolve, reject);
      }

      function rejecter() {
        return completion(self, fresh, onRejected, reject, resolve, reject);
      }

      if (force && util.owns(self, "deferred")) {
        self.deferred(force);
      }

      if (self.isPending) {
        self.onFulfilled.push(fulfiller());
        self.onRejected.push(rejecter());
      } else if (util.owns(self, "value")) {
        fulfiller()(self.value);
      } else {
        rejecter()(self.reason);
      }
    });

    fresh.deferred = deferred;

    if (Date.now() - timer > 10) {
      setImmediate(function () {
        timer = Date.now();
        deferred();
      });
    } else {
      asap(deferred);
    }
  });
};

// Execute the callbacks immediately if this task is complete. If this task is
// still pending, attempt to force the task to finish. If the task cannot be
// forced, then the resulting task is rejected with a DeferralError.
Task.prototype.now = function (onFulfilled, onRejected) {
  if (util.owns(this, "deferred")) {
    this.deferred(true);
  }

  if (this.isPending) {
    return Task.reject(new DeferralError());
  }

  return then(this, function (res, reject, fresh) {
    function resolve(value) {
      res(value, true);
    }

    if (util.owns(this, "value")) {
      completion(this,
        fresh, onFulfilled, resolve, resolve, reject)(this.value);
    } else {
      completion(this, fresh, onRejected, reject, resolve, reject)(this.reason);
    }
  });
};

Task.prototype.callback = function (callback) {
  return this.then(callback && function (value) {
    callback.call(this, null, value);
  }, callback);
};

Task.prototype.bind = function (context) {
  var task = this.then(util.id);
  task.context = context;
  return task;
};

// Halt the execution of this task and tasks it depends on. If the task has not
// already completed, called this method causes this task and its dependencies
// to be rejected with an InterruptError. This method does not guarantee an
// immediate stop, as tasks may yield outside of the internal task machinery,
// and their resumption may have side-effects before completing their
// surrounding task.
//
// Note that tasks that have been spawned by the task dependency chain that are
// not included in the dependency chain (ie concurrent executions) will not be
// stopped by this method. They must be managed separately.
Task.prototype.stop = function () {
  var dependency;

  if (!this.isPending) {
    // If the task is already completed, stopping has no effect.
    return;
  }

  // It's possible to be waiting on a task that isn't pending, when this task
  // is being synchronously stopped after the task it depends on has completed,
  // but before the asynchronous chaining can occur. If this is the case, we'll
  // pump now, setting this task to a completed state, and when the asynchronous
  // completion runs in the future the waitingOn dependency will be deleted but
  // no other action will be taken.
  if (this.waitingOn !== undefined && this.waitingOn.isPending) {
    // The rejection of this task will occur once the dependency chain is also
    // rejected.
    dependency = this.waitingOn;
    asap(function () {
      dependency.stop();
    });
  } else {
    this.reason = new InterruptError();
    pump(this, this.onRejected, this.reason);
  }
};

// A utility method to produce a function that will stop this task when called.
Task.prototype.stopify = function () {
  var self = this;

  return function () {
    return self.stop();
  };
};

Task.resolve = function (context, value) {
  if (arguments.length < 2) {
    value = context;
    context = null;
  }

  if (value instanceof Task) {
    return value;
  }

  return new Task(context, function (resolve) {
    resolve(value);
  });
};

Task.reject = function (context, reason) {
  if (arguments.length < 2) {
    reason = context;
    context = null;
  }

  return new Task(context, function (resolve, reject) {
    reject(reason);
  });
};

Task.never = function (context) {
  if (arguments.length < 1) {
    context = null;
  }

  return new Task(context, function () {
    return;
  });
};

// each(context : Object = null,
//     lists+ : [T], action : T+ -> Task<U>) -> Task<[U]>
//   Run an asynchronous action over lists of arguments in order, chaining each
//   non-undefined result of the action into a list. Multiple lists must have
//   matching lengths. The context must not be an array, otherwise it must be
//   bound manually.
Task.each = function (context, first) {
  var action, i, j, l, length, part, parts, results;

  function run(k, task) {
    if (k === length) {
      return task.then(function () {
        return results;
      });
    }

    return run(k + 1, task.then(function () {
      return action.apply(this, parts[k]);
    }).then(function (value) {
      if (value !== undefined) {
        results.push(value);
      }
    }));
  }

  if (util.isArray(context) ||
      typeof context === "number" || typeof context === "string") {
    first = context;
    context = null;
  } else {
    Array.prototype.shift.call(arguments);
  }

  results = [];
  parts = [];
  l = arguments.length - 1;
  action = arguments[l];

  if (typeof first === "number") {
    length = first;

    for (i = 0; i < length; i += 1) {
      parts.push([ i ]);
    }
  } else {
    length = first.length;

    for (i = 0; i < l; i += 1) {
      if (arguments[i].length !== length) {
        throw new TypeError("Mismatched list lengths");
      }
    }

    for (i = 0; i < length; i += 1) {
      part = [];

      for (j = 0; j < l; j += 1) {
        part.push(arguments[j][i]);
      }

      part.push(i);
      parts.push(part);
    }
  }

  // This is here to allow the list length check above to occur first.
  if (length === 0) {
    return Task.resolve(context, []);
  }

  return run(0, Task.resolve(context, null));
};

// Translate a function that may return a task into a function that takes a
// callback. If the function throws, the error is bundled into the callback.
// The resulting function returns another function which will call 'stop' on the
// underlying task.
Task.callbackify = function (func) {
  return function () {
    var args, callback, task;

    args = util.slice(arguments);
    callback = args.pop();

    try {
      task = func.apply(this, args);
    } catch (reason) {
      callback(reason);

      return function () {
        return false;
      };
    }

    return Task.resolve(task).callback(callback).stopify();
  };
};

// Translate a function that takes a callback into a function that returns a
// Task. If the function throws, the task automatically rejects.
Task.taskify = function (context, func) {
  if (arguments.length < 2) {
    func = context;
    context = null;
  }

  return function () {
    var args, self;

    self = this;
    args = util.slice(arguments);

    return new Task(context, function (resolve, reject) {
      args.push(function (reason, value) {
        if (reason !== null) {
          reject(reason);
        } else {
          resolve(value);
        }
      });

      try {
        func.apply(self, args);
      } catch (reason) {
        reject(reason);
      }
    });
  };
};

// An abstract constructor that includes helpers for maintaining the state of
// the 'this' context while performing task operations.
function Async() {
  return this;
}

// Resolve to a task with this object as the context.
Async.prototype.resolve = function (value) {
  return Task.resolve(this, value);
};

Async.prototype.reject = function (reason) {
  return Task.reject(this, reason);
};

Async.prototype.task = function (action) {
  return Task.resolve(this, null).then(function () {
    return action.call(this);
  });
};

Async.prototype.each = function () {
  return Task.each.apply(Task, [ this ].concat(util.slice(arguments)));
};

Task.DeferralError = DeferralError;
Task.InterruptError = InterruptError;
Task.Async = Async;

module.exports = Task;

},{"./util":21,"asap":22,"setimmediate":24}],20:[function(require,module,exports){
"use strict";
exports.isControl = function (c) {
  return /[\0-\x1F\x7F-\x9F\xAD\u0378\u0379\u0380-\u0383\u038B\u038D\u03A2\u0530\u0557\u0558\u0560\u0588\u058B\u058C\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u0605\u061C\u061D\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08B3-\u08E3\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0BFF\u0C04\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5A-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C80\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D00\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D4F-\u0D56\u0D58-\u0D5F\u0D64\u0D65\u0D76-\u0D78\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F5-\u13FF\u169D-\u169F\u16F9-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180E\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE\u1AAF\u1ABF-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C80-\u1CBF\u1CC8-\u1CCF\u1CF7\u1CFA-\u1CFF\u1DF6-\u1DFB\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20BE-\u20CF\u20F1-\u20FF\u218A-\u218F\u23FB-\u23FF\u2427-\u243F\u244B-\u245F\u2B74\u2B75\u2B96\u2B97\u2BBA-\u2BBC\u2BC9\u2BD2-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E43-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FCD-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA69E\uA6F8-\uA6FF\uA78F\uA7AE\uA7AF\uA7B2-\uA7F6\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C5-\uA8CD\uA8DA-\uA8DF\uA8FC-\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB60-\uAB63\uAB66-\uABBF\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uDC00-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE2E\uFE2F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDCFF\uDD03-\uDD06\uDD34-\uDD36\uDD8D-\uDD8F\uDD9C-\uDD9F\uDDA1-\uDDCF\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEFC-\uDEFF\uDF24-\uDF2F\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDFC4-\uDFC7\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCFF\uDD28-\uDD2F\uDD64-\uDD6E\uDD70-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56\uDC9F-\uDCA6\uDCB0-\uDCFF\uDD1C-\uDD1E\uDD3A-\uDD3E\uDD40-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE34-\uDE37\uDE3B-\uDE3E\uDE48-\uDE4F\uDE59-\uDE5F\uDEA0-\uDEBF\uDEE7-\uDEEA\uDEF7-\uDEFF\uDF36-\uDF38\uDF56\uDF57\uDF73-\uDF77\uDF92-\uDF98\uDF9D-\uDFA8\uDFB0-\uDFFF]|\uD803[\uDC49-\uDE5F\uDE7F-\uDFFF]|\uD804[\uDC4E-\uDC51\uDC70-\uDC7E\uDCBD\uDCC2-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD44-\uDD4F\uDD77-\uDD7F\uDDC9-\uDDCC\uDDCE\uDDCF\uDDDB-\uDDE0\uDDF5-\uDDFF\uDE12\uDE3E-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDF00\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF3B\uDF45\uDF46\uDF49\uDF4A\uDF4E-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC00-\uDC7F\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDCA-\uDDFF\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB8-\uDEBF\uDECA-\uDFFF]|\uD806[\uDC00-\uDC9F\uDCF3-\uDCFE\uDD00-\uDEBF\uDEF9-\uDFFF]|[\uD807\uD80A\uD80B\uD80E-\uD819\uD81C-\uD82B\uD82D\uD82E\uD830-\uD833\uD836-\uD839\uD83F\uD86F-\uD87D\uD87F-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD808[\uDF99-\uDFFF]|\uD809[\uDC6F\uDC75-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDE6D\uDE70-\uDECF\uDEEE\uDEEF\uDEF6-\uDEFF\uDF46-\uDF4F\uDF5A\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDEFF\uDF45-\uDF4F\uDF7F-\uDF8E\uDFA0-\uDFFF]|\uD82C[\uDC02-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A\uDC9B\uDCA0-\uDFFF]|\uD834[\uDCF6-\uDCFF\uDD27\uDD28\uDD73-\uDD7A\uDDDE-\uDDFF\uDE46-\uDEFF\uDF57-\uDF5F\uDF72-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]|\uD83A[\uDCC5\uDCC6\uDCD7-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDEEF\uDEF2-\uDFFF]|\uD83C[\uDC2C-\uDC2F\uDC94-\uDC9F\uDCAF\uDCB0\uDCC0\uDCD0\uDCF6-\uDCFF\uDD0D-\uDD0F\uDD2F\uDD6C-\uDD6F\uDD9B-\uDDE5\uDE03-\uDE0F\uDE3B-\uDE3F\uDE49-\uDE4F\uDE52-\uDEFF\uDF2D-\uDF2F\uDF7E\uDF7F\uDFCF-\uDFD3\uDFF8-\uDFFF]|\uD83D[\uDCFF\uDD4B-\uDD4F\uDD7A\uDDA4\uDE43\uDE44\uDED0-\uDEDF\uDEED-\uDEEF\uDEF4-\uDEFF\uDF74-\uDF7F\uDFD5-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE-\uDFFF]|\uD869[\uDED7-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]|[\uD800-\uDBFF]/.test(c);
};
exports.isLetter = function (c) {
  return /[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDE00-\uDE11\uDE13-\uDE2B\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDE00-\uDE2F\uDE44\uDE80-\uDEAA]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF98]|[\uD80C\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]/.test(c);
};
exports.isNumber = function (c) {
  return /[0-9\xB2\xB3\xB9\xBC-\xBE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]|\uD800[\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDEE1-\uDEFB\uDF20-\uDF23\uDF41\uDF4A\uDFD1-\uDFD5]|\uD801[\uDCA0-\uDCA9]|\uD802[\uDC58-\uDC5F\uDC79-\uDC7F\uDCA7-\uDCAF\uDD16-\uDD1B\uDE40-\uDE47\uDE7D\uDE7E\uDE9D-\uDE9F\uDEEB-\uDEEF\uDF58-\uDF5F\uDF78-\uDF7F\uDFA9-\uDFAF]|\uD803[\uDE60-\uDE7E]|\uD804[\uDC52-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDDE1-\uDDF4\uDEF0-\uDEF9]|\uD805[\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9]|\uD806[\uDCE0-\uDCF2]|\uD809[\uDC00-\uDC6E]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59\uDF5B-\uDF61]|\uD834[\uDF60-\uDF71]|\uD835[\uDFCE-\uDFFF]|\uD83A[\uDCC7-\uDCCF]|\uD83C[\uDD00-\uDD0C]/.test(c);
};
exports.isPunctuation = function (c) {
  return /[!-#%-\*,-/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDE38-\uDE3D]|\uD805[\uDCC6\uDDC1-\uDDC9\uDE41-\uDE43]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F/.test(c);
};
exports.isSeparator = function (c) {
  return /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/.test(c);
};
exports.isSymbol = function (c) {
  return /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20BD\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u2190-\u2307\u230C-\u2328\u232B-\u23FA\u2400-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B98-\u2BB9\u2BBD-\u2BC8\u2BCA-\u2BD1\u2CE5-\u2CEA\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u32FE\u3300-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uFB29\uFBB2-\uFBC1\uFDFC\uFDFD\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C\uDD90-\uDD9B\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDDD\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD83B[\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD10-\uDD2E\uDD30-\uDD6B\uDD70-\uDD9A\uDDE6-\uDE02\uDE10-\uDE3A\uDE40-\uDE48\uDE50\uDE51\uDF00-\uDF2C\uDF30-\uDF7D\uDF80-\uDFCE\uDFD4-\uDFF7]|\uD83D[\uDC00-\uDCFE\uDD00-\uDD4A\uDD50-\uDD79\uDD7B-\uDDA3\uDDA5-\uDE42\uDE45-\uDECF\uDEE0-\uDEEC\uDEF0-\uDEF3\uDF00-\uDF73\uDF80-\uDFD4]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD]/.test(c);
};

},{}],21:[function(require,module,exports){
// Common utility definitions.

"use strict";

var hasOwnProp, proto, slice, unicode;

unicode = require("./unicode");

proto = Object.prototype;

// Simple identity function.
exports.id = function (x) {
  return x;
};

slice = Array.prototype.slice;

// Standard not-quite-array slicer.
exports.slice = function (list, from, to) {
  return slice.call(list, from, to);
};

exports.contains = function (list, value) {
  var i, l;

  for (i = 0, l = list.length; i < l; i += 1) {
    if (list[i] === value) {
      return true;
    }
  }

  return false;
};

// Strip the parentheses from Grace method names.
exports.uglify = function (name) {
  return name.replace(/\(\)/g, "").replace(/ :=/, ":=").replace(/ /g, "_");
};

hasOwnProp = proto.hasOwnProperty;

// Ensures the correct hasOwnProperty is used.
function owns(object, name) {
  return hasOwnProp.call(object, name);
}

exports.owns = owns;

// Run a function for every iterable property directly in an object.
function forProperties(from, func) {
  var key;

  for (key in from) {
    if (owns(from, key)) {
      func(key, from[key]);
    }
  }
}

exports.forProperties = forProperties;

// Simple object key copier.
function extend(into, from) {
  var key;

  for (key in from) {
    if (owns(from, key) && !owns(into, key)) {
      into[key] = from[key];
    }
  }
}

exports.extend = extend;

exports.extendAll = function (into, from) {
  var key;

  for (key in from) {
    if (!owns(into, key)) {
      into[key] = from[key];
    }
  }
};

exports.map = function (list, func) {
  var i, l, newList;

  newList = [];

  for (i = 0, l = list.length; i < l; i += 1) {
    newList.push(func(list[i]));
  }

  return newList;
};

function pad(str) {
  while (str.length < 4) {
    str = "0" + str;
  }

  return str;
}

// Escape quotes, backslashes, and control characters in a string, making it
// safe to render inside quotes.
exports.escape = function (str) {
  var c, i, l, string;

  string = "";
  for (i = 0, l = str.length; i < l; i += 1) {
    c = str[i];

    if (unicode.isControl(c)) {
      string += "\\" + (c === "\b" ? "b" : c === "\n" ? "n" : c === "\r" ? "r" :
          c === "\t" ? "t" : c === "\f" ? "f" : c === "\v" ? "v" :
              c === "\u0000" ? "0" : "u" + pad(c.charCodeAt(0).toString(16)));
    } else if (c === '"') {
      string += '\\"';
    } else if (c === "\\") {
      string += "\\\\";
    } else {
      string += c;
    }
  }

  return string;
};

exports.newApply = function (Constructor, args) {
  function Temp() {
    Constructor.apply(this, args);
  }

  Temp.prototype = Constructor.prototype;

  return new Temp();
};

// Test if a value is an array.
exports.isArray = Array.isArray || function (value) {
  return proto.toString.call(value) === "[object Array]";
};

// Replicate a value in a list the given number of times.
exports.replicate = function (count, value) {
  var i, list;

  list = [];

  for (i = 0; i < count; i += 1) {
    list.push(value);
  }

  return list;
};

// Repeat the contents of a list the given number of times.
exports.repeat = function (count, elements) {
  var i, list;

  list = [];

  for (i = 0; i < count; i += 1) {
    list = list.concat(elements);
  }

  return list;
};

// A memoising function that also bans any recursion.
exports.once = function (func) {
  var hasFailed, hasFinished, isRunning, result;

  isRunning = false;
  hasFailed = false;
  hasFinished = false;

  return function () {
    if (hasFailed) {
      throw result;
    }

    if (hasFinished) {
      return result;
    }

    if (isRunning) {
      throw new Error("Memoised function called itself");
    }

    isRunning = true;

    try {
      result = func.apply(this, arguments);
    } catch (error) {
      hasFailed = true;
      result = error;
      throw error;
    } finally {
      isRunning = false;
    }

    hasFinished = true;
    return result;
  };
};

function makeCloneable(value) {
  var l, properties;

  properties = slice.call(arguments, 1);
  l = properties.length;

  function Clone() {
    makeCloneable.apply(null, [ this ].concat(properties));
  }

  Clone.prototype = value;

  value.clone = function () {
    var clone, i, property;

    clone = new Clone();

    for (i = 0; i < l; i += 1) {
      property = properties[i];
      clone[property] = this[property];
    }

    return clone;
  };
}

exports.makeCloneable = makeCloneable;

// Include the system utilities too.
extend(exports, require("util"));

},{"./unicode":20,"util":29}],22:[function(require,module,exports){
"use strict";

// rawAsap provides everything we need except exception management.
var rawAsap = require("./raw");
// RawTasks are recycled to reduce GC churn.
var freeTasks = [];
// We queue errors to ensure they are thrown in right order (FIFO).
// Array-as-queue is good enough here, since we are just dealing with exceptions.
var pendingErrors = [];
var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

function throwFirstError() {
    if (pendingErrors.length) {
        throw pendingErrors.shift();
    }
}

/**
 * Calls a task as soon as possible after returning, in its own event, with priority
 * over other events like animation, reflow, and repaint. An error thrown from an
 * event will not interrupt, nor even substantially slow down the processing of
 * other events, but will be rather postponed to a lower priority event.
 * @param {{call}} task A callable object, typically a function that takes no
 * arguments.
 */
module.exports = asap;
function asap(task) {
    var rawTask;
    if (freeTasks.length) {
        rawTask = freeTasks.pop();
    } else {
        rawTask = new RawTask();
    }
    rawTask.task = task;
    rawAsap(rawTask);
}

// We wrap tasks with recyclable task objects.  A task object implements
// `call`, just like a function.
function RawTask() {
    this.task = null;
}

// The sole purpose of wrapping the task is to catch the exception and recycle
// the task object after its single use.
RawTask.prototype.call = function () {
    try {
        this.task.call();
    } catch (error) {
        if (asap.onerror) {
            // This hook exists purely for testing purposes.
            // Its name will be periodically randomized to break any code that
            // depends on its existence.
            asap.onerror(error);
        } else {
            // In a web browser, exceptions are not fatal. However, to avoid
            // slowing down the queue of pending tasks, we rethrow the error in a
            // lower priority turn.
            pendingErrors.push(error);
            requestErrorThrow();
        }
    } finally {
        this.task = null;
        freeTasks[freeTasks.length] = this;
    }
};

},{"./raw":23}],23:[function(require,module,exports){
(function (global){
"use strict";

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including IO, animation, reflow, and redraw
// events in browsers.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Equivalent to push, but avoids a function call.
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// `requestFlush` is an implementation-specific method that attempts to kick
// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
// the event queue before yielding to the browser's own event loop.
var requestFlush;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory exhaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

// `requestFlush` is implemented using a strategy based on data collected from
// every available SauceLabs Selenium web driver worker at time of writing.
// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.
var BrowserMutationObserver = global.MutationObserver || global.WebKitMutationObserver;

// MutationObservers are desirable because they have high priority and work
// reliably everywhere they are implemented.
// They are implemented in all modern browsers.
//
// - Android 4-4.3
// - Chrome 26-34
// - Firefox 14-29
// - Internet Explorer 11
// - iPad Safari 6-7.1
// - iPhone Safari 7-7.1
// - Safari 6-7
if (typeof BrowserMutationObserver === "function") {
    requestFlush = makeRequestCallFromMutationObserver(flush);

// MessageChannels are desirable because they give direct access to the HTML
// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
// 11-12, and in web workers in many engines.
// Although message channels yield to any queued rendering and IO tasks, they
// would be better than imposing the 4ms delay of timers.
// However, they do not work reliably in Internet Explorer or Safari.

// Internet Explorer 10 is the only browser that has setImmediate but does
// not have MutationObservers.
// Although setImmediate yields to the browser's renderer, it would be
// preferrable to falling back to setTimeout since it does not have
// the minimum 4ms penalty.
// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
// Desktop to a lesser extent) that renders both setImmediate and
// MessageChannel useless for the purposes of ASAP.
// https://github.com/kriskowal/q/issues/396

// Timers are implemented universally.
// We fall back to timers in workers in most engines, and in foreground
// contexts in the following browsers.
// However, note that even this simple case requires nuances to operate in a
// broad spectrum of browsers.
//
// - Firefox 3-13
// - Internet Explorer 6-9
// - iPad Safari 4.3
// - Lynx 2.8.7
} else {
    requestFlush = makeRequestCallFromTimer(flush);
}

// `requestFlush` requests that the high priority event queue be flushed as
// soon as possible.
// This is useful to prevent an error thrown in a task from stalling the event
// queue if the exception handled by Node.js’s
// `process.on("uncaughtException")` or by a domain.
rawAsap.requestFlush = requestFlush;

// To request a high priority event, we induce a mutation observer by toggling
// the text of a text node between "1" and "-1".
function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode("");
    observer.observe(node, {characterData: true});
    return function requestCall() {
        toggle = -toggle;
        node.data = toggle;
    };
}

// The message channel technique was discovered by Malte Ubl and was the
// original foundation for this library.
// http://www.nonblocking.io/2011/06/windownexttick.html

// Safari 6.0.5 (at least) intermittently fails to create message ports on a
// page's first load. Thankfully, this version of Safari supports
// MutationObservers, so we don't need to fall back in that case.

// function makeRequestCallFromMessageChannel(callback) {
//     var channel = new MessageChannel();
//     channel.port1.onmessage = callback;
//     return function requestCall() {
//         channel.port2.postMessage(0);
//     };
// }

// For reasons explained above, we are also unable to use `setImmediate`
// under any circumstances.
// Even if we were, there is another bug in Internet Explorer 10.
// It is not sufficient to assign `setImmediate` to `requestFlush` because
// `setImmediate` must be called *by name* and therefore must be wrapped in a
// closure.
// Never forget.

// function makeRequestCallFromSetImmediate(callback) {
//     return function requestCall() {
//         setImmediate(callback);
//     };
// }

// Safari 6.0 has a problem where timers will get lost while the user is
// scrolling. This problem does not impact ASAP because Safari 6.0 supports
// mutation observers, so that implementation is used instead.
// However, if we ever elect to use timers in Safari, the prevalent work-around
// is to add a scroll event listener that calls for a flush.

// `setTimeout` does not call the passed callback if the delay is less than
// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
// even then.

function makeRequestCallFromTimer(callback) {
    return function requestCall() {
        // We dispatch a timeout with a specified delay of 0 for engines that
        // can reliably accommodate that request. This will usually be snapped
        // to a 4 milisecond delay, but once we're flushing, there's no delay
        // between events.
        var timeoutHandle = setTimeout(handleTimer, 0);
        // However, since this timer gets frequently dropped in Firefox
        // workers, we enlist an interval handle that will try to fire
        // an event 20 times per second until it succeeds.
        var intervalHandle = setInterval(handleTimer, 50);

        function handleTimer() {
            // Whichever timer succeeds will cancel both timers and
            // execute the callback.
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
        }
    };
}

// This is for `asap.js` only.
// Its name will be periodically randomized to break any code that depends on
// its existence.
rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

// ASAP was originally a nextTick shim included in Q. This was factored out
// into this ASAP package. It was later adapted to RSVP which made further
// amendments. These decisions, particularly to marginalize MessageChannel and
// to capture the MutationObserver implementation in a closure, were integrated
// back into ASAP proper.
// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],24:[function(require,module,exports){
(function (process){
(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var setImmediate;

    function addFromSetImmediateArguments(args) {
        tasksByHandle[nextHandle] = partiallyApplied.apply(undefined, args);
        return nextHandle++;
    }

    // This function accepts the same arguments as setImmediate, but
    // returns a function that requires no arguments.
    function partiallyApplied(handler) {
        var args = [].slice.call(arguments, 1);
        return function() {
            if (typeof handler === "function") {
                handler.apply(undefined, args);
            } else {
                (new Function("" + handler))();
            }
        };
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(partiallyApplied(runIfPresent, handle), 0);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    task();
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function installNextTickImplementation() {
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            process.nextTick(partiallyApplied(runIfPresent, handle));
            return handle;
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            global.postMessage(messagePrefix + handle, "*");
            return handle;
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            channel.port2.postMessage(handle);
            return handle;
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
            return handle;
        };
    }

    function installSetTimeoutImplementation() {
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            setTimeout(partiallyApplied(runIfPresent, handle), 0);
            return handle;
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(new Function("return this")()));

}).call(this,require('_process'))
},{"_process":27}],25:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],26:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":27}],27:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],28:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],29:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":28,"_process":27,"inherits":25}],30:[function(require,module,exports){
(function (global){
global.hopper = require(".")
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{".":3}]},{},[30]);
(function() {

	var noteMap = {};
	var noteNumberMap = [];
	var notes = [ "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ];


	for(var i = 0; i < 127; i++) {

		var index = i,
			key = notes[index % 12],
			octave = ((index / 12) | 0) - 1; // MIDI scale starts at octave = -1

		if(key.length === 1) {
			key = key + '-';
		}

		key += octave;

		noteMap[key] = i;
		noteNumberMap[i] = key;

	}


	function getBaseLog(value, base) {
		return Math.log(value) / Math.log(base);
	}


	var MIDIUtils = {

		noteNameToNoteNumber: function(name) {
			return noteMap[name];
		},

		noteNumberToFrequency: function(note) {
			return 440.0 * Math.pow(2, (note - 69.0) / 12.0);
		},

		noteNumberToName: function(note) {
			return noteNumberMap[note];
		},

		frequencyToNoteNumber: function(f) {
			return Math.round(12.0 * getBaseLog(f / 440.0, 2) + 69);
		}

	};


	// Make it compatible for require.js/AMD loader(s)
	if(typeof define === 'function' && define.amd) {
		define(function() { return MIDIUtils; });
	} else if(typeof module !== 'undefined' && module.exports) {
		// And for npm/node.js
		module.exports = MIDIUtils;
	} else {
		this.MIDIUtils = MIDIUtils;
	}


}).call(this);

// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
;
function Arranger(partsInput) {
  var self = this;
  var parts = partsInput;
  var partsOutput = [];

  self.arrange = function() {
    parts.forEach(function(part) {
      console.log(part.generator.drums );
      if(part.generator instanceof DrumMachine) {
        part.generator.drums().forEach(function(drum){
          partsOutput.push(new Part(drum, part.rhythm[drum.name()]))
        });
      }
      else {
        partsOutput.push(part);
      }
    });
    return partsOutput;
  }
}
;
function Part(generator, rhythm) {
  var self = this;
  if(generator instanceof Array){
    self.generator = generator[0];
  }
  else{
    self.generator = generator;
  }
  if(rhythm instanceof Array){
    self.rhythm    = rhythm;
  }
  else{
    self.rhythm    = new RhythmUtil().getRhythmConstant(rhythm);
  }
}
;
function Performance(instrument, sequencer) {
  var self = this;
  window.AudioEnvironment.Performance = self;

  var seq = sequencer[0];
  var midi = window.AudioEnvironment.MidiController;
  midi.connectInstrument(instrument[0]);
  if (seq instanceof Sequencer){
    seq.init();
    seq.run();
  }

  self.stop  = function(){
    seq.stop();
    window.AudioEnvironment.Performance = null;
  }
}
;
function Test() {
  var self = this;
  var rhy  = new RhythmUtil();
  var seq;
  // seq.init();

  var performance = null;

  self.startTest = function() {

    // var s = new Synth('s','sine')
    var parts = [];
    var x = new Synth('s','square');
    x.setEnvelopeRelease(5.0);
    // x.insertReverb();
        // var y = new Synth('s','square')
    var d = new DrumMachine('d');
    parts.push(new Part(d, rhy.ROCK_BEAT_ONE));
    seq = new Sequencer(parts);

    performance = new Performance(x);
    // var parts = []
    // // // var s = new Synth('s','square', 'C-Maj7');
    // // // var e = new Synth('e','triangle', 'E-Min7');
    // // var f = new Synth('f','sine', 'A#-Min7');
    // // f.pan(0.0);
    // var d = new DrumMachine('d');
    // // // var l = new LoopPlayer('l', 'testes_loop_1.wav');
    // // // l.syncWithTempo();
    // // // parts.push(new Part(s, rhy.CR));
    // // // parts.push(new Part(e, rhy.SQ));
    // // parts.push(new Part(f, rhy.CLAVE));
    // parts.push(new Part(d, rhy.ROCK_BEAT_ONE));
    // // // parts.push(new Part(l, rhy.ONE_BAR_LOOP));
    // parts = new Arranger(parts).arrange();
    // seq.run(parts);
  }

  self.stopTest = function() {
    seq.stop();
    performance = null;
  }
}
;
function RhythmUtil() {
  var self = this;

  // self.ONEBAR   = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ];
  // self.TWOBAR   = self.ONEBAR.concat(self.ONEBAR);
  // self.FOURBAR  = self.TWOBAR.concat(self.TWOBAR);

  self.CR           = [ 1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0 ];

  self.CR_OFF       = [ 0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0 ];

  self.QU           = [ 1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0 ];

  self.SQ           = [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ];

  self.TWO_FOUR     = [ 0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0 ];

  self.ONE_THREE     = [ 1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0 ];

  self.FOUR_FOUR    = [ 1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0 ];

  self.CLAVE        = [ 0,0,1,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1,0,0,1,0 ];

  self.ONE_BAR_LOOP = [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ];

  self.TWO_BAR_LOOP = [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ];

  self.FOUR_BAR_LOOP = [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ];

  self.ROCK_BEAT_ONE  = {  "hat"   : [ 1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0],
                          "snare"  : [ 0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
                          "kick"   : [ 1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1] };

  self.HOUSE_BEAT     = {   "hat"   : [ 0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,1,
                                        0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,1,
                                        0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,1,
                                        0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,1 ],

                            "snare" : [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                                        0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
                                        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                                        0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0 ],

                            "kick"  : [ 1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,
                                        1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,
                                        1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,
                                        1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0 ]};

  self.getRhythmConstant = function(rhythm){
    switch(rhythm){
      case "ONEBAR":
        return self.ONEBAR;
      case "TWOBAR":
        return self.TWOBAR;
      case "FOURBAR":
        return self.FOURBAR
      case "CR":
        return self.CR;
      case "CR_OFF":
        return self.CR_OFF;
      case "QU":
        return self.QU;
      case "SQ":
        return self.SQ;
      case "TWO_FOUR":
        return self.TWO_FOUR;
      case "ONE_THREE":
        return self.ONE_THREE;
      case "FOUR_FOUR":
        return self.FOUR_FOUR;
      case "CLAVE":
        return self.CLAVE;
      case "ONE_BAR_LOOP":
        return self.ONE_BAR_LOOP;
      case "TWO_BAR_LOOP":
        return self.TWO_BAR_LOOP;
      case "FOUR_BAR_LOOP":
        return self.FOUR_BAR_LOOP;
      case "ROCK_BEAT_ONE":
        return self.ROCK_BEAT_ONE;
      case "HOUSE_BEAT":
        return self.HOUSE_BEAT;
    }
  }
}
;
function Sequencer (instrument_parts) {
  var self = this;
  var parts = new Arranger(instrument_parts).arrange();
  var startedrunning = 0; // TODO for testing remove me
  var tempo = 120.0;
  var oneMinute = 60.0;
  var eventsQueued = [];
  var nextEventTime = 0.0;
  var currentSubdivision = 4;  // TODO 16ths eg 4 subs per beat this is restrictive, time based is gross, options?
  var currentStepNumber = 0;
  var performanceRunning = false;
  var oneBeatTimeValue = (oneMinute / tempo);
  var schedulingLookAhead = 50.0;
  var scheduleEventHorizon = 0.1;
  var sequencerWorker = null;
  var context = window.AudioEnvironment.context;

  function advanceStep() {
    oneBeatTimeValue = (oneMinute / tempo);
    nextEventTime += (oneBeatTimeValue / currentSubdivision);

    currentStepNumber ++;
    if(currentStepNumber == 64) {
      currentStepNumber = 0;
    }
  }

  function scheduleEvent( stepNumber, time ) {
   db(stepNumber % 4);
    self.parts.forEach(function(part) {
      var startTime = nextEventTime;
      if(!eventsQueued[part.generator.name() + "" + startTime.toFixed(5)]){
        db("SCHEDULING Next Event Time:  " + nextEventTime.toFixed(5) );
        var endTime = nextEventTime + (oneBeatTimeValue / currentSubdivision);
        eventsQueued.push(part.generator.name() + "" + startTime.toFixed(5) );
        db("Index of the shits" +  part.rhythm.length );
        if (part.rhythm[stepNumber] == 1) {
          db(part.generator.name() + "" + startTime.toFixed(5)+ "ends at " + endTime.toFixed(5))
          part.generator.play(startTime, endTime);
        };
      }
    });
  }

  function eventScheduler() {
    while (nextEventTime < context.currentTime + scheduleEventHorizon ) {
      scheduleEvent( currentStepNumber, nextEventTime );
      advanceStep();
      var runningTime = context.currentTime - startedrunning;
    }
  }

  function startPerformance(parts) {
    startedrunning = context.currentTime;
    self.parts = parts; 
    currentStepNumber = 0;

    nextEventTime = context.currentTime;
    sequencerWorker.postMessage('running');
  }

  function stopPerformance() {
    db("stopping");
    sequencerWorker.postMessage('stop');
  }

  self.stop = function() {
   sequencerWorker.postMessage('stop'); 
   parts.forEach(function(p){
    p.generator.stop();
   });
  }

  self.run = function() {
    db("Running");
    performanceRunning = !performanceRunning;
    performanceRunning ? startPerformance(parts) : stopPerformance();
  }

  self.updateTempo = function(newTempo) {
    tempo = newTempo;
  }

  self.init = function() {
    db("Initialising sequencer");
    sequencerWorker = new Worker("/assets/sequencerWorker-813fadae12c7bd44b1e7cf67a6801ca4.js");

    sequencerWorker.onmessage = function(e) {
      if(e.data == 'step') {
        // db(e.data);
        eventScheduler();
      }
      else {
        db('Received :' + e.data);
      }
    };
    sequencerWorker.postMessage({ "schedulingLookAhead": schedulingLookAhead });
  }

  function db(message) {
    <!-- console.log(message); -->
  }
}
;
$(function () {
    window.AudioEnvironment.Clock = function(){};
    var self = window.AudioEnvironment.Clock;
    var context = window.AudioEnvironment.context;
    var tempo = 120; // Classic default
    var minute = 60;
    var beat  = minute / tempo;

    self.currentTime = function(){
      return context.currentTime;
    }

    self.beat = function(){
      return beat;
    }

    self.eigth = function(){
      return beat / 2 ;
    }

    self.sixteenth = function(){
      return beat / 4;
    }

    self.tempo = function() {
      return tempo;
    }
});
/* ===================================================
 * bootstrap-transition.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */



!function ($) {

  "use strict"; // jshint ;_;


  /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
   * ======================================================= */

  $(function () {

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);/* ==========================================================
 * bootstrap-alert.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)

    e && e.preventDefault()

    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent
        .trigger('closed')
        .remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT NO CONFLICT
  * ================= */

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


 /* ALERT DATA-API
  * ============== */

  $(document).on('click.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);/* ============================================================
 * bootstrap-button.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons-radio"]')

    $parent && $parent
      .find('.active')
      .removeClass('active')

    this.$element.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON NO CONFLICT
  * ================== */

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


 /* BUTTON DATA-API
  * =============== */

  $(document).on('click.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
  })

}(window.jQuery);/* ==========================================================
 * bootstrap-carousel.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options = options
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function (e) {
      if (!e) this.paused = false
      if (this.interval) clearInterval(this.interval);
      this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
      return this
    }

  , getActiveIndex: function () {
      this.$active = this.$element.find('.item.active')
      this.$items = this.$active.parent().children()
      return this.$items.index(this.$active)
    }

  , to: function (pos) {
      var activeIndex = this.getActiveIndex()
        , that = this

      if (pos > (this.$items.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activeIndex == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true
      if (this.$element.find('.next, .prev').length && $.support.transition.end) {
        this.$element.trigger($.support.transition.end)
        this.cycle(true)
      }
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.item.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      e = $.Event('slide', {
        relatedTarget: $next[0]
      , direction: direction
      })

      if ($next.hasClass('active')) return

      if (this.$indicators.length) {
        this.$indicators.find('.active').removeClass('active')
        this.$element.one('slid', function () {
          var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
          $nextIndicator && $nextIndicator.addClass('active')
        })
      }

      if ($.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      } else {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option)
        , action = typeof option == 'string' ? option : options.slide
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL NO CONFLICT
  * ==================== */

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }

 /* CAROUSEL DATA-API
  * ================= */

  $(document).on('click.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this = $(this), href
      , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      , options = $.extend({}, $target.data(), $this.data())
      , slideIndex

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('carousel').pause().to(slideIndex).cycle()
    }

    e.preventDefault()
  })

}(window.jQuery);/* =============================================================
 * bootstrap-collapse.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning || this.$element.hasClass('in')) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      $.support.transition && this.$element[dimension](this.$element[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning || !this.$element.hasClass('in')) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSE PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = $.extend({}, $.fn.collapse.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSE NO CONFLICT
  * ==================== */

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


 /* COLLAPSE DATA-API
  * ================= */

  $(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this = $(this), href
      , target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
      , option = $(target).data('collapse') ? 'toggle' : $this.data()
    $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    $(target).collapse(option)
  })

}(window.jQuery);/* ============================================================
 * bootstrap-dropdown.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        if ('ontouchstart' in document.documentElement) {
          // if mobile we we use a backdrop because click events don't delegate
          $('<div class="dropdown-backdrop"/>').insertBefore($(this)).on('click', clearMenus)
        }
        $parent.toggleClass('open')
      }

      $this.focus()

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) {
        if (e.which == 27) $parent.find(toggle).focus()
        return $this.click()
      }

      $items = $('[role=menu] li:not(.divider):visible a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    $('.dropdown-backdrop').remove()
    $(toggle).each(function () {
      getParent($(this)).removeClass('open')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = selector && $(selector)

    if (!$parent || !$parent.length) $parent = $this.parent()

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


 /* DROPDOWN NO CONFLICT
  * ==================== */

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(document)
    .on('click.dropdown.data-api', clearMenus)
    .on('click.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);
/* =========================================================
 * bootstrap-modal.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
    this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element.show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)

          that.enforceFocus()

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
            that.$element.focus().trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function () {
        var that = this
        this.$element.hide()
        this.backdrop(function () {
          that.removeBackdrop()
          that.$element.trigger('hidden')
        })
      }

    , removeBackdrop: function () {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          this.$backdrop.click(
            this.options.backdrop == 'static' ?
              $.proxy(this.$element[0].focus, this.$element[0])
            : $.proxy(this.hide, this)
          )

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          if (!callback) return

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.modal

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL NO CONFLICT
  * ================= */

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


 /* MODAL DATA-API
  * ============== */

  $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
      , href = $this.attr('href')
      , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
      , option = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option)
      .one('hide', function () {
        $this.focus()
      })
  })

}(window.jQuery);
/* ===========================================================
 * bootstrap-tooltip.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut
        , triggers
        , trigger
        , i

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      triggers = this.options.trigger.split(' ')

      for (i = triggers.length; i--;) {
        trigger = triggers[i]
        if (trigger == 'click') {
          this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
        } else if (trigger != 'manual') {
          eventIn = trigger == 'hover' ? 'mouseenter' : 'focus'
          eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'
          this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
          this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
        }
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, this.$element.data(), options)

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var defaults = $.fn[this.type].defaults
        , options = {}
        , self

      this._options && $.each(this._options, function (key, value) {
        if (defaults[key] != value) options[key] = value
      }, this)

      self = $(e.currentTarget)[this.type](options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp
        , e = $.Event('show')

      if (this.hasContent() && this.enabled) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        $tip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })

        this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

        pos = this.getPosition()

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        this.applyPlacement(tp, placement)
        this.$element.trigger('shown')
      }
    }

  , applyPlacement: function(offset, placement){
      var $tip = this.tip()
        , width = $tip[0].offsetWidth
        , height = $tip[0].offsetHeight
        , actualWidth
        , actualHeight
        , delta
        , replace

      $tip
        .offset(offset)
        .addClass(placement)
        .addClass('in')

      actualWidth = $tip[0].offsetWidth
      actualHeight = $tip[0].offsetHeight

      if (placement == 'top' && actualHeight != height) {
        offset.top = offset.top + height - actualHeight
        replace = true
      }

      if (placement == 'bottom' || placement == 'top') {
        delta = 0

        if (offset.left < 0){
          delta = offset.left * -2
          offset.left = 0
          $tip.offset(offset)
          actualWidth = $tip[0].offsetWidth
          actualHeight = $tip[0].offsetHeight
        }

        this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
      } else {
        this.replaceArrow(actualHeight - height, actualHeight, 'top')
      }

      if (replace) $tip.offset(offset)
    }

  , replaceArrow: function(delta, dimension, position){
      this
        .arrow()
        .css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()
        , e = $.Event('hide')

      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).detach()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.detach()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.detach()

      this.$element.trigger('hidden')

      return this
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function () {
      var el = this.$element[0]
      return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
        width: el.offsetWidth
      , height: el.offsetHeight
      }, this.$element.offset())
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , arrow: function(){
      return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function (e) {
      var self = e ? $(e.currentTarget)[this.type](this._options).data(this.type) : this
      self.tip().hasClass('in') ? self.hide() : self.show()
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  var old = $.fn.tooltip

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }


 /* TOOLTIP NO CONFLICT
  * =================== */

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);
/* ===========================================================
 * bootstrap-popover.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)
        || $e.attr('data-content')

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


 /* POPOVER NO CONFLICT
  * =================== */

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);
/* =============================================================
 * bootstrap-scrollspy.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* SCROLLSPY CLASS DEFINITION
  * ========================== */

  function ScrollSpy(element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

        $targets = this.$body
          .find(this.selector)
          .map(function () {
            var $el = $(this)
              , href = $el.data('target') || $el.attr('href')
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && $href.length
              && [[ $href.position().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
          , maxScroll = scrollHeight - this.$scrollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets.last()[0])
            && this.activate ( i )
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu').length)  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY NO CONFLICT
  * ===================== */

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);/* ========================================================
 * bootstrap-tab.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active:last a')[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB NO CONFLICT
  * =============== */

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


 /* TAB DATA-API
  * ============ */

  $(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);/* ==========================================================
 * bootstrap-affix.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#affix
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* AFFIX CLASS DEFINITION
  * ====================== */

  var Affix = function (element, options) {
    this.options = $.extend({}, $.fn.affix.defaults, options)
    this.$window = $(window)
      .on('scroll.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.affix.data-api',  $.proxy(function () { setTimeout($.proxy(this.checkPosition, this), 1) }, this))
    this.$element = $(element)
    this.checkPosition()
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
      , scrollTop = this.$window.scrollTop()
      , position = this.$element.offset()
      , offset = this.options.offset
      , offsetBottom = offset.bottom
      , offsetTop = offset.top
      , reset = 'affix affix-top affix-bottom'
      , affix

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
      false    : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ?
      'bottom' : offsetTop != null && scrollTop <= offsetTop ?
      'top'    : false

    if (this.affixed === affix) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
  }


 /* AFFIX PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('affix')
        , options = typeof option == 'object' && option
      if (!data) $this.data('affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix

  $.fn.affix.defaults = {
    offset: 0
  }


 /* AFFIX NO CONFLICT
  * ================= */

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


 /* AFFIX DATA-API
  * ============== */

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
        , data = $spy.data()

      data.offset = data.offset || {}

      data.offsetBottom && (data.offset.bottom = data.offsetBottom)
      data.offsetTop && (data.offset.top = data.offsetTop)

      $spy.affix(data)
    })
  })


}(window.jQuery);/* =============================================================
 * bootstrap-typeahead.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function($){

  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.source = this.options.source
    this.$menu = $(this.options.menu)
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.position(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu
        .insertAfter(this.$element)
        .css({
          top: pos.top + pos.height
        , left: pos.left
        })
        .show()

      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var items

      this.query = this.$element.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      var that = this

      items = $.grep(items, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('focus',    $.proxy(this.focus, this))
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
        .on('mouseleave', 'li', $.proxy(this.mouseleave, this))
    }

  , eventSupported: function(eventName) {
      var isSupported = eventName in this.$element
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;')
        isSupported = typeof this.$element[eventName] === 'function'
      }
      return isSupported
    }

  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , focus: function (e) {
      this.focused = true
    }

  , blur: function (e) {
      this.focused = false
      if (!this.mousedover && this.shown) this.hide()
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
      this.$element.focus()
    }

  , mouseenter: function (e) {
      this.mousedover = true
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  , mouseleave: function (e) {
      this.mousedover = false
      if (!this.focused && this.shown) this.hide()
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  var old = $.fn.typeahead

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , minLength: 1
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD NO CONFLICT
  * =================== */

  $.fn.typeahead.noConflict = function () {
    $.fn.typeahead = old
    return this
  }


 /* TYPEAHEAD DATA-API
  * ================== */

  $(document).on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
    var $this = $(this)
    if ($this.data('typeahead')) return
    $this.typeahead($this.data())
  })

}(window.jQuery);
window.FileUtils = new function () {
  var self = this;

  var assetFiles = {
    "kick"          : "/assets/kick-11ffcada7667458ac9989161ce152a07.wav",
    "snare"         : "/assets/snare-77f5613dc6e36dd1d2b563241a4384f9.wav",
    "hat"           : "/assets/hat-e0ca8f94c372f143f7e76c775d2514a8.wav",
    "verb_impulse"  : "/assets/verb_impulse-960ca5adcaa145a6c319c373cc4997f5.wav",
    "sample_1"      : "/assets/sample_1-023f24e2e7164757415a97a0b220bf24.wav",
    "sample_2"      : "/assets/sample_2-2d885bac613edae135c308dbcc793c26.wav",
    "sample_3"      : "/assets/sample_3-406e1c6ae718831da44bec11fa9bc064.wav",
    "sample_4"      : "/assets/sample_4-08c8c96650eca94c4d47aaab93f42cb6.wav",
    "sample_5"      : "/assets/sample_5-4adfbe59d8a0680973750d5c40f8dc59.wav",
    "sample_6"      : "/assets/sample_6-cd944bbea3ffb9231770062a8fbba0e8.wav",
    "sample_7"      : "/assets/sample_7-1a2f5be73a086f8b3af433acb58211d1.wav",
    "sample_8"      : "/assets/sample_8-390332df6001ae471653e4aed5d6be88.wav",
    "docs"          : "/assets/gm_docs-07ea55864ec1ff65e7e73b6fbe22e56f.pdf",
    "expproc"       : "/assets/gm_experimental_procedure-4333444766131dbfb9aa8d6ed700ff00.pdf",
  }

  self.fileLocation = function(assetName) {
    return assetFiles[assetName];
  }
};
function HopperWrapper() {
  var self = this;
  var interpreter;

  hopper.prelude.then(function (prelude) {
    //// Synth ////
    var synth = hopper.runtime.object();

    synth.name_wave_chord = hopper.runtime.method("name() wave() chord()", [1, 1, 1],
      function (name, wave, chord) {
        return name[0].asPrimitiveString().then(function(name){
          return wave[0].asPrimitiveString().then(function (wave) {
            return chord[0].asPrimitiveString().then(function (chord) {
              return new Synth(name, wave, chord);
            });
          });
        });
      });

    prelude.Synth = hopper.runtime.method("Synth", 0, function () {
      return synth;
    });

    //// DrumMachine ////
    var drumMachine = hopper.runtime.object();

    // drumMachine.name = hopper.runtime.method("name()", 1,
    //   function (name) {
    //     return name.asPrimitiveString().then(function (name) {
    //       return new DrumMachine(name);
    //     });
    //   });

    drumMachine.name = hopper.runtime.method("name()", 1,
      function (name) {
        return name.asPrimitiveString().then(function (name) {
          return new DrumMachine(name);
        });
      });

    prelude.DrumMachine = hopper.runtime.method("DrumMachine", 0, function(){
      return drumMachine;
    });


    //// LoopPlayer ////
    var loopPlayer = hopper.runtime.object();

    loopPlayer.name_sample = hopper.runtime.method("name() sample()", [1, 1],
      function (name, sample) {
        return name[0].asPrimitiveString().then(function (name) {
          return sample[0].asPrimitiveString().then(function(sample) {
            return new LoopPlayer(name, sample);
          })
        });
      });

    prelude.LoopPlayer = hopper.runtime.method("LoopPlayer", 0, function(){
      return loopPlayer;
    });


    //// Performance ////
    var performance = hopper.runtime.object();

    performance.instrument_sequencer = hopper.runtime.method("instrument() sequencer()", [1, 1], 
      function(instrument, sequencer) {
        return new Performance(instrument, sequencer);
    });

    prelude.Performance = hopper.runtime.method("Performance", 0, function(){
      return performance;
    });

    //// Sequencer ////
    var sequencer = hopper.runtime.object();

    sequencer.parts = hopper.runtime.method("parts()", 1, 
      function(parts) {
        return parts.asPrimitiveArray().then(function(parts) {
          return new Sequencer(parts);
        });
    });

    prelude.Sequencer = hopper.runtime.method("Sequencer", 0, function() {
      return sequencer;
    });

    var part = hopper.runtime.object();

    part.instrument_rhythm = hopper.runtime.method("instrument() rhythm()", [1, 1], 
      function (instrument, rhythm) {
            return rhythm[0].asPrimitiveString().then(function (rhythm) {
              return new Part(instrument, rhythm);
            });
        });

    prelude.Part = hopper.runtime.method("Part", 0 , function() {
      return part;
    });
  });

  self.interpret = function(input) {
    var textInput = input;
    interpreter = new hopper.Interpreter();
    interpreter.enter(function(){
      interpreter.interpret(textInput, function(error){
        $("#error-div").text(error.toString());
        console.log(error.toString());
      });
    });
  }

  self.terminate = function(){
    interpreter.prelude.stop();
    interpreter = new hopper.Interpreter();
  }
}
;
function InputHandler () {
  InputHandler.prototype.handleInput = function(input) {
    tokens =  new Lexer(input).processInput();
    new Parser().parseTokens(tokens);
  };
}
;
function Lexer (inputText) {
  var self = this;
  var inputText = inputText;
  var junkChars = ["", " ", "\n", "\""];
  var output = [];

  self.processInput = function () {
    inputLines = inputText.split('\n');
    inputLines.forEach(function(line){
      if(line.length > 0){
        output.push(line.split(' '));
      }
    });
    return output;
  };

  function stripJunk(input){
    strippedInput = []
    input.forEach(function(token){
      console.log(token);
      strippedInput.push(token.trim("\""))
    });
    return strippedInput;
  }
}
;
function Parser (tokens) {
  function parseTokens(tokens){
    console.log(tokens);
  };
}
;
// $(function(){
//   var inputs  = [
//     "def s = Synth.name(\"s\") wave(\"triangle\") chord(\"C-MAJ7\")\n",
//     "s.setEnvelopeRelease(2.0)\n",
//     "s.insert(\"reverb\")\n",
//     "s.insert(\"distortion\")\n",

//     // "def dp = Part.instrument(s) rhythm(\"CR\")\n",
//     "def d = DrumMachine.name(\"rockbeat\")\n",
//     "def dp = Part.instrument(d) rhythm(\"ROCK_BEAT_ONE\")\n",

//     // "def seq = Sequencer.parts(list.with(dp))\n",
//     "def lp = LoopPlayer.name(\"lp\" ) filename(\"sample_1\")\n",
//     "def lpprt = Part.instrument(lp) rhythm(\"ONE_BAR_LOOP\")\n",
//     "def seq = Sequencer.parts(list.with(dp, lpprt))\n",
//     "def p = Performance.instrument(s) sequencer(seq)\n",
//     ]

//   // var inputs  = [
//   //   "def s = Synth.name(\"s\") wave(\"triangle\") chord(\"C-MAJ7\")\n",
//   // //   // "s.setEnvelopeRelease(2.0)\n",
//   // //   // "s.insert(\"reverb\")\n",
//   // //   // "s.insert(\"distortion\")\n",

//   //   // // "def dp = Part.instrument(s) rhythm(\"CR\")\n",
//   // //   // "def d = DrumMachine.name(\"rockbeat\")\n",
//   // //   // "def dp = Part.instrument(d) rhythm(\"ROCK_BEAT_ONE\")\n",

//   // //   // "def seq = Sequencer.parts(dp)\n",
//   // //   "def lp = LoopPlayer.name(\"lp\" ) filename(\"sample_1.wav\")\n",
//   // //   "def lpprt = Part.instrument(lp) rhythm(\"ONE_BAR_LOOP\")\n",
//   // //   "def d = DrumMachine.name(\"rockbeat\")\n",
//   // //   "def dp = Part.instrument(d) rhythm(\"ROCK_BEAT_ONE\")\n",
//   // //   "def seq = Sequencer.parts( list.with(lpprt, dp) )\n",
//   //   // "def p = Performance.instrument(s) sequencer(\"\")\n",
//   //   ]

//   inputs.forEach(function(input){
//     $('#text-area').append(input);
//   });
// })
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//





;
