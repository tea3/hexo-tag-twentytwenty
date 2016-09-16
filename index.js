'use strict';

var pathFn = require('path');
hexo.extend.tag.register('twtw', function(args, content){
  var beforeImg       = args[0];
  var afterImg        = args[1];
  var imgWidth        = "";
  var imgHeight       = "";
  var divClass        = "";
  var imgClass        = "";
  var embedAsset      = "";
  var jsFiles         = [];
  var cssFiles        = [];
  var i               = 0;
  
  if(args.length > 2){
    imgWidth = ' data-width="' + args[2] + '"';
  }
  if(args.length > 3){
    imgHeight = ' data-height="' + args[3] + '"';
  }
  
  if(hexo.config.twentytwenty){
    if(hexo.config.twentytwenty.class){
      for(i=0; i<hexo.config.twentytwenty.class.length; i++){
        if(divClass != ""){
          divClass += " ";
        }else{
          divClass += ' class="';
        }
        divClass += hexo.config.twentytwenty.class[i];
      }
      if(divClass != "")divClass += '"';
    }
    if(hexo.config.twentytwenty.imgClass){
      for(i=0; i<hexo.config.twentytwenty.imgClass.length; i++){
        if(imgClass != ""){
          imgClass += " ";
        }else{
          imgClass += ' class="';
        }
        imgClass += hexo.config.twentytwenty.imgClass[i];
      }
      if(imgClass != "")imgClass += '"';
    }
    if(hexo.config.twentytwenty.embedAsset){
      for(i=0; i<hexo.config.twentytwenty.embedAsset.length; i++){
        var ext = pathFn.extname(hexo.config.twentytwenty.embedAsset[i]);
        if(ext == ".js"){
          jsFiles.unshift('"'+hexo.config.twentytwenty.embedAsset[i]+'"');
        }else if(ext == ".css"){
          cssFiles.unshift('"'+hexo.config.twentytwenty.embedAsset[i]+'"');
        }
      }
    }
  }
  
  if(jsFiles.length > 0){
    var rccID = Math.floor( Math.random() * 100 + 1);
    embedAsset += '<script>';
    embedAsset += '    function rcc'+rccID+'(){';
    embedAsset += '      if(typeof($) != "undefined"){';
    embedAsset += '        (function(d){';
    embedAsset += '          var jsf = [' + jsFiles.toString() + '];';
    embedAsset += '          var cssf = [' + cssFiles.toString() + '];';
    embedAsset += '          var i = 0;';
    embedAsset += '          for(i=0; i<cssf.length; i++){';
    embedAsset += '            var c = d.createElement("link");';
    embedAsset += '            c.rel = "stylesheet";';
    embedAsset += '            c.href = cssf[i];';
    embedAsset += '            c.type = "text/css";';
    embedAsset += '            c.media = "all";';
    embedAsset += '            var s = d.getElementsByTagName("link")[0];';
    embedAsset += '            s.parentNode.insertBefore(c, s);';
    embedAsset += '          }';
    embedAsset += '          for(i=0; i<jsf.length; i++){';
    embedAsset += '            var c = d.createElement("script");';
    embedAsset += '            c.type = "text/javascript";';
    embedAsset += '            c.src = jsf[i];';
    embedAsset += '            var s = d.getElementsByTagName("script")[0];';
    embedAsset += '            s.parentNode.insertBefore(c, s);';
    embedAsset += '          }';
    embedAsset += '        })(document);';
    embedAsset += '      }else{';
    embedAsset += '        setTimeout(function(){reloadCall();},100);';
    embedAsset += '      }';
    embedAsset += '    }';
    embedAsset += '    function reloadCall(){';
    embedAsset += '      rcc'+rccID+'();';
    embedAsset += '    }';
    embedAsset += '    if(typeof(rccCalled) === "undefined")rcc'+rccID+'();';
    embedAsset += '    var rccCalled = true;';
    embedAsset += '</script>';
  }
  
  var returnHTML  = '<div'+ divClass +'><img'+ imgClass +' src="'+ beforeImg +'"' + imgWidth + imgHeight + '><img'+ imgClass +' src="'+ afterImg +'"'+ imgWidth + imgHeight + '></div>' + embedAsset;
  return returnHTML;
},{
  async: true,
  ends: false
});