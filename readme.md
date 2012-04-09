# Sencha Touchs Plugins #
by `Olivier Louvignes`

## DESCRIPTION ##

This repository contains several plugins for Sencha Touch 2.0, for now most of them are graceful native upgrades for iOS.

* Ext.ux.CordovaMessageBox : graceful upgrade to native `UIAlertView`. Cordova counterpart [here](https://github.com/mgcrea/phonegap-plugins/tree/master/iOS/MessageBox).

* Ext.ux.CordovaActionSheet : graceful upgrade to native `UIActionSheet`. Cordova counterpart [here](https://github.com/mgcrea/phonegap-plugins/tree/master-actionsheet/iOS/ActionSheet).

* Ext.ux.CordovaPicker : graceful upgrade to native `UIPickerView`. Cordova counterpart [here](https://github.com/mgcrea/phonegap-plugins/tree/master-pickerview/iOS/PickerView).

## SETUP ##

Using graceful upgrades plugins requires [iPhone PhoneGap](https://github.com/cordova/cordova-ios).

1. Make sure your Xcode project has been [updated for Cordova](https://github.com/apache/incubator-cordova-ios/blob/master/guides/Cordova%20Upgrade%20Guide.md)
2. Follow setup instructions concerning the Cordova counterpart you will need.
3. Just include the .js file.

## JAVASCRIPT INTERFACE ##

Since it gracefully upgrade to native objects, the javascript interface should remain the same.

However some Sencha Touch properties/methods are not yet implemented into the Cordova Plugin counterparts.

### CordovaActionSheet ###

	Ext.application({

		name: 'CordovaActionSheet',

		launch: function() {

			var actionSheet = Ext.create('Ext.ActionSheet', {
				hidden: true,
				defaults: {
					handler: function(buttonValue, buttonIndex) {
						console.warn('handler(), arguments=' + Array.prototype.slice.call(arguments).join(', '));
					}
				},
				items: [
				{
					text: 'Delete draft',
					ui  : 'decline'
				},
				{
					text: 'Save draft'
				},
				{
					text: 'Cancel',
					ui  : 'action'
				}
				]
			});

			Ext.Viewport.add(actionSheet);
			actionSheet.show();

		}

	});

### CordovaMessageBox ###

	Ext.application({

		name: 'CordovaMessageBox',

		launch: function() {

			var callback = function() {
				console.warn('callback(), arguments=' + Array.prototype.slice.call(arguments).join(', '));
			};

			Ext.Msg.alert('Alert', 'The quick brown fox jumped over the lazy dog.', callback);

			Ext.Msg.confirm('Confirm', 'The quick brown fox jumped over the lazy dog.', callback);

			Ext.Msg.prompt('Prompt', 'The quick brown fox jumped over the lazy dog.', callback);

		}

	});

### CordovaPicker ###

	Ext.application({

		name: 'CordovaPicker',

		launch: function() {

			var callback = function() {
				console.warn('callback(), arguments=' + Array.prototype.slice.call(arguments).join(', '));
			};

			setTimeout(function() {

				var picker = Ext.create('Ext.Picker', {
					slots: [
						{
							name : 'limit_speed',
							title: 'Speed',
							data : [
								{text: '50 KB/s', value: 50},
								{text: '100 KB/s', value: 100},
								{text: '200 KB/s', value: 200},
								{text: '300 KB/s', value: 300}
							]
						}
					]
				});

				picker.on({change: function(picker, selectedValues, options, event) { console.warn('callback', arguments); }});
				Ext.Viewport.add(picker);
				picker.show();

				return;

				var datePicker = Ext.create('Ext.picker.Date', {
					value: new Date(),
					slotOrder: ["day", "month", "year"]
				});

				datePicker.on({change: function(picker, value, options, event) { console.warn('callback', arguments); }});
				Ext.Viewport.add(datePicker);
				datePicker.show();

			}, 200);

		}

	});


## BUGS AND CONTRIBUTIONS ##

Patches welcome! Send a pull request.

Post issues on [Github](http://github.com/mgcrea/sencha-touch-plugins/issues)

The latest code will always be [here](http://github.com/mgcrea/sencha-touch-plugins)

## LICENSE ##

Copyright 2011 Olivier Louvignes. All rights reserved.

The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
