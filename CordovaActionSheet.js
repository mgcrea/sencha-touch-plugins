//
//  CordovaActionSheet.js
//
// Created by Olivier Louvignes on 11/27/2011.
// Added Cordova support on 09/04/2012.
//
// Copyright 2011 Olivier Louvignes. All rights reserved.
// MIT Licensed

Ext.define('Ext.ux.CordovaActionSheet', {

	override: 'Ext.ActionSheet',

	pluginItems: [],
	pluginConfig: {},
	pluginItemsConfig: [],

	constructor: function(config) {

		// Local alias
		this.cordovaActionSheet = window.plugins && window.plugins.actionSheet ? window.plugins.actionSheet : true;

        if(this.cordovaActionSheet) {
			// Initialize on create&reset
			this.pluginItems = [];
			this.pluginConfig = {};
			this.pluginItemsConfig = [];

			return this.callParent(arguments);
		} else {
			return this.callParent(arguments);
		}
    },

	add: function(newItems) {
		if(this.cordovaActionSheet) {
			var me = this;
			newItems = Ext.Array.from(newItems);

			Ext.Array.each(newItems, function(value, key) {
				if(value.hasOwnProperty('text')) {
					me.pluginItems.push(value.text);
					me.pluginItemsConfig.push(value);
					if(value.hasOwnProperty('ui')) {
						if(value.ui == 'decline') me.pluginConfig.destructiveButtonIndex = me.pluginItems.length - 1;
						else if(value.ui == 'action') me.pluginConfig.cancelButtonIndex = me.pluginItems.length - 1;
						// @todo value.ui == 'confirm'
					}
				}
			});

			if(!this.getHidden()) {
				this.show();
			}

		} else {
			return this.callParent(arguments);
		}
	},

	show: function() {
		if(this.cordovaActionSheet) {
			var me = this;
			// Execute actual exec here
			// @info ST does not support title
			var callback = function(buttonValue, buttonIndex) {
				var selectedButtonConfig = me.pluginItemsConfig[buttonIndex];
				if(selectedButtonConfig.hasOwnProperty('handler')) {
					selectedButtonConfig.handler.call(selectedButtonConfig.scope || null, buttonValue, buttonIndex);
				} else if(me.getDefaults().hasOwnProperty('handler')) {
					me.getDefaults().handler.call(me.getDefaults().scope || null, buttonValue, buttonIndex);
				}
			};
			return this.cordovaActionSheet.create('', me.pluginItems, callback, me.pluginConfig);
		} else {
			return this.callParent(arguments);
		}
	},

	'hide': function() {
		if(window['plugins'] && window.plugins.hasOwnProperty('actionSheet')) {
			// @todo
			return false;
		} else {
			return this.callParent(arguments);
		}
	}

});
