(function($)
{
	$.fn.begin = function(options)
	{
		var $this = $(this);
		var count=0;
		var zIndex=0;
		var timer_interval = null;
		var no_of_image_shown = 0;
		var defaults = {
			'interval': 5000,
			'speed': 300,
			'button': true,
			'pause': true,
			'callback_init' : null
		};
		var max_length = $(this).find('a').length;
		var o = $.extend(defaults,options);
		var width = $(this).find('img:eq(0)').width();
		var height = $(this).find('img:eq(0)').height();
		if ( o.button ) show_button();
		$(this).find('a').css('position', 'absolute');
		// $(this).find('img').css('border', '0'); // problem with IE7
		$(this).find('a').hide();
		
		$(this).find('a:eq(0)').show();
		timer_interval = setInterval( function () {
			rotate_banner();
			},
			o.interval );

		$(this)
			.css('position', 'relative')
			.css('width', width + 'px')
			.css('height', height + 'px')
			.css('overflow', 'hidden')
			;
		
		if ( width == 0 ) {		// When reload, if there is no image cache... like safari.
			$(window).load(function() {
				width = $this.find('img:eq(0)').width();
				height = $this.find('img:eq(0)').height();
				$this
					.css('width', width + 'px')
					.css('height', height + 'px')
				;
			});
		}
		$(this).mouseenter(function(){
			if ( o.pause ) clearInterval(timer_interval);
		});
		$(this).mouseleave(function(){
			if ( o.pause ) {
				timer_interval = setInterval( function () {
					rotate_banner();
				},
				o.interval );
			}
		});
		function rotate_banner()
		{
			count ++;
			if ( count >= max_length ) count = 0;
			show_banner(count);
		}
		
		function show_banner(count)
		{
			no_of_image_shown = count;
			zIndex++;
			$this
				.find('a:eq(' + count + ')')
				.css('z-index', zIndex)
				.css('margin-left', width+'px')
				.show()
				.animate({
					'margin-left': '0'
					},
					o.speed,
					function(){
						// ...
					}
				)
			;
		}
		
		function show_button()
		{
			var buttons = "<div class='jbanner-buttons'>";
			for ( var i=0; i < max_length; i ++ ) {
				buttons = buttons + "<span>" + (i+1) + "</span>";
			}
			buttons += "</div>";
			$this.append(buttons);
			$('.jbanner-buttons')
				.css('position', 'absolute')
				.css('z-index', 999999)
				;
			$this.find('.jbanner-buttons span')
				.css("display", 'inline-block')
				.css('border', '1px solid #cdcdcd')
				.css('padding', '2px 6px')
				.css('margin', '0 2px')
				.css('border-radius', '2px')
				.css('background-color', 'white')
				.css('opacity', '0.6')
				.css('filter', 'alpha(opacity=60)')
				.css('cursor', 'default')
			;
			$this.find('.jbanner-buttons span').mouseenter(function(){
				var no = $(this).text() - 1;
				if ( no_of_image_shown == no ) return;
				show_banner( no );
			});
		}
		
		if ( o.callback_init ) o.callback_init($(this));
	};
})(jQuery);
