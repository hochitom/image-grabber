# image-grabber

this is a single node service which grabs a image from a given domain and saves it to your local filesystem every 5 minutes.

## usage

```
git clone https://github.com/hochitom/image-grabber.git
cd image-grabber
npm install
node cli.js -f http://www.ochnerbauer.at/webcam/webcam.jpg -d someFolderName
```

<ul>
<li><strong>f</strong> Link to an image (required)</li>
<li><strong>p</strong> Name of the folder where the images will be stored (optional)</li>
<li><strong>t</strong> Time when the image will be grabbed (optional, Default: 12:00:00, Format: hh:mm:ss)</li>
<li><strong>w</strong> Weekdays when the image will be grabbed (optional, Default: 0-6)</li>
<li><strong>d</strong> Specific Day of month (optional, Options: 1-31)</li>
<li><strong>m</strong> Specific Month (optional, Options: 0-11)</li>
<li><strong>z</strong> Timezone (optional, Default: Europe/Vienna)</li>
</ul>
