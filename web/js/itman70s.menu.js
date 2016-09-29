
var ItManTos_menu = '<li><a href="http://ItManTos.github.io/" data-placement="left" title="To ItManTos.github.io">ItManTos</a></li>\n' + 
            '<li><a href="https://github.com/ItManTos/tangrammy" data-placement="left" title="To Tangrammy page">Tangrammy</a></li>\n' + 
            '<li><a href="http://ItManTos.github.io/richtext" data-placement="left" title="To github.io/richtext">Rich Text</a></li>\n' + 
            '<li><a href="http://ItManTos.github.io/angular-movable" data-placement="left" title="To github.io/angular-movable">AngularJS Movable</a></li>\n' + 
            '<li><a href="http://ItManTos.github.io/transform.html" data-placement="left" title="transform for timestamp base64 urlencode">Transform</a></li>\n' + 
            '<li><a href="http://ItManTos.github.io/about.html" data-placement="left" title="To know ItManTos?">About</a></li>\n' + 
            '<li class="print"><a href="javascript:;" data-placement="left" title="Print current page">Print</a></li>\n';
		
$(document).ready(function(){
try {
	var head = $(".ItManTos_menu");
	head.attr("title", "All about ItManTos.github.io");
	head.find("img").attr("src", "/img/logo_w.png");
	
	$(".ItManTos_sub_menu").html(ItManTos_menu);
	$('[data-placement]').tooltip();
	
	$(".ItManTos_sub_menu").parents(".pull-right").append('<a href="https://github.com/ItManTos"><img style="position: absolute; right: 0; border: 0;" src="/img/forkme.png" title="Fork me on GitHub"></a>');
		
	$('.print').on('click', function(){	
		$('.print').hide();
		html2canvas(document.body, {
			onrendered: function(canvas) {
				
				$("#page").hide();
				document.body.appendChild(canvas);
				window.print();
				$('canvas').remove();
				$("#page").show();
				$('.print').show();
			}
		});
		
	});
} catch(e) {}
});
