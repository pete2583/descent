/* global resources, Cookies */
/* global cookieEnabled, cookieExists, getBackgroundType, nowPlaying, toggleCookie, updateHue */

function initMenu() {
  // Update globals
  resources.features.hue = cookieExists('hueAccessToken') &&
    cookieExists('hueUsername') && cookieExists('hueRooms');
  if (!resources.features.hue && cookieExists('hueRefreshToken')) {
    let refreshToken = Cookies.get('hueRefreshToken');
    let url = `/app/hue/authorize?refreshToken=${refreshToken}`;
    $.get(url, () => {
      resources.features.hue = true;
      enableHue();
      updateHue();
    });
  }
  
if (!Element.prototype.requestFullscreen) {
	Element.prototype.requestFullscreen = Element.prototype.mozRequestFullscreen || Element.prototype.webkitRequestFullscreen || Element.prototype.msRequestFullscreen;
}

if (!document.exitFullscreen) {
	document.exitFullscreen = document.mozExitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
}

if (!document.fullscreenElement) {

	Object.defineProperty(document, 'fullscreenElement', {
		get: function() {
			return document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement;
		}
	});

	Object.defineProperty(document, 'fullscreenEnabled', {
		get: function() {
			return document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitFullscreenEnabled;
		}
	});
}

document.addEventListener('click', function (event) {

	// Ignore clicks that weren't on the toggle button
	if (!event.target.hasAttribute('data-toggle-fullscreen')) return;

	// If there's an element in fullscreen, exit
	// Otherwise, enter it
	if (document.fullscreenElement) {
		document.exitFullscreen();
	} else {
		document.documentElement.requestFullscreen();
	}

}, false);

  // Set function for key presses
  window.onkeydown = processKey;

  // Update Hue state
  enableHue();

  // Fade menu after initial pause
  setTimeout(() => { toggleDisplay('.help', false); }, 3600);

  // Save current user to populate index input
  Cookies.set('lastUser', $('.music .user').text(), { expires: 3650, secure: true });

  // Apply transparent background if required
  if (getBackgroundType() === 'transparent')
    $('body').css('background-color', 'transparent');
}

function processKey(event) {
  // Return if modifier key is held down
  if (event.ctrlKey || event.metaKey)
    return;

  // Get key pressed
  let key = event.keyCode;
  switch (key) {
    // Handle H to toggle help menu
    case 72: {
      toggleDisplay('.help');
      break;
    }
    // Handle E to toggle extended info
    case 69: {
      let showE = false;
      if (resources.track.current.playing) {
        toggleCookie('extendedOn');
        showE = undefined;
      }
      toggleDisplay('.userLine', showE);
      break;
    }
    // Handle L to toggle Hue lights
    case 76: {
      let on = false;
      if (resources.features.hue) {
        toggleCookie('hueEnabled');
        on = undefined;
      }
      toggleHue(on);
      break;
    }
  }
}

function toggleDisplay(element, show) {
  // Call function with each element if array of elements is passed
  if (element.constructor === Array) {
    element.forEach(element => { toggleDisplay(element, show); });

    return;
  }

  // Determine whether or not to show element
  if (show === undefined)
    show = !$(element).is(':visible');

  // Show/hide element
  if (show)
    $(element).fadeIn(750, 'linear');
  else
    $(element).fadeOut(750, 'linear');
}

function enableHue() {
  if (resources.features.hue) {
    if (cookieEnabled('hueEnabled'))
      $('.hueIndicator').text('on');
    $('.hueHelp').show();
  }
}

function toggleHue(on) {
  // Determine whether or not to turn Hue on
  if (on === undefined)
    on = $('.hueIndicator').text() === 'off';

  // Turn Hue on/off
  if (on) {
    $('.hueIndicator').text('on');
    updateHue();
  } else
    $('.hueIndicator').text('off');
}
