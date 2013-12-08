# jBanner #

**jBanner** is a jQuery plugin to do simple banner lotation.

It is developed by JaeHo Song, thruthesky@gmail.com as open source code under GPL.


## Version ##
2013-12-08
- Adding direction of lotate from bottom to top.


## Overview ##
jBanner is a simple banner rotator.

jBanner had been tested on: IE10 and IE7, IE8, IE9 compatibility view, FF, Chrome, Safari, Opera, Opera Emulator

## Condition ##
- All images should have same size.
- The height of the image should be set.
- Width of the image is always 100%. With this, it becomes responsive.




## Options ##
### height ###
Added to make jBanner responsive. Now you must set the height of banner.

- Number only.
- The default is 120.


 

### pause ###
If it is set true, then the animation will be pause when the mouse cursor enters into banner area.

The default is true.
### interval ###
interval is the sleeping time before anthoer banner is shown.

The default is 5000.
### speed ###
speed is the speed of transformation.

The default is 300.
### button ###
If it is set to true, then there will be numbers of button indicating each banner.

The default is true.

### direction ###
- 'right-to-left' slides the banner from right to left. This is the default.
- 'bottom-to-top' siides the banner from bottom to top.





### callback_init ###
You can set a callback function on 'callback_init' option.

After initializing the banner,jBanner will call this callback.

You can then change the look of the banner.

 



## How to use ##
Using jBanner is very straitforward. Just look at the index.html file.

Here are some codes.

	$(function(){
		$obj = $('.banner_rotator_with_url').begin({
			'height'	: 200,
			'interval'	: 5000,
			'speed'	: 400,
			'button'	: true,
			'pause'	: true,
			'callback_init'	: jbanner_init,
			'callback_banner_change' : callback_banner_change
		});
	});
	function jbanner_init($this)
	{
		$this.find('.jbanner-buttons span').css("padding", "2px 8px");
		$this.find(".jbanner-buttons span:contains('1')")
			.css('padding-left','16px')
			.css('padding-right', '16px')
		;
	}
	function callback_banner_change($this, no)
	{
		$this.find(".jbanner-buttons span").css("padding", "2px 8px");
		$this.find(".jbanner-buttons span:contains('"+ (no+1) +"')")
			.css('padding-left','16px')
			.css('padding-right', '16px')
		;
	}

	<div class='jbanner'>
		<a href='http://yahoo.com' target='_blank'><img src="banner1.gif"></a>
		<a href='http://facebook.com' target='_blank'><img src="banner2.gif"></a>
		<a href='http://daum.net' target='_blank'><img src="banner3.gif"></a>
		<a href='http://naver.com' target='_blank'><img src="banner4.gif"></a>
		<a href='http://google.com' target='_blank'><img src="banner5.gif"></a>
		<a href='http://github.com' target='_blank'><img src="banner6.gif"></a>
	</div>