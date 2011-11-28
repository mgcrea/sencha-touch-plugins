//
//  PhonegapMessageBox.js
//
// Created by Olivier Louvignes on 11/26/2011.
//
// Copyright 2011 Olivier Louvignes. All rights reserved.
// MIT Licensed

Ext.define('Ext.ux.PhonegapMessageBox', {

	override: 'Ext.MessageBox',

	alert: function(title, msg, fn, scope) {
		if(window['plugins'] && window.plugins.hasOwnProperty('messageBox')) {
			return window.plugins.messageBox.alert(title, msg, fn, scope);
		} else {
			return this.callParent([title, msg, fn, scope]);
		}
	},

	confirm: function(title, msg, fn, scope) {
		if(window['plugins'] && window.plugins.hasOwnProperty('messageBox')) {
			return window.plugins.messageBox.confirm(title, msg, fn, scope);
		} else {
			return this.callParent([title, msg, fn, scope]);
		}
	},

	prompt: function(title, msg, fn, scope, multiLine, value, promptConfig) {
		if(window['plugins'] && window.plugins.hasOwnProperty('messageBox')) {
			// value&multiLine not supported yet
			promptConfig = promptConfig || {};
			// scope moved to promptConfig
			promptConfig.scope = scope || null;
			return window.plugins.messageBox.prompt(title, msg, fn, promptConfig);
		} else {
			return this.callParent([title, msg, fn, scope, multiLine, value, promptConfig]);
		}
	}

});
