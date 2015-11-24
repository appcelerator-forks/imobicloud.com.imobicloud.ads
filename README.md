# Ads
====

Adsvertise widget

xml

	<Widget id="ads" iosAds="iad" androidAds="dfp" src="com.imobicloud.ads" onLoad="adsLoad"/>

app.tss (sample in styles/widget.tss)

    ".imc-ads": { height: Titanium.UI.SIZE }
    ".imc-ads-iad[platform=ios]": {  }
    ".imc-ads-admob[platform=ios]": {}
    ".imc-ads-admob[platform=android]": {}
    ".imc-ads-dfp[platform=ios]": {}
    ".imc-ads-dfp[platform=android]": {}

js 

    $.ads.cleanup(); // remove ads

	$.ads.reload(); // create ads after remove

    function adsLoad(e) {
        // e.height
    }