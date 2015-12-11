define('app/controllers/template_edit', ['ember'],
    //
    //  Template Edit Controller
    //
    //  @returns Class
    //
    function () {

        'use strict';

        return Ember.Object.extend({

            //
            //  Properties
            //

            template: null,
            newName: '',
            newDescription: '',
            formReady: null,


            //
            //  Methods
            //

            open: function (template) {
                this.setProperties({
                    template: template,
                    newName: template.name,
                    newDescription: template.description
                });
                this._updateFormReady();
                this.view.open();
            },

            close: function () {
                this.view.close();
            },

            save: function () {
                if (this.formReady) {
                    var that = this;
                    Mist.templatesController.renameTemplate({
                        template: this.get('template'),
                        newName: this.get('newName'),
                        newDescription: this.get('newDescription'),
                        callback: function (success) {
                            if (success)
                                that.close();
                        }
                    });
                }
            },

            _updateFormReady: function () {
                var formReady = false;
                if (this.template &&
                    ((this.newName != this.template.name) ||
                    (this.newDescription != this.template.description))) {
                    formReady = true;
                }
                this.set('formReady', formReady);
            },

            //
            //  Observers
            //

            formObserver: function () {
                Ember.run.once(this, '_updateFormReady');
            }.observes('newName', 'newDescription')
        });
    }
);
