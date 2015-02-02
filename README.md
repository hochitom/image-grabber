# image-grabber

this is a single node service which grabs a image from a given domain and saves it to your local filesystem every 5 minutes.

## usage

```
git clone https://github.com/hochitom/image-grabber.git
cd image-grabber
npm install
node cli.js -f http://www.ochnerbauer.at/webcam/webcam.jpg -d someFolderName
```

-f Link to an image (required)
-d Name of the folder where the images will be stored (optional)
