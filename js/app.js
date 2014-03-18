var Calculator = Ember.Application.create();

//contains all button functionality. Anonym function is run right away and returns the functions
Calculator.buttonsController = Ember.Object.create(
    (function(){
        var operation
        var value = 0;
        var memory = 0;

        function doOperation() {
            value = operation(value,this.get('input'));
            this.set('input', value)
        }

        function setValueAndClearInput() {
            value = this.get('input')
            this.set('input', '')
        }

        return {

            increment: function() {             
                if (operation) {
                    doOperation.call(this);
                    return;
                }
                setValueAndClearInput.call(this);
                operation = function(a,b) {
                    return parseFloat(a)+parseFloat(b);
                }
            },

            subtract: function() {
                if(operation) {
                    doOperation.call(this);
                    return;
                }
                setValueAndClearInput.call(this);
                operation = function(a,b) {
                    return parseFloat(a) - parseFloat(b);
                }
            },

            multiply: function() {
                if (operation) {
                    doOperation.call(this);
                    return;
                }
                setValueAndClearInput.call(this);
                operation = function(a,b) {
                    return parseFloat(a) * parseFloat(b);
                }
            },

            divide: function() {
                if(operation) {
                    doOperation.call(this);
                    return;
                }
                setValueAndClearInput.call(this);
                operation = function(a, b) {
                    return parseFloat(a) / parseFloat(b);
                }
            },

            signChange: function() {
                value = this.get('input') * -1
                this.set('input', value)
            },

            dot: function() {
                var input = this.get('input')
                if (input.indexOf('.') == -1) {
                    this.set('input', input + '.')
                }
            },

            clear: function() {
                value = 0;
                operation = undefined;
                this.set('input', '');
            },

            numCatenation: function(num) {
                if (!this.get('input')) {
                    this.set('input', num+'')
                    return;
                }
                if (operation && value == this.get('input')) {
                    this.set('input', num)
                    return;
                }
                this.set('input', this.get('input')+''+num)
            },

            result: function() {
                if (!operation) {
                    return;
                }
                value = operation(value, this.get('input'))
                operation = undefined;
                this.set('input', value)
            },

            memClear: function() {
                memory = 0;
                this.set('input', '')
            },

            memMinus: function() {
                memory -= parseFloat(this.get('input'))
                this.set('input', '')
            },

            memPlus: function() {
                memory += parseFloat(this.get('input'))
                this.set('input','')
            },

            memRecall: function() {
                this.set('input', memory)
            }
        }
    })
());

//View with flame widgets. buttons are in the same order as they appear in the calculator (left to right)
Calculator.RootView = Flame.RootView.extend({

    controller: Calculator.buttonsController,

    childViews: ['input',
                 'memPlus', 'memClear', 'memMinus', 'memRecall',
                 'clear', 'signChange', 'division', 'multiply',
                 'seven', 'eight', 'nine', 'subtract',
                 'four', 'five', 'six', 'increment',
                 'one', 'two', 'three', 'result',
                 'zero', 'dot'],

    input: Flame.TextFieldView.extend({
        layout: { left: 1, top: 20, width: 125 },
        valueBinding: '^controller.input',
        isDisabled:true
    }),

    memClear: Flame.ButtonView.extend({
        layout: {left: 1, top: 45, width: 30},
        title: 'MC',
        targetBinding: '^controller',
        action: 'memClear'
    }),

    memPlus: Flame.ButtonView.extend({
        layout: {left: 32, top: 45, width: 30},
        title: 'M+',
        targetBinding: '^controller',
        action: 'memPlus'
    }),

    memMinus: Flame.ButtonView.extend({
        layout: {left: 63, top: 45, width: 30},
        title: 'M-',
        targetBinding: '^controller',
        action: 'memMinus'
    }),

    memRecall: Flame.ButtonView.extend({
        layout: {left: 94, top: 45, width: 30},
        title: 'MR',
        targetBinding: '^controller',
        action: 'memRecall'
    }),

    clear: Flame.ButtonView.extend({
        layout: {left: 1, top: 70, width: 30},
        title: 'C',
        targetBinding: '^controller',
        action: 'clear'
    }),

    signChange: Flame.ButtonView.extend({
        layout: {left: 32, top: 70, width: 30},
        title: '+/-',
        targetBinding: '^controller',
        action: 'signChange'
    }),

    division: Flame.ButtonView.extend({
        layout: {left: 63, top: 70, width: 30},
        title: '÷',
        targetBinding: '^controller',
        action: 'divide'
    }),

    multiply: Flame.ButtonView.extend({
        layout: {left: 94, top: 70, width: 30},
        title: 'x',
        targetBinding: '^controller',
        action: 'multiply'
    }),

    seven: Flame.ButtonView.extend({
        layout: {left: 1, top: 95, width: 30},
        title: '7',
        target: '^controller',
        action: function() {
            Calculator.buttonsController.numCatenation(7);
        }
    }),

    eight: Flame.ButtonView.extend({
        layout: {left: 32, top: 95, width: 30},
        title: '8',
        target: '^controller',
        action: function() {
            Calculator.buttonsController.numCatenation(8);
        }
    }),

    nine: Flame.ButtonView.extend({
        layout: {left: 63, top: 95, width: 30},
        title: '9',
        target: '^controller',
        action: function() {
            Calculator.buttonsController.numCatenation(9);
        }
    }),

    subtract: Flame.ButtonView.extend({
        layout: {left: 94, top: 95, width: 30},
        title: '-',
        targetBinding: '^controller',
        action: 'subtract'
    }),

    four: Flame.ButtonView.extend({
        layout: {left: 1, top: 120, width: 30},
        title: '4',
        target: '^controller',
        action: function() {
            Calculator.buttonsController.numCatenation(4);
        }
    }),

    five: Flame.ButtonView.extend({
        layout: {left: 32, top: 120, width: 30},
        title: '5',
        target: '^controller',
        action: function() {
            Calculator.buttonsController.numCatenation(5);
        }
    }),

    six: Flame.ButtonView.extend({
        layout: {left: 63, top: 120, width: 30},
        title: '6',
        target: '^controller',
        action: function() {
            Calculator.buttonsController.numCatenation(6);
        }
    }),

    increment: Flame.ButtonView.extend({
        layout: {left: 94, top: 120, width: 30},
        title: '+',
        targetBinding: '^controller',
        action: 'increment'
    }),

    one: Flame.ButtonView.extend({
        layout: {left: 1, top: 145, width: 30},
        title: '1',
        target: '^controller',
        action: function() {
            Calculator.buttonsController.numCatenation(1);
        }
    }),

    two: Flame.ButtonView.extend({
        layout: {left: 32, top: 145, width: 30},
        title: '2',
        target: '^controller',
        action: function() {
            Calculator.buttonsController.numCatenation(2);
        }
    }),

    three: Flame.ButtonView.extend({
        layout: {left: 63, top: 145, width: 30},
        title: '3',
        target: '^controller',
        action: function() {
            Calculator.buttonsController.numCatenation(3);
        }
    }),

    result: Flame.ButtonView.extend({
        layout: {left: 94, top: 145, width: 30, height: 50},
        title: '=',
        targetBinding: '^controller',
        action: 'result'
    }),

    zero: Flame.ButtonView.extend({
        layout: {left: 1, top: 170, width: 60},
        title: '0',
        target: '^controller',
        action: function() {
            Calculator.buttonsController.numCatenation(0);
        }
    }),

    dot: Flame.ButtonView.extend({
        layout: {left: 63, top: 170, width: 30},
        title: '.',
        targetBinding: '^controller',
        action: 'dot'
    })
    
});
