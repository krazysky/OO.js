OO.js is a simple javascript inheritance & mixin implementation.
(Inspired by Json Resig's Simple JavaScript Inheritance & Base.js & a lot more)

Class is the root type.

Create a new type based on Class:

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
    var p = new Person("lucy",23);
    assert("Person prop",p.someProp,"access Person class property");
    assert("name: lucy, age: 23",p.echo());
    
Note: "init" is the constructor where all the initialiation is done.

Create a sub type again:

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
    var s = new Student("bob", 21, "1230");
    assert.equal("name: bob, age: 21, sno: 1230", s.echo(),"call this.superClass.echo()");
    assert.equal("learn: Math", s.learn("Math"),"extended new methods learn()" );
    
Note: use "this.superClass.method_name" to access super type functionality.

Do some mixins:
    
    var Run = Class.extend({
        "run":function(meters){
            return "run "+meters +" meters";
        }
    });
    
    Student.mixin(Run);
     
    assert.equal("run 123 meters", s.run(123) , "mixin Run."); // s is defined above
    
    var Think = Class.extend({
        "think":function(){
            return "think";
        }
    });
    
    Student.mixin(Think,{
        "eat":function(){
            return "eat";
        }
    });
    
    assert.equal("think", s.think()," mixin Think"); 
    assert.equal("eat", s.eat()," mixin eat");
    
Note: the mix sources (like "Run" here) can not have "init" function, and they should not depend on initialization in order to behave properly.
