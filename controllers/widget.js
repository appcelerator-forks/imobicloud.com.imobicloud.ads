var args = arguments[0],
	timeout;

init();
function init() {
  	var exclude = ['id', 'children', ‘iosAds’, ‘androidAds’];
    $.container.applyProperties( _.omit(args, exclude) );
    
    timeout = setTimeout(loadAds, 1000);
  	Ti.API.info('ads: init');
}

function removeAds() {
	timeout & clearTimeout(timeout);
	$.container.removeAllChildren();
};
exports.cleanup = function() {
	Ti.API.info('ads: cleanup');
	removeAds();
};

exports.reload = function() {
	Ti.API.info('ads: reload');
	removeAds();
	timeout = setTimeout(loadAds, 1000);
};

function adsPostlayout(e) {
  	Ti.API.info('ads: ready ' + height);
	$.trigger('load', { height: this.rect.height });
}

// https://github.com/appcelerator-modules/ti.admob
// https://github.com/jpriebe/ti.dfp
function loadAds() {
	var adsType = args[OS_IOS ? ‘iosAds’ : ‘androidAds’];
	if (adsType == null) { adsType = ‘admob’; } 
	else { adsType += ‘’; }
	if (OS_IOS && adsType == 'iad') {
		var adView = Ti.UI.iOS.createAdView( $.createStyle({ classes: 'imc-ads-iad' }) );
  		// adView.addEventListener('load', iadLoad);
		$.container.add(adView);
	} else if (adsType == 'admob' || adsType == 'dfp') {
		var MODULE = require('ti.' + adsType);
		$.container.add( MODULE.createView( $.createStyle({ classes: 'imc-ads-' + adsType }) ) );
	}
}

/**
 * iAD size https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/iAd_Guide/BannerAdvertisements/BannerAdvertisements.html
 * 	- iPhone Portrait: 	320 x 50
 * 	- iPhone Lands: 	480 x 32
 * 	- iPad: 			...	x 66
function iadLoad(e) {
	e.source.removeEventListener('load', iadLoad);
	
	var height;
	
	if ('ipad' == Ti.Platform.osname) {
		height = 66;
	} else {
		if (Ti.Gesture.isPortrait()) {
			height = 50;
		} else {
			height = 32;
		}		
	}
	
	Ti.API.info('ads: load ' + height);
	
	$.trigger('load', { height: height });
}
*/