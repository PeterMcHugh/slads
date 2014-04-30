!function(a,b){"use strict";void 0!==b&&b.initialize("wHOusfpG1kv1wus81ORw8FNwW7V7NP3qXQMfSYdP","LNTVdhY79CqOwTC8xc1m6FVUN71WsrjFFYMsctuK");var c=a.module("sladsApp",["ngSanitize","ngRoute","mgcrea.ngStrap","parse-angular","parse-angular.enhance"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/main",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/modal",{templateUrl:"views/modal.html"}).otherwise({redirectTo:"/"})}]);c.factory("parseService",function(){return{login:function(a,c,d){b.User.logIn(a,c,d)},logout:function(){b.User.logOut()},currentUser:b.User.current}}),c.run(["$rootScope","$location","parseService",function(a,b,c){a.$on("$routeChangeStart",function(a){null===c.currentUser()&&(a.preventDefault(),b.path("/"))}),a.$watch(c.currentUser,function(a){a||b.path("/")})}])}(this.angular,this.Parse),function(a,b){"use strict";var c=a.module("sladsApp");c.controller("MainCtrl",["$scope","$location","parseService","$modal",function(a,c,d,e){a.currentUser=d.currentUser(),a.players=[],a.matches=[];var f=b.Object.extend({className:"Player",attrs:["firstName","lastName"]}),g=function(){var c=new b.Query(f);c.find().then(function(b){a.players=b})};g();var h=b.Object.extend({className:"Match",attrs:["winner","loser"]}),i=function(){var c=new b.Query(h);c.include("winner","loser"),c.find().then(function(b){a.matches=b})};i();var j=function(a){return a.getFirstName()+" "+a.getLastName()},k=function(){a.ladder=[];var b=a.players.map(function(b){var c={name:j(b)};return c.wins=a.matches.reduce(function(a,c){return c.getWinner().id===b.id?a+1:a},0),c.for=a.matches.reduce(function(a,c){return c.getWinner().id===b.id?a+c.get("winner_goals"):c.getLoser().id===b.id?a+c.get("loser_goals"):a},0),c.losses=a.matches.reduce(function(a,c){return c.getLoser().id===b.id?a+1:a},0),c.against=a.matches.reduce(function(a,c){return c.getLoser().id===b.id?a+c.get("winner_goals"):c.getWinner().id===b.id?a+c.get("loser_goals"):a},0),c.gd=c.for-c.against,c.played=c.wins+c.losses,c.wp=Math.round(c.wins/c.played*1e4)/100,c});b.sort(function(a,b){return b.wp-a.wp}),a.ladder=b};a.$watchCollection("matches",k),a.$watchCollection("players",k),a.playerName=j,a.openMatchModal=function(b){var c=a.$new();c.title="Match";var d=a.players.map(function(a){return{name:a.getFirstName()+" "+a.getLastName(),id:a.id}}),g=b?b.getWinner().id:void 0,j=b?b.getLoser().id:void 0,k=b?b.get("winner_goals"):0,l=b?b.get("loser_goals"):0,m=[{label:"Winner",type:"select",values:d,value:g},{label:"Points",type:"number",value:k},{label:"Loser",type:"select",values:d,value:j},{label:"Points",type:"number",value:l}];c.fields=m;var n=e({template:"views/modal.html",scope:c});c.save=function(a){var c=b||new h;c.set("winner_goals",a[1].value),c.set("loser_goals",a[3].value);var d=new f;d.id=a[0].value,c.set("winner",d);var e=new f;e.id=a[2].value,c.set("loser",e),c.save(null,{success:function(){i(),n.hide()}})}},a.openPlayerModal=function(b){var c=a.$new();c.title="Player";var d=b?b.getFirstName():void 0,h=b?b.getLastName():void 0,j=[{label:"First name",type:"text",value:d,placeholder:"First name"},{label:"Last name",type:"text",value:h,placeholder:"Last name"}];c.fields=j;var k=e({template:"views/modal.html",scope:c});c.save=function(a){var c=b||new f;c.set("firstName",a[0].value),c.set("lastName",a[1].value),c.save(null,{success:function(){g(),i(),k.hide()}})}},a.logout=function(){d.logout()}}])}(this.angular,this.Parse),function(a){"use strict";var b=a.module("sladsApp");b.controller("LoginCtrl",["$scope","$location","parseService",function(a,b,c){a.formError="",null!==c.currentUser()&&b.path("/main"),a.login=function(d,e){c.login(d,e,{success:function(){a.formError="",b.path("/main")},error:function(b,c){a.formError=c.message}})}}])}(this.angular);