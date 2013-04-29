Imadaem for Zepto —  JS Daemon for Responsive Images
=============

_Imadaem_ is a javascript daemon for responsive images with [Timthumb](http://code.google.com/p/timthumb/) as [Zepto](http://zeptojs.com/) plugin.

Imadaem replaces the placeholder image by the dedicated size image on every significant browser event: load, resize. The website _feels_ pretty fast. The visitor sees the low quality file nearly immediately and can start to interact with the site: scroll, zoom, etc. After the right resolution file is loaded, all the visitor maybe notices is the blurry image gets sharp.

The small overhead by loading two images instead of one is negligible. In return you get low latency user experience.

Visitors with no javascript still see everything as long as you provide sufficient placeholders.

## Reason

Read what wise men think about the technique Imadaem provides:

* _[Introducing LQIP — Low Quality Image Placeholders](http://www.guypo.com/feo/introducing-lqip-low-quality-image-placeholders/)_ by Guy Podjarny, Chief Product Architect at Akamai
* _[I ♥ Image Bytes](http://www.stevesouders.com/blog/2013/04/26/i/)_ by Steve Souders, Head Performance Engineer at Google
* _[Cheating or Good Design?](http://www.usabilitypost.com/2012/05/31/cheating-or-good-design/)_ by Dmitry Fadeyev, Creator of Usaura

## Examples

Visit one of following sites, resize your browser’s window and see what happens to images.

* My [personal website](http://penibelst.de/). My portrait’s height follows the header’s height. The portrait’s aspect ratio is limited to 2.
* _[Geisterstunden](http://geisterstunden.com/)_ — graffiti illustrated stories in German. All images are ratio-driven. The website is hosted on a cheap 1&1 hosting.

## Setup

You can make things run in 15 minutes.

### Dependencies

* PHP library [Timthumb](http://code.google.com/p/timthumb/) (GPL license)
* Javascript library [Zepto](http://zeptojs.com/) (MIT license)

### 1. Timthumb

Download the _[timthumb.php](http://code.google.com/p/timthumb/)_ file and put it on your server. Follow the official [instruction](http://www.binarymoon.co.uk/2010/08/timthumb/). You can put your default options inside the _timthumb-config.php_ file. For questions read the documentation inside of _timthumb.php_.

**Make sure you can resize an image before next steps.**

### 2. Zepto

Download the _[zepto.js](http://zeptojs.com/)_ file and put it on your server.

### 3. Imadaem
Download the _[zepto.imadaem.js](https://github.com/penibelst/imadaem-zepto)_ file and put it on your server.

### 4. Javascript in HTML

You must put the 3 files from the previous steps into the include definition.
````html
<script src='/path/to/zepto.js' type='application/javascript'></script>
<script src='/path/to/zepto.imadaem.js' type='application/javascript'></script>
<script type='text/javascript'>
    $(function() {
        $(document).imadaem({
            "timthumbPath": "/path/to/timthumb.php"
        });
    });
</script>
````
Learn the available javascript options in the API description.

### 5. Data in Images

Add `data-url` attribute with the path to the original image. Change the `src` attribute to a placeholder image, e. g. a low quality version.
````html
<img
    alt='Image'
    src='/path/to/image-placeholder.jpg'
    data-url='/path/to/image-original.jpg'
/>
````
Learn the available data options in the API description.

## API

### Javascript Options

Options you can pass to the initialization call.

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Meaning</th>
      <th>Values</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><var>timthumbPath</var></td>
      <td>Path to Timthumb script</td>
      <td><var>string</var></td>
      <td><code>/timthumb/timthumb.php</code></td>
    </tr>
    <tr>
      <td><var>verticalRhythm</var></td>
      <td>Keep image height according to a vertical scale</td>
      <td><code>null</code>, <code>line-height</code></td>
      <td><code>null</code></td>
    </tr>
    <tr>
      <td><var>dataUrl</var></td>
      <td>Data attribute that holds the original image’s URL</td>
      <td><var>string</var></td>
      <td><code>url</code></td>
    </tr>
  </tbody>
</table>

### Data Options

Options you can pass to every image by adding data attributes. Only the `data-url` is required. Without it Imadaem will not affect the image.

<table>
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Meaning</th>
      <th>Values</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><var>url</var></td>
      <td>Path to the original</td>
      <td><var>string</var></td>
      <td><code>data-url='/path/to/image.jpg'</code></td>
    </tr>
    
    <tr>
      <td><var>gravity</var></td>
      <td>Position of the most important piece</td>
      <td><code>l</code>, <code>r</code>,
        <code>t</code>, <code>tl</code>, <code>tr</code>,
        <code>b</code>, <code>bl</code>, <code>br</code>
      </td>
      <td><code>data-gravity='tr'</code></td>
    </tr>

    <tr>
      <td><var>ratio</var></td>
      <td>Aspect ratio</td>
      <td><var>number</var></td>
      <td><code>data-ratio='1.5'</code></td>
    </tr>

    <tr>
      <td><var>max-ratio</var></td>
      <td>Maximum aspect ratio</td>
      <td><var>number</var></td>
      <td><code>data-max-ratio='2.4'</code> If ratio is set, max-ratio is ignored.</td>
    </tr>
    
    <tr>
      <td><var>height-guide</var></td>
      <td>Element to copy the height from. ID, class or tag.</td>
      <td><var>string</var></td>
      <td><code>data-height-guide='#header'</code></td>
    </tr>

  </tbody>
</table>


## License
Released under the [MIT license](http://opensource.org/licenses/MIT)

Copyright © 2013 [Anatol Broder](http://penibelst.de/)
