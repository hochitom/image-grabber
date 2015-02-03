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
-p Name of the folder where the images will be stored (optional)
-t Time when the image will be grabbed (optional, Default: 12:00:00, Format: hh:mm:ss)
-w Weekdays when the image will be grabbed (optional, Default: 0-6)
-d Specific Day of month (optional, Options: 1-31)
-m Specific Month (optional, Options: 0-11)
-z Timezone (optional, Default: Europe/Vienna)
