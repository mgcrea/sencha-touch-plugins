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

	alert: function(title, msg, fn, scope) {

		if(window.plugins && window.plugins.hasOwnProperty('messageBox')) {
			return window.plugins.messageBox.alert(title, msg, fn, scope);
		} else {
			return this.callParent(arguments);
		}
	},

	confirm: function(title, msg, fn, scope) {
		if(window.plugins && window.plugins.hasOwnProperty('messageBox')) {
			return window.plugins.messageBox.confirm(title, msg, fn, scope);
		} else {
			return this.callParent(arguments);
		}
	},

	prompt: function(title, msg, fn, scope, multiLine, value, promptConfig) {
		if(Ext.os.is.iOS && window.plugins && window.plugins.hasOwnProperty('messageBox')) {
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
