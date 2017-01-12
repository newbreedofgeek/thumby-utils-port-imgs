var request = require('request');
var JsonFile = require('jsonfile');
var sleep = require('sleep');

// config
var sleepBetweenEachUpload = 3; // in seconds
var thumbyThumbsCreateRoot = 'http://thumby.yourhost.com/thumbs/create'; // you thumby server url
var batchFileName = 'datafiles/data_published_0.json'; // the json batch file to save, the image array obj needs to be in a "items" prop in that file's root
// e.g format
// "items": [
//   {
//     "img": "https://wisdomtoinspire-wisdom-imgs.s3.amazonaws.com/EJedKcTqee.jpg"
//   },
//   {
//     "img": "https://wisdomtoinspire-wisdom-imgs.s3.amazonaws.com/VkeMcqT9lx.jpg"
//   }
// ]

var fetchAndSave = function(url, cb) {
  console.log('fetchAndSave: upload request sent for ' + url);

  request.post({url:thumbyThumbsCreateRoot, formData: {
      attachments: [
        request.get(url)
      ]
    }}, function(err, res, body) {
      if (err) {
        return console.error('fetchAndSave: upload failed on ' + url + ' err :', err);
      }
      cb('fetchAndSave: Upload successful on ' + url + '!  Server responded with: ' + body);
  });
};

function goSave(batchOfItems, firstItem) {
  if (!firstItem) {
    batchOfItems.shift();
  }

  if (batchOfItems.length > 0) {
    var item = batchOfItems[0];
    var nextImg = item.img.replace('https', 'http');
    console.log('\n# '+(++imgIndex)+' lets upload next item which is ' + nextImg);
    console.log('...........');

    fetchAndSave(nextImg, function(m) {
      console.log(m);
      console.log('...........');

      sleep.sleep(sleepBetweenEachUpload);
      goSave(batchOfItems);
    })
  }
  else {
    console.log('\nProcessing done\n');
  }
}

function batchSave(batchFile) {
  var batchOfItems = JsonFile.readFileSync(batchFile).items;

  console.log('\nReady to start processing the batch of ' + batchOfItems.length + ' items\n');

  goSave(batchOfItems, true);
}

var imgIndex = 0;
batchSave(batchFileName); // start the batch upload
