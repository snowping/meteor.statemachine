meteor-statemachine
===================
BASED on natestrauser:statemachine but with fix https://github.com/nate-strauser/meteor-statemachine/pull/3 due to "ReferenceError: StateMachine is not defined"

StateMachine.js packaged for meteor

See https://github.com/jakesgordon/javascript-state-machine
and http://codeincomplete.com/posts/2014/3/15/javascript_state_machine_v2_3_0/

exposes StateMachine as a global variable on both client and server

simple example based on a observe query
---------------------------------------

    Meteor.startup(function () {
        var fruitEvents = [
            { name: 'eat',  from: 'start',  to: 'finished' },
            { name: 'fail', from: '*', to: 'failed'  }
        ];

        var fruitCallbacks = {
            oneat: function(event, from, to, fruit) {
                Fruit.update(fruit._id, {$set: {
                    'state':to
                }});
            },
            onfail: function(event, from, to, fruit) {
                Fruit.update(fruit._id, {$set: {
                    'state':to
                }});
            }
        };

        var fruitStateMachine = function(fruit){
            var stateMachine = StateMachine.create({
                initial: fruit.state,
                events: fruitEvents,
                callbacks: fruitCallbacks
            });
            switch (fruit.state) {
                case "start":
                    <do something>
                    stateMachine.eat(fruit);
                    break;
            }
        };

        Fruit.find({'state': 'start'}).observe({
            added: fruitStateMachine
        });
    });
