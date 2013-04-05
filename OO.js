(function(){
	/**
	 *  the base class
	 */
	var Class = function(){
		
	};
		
	/**
	 *  Create new class by extending an existing one
	 *  Usage: 
	 *  Class.extend({
	 * 		"init":function(){},
	 * 		"other":...
	 * })
	 * 
	 * Inspired by Json Resig's Simple JavaScript Inheritance & Base.js & a lot more
	 * 
	 */
	Class.extend = function(extendedClassProperties){
		
		/**
		 * Set the constructor's flag, we just want to create an prototype, do not execute the "init" process. 
		 */
		this.__isCreatingPrototype__ = true;
		
		var prototype= new this();
		
		//copy all the extendedClassProperties to the prototype
		for(var propName in  extendedClassProperties)
		{
			prototype[propName] = extendedClassProperties[propName];
		}
		
		/**
		 * the new type we are creating
		 */
		var subClass = function(){
		    /**
		     * make sure we're not generating prototype, than we call the "init" process
		     */
			if( (!arguments.callee.__isCreatingPrototype__) && typeof this.init == "function")
				this.init.apply(this, arguments);
		}; 
		
		/**
		 * Save the superClass reference, so we can call superClass.method in sub Class.
		 */
		prototype.superClass = this.prototype;
		
		subClass.prototype = prototype;
		
		subClass.constructor = subClass;
		
		subClass.extend = arguments.callee;
		
		// add the mixin function
		subClass.mixin = mixin;
		
		return subClass;
	};
	
	/**
	 * mix in some functionality
	 * Usage:
	 *   SomeClass1.mixin({
	 * 		"fn1":function(){
	 * 				
	 * 		 },...
	 * 	 });
	 * Or:
	 *   Class1.mixin(Class2)]
	 * 
	 * Make sure the mixin doesnot override important properties, like "init" (Not allowed here.)
	 */
	var mixin = function(source){
		
		if(typeof source === "function")
		{
			source = source.prototype;
		}
		
		for(var propName in source)
		{
			 propName !== "init" && (this.prototype[propName] = source[propName]);
		}
				
	};
	
	//export
	this.Class = Class;
	
	
})();

