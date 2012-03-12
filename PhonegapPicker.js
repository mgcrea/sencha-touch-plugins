//
//  PhonegapPicker.js
//
// Created by Olivier Louvignes on 11/27/2011.
//
// Copyright 2011 Olivier Louvignes. All rights reserved.
// MIT Licensed

Ext.define('Ext.ux.PhonegapPicker', {

	override: 'Ext.picker.Picker',

	pluginItems: [],
	pluginConfig: {},
	pluginItemsConfig: [],

	constructor: function(config) {
		d&&console.log(Ext.getDisplayName(arguments.callee), [this, arguments]);

		this.pluginEnabled = Ext.os.is.iOS && window['plugins'] && window.plugins.hasOwnProperty('pickerView');
		if(this.pluginEnabled) {
			// Initialize on create() & reset
			this.pluginItems = [];
			this.pluginConfig = {};
			config.hidden = true;
			return this.callParent(arguments);
		} else {
			return this.callParent(arguments);
		}
	},

	// Define default value
	setValue: function(values) {
		d&&console.log(Ext.getDisplayName(arguments.callee), [this, arguments]);
		var self = this;
		if(this.pluginEnabled) {
			for (var key in self.pluginItems) {
				var slot = self.pluginItems[key];
				if(values.hasOwnProperty(slot.name)) slot.value = values[slot.name];
			}
			return this.callParent(arguments);
		} else {
			return this.callParent(arguments);
		}
	},

	// ST only
	add: function(newItems) {
		d&&console.log(Ext.getDisplayName(arguments.callee), [this, arguments]);

		if(_.isArray(newItems) && this.getId().match(/ext-datepicker/) && App.locale.config.locale == 'fr') {
			newItems = [newItems[1], newItems[0], newItems[2]];
		}

		if(this.pluginEnabled && Ext.isArray(newItems)) {
			var self = this,
				newItem;

			// Only prepare the object here
			Ext.Array.each(newItems, function(item, key) {
				// Classic add
				if(item.hasOwnProperty('data') && item.data.length) {
					// Push item to phonegap
					newItem = {
						name: item.name,
						value: item.value,
						title: item.label,
						data: item.data
					};
					// Push item to phonegap
					self.pluginItems.push(newItem);
				}
				else if(item.hasOwnProperty('store')) { console.warn(item);
					newItem = {
						name: item.name,
						value: item.value,
						title: item.label,
						data: _.map(item.store.data.items, function(value, key) { return value.data; })
					};
					// Push item to phonegap
					self.pluginItems.push(newItem);
				}
			});
			return this.callParent(arguments);
		} else {
			return this.callParent(arguments);
		}
	},

	show: function() {
		console.warn(Ext.getDisplayName(arguments.callee), [this, arguments]);
		if(this.pluginEnabled) {
			var self = this;
			// Execute actual exec here
			// ST does not support global title
			var callback = function(selectedValues, buttonIndex) {
				console.warn('Ext.ux.PhonegapPicker::callback', [this, arguments]);
				if(buttonIndex !== 0) {
					//self.setValue(selectedValues);
					//self.onDoneButtonTap();
					self.fireEvent('change', this, selectedValues);
					self.hide();
				}
			};
			console.warn('create', [self, self.pluginItems, callback, self.pluginConfig]);
			return window.plugins.pickerView.create(null, self.pluginItems, callback, self.pluginConfig);
		} else {
			return this.callParent(arguments);
		}
	},

	// ST only
	'hide': function() {
		if(this.pluginEnabled) {
			// Not implemented
			return false;
		} else {
			return this.callParent(arguments);
		}
	}

});
