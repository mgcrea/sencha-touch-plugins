//
//  CordovaMessageBox.js
//
// Created by Olivier Louvignes on 11/26/2011.
// Added Cordova support on 09/04/2012.
//
// Copyright 2011 Olivier Louvignes. All rights reserved.
// MIT Licensed

Ext.define('Ext.ux.CordovaMessageBox', {

	override: 'Ext.MessageBox',

	constructor: function() {

		// Local alias
		this.cordovaPlugin = Ext.os.is.iOS && window.plugins && window.plugins.messageBox ? window.plugins.messageBox : false;

		return this.callParent(arguments);
	},

	alert: function(title, msg, fn, scope) {

		if(this.cordovaPlugin) {
			return window.plugins.messageBox.alert(title, msg, fn, scope);
		} else {
			return this.callParent(arguments);
		}
	},

	confirm: function(title, msg, fn, scope) {
		if(this.cordovaPlugin) {
			return window.plugins.messageBox.confirm(title, msg, fn, scope);
		} else {
			return this.callParent(arguments);
		}
	},

	prompt: function(title, msg, fn, scope, multiLine, value, promptConfig) {
		if(this.cordovaPlugin) {
			// value&multiLine not supported yet
			promptConfig = promptConfig || {};
			// scope moved to promptConfig
			promptConfig.scope = scope || null;
			return window.plugins.messageBox.prompt(title, msg, fn, promptConfig);
		} else {
			return this.callParent(arguments);
		}
	}

});
