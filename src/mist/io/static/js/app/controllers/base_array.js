define('app/controllers/base_array', ['ember'],
    //
    //  Base Array Controller
    //
    //  @returns Class
    //
    function () {

        'use strict';

        return Ember.ArrayController.extend(Ember.Evented, {


            //
            //
            //  Properties
            //
            //


            model: null,
            content: null,
            passOnProperties: [],


            //
            //
            //  Computed Properties
            //
            //


            selectedObjects: function () {
                return this.filterBy('selected', true);
            }.property('@each.selected'),


            //
            //
            //  Initialization
            //
            //


            load: function () {
                this.setProperties({
                    loading: true,
                    content: new Array(),
                });
            }.on('init'),


            //
            //
            //  Public Methods
            //
            //


            setContent: function (content) {
                if (!content)
                    content = [];
                this.get('passOnProperties').forEach(function (property) {
                    content.setEach(property, this.get(property));
                }, this);
                this._updateContent(content);
                this.set('loading', false);
            },


            getObject: function (id) {
                return this.get('content').findBy('id', id);
            },


            objectExists: function (id) {
                return !!this.getObject(id);
            },


            //
            //
            //  Private Methods
            //
            //


            _updateContent: function (content) {

                Ember.run(this, function () {
                    // Remove deleted objects
                    this.get('content').forEach(function (object) {
                        if (!content.findBy('id', object.id))
                            this._deleteObject(object);
                    }, this);

                    // Update existing objects or add new ones
                    content.forEach(function (object) {
                        if (this.objectExists(object.id)) {
                            this._updateObject(object);
                        } else {
                            this._addObject(object);
                        }
                    }, this);

                    this.trigger('onChange');
                });
            },


            _addObject: function (object) {
                Ember.run(this, function () {
                    this.addObject(this.get('model').create(object));
                    this.trigger('onAdd', {
                        object: object
                    });
                });
            },


            _deleteObject: function (object) {
                Ember.run(this, function () {
                    this.removeObject(object);
                    this.trigger('onDelete', {
                        object: object
                    });
                });
            },


            _updateObject: function (object) {
                Ember.run(this, function () {
                    this.getObject(object.id).update(object);
                    this.trigger('onUpdate', {
                        object: object
                    });
                });
            },


            //
            //
            //  Observers
            //
            //


            selectedObserver: function () {
                Ember.run.once(this, function () {
                    this.trigger('onSelectedChange');
                });
            }.observes('content.@each.selected')
        })
    }
);
