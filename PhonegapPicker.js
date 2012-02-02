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
		console.warn(Ext.getDisplayName(arguments.callee), [this, arguments]);

		this.pluginEnabled = true;//window['plugins'] && window.plugins.hasOwnProperty('pickerView');
		if(this.pluginEnabled) {
			// Initialize on create() & reset
			this.pluginItems = [];
			this.pluginConfig = {};
			// Add items
			//if(config.hasOwnProperty('slots')) this.add(config.slots);
			return this.callParent([config]);
		} else {
			return this.callParent([config]);
		}
	},

	// pr3 broke this
	// probably because of add()
	updateUseTitles: function() {
		console.warn(Ext.getDisplayName(arguments.callee), [this, arguments]);
		if(this.pluginEnabled) {
			// do nothing
		} else {
			return this.callParent(arguments);
		}
	},

	// Define default value
	setValue: function(values) {
		console.warn(Ext.getDisplayName(arguments.callee), [this, arguments]);
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
		console.warn(Ext.getDisplayName(arguments.callee), [this, arguments]);
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
			return this.callParent([newItems]);
		} else {
			return this.callParent([newItems]);
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
			return this.callParent([]);
		}
	},

	// ST only
	'hide': function() {
		if(this.pluginEnabled) {
			// Not implemented
			return false;
		} else {
			return this.callParent();
		}
	}

});
