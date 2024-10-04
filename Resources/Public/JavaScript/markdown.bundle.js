!function(t){t.fn.extend({markdown:function(e){var n={target_form:t(this).selector};return e=t.extend(n,e),this.each(function(){var n="";t.each(t(this),function(e,r){r=t(r).val()||t(r).html();n+=function e(n){var r={options:{empty_mark:"\n"},vs:{},variable:{editbody:null,stack:{tag:[],text:[]},text:"",html:""},convert:{tags:{hr:{default_:function(){return"<hr />"}},a:{default_:function(t,e){return'<a href="'+t+'">'+e+"</a>"},title:function(t,e,n){return'<a href="'+t+'" title="'+n+'" target="_blank">'+e+"</a>"},target_blank:function(t,e){return'<a href="'+t+'" target="_blank">'+e+"</a>"}},img:{default_:function(t,e){return'<img class="img-frame" style="max-width:100%;" src="'+t+'" alt="'+e+'"/>'},title:function(t,e,n){return'<img title="'+n+'" class="img-frame" style="max-width:100%;" src="'+t+'" alt="'+e+'"/>'}},pre:{default_:function(t,e){return'<pre class="brush: '+t.toLowerCase()+';">'+e+"</pre>"}},empty:{default_:function(){return r.options.empty_mark}},th:{default_:function(t){return"<th>"+t+"</th>"},center:function(t){return'<th align="center">'+t+"</th>"},left:function(t){return'<th align="left">'+t+"</th>"},right:function(t){return'<th align="right">'+t+"</th>"}},td:{default_:function(t){return"<td>"+t+"</td>"},center:function(t){return'<td align="center">'+t+"</td>"},left:function(t){return'<td align="left">'+t+"</td>"},right:function(t){return'<td align="right">'+t+"</td>"}},notag:{default_:function(t,e){return"<"+t+">"+e+"</"+t+">"}}},replacer:{strong:["__([^_]+)__","\\*\\*([^*]+)\\*\\*"],em:["_([^_]+)_","\\*([^*]+)\\*"],del:["~~([^~]+)~~"],code:["`([^`]+)`"]},push:function(t,e){return r.convert.inStack(t)||r.variable.stack.tag.push(t),r.variable.stack.text[t]||(r.variable.stack.text[t]=[]),void 0!==e&&r.variable.stack.text[t].push(e),this},pushest:function(t){if(r.convert.inStack()){var e=r.variable.stack.tag.length-1,n=r.variable.stack.tag[e];return r.convert.push(n,t)}return this},pop:function(n,c){if(r.convert.inStack()){for(var a=r.variable.stack.tag.pop(),s=innerHtml="",o=c||[];void 0!==(s=r.variable.stack.text[a].shift());)"pre"!==a||0!==o.length?(r.convert.text(r.convert.text()+s),"pre"!==a&&"blockquote"!==a||r.convert.text(r.convert.text()+r.options.empty_mark)):o.push(s);return"blockquote"===a&&r.convert.text(e(r.convert.text())),void 0===n&&(n="default_"),0!==o.length||r.convert.tags[a]||(o.push(a),a="notag"),o.push(r.convert.text()),innerHtml=r.convert.tags[a][n].apply(this,o),t.each(r.convert.replacer,function(e,n){t(n).each(function(t,n){var r=new RegExp(n,"g");innerHtml=innerHtml.replace(r,"<"+e+">$1</"+e+">")})}),r.convert.inStack()||r.convert.html(innerHtml),r.convert.text(""),innerHtml}return this},_string:function(t,e){return void 0===e?r.variable[t]:(r.variable[t]=e,this)},text:function(t){return r.convert._string("text",t)},html:function(t){return r.convert._string("html",t)},inStack:function(e){if(void 0===e)return 0!==r.variable.stack.tag.length;if("h"===e&&r.convert.inStack()){var n=r.variable.stack.tag.length-1;if(r.variable.stack.tag[n].match(/^h[1-6]/))return!0}return-1!==t.inArray(e,r.variable.stack.tag)}},check:{init:function(){r.vs={}},valid:function(t){return""===r.convert.html()&&!(r.convert.inStack()&&!r.convert.inStack(t))},_pre:function(t,e){return{nowv:e,prev:r.variable.editbody[t-1],nexv:r.variable.editbody[t+1],tag:"",args:!1}},isset:function(t){return r.options.empty_mark!==t&&""!==t},wrapper:function(t,e){if(r.check.init(),!r.check.valid(t))return!1;if(r.vs=r.check._pre.apply(this,e),r.check.tags[t].apply(this),void 0===r.vs.nexv)for(;r.convert.inStack();)r.convert.pushest(r.convert.pop())},tags:{h:function(t){if(null!==r.vs.nowv.match(/^#{1,6}\s/)){var e="h"+r.vs.nowv.match(/^#{1,6}/)[0].length,n=r.vs.nowv.replace(/^#{1,6}\s/,"");r.convert.push(e,n).pop()}else r.check.isset(r.vs.nowv)&&r.vs.nexv?(r.convert.inStack("h")&&r.convert.pop(),r.vs.nexv.match(/^=+$/)&&r.convert.push("h1",r.vs.nowv),r.vs.nexv.match(/^\-+$/)&&r.convert.push("h2",r.vs.nowv)):r.convert.inStack("h")&&r.convert.pop()},hr:function(){var t=function(t){if(0===r.vs.nowv.indexOf(t)){var e=new RegExp("*"===t?"\\"+t:t,"g");""===r.vs.nowv.replace(e,"")&&r.convert.push("hr").pop()}};t("-"),t("*"),t("_")},empty:function(){(""===r.vs.nowv||r.vs.nowv.match(/^!?\[.*\]:.*/))&&r.convert.push("empty").pop()},pre:function(){-1!==r.vs.nowv.indexOf("```")?r.convert.inStack("pre")?r.convert.pop():r.convert.push("pre",r.vs.nowv.replace(/`/g,"")):r.convert.inStack("pre")&&r.convert.pushest(r.vs.nowv)},blockquote:function(t){r.vs.nowv.match(/^(\s{1,3})?>\s?/)?(r.vs.nowv=r.vs.nowv.replace(/^(\s{1,3})?>\s?/,""),r.convert.push("blockquote",r.vs.nowv)):r.check.isset(r.vs.nowv)?r.convert.inStack("blockquote")&&r.convert.pushest(r.vs.nowv):void 0!==r.vs.nexv&&r.check.isset(r.vs.nexv)&&(r.vs.nexv.match(/^(\s{1,3})?>/)||r.convert.pop())},ol:function(){var t=r.vs.nowv,e=r.vs.nexv;if(t.match(/^(\s{0,7})?[0-9]+[.]\s/)&&(r.convert.inStack("ol")||(r.convert.push("ol"),t=t.replace(/^\s+/g,""))),r.convert.inStack("ol"))if(t.match(/^[0-9]+[.]\s/)||t.match(/^[\*\+\-]\s/))c(),r.convert.push("li",t.replace(/^\s{0,7}?[0-9]+[.]\s(.*)/,"$1").replace(/^[\*\+\-]\s(.*)/,"$1"));else if(t.match(/^\s+/))(t=t.replace(/^\s+/g,"")).match(/^[\*\+\-]\s/)?(r.convert.pushest(t),e.match(/^[0-9]+[.]\s/)&&c()):t.match(/^.*/)?r.convert.pushest(t):r.check.isset(t)||r.convert.pushest(t);else if(r.check.isset(t))r.convert.pushest(t);else{if(!r.check.isset(e))return r.convert.pushest(t),!0;if(e&&e.match(/^\s+/)){if(!e.match(/^\s{1,7}?[\*\+\-]\s/))return r.convert.pushest(t),!0}else if(e&&e.match(/^[0-9]+[.]\s/))return r.convert.pushest(t),!0;c(),r.convert.pop(),r.addP=!1}},ul:function(){var t=r.vs.nowv,e=r.vs.nexv;if(t.match(/^(\s{0,7})?[\*\+\-]\s/)&&(r.convert.inStack("ul")||(r.convert.push("ul"),t=t.replace(/^\s+/g,""))),r.convert.inStack("ul"))if(t.match(/^[0-9]+[.]\s/)||t.match(/^[\*\+\-]\s/))c(),r.convert.push("li",t.replace(/^\s{0,7}?[0-9]+[.]\s(.*)/,"$1").replace(/^[\*\+\-]\s(.*)/,"$1"));else if(t.match(/^\s+/))(t=t.replace(/^\s+/g,"")).match(/^[0-9]+[.]\s/)?(r.convert.pushest(t),e.match(/^[\*\+\-]\s/)&&c()):t.match(/^.*/)?r.convert.pushest(t):r.check.isset(t)||r.convert.pushest(t);else if(r.check.isset(t))r.convert.pushest(t);else{if(!r.check.isset(e))return r.convert.pushest(t),!0;if(e&&e.match(/^\s+/)){if(!e.match(/^\s{1,7}?[0-9]+[.]\s/))return r.convert.pushest(t),!0}else if(e&&e.match(/^[\*\+\-]\s/))return r.convert.pushest(t),!0;c(),r.convert.pop(),r.addP=!1}},table:function(){var e=r.vs.nowv,n=r.vs.nexv;if(n&&e.match(/\|/)&&n.match(/:?-+:?[\s+]?\|/)){if(!r.convert.inStack("table")){r.convert.push("table").push("thead").push("tr");var c=n.replace(/^\|(.*)\|$/,"$1").split("|");r.aligns=[],t(c).each(function(t,e){var n=e.replace(/^\s+|\s+$/g,"");n.match(/^:.*:$/)?r.aligns[t]="center":n.match(/^:/)?r.aligns[t]="left":n.match(/:$/)?r.aligns[t]="right":r.aligns[t]="default_"});var a=e.replace(/^\|(.*)\|$/,"$1").split("|");t(a).each(function(t,e){r.convert.pushest(r.convert.push("th",e.replace(/^\s+|\s+$/g,"")).pop(r.aligns[t]))}),r.convert.pushest(r.convert.pop()),r.convert.pushest(r.convert.pop())}}else if(n&&e.match(/\|/))if(r.convert.inStack("tbody")){r.convert.push("tr");var s=e.replace(/^\|(.*)\|$/,"$1").split("|");t(s).each(function(t,e){r.convert.pushest(r.convert.push("td",e.replace(/^\s+|\s+$/g,"")).pop(r.aligns[t]))}),r.convert.pushest(r.convert.pop())}else r.convert.push("tbody");else r.convert.inStack("table")&&(r.convert.pushest(r.convert.pop()),r.convert.pop())},p:function(){if(!r.vs.nowv.match(/^\s*?</)&&"\n"!==r.vs.nowv&&!r.vs.nowv.match(/^\s*?</)){r.convert.inStack("p")||r.convert.push("p");for(var n=function(e){e=e.replace(/\\/g,"\\\\").replace(/\*/g,"\\*").replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/\[/g,"\\[").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/\$/g,"\\$").replace(/\-/g,"\\-").replace(/\|/g,"\\|").replace(/\//g,"\\/");var n=null,c=new RegExp("\\["+e+"\\]:","i");return t.each(r.variable.editbody,function(t,r){r.match(c)&&(uri=r.match(/\[.*\]:(.*)/))&&(uri=uri[1].replace(/^\s+/,""),e=uri.split(" ")[0],n=(n=uri.match(/.*"(.*)"/))?n[1]:null)}),[e,n]},c=function(t,e,n){if(null!==r.vs.nowv.match(/!/))var c=r.convert.push("img").pop(n?"title":"default_",[t,e,n]),a=r.convert.push("a").pushest(c).pop("target_blank",[t]);else a=r.convert.push("a").pop(n?"title":"default_",[t,e,n]);return a};null!==r.vs.nowv.match(/!?\[.*?\]\(.*?\)/);){var a=r.vs.nowv.match(/\[(.*?)\]\((.*?)\)/),s=a[2].split(" "),o=s[1]&&s[1].replace(/"/g,""),v=c(s[0],a[1],o);r.vs.nowv=r.vs.nowv.replace(a[0],v)}if(null!==r.vs.nowv.match(/!?\[.*\]\[.*\]/)){var i=r.vs.nowv.replace(/!?\[(.*)\]\[.*\]/,"$1"),p=r.vs.nowv.replace(/!?\[.*\]\[(.*)\]/,"$1");p=(u=n(p))[0],o=u[1],r.vs.nowv=c(p,i,o)}var u;if(null!==r.vs.nowv.match(/!?\[.*\]/))i=p=r.vs.nowv.replace(/^.*?!?\[(.*)\].*?/,"$1"),v=c(p=(u=n(p))[0],i,o=u[1]),r.vs.nowv=r.vs.nowv.replace(/^(.*)?!?\[(.*)\](.*)?/,"$1"+v+"$3");if(void 0!==r.vs.nexv){if(r.convert.inStack("p")){if(r.vs.nexv.match(/^=+$/))return r.convert.pop(),r.convert.push("h1",r.vs.nowv),!0;if(r.vs.nexv.match(/^\-+$/))return r.convert.pop(),r.convert.push("h2",r.vs.nowv),!0}var l=e(r.vs.nexv);""!==l&&"<p>"!==l.substr(0,3)&&r.convert.pushest(r.vs.nowv).pop()}void 0===r.vs.nexv?r.convert.pushest(r.vs.nowv).pop():r.convert.pushest(r.vs.nowv+"<br>")}},etc:function(){var t=r.vs.nowv;r.convert.html(t)}}}},c=function(){if(r.convert.inStack("li")){var t=s(),n=s(!0),c=a();1!==t&&t!==n&&(r.addP=!0),r.convert.pop();var o=e(c);r.addP||(o=o.replace("<p>","").replace("</p>","")),r.convert.push("li",o),r.convert.pushest(r.convert.pop())}},a=function(e){var n=0,c="";return t(r.variable.stack.text.li).each(function(t,e){""!==e&&n++,c+=e+r.options.empty_mark}),e?n:c},s=function(t){return tag="li",t?a(!0):r.variable.stack.text[tag].length};r.variable.editbody=n.split(/\n/);var o="";return t.each(r.variable.editbody,function(){var e=arguments;t.each(r.check.tags,function(t){r.check.wrapper(t,e)}),o+=r.convert.html(),r.convert.html("")}),o}.apply(this,[r])}),t(e.target_form).addClass("markdown-body").html(n)})}})}(jQuery);

$(document).ready(function () {
    // Markdown for event description
    var html = $('.markdown').html();
    $('.markdown').html(marked.parse(html));
});