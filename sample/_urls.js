
var urlFake = {
	/* 用户相关 */
	"zsLogin": "fake/login.json", 
    "login": "fake/login.json", 
    "logout": "fake/login.json", 
    "allow": "fake/allow.json", 
    "getCode": "fake/code.json", 
    "sendSms": "fake/code.json", 
    "resetPwd": "fake/resetpwd.json", 

    "saveSellerChangePriceAgain":"fake/saveSellerChangeAgain.json"
};
function toFake(url, method) {
	var fake = url || "";
	fake = (fake.indexOf("loadData") > -1) ? "/fake/loaddata.json" : "/fake/otherdata.json";
	return fake;
}
// function(url, method) { return urlFake[url] || url },
module.exports = {
	get: toFake
};