//
//  PhonegapActionSheet.js
//
// Created by Olivier Louvignes on 11/27/2011.
//
// Copyright 2011 Olivier Louvignes. All rights reserved.
// MIT Licensed

Ext.define('Ext.ux.PhonegapActionSheet', {

	override: 'Ext.ActionSheet',

	pluginItems: [],
	pluginConfig: {},
	pluginItemsConfig: [],

	constructor: function(config) {
        if(window['plugins'] && window.plugins.hasOwnProperty('actionSheet')) {
			// Initialize on create() & reset
			this.pluginItems = [];
			this.pluginConfig = {};
			this.pluginItemsConfig = [];
			// Add items
			if(config.hasOwnProperty('items')) this.add(config.items);
			return this;
		} else {
			return this.callParent([config]);
		}
    },

	// ST only
	add: function(newItems) {
		if(window['plugins'] && window.plugins.hasOwnProperty('actionSheet')) {
			var self = this;
			// Only prepare the object here
			Ext.Array.each(newItems, function(value, key) {
				if(value.hasOwnProperty('text')) {
					self.pluginItems.push(value.text);
					self.pluginItemsConfig.push(value);
					if(value.hasOwnProperty('ui')) {
						if(value.ui == 'decline') self.pluginConfig.destructiveButtonIndex = self.pluginItems.length - 1;
						else if(value.ui == 'action') self.pluginConfig.cancelButtonIndex = self.pluginItems.length - 1; // ?
					}
				}
			});
		} else {
			return this.callParent([newItems]);
		}
	},

	show: function() {
		if(window['plugins'] && window.plugins.hasOwnProperty('actionSheet')) {
			var self = this;
			// Execute actual exec here
			// ST does not support title
			var callback = function(buttonValue, buttonIndex) {
				var item = self.pluginItemsConfig[buttonIndex];
				if(item.hasOwnProperty('handler')) {
					item.handler.call(item['scope'] || null, buttonValue, buttonIndex);
				}
			};
			return window.plugins.actionSheet.create('', self.pluginItems, callback, self.pluginConfig);
		} else {
			return this.callParent([]);
		}
	},

	// ST only
	'hide': function() {
		if(window['plugins'] && window.plugins.hasOwnProperty('actionSheet')) {
			// Not implemented
			return false;
		} else {
			return this.callParent();
		}
	}

});
