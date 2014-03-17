var Calculator = Ember.Application.create();

Calculator.Operation = Ember.Object.extend(Flame.Validatable, {
    validations: {
        value: [Flame.Validator.Number]
    }

});

Calculator.operationsController = Ember.Object.create({
    value: 0,
    memory: 0,

    calc: function(input) {
        this.set('input', eval(getInput()))
    },

    getInput: function() {
        return this.get('input');
    },

    increment: function() {
        this.value = eval(this.get('input'))
        this.set('input', this.value)
        //this.value += '+'
        this.value += '+';
        this.set('input', this.value)
    },

    clear : function() {
        this.value = 0;
        this.set('input', '');
    },
    numCatenation: function() {
        if (this.value == 0) {
            this.value = '7'
        } else {
           this.value += '7' 
        }     
        this.set('input',this.value)
    },
    result: function() {
        this.set('input', eval(this.get('input')))
    }
    //console.log('kk' + input);
});

Calculator.RootView = Flame.RootView.extend({

    controller: Calculator.operationsController,

    childViews: ['input',
                 'memPlus', 'memClear', 'memMinus', 'memRecall',
                 'clear', 'plusMinus', 'division', 'multiply',
                 'seven', 'eight', 'nine', 'subtract',
                 'four', 'five', 'six', 'increment',
                 'one', 'two', 'three', 'result',
                 'zero', 'dot'],

    input: Flame.TextFieldView.extend({
        layout: { left: 1, top: 20, width: 125 },
        valueBinding: '^controller.input'
    }),

    memClear: Flame.ButtonView.extend({
        layout: {left: 1, top: 45, width: 30},
        title: 'MC'
    }),

    memPlus: Flame.ButtonView.extend({
        layout: {left: 32, top: 45, width: 30},
        title: 'M+'
    }),

    memMinus: Flame.ButtonView.extend({
        layout: {left: 63, top: 45, width: 30},
        title: 'M-'
    }),

    memRecall: Flame.ButtonView.extend({
        layout: {left: 94, top: 45, width: 30},
        title: 'MR'
    }),

    clear: Flame.ButtonView.extend({
        layout: {left: 1, top: 70, width: 30},
        title: 'C',
        targetBinding: '^controller',
        action: 'clear'
    }),

    plusMinus: Flame.ButtonView.extend({
        layout: {left: 32, top: 70, width: 30},
        title: '+/-'
    }),

    division: Flame.ButtonView.extend({
        layout: {left: 63, top: 70, width: 30},
        title: '÷'
    }),

    multiply: Flame.ButtonView.extend({
        layout: {left: 94, top: 70, width: 30},
        title: 'x'
    }),

    seven: Flame.ButtonView.extend({
        layout: {left: 1, top: 95, width: 30},
        title: '7',
        targetBinding: '^controller',
        action: 'numCatenation'
    }),

    eight: Flame.ButtonView.extend({
        layout: {left: 32, top: 95, width: 30},
        title: '8'
    }),

    nine: Flame.ButtonView.extend({
        layout: {left: 63, top: 95, width: 30},
        title: '9'
    }),

    subtract: Flame.ButtonView.extend({
        layout: {left: 94, top: 95, width: 30},
        title: '-'
    }),

    four: Flame.ButtonView.extend({
        layout: {left: 1, top: 120, width: 30},
        title: '4'
    }),

    five: Flame.ButtonView.extend({
        layout: {left: 32, top: 120, width: 30},
        title: '5'
    }),

    six: Flame.ButtonView.extend({
        layout: {left: 63, top: 120, width: 30},
        title: '6'
    }),

    increment: Flame.ButtonView.extend({
        layout: {left: 94, top: 120, width: 30},
        title: '+',
        targetBinding: '^controller',
        action: 'increment'
    }),

    one: Flame.ButtonView.extend({
        layout: {left: 1, top: 145, width: 30},
        title: '1'
    }),

    two: Flame.ButtonView.extend({
        layout: {left: 32, top: 145, width: 30},
        title: '2'
    }),

    three: Flame.ButtonView.extend({
        layout: {left: 63, top: 145, width: 30},
        title: '3'
    }),

    result: Flame.ButtonView.extend({
        layout: {left: 94, top: 145, width: 30, height: 50},
        title: '=',
        targetBinding: '^controller',
        action: 'result'
    }),

    zero: Flame.ButtonView.extend({
        layout: {left: 1, top: 170, width: 60},
        title: '0'
    }),

    dot: Flame.ButtonView.extend({
        layout: {left: 63, top: 170, width: 30},
        title: '.'
    })


    
});
