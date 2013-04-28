Imadaem for Zepto
=============

_Imadaem_ is a javascript daemon for adaptive images with [Timthumb](http://code.google.com/p/timthumb/) as [Zepto](http://zeptojs.com/) plugin.

## Why?

Read what people think about the technique Imadaem provides:

* _[Introducing LQIP – Low Quality Image Placeholders](http://www.guypo.com/feo/introducing-lqip-low-quality-image-placeholders/)_ by Guy Podjarny, Chief Product Architect at Akamai
* _[I ♥ Image Bytes](http://www.stevesouders.com/blog/2013/04/26/i/)_ by Steve Souders, Head Performance Engineer at Google

## Example

Visit my [personal website](http://penibelst.de/). Resize your browser’s window it and see what happens.

## Setup

You can make things run in 15 minutes.

### Dependencies

* PHP library [Timthumb](http://code.google.com/p/timthumb/) (GPL2 license)
* Javascript library [Zepto](http://zeptojs.com/) (MIT license)

### 1. Timthumb

Download the _[timthumb.php](http://code.google.com/p/timthumb/)_ file and put it on your server. Follow the official [instruction](http://www.binarymoon.co.uk/2010/08/timthumb/). You can put your default options inside the _timthumb-config.php_ file. For questions read the documentation inside of _timthumb.php_.

**Make sure you can resize an image before next steps.**

### 2. Zepto

Download the _[zepto.js](http://zeptojs.com/)_ file and put it on your server.

### 3. Imadaem
Download the _[zepto.imadaem.js](https://github.com/penibelst/imadaem-zepto)_ file and put it on your server.

### 4. Javascript in HTML

You must write the first 3 files into the include definition.
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
Learn the available options in the API description.

### 5. Data in Images

Add `data-url` attribute to existing images.
````html
<img
    alt='Image'
    src='/path/to/image-placeholder.jpg'
    data-url='/path/to/image.jpg'
/>
````
## API

_Follows_

## License
Released under the [MIT license](http://opensource.org/licenses/MIT)

Copyright © 2013 [Anatol Broder](http://penibelst.de/)
