var CronJob = require('cron').CronJob;
var shell = require('shelljs');

new CronJob('* * * * * *', function() {


}, null, true, 'America/Los_Angeles');