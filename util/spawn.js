var spawn = require('child_process').spawn,
	util = require('util'),
	_c = require('chalk');

module.exports = function execute(command, args, options, messages) {

	if (typeof command === 'undefined') throw new TypeError('A command must be specified.');

	if (!util.isArray(args)) {
		messages = options;
		options = args;
		args = undefined;
	}
	if (typeof options !== 'undefined' &&
		!(typeof options.start === 'undefined' &&
		  typeof options.error === 'undefined' &&
		  typeof options.success === 'undefined')
	) {
		messages = options;
		options = undefined;
	}

	if (typeof messages === 'undefined') messages = {};

	if (typeof messages.start !== 'undefined') console.log(messages.start);

	var p = spawn(command, args, options);

	p.on('error', function(err) {
		if (typeof messages.error !== 'undefined') {
			console.error(_c.red(messages.error), err);
		} else {
			console.error(err);
		}
	});

	p.on('close', function() {
		if (typeof messages.success !== 'undefined') {
			console.log(_c.green(messages.success));
		}
	});

	return p;
};
