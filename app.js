var request = require('request');

var fetchAndSave = function(url, cb) {
  request.post({url:'http://localhost:7000/thumbs/create', formData: {
      attachments: [
        request.get(url)
      ]
    }}, function(err, res, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      cb('Upload successful!  Server responded with: ' + body);
  });
};

fetchAndSave('http://wisdomtoinspire-wisdom-imgs.s3.amazonaws.com/S1UNjneP.jpg', function(m) {
  console.log(m);
})
