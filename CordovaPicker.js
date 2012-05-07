//
//  CordovaPicker.js
//
// Created by Olivier Louvignes on 11/27/2011.
// Added Cordova support on 09/04/2012.
//
// Copyright 2011 Olivier Louvignes. All rights reserved.
// MIT Licensed

window.Cordova = window.cordova;

if(Ext && typeof(Ext.map) == "undefined") {
	var nativeMap = Array.prototype.map;
	Ext.map = function(obj, iterator, context) {
		var results = [];
		if (obj == null) return results;
		if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
		each(obj, function(value, index, list) {
			results[results.length] = iterator.call(context, value, index, list);
		});
		if (obj.length === +obj.length) results.length = obj.length;
		return results;
	};
}

Ext.define('Ext.ux.CordovaPicker', {

	override: 'Ext.picker.Picker',

	pluginItems: [],
	pluginConfig: {},
	pluginItemsConfig: [],

	constructor: function(config) {
		config = config || {};

		// Local alias
		this.cordovaPicker = Ext.os.is.iOS && window.plugins && window.plugins.pickerView ? window.plugins.pickerView : false;

		if(this.cordovaPicker) {
			// Initialize on create&reset
			this.pluginItems = [];
			this.pluginConfig = {};
			this.pluginItemsConfig = [];
			this.pluginWasHidden = !!config.hidden;
			this.pluginIsHidden = true;

			config.useTitles = false;
			config.hidden = true;

			if(config.value) {
				this.pluginValue = config.value;
				delete config.value;
			}
		}

		return this.callParent(arguments);
	},

	// Define default value
	setValue: function(values) {
		//console.log(Ext.getDisplayName(arguments.callee), [this, arguments]);
		var me = this;

		if(this.cordovaPicker) {
			for (var key in me.pluginItems) {
				var slot = me.pluginItems[key];
				if(values.hasOwnProperty(slot.name)) slot.value = values[slot.name];
			}
		}

		this.callParent(arguments);
	},

	// ST only
	add: function(newItems) {
		//console.log(Ext.getDisplayName(arguments.callee), [this, arguments]);
		this.callParent(arguments);

		if(this.cordovaPicker) {
			var me = this;
			newItems = Ext.Array.from(newItems);

			// Only prepare objects here
			Ext.Array.each(newItems, function(item, key) {
				if(item.hasOwnProperty('data') && item.data.length) {
					// Push item to plugin
					newItem = {
						name: item.name,
						value: item.value,
						title: item.label,
						data: item.data
					};
					// Push item to plugin
					me.pluginItems.push(newItem);
				} else if(item.hasOwnProperty('store')) {
					newItem = {
						name: item.name,
						value: item.value,
						title: item.label,
						data: Ext.map(item.store.data.items, function(value, key) { return value.data; })
					};
					// Push item to plugin
					me.pluginItems.push(newItem);
				}
			});

			if(this.pluginValue) {
				this.setValue(this.pluginValue);
			}

			if(!this.pluginWasHidden && me.pluginItems.length) {
				this.show();
			}

		}

	},

	show: function() {
		//console.log(Ext.getDisplayName(arguments.callee), [this, arguments]);
		var me = this;

		if(this.cordovaPicker) {
			if(!this.pluginIsHidden) return false;
			this.pluginIsHidden = false;
			// Execute actual exec here
			// @info ST does not support title
			var callback = function(selectedValues, buttonIndex) {
				this.pluginIsHidden = true;
				if(buttonIndex !== 0) {
					if(me instanceof Ext.picker.Date) {
						selectedValues = me.getValue();
					}
					me.fireEvent('change', me, selectedValues);
					me.hide();
				}
			};

			return window.plugins.pickerView.create(null, me.pluginItems, callback, me.pluginConfig);
		} else {
			return this.callParent(arguments);
		}
	},

	'hide': function() {
		if(this.cordovaPicker) {
			this.pluginIsHidden = true;
			return false;
		} else {
			return this.callParent(arguments);
		}
	}

});
