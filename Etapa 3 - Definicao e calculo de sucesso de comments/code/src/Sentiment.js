var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var result = sentiment.analyze("I think this is an incredible app if you ALREADY understand coding and need to refresh or learn a little more. There is little to no explanation of WHY you are doing the actions the puzzles instruct you to take. Yes, I have made it to the 3rd major level but still have ABSOLUTELY NO IDEA what I'm doing. I am VERY sad to say this app doesn't teach coding. It's a fine app otherwise, no complaints, and I really enjoy using it, I'm just not learning anything.");
console.dir(result);
