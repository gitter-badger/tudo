var test  = require("tape");
var server = require('../server');
var mock_issues = require('./fixtures/issues.json');

test('Visit issues page', function(t){
  server.inject({url:'/issues', method:'GET'}, function(res){
    console.log(' - - - - - - - - - - - - - - - - - - - - -');
    console.log(res.payload);
    console.log(' - - - - - - - - - - - - - - - - - - - - -');
    t.ok(res.payload.indexOf('Priority') > -1, 'Issues page has the word "Priority"');
    server.stop(function(){});
    t.end();
  });
});

test('The 5 priority levels appear on the page', function(t){
  server.inject({url:'/issues', method:'GET'}, function(res){
    
    var priority_nums = [1,2,3,4,5];
    
    //passes each element in array as the 'level' into the callback
    //every returns true or false
    var all_present = priority_nums.every(function(level){
      return res.payload.indexOf('p' + level) > -1;
    })
    
    t.ok(all_present, 'All different priority levels are present');
  
    // t.ok(res.payload.indexOf('Priority') > -1, 'Issues page has the word "Priority"');
    server.stop(function(){});
    t.end();
  });
});

test.only('A specific issue is present in the priority 2 section', function(t){
  server.inject({url:'/issues', method:'GET'}, function(res){

    var start_index = res.payload.indexOf("Priority 2");
    var end_index = res.payload.indexOf("Priority", start_index + 1 );
    var priority2_substring = res.payload.slice(start_index, end_index);
    t.ok(priority2_substring.indexOf("bbb") > -1, "Issue with text bbb is present in Priorty 2 section");
    t.end();
  });
});





