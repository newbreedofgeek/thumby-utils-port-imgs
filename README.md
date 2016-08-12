# thumby-utils-port-imgs

this script will let your post your images from your existing image server to a thumby server. I used it to move all my images from AWS S3 to my installation of thumby.


- edit the config to specify server paths etc
- `imgs.json` file holds the list of image names you want ported. ideally you generate this file by doing a database query on your existing database to extract the public www locations of you existing images. you have to maintain the file format
- tip: set `skipImgTs` to `true` in your thumby config so that the image names are maintained (by default thumby adds a timestamp to the start of the uploaded image name) - this was you can just run a database query to update the image paths
