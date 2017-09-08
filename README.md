# hexo-tag-twentytwenty

Hexo tag to embed Image Comparison Slider Scripts. Image Comparison Slider depend on JQuery Twenty Twenty plugin.

## Introduction

[Hexo](https://hexo.io/) tag to embed Image Comparison Slider Scripts. Image Comparison Slider depend on [JQuery Twenty Twenty](https://github.com/zurb/twentytwenty) plugin.

## DEMO

[https://photo-tea.com/p/hexo-tag-twentytwenty/](https://photo-tea.com/p/hexo-tag-twentytwenty/)

## Installation

```
npm install hexo-tag-twentytwenty --save
```

## Usage

Create Embedded twentytwenty with following syntax:

```
{% twtw before-image after-iamge [width] [height] %}
```

### Example 1 :

```
{% twtw before.jpg after.jpg %}
```

Will output the HTML:

```
<div>
  <img src="before.jpg">
  <img src="after.jpg">
</div>
```

### Example 2 : 

if you want to set `width` and `height`.

```
{% twtw before.jpg after.jpg 800 600 %}
```

Will output the HTML:

```
<div>
  <img src="before.jpg" data-width="800" data-height="600">
  <img src="after.jpg" data-width="800" data-height="600">
</div>
```

## option

You can configure this plugin in `_config.yml`. The options are as follows .

| option | description | default |
| :--- | :--- | :--- |
| class| class name of div | `none` |
| imgClass| class name of img | `none` |
| embedAsset | if you want to read  external file , please add asset file path. This actually need jQuery as a dependency.| `none` |

Example:

```
twentytwenty:
  class:
    - twentytwenty-container
    - embeded-twentytwenty
  imgClass:
    - photo
    - round
  embedAsset:
    - https://cdnjs.cloudflare.com/ajax/libs/mhayes-twentytwenty/1.0.0/css/twentytwenty.min.css
    - https://cdnjs.cloudflare.com/ajax/libs/mhayes-twentytwenty/1.0.0/js/jquery.event.move.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/mhayes-twentytwenty/1.0.0/js/jquery.twentytwenty.min.js
    - /js/twentytwenty.js
```

For example , `/js/twentytwenty.js` is as follows .

```
(function(){
  $(document).ready(
    function() {
      initialize_twentytwenty();
    }
  );
  function initialize_twentytwenty(){
    if($(".twentytwenty-container").twentytwenty){
      $(".twentytwenty-container").twentytwenty();
    }else{
      setTimeout(function(){
        initialize_twentytwenty();
      },250);
    }
  }
})();
```


## License

MIT

Hexo - [https://hexo.io/](https://hexo.io/)
JQuery Twenty Twenty - [https://github.com/zurb/twentytwenty](https://github.com/zurb/twentytwenty)