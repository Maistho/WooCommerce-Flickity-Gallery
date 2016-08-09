jQuery(function() {
	var $slider_primary = jQuery('.wcfg-primary-gallery');
	if ( $slider_primary.length < 1 ) return;

	// -----
	// Create the primary slider, with large images
	$slider_primary.flickity({
		pageDots: false,
		imagesLoaded: true,
		draggable: true,
		selectedAttraction: 0.01,
		friction: 0.15,
		arrowShape: {
			x0: 0,
			x1: 60, y1: 50,
			x2: 70, y2: 45,
			x3: 15
		}
	});

	// -----
	// Add lightbox functionality to the primary slider
	var gallery = {
		images: [],
		titles: [],
		descriptions: []
	};

	// Populate our gallery array from each slide
	jQuery.each( $slider_primary.data('flickity').slides, function() {
		var $this = jQuery( this.cells[0].element );
		var i = $this.index();

		gallery.images[i] = $this.attr('href');
		gallery.titles[i] = $this.attr('title');
		gallery.descriptions[i] = $this.children('img').attr('alt');
	});

	// Prevent default click behavior which would normally open an image.
	$slider_primary.on( 'click', 'a', function(e) { e.preventDefault(); } );

	// Open the gallery by adding a new click behavior. Only triggers on a "static click" - not when moving the slider.
	$slider_primary.on( 'staticClick.flickity', function( event, pointer, cellElement, cellIndex ) {
		// Rearrage the gallery so that the current slide is the first element in the array
		var g_images = gallery.images.slice(cellIndex).concat( gallery.images.slice(0, cellIndex) );
		var g_titles = gallery.titles.slice(cellIndex).concat( gallery.titles.slice(0, cellIndex) );
		var g_descriptions = gallery.descriptions.slice(cellIndex).concat( gallery.descriptions.slice(0, cellIndex) );

		var lg_images = [];
		var thumbs = $slider_nav.find('img');
		for (var i = 0; i < g_images.length; ++i) {
			lg_images.push({
				thumb: thumbs[i].src,
				src: gallery.images[i],
				subHtml: '<h4>'+gallery.titles[i]+'</h4><p>'+gallery.descriptions[i]+'</p>',
			});
		}
		lightGallery(cellElement, {
			dynamic: true,
			dynamicEl: lg_images,
			index: cellIndex,
			backdropDuration: 300,
			toolbar: true,
			counter: false,
			download: false,
			toogleThumb: false,
		});
	});


	// -----
	// Create a secondary slider to use as navigation, with thumbnails
	var $slider_nav = jQuery('.wcfg-nav-gallery');

	if ( $slider_nav.length > 0 ) {
		$slider_nav.flickity({
			asNavFor: $slider_primary[0],
			contain: true,
			pageDots: false,
			imagesLoaded: true,
			freeScroll: true,
			prevNextButtons: false
		});

		// Prevent default click behavior of secondary nav.
		$slider_nav.on('click', 'a', function(e) {
			e.preventDefault();
		});
	}
});
