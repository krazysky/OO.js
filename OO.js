var assert = require("assert");

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

var Person = Class.extend({
	"init":function(name,age){
		this.name = name;
		this.age = age;
	},
	"echo":function(){
		return "name: "+this.name+", age: "+ this.age;
	},
	"someProp":"Person prop"
});

assert(Person.prototype.init,"Person.prototype.init exists.");
assert(Person.prototype.echo,"Person.prototype.echo exists.");

var p = new Person("lucy",23);

assert(p instanceof Person,"p instanceof Person");
assert(p instanceof Class,"p instanceof Class");
assert(p instanceof Object,"p instanceof Object");

assert(! p.hasOwnProperty("init") ,'! p.hasOwnProperty("init")' );
assert(! p.hasOwnProperty("echo") ,'! p.hasOwnProperty("echo")');
assert(! p.hasOwnProperty("someProp") ,'! p.hasOwnProperty("someProp")' );

assert("Person prop",p.someProp,"access Person class property");
assert("name: lucy, age: 23",p.echo());

var Student = Person.extend(
	{
		"init":function(name,age, sno){
			this.superClass.init(name,age);
			this.sno = sno;			
		},
		"echo":function(msg){
			return this.superClass.echo()+", sno: "+ this.sno;
		},
		"learn":function(course){
			return "learn: "+course;
		},
		"someProp":"Student prop"
	}
);

assert(Student.prototype.init,"Student.prototype.init exists.");
assert(Student.prototype.echo,"Student.prototype.echo exists.");
assert(Student.prototype.learn,"Student.prototype.learn exists.");


var s = new Student("bob", 21, "1230");

assert(s instanceof Student,"s instanceof Student");
assert(s instanceof Person,"s instanceof Person");
assert(s instanceof Class,"s instanceof Class");
assert(s instanceof Object,"s instanceof Object");

assert(! s.hasOwnProperty("init"), '! s.hasOwnProperty("init")' );
assert(! s.hasOwnProperty("echo") ,'! s.hasOwnProperty("echo")');
assert(! s.hasOwnProperty("learn"),'! s.hasOwnProperty("learn")' );
assert(! s.hasOwnProperty("someProp"),'! s.hasOwnProperty("someProp")' );

assert("Student prop",s.someProp,"access Student class property");
assert.equal("name: bob, age: 21, sno: 1230", s.echo(),"call this.superClass.echo()");
assert.equal("learn: Math", s.learn("Math"),"extended new methods learn()" );


var CanRun = Class.extend({
	"run":function(meters){
		return "run "+meters +" meters";
	}
});

Student.mixin(CanRun);

assert.equal("run 123 meters", s.run(123) , "mixin CanRun.");
