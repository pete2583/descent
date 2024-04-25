# My edits

Simplifeid view - removed options to display weather and time. Moved the now playing to the centre of the screen. 

Added fullscreen button (although currently keypress is not activated. So you'll have to click the link in the menu. If menu is hidden press h then select the link

Added service file example

Added more info to the Readme for the Hue API

# Descent

[![Deploy to GCP App Engine](https://github.com/JasonPuglisi/descent/actions/workflows/deploy-app-engine.yaml/badge.svg?branch=main)](https://github.com/JasonPuglisi/descent/actions/workflows/deploy-app-engine.yaml)

Elegant now playing display for Last.fm showing song metadata and local weather.

## Overview

Fetches now playing song information from Last.fm and displays album artwork
along with local weather, time, and user info. Automatically hides the cursor
after a few seconds of inactivity if the window is in focus.

Able to control colored Philips Hue lights based on prominent album art colors.

## Usage

Ensure you have recent versions of [Node.js](https://nodejs.org/en/) and
[npm](https://www.npmjs.com/) installed. 

Run `npm i -g yarn` to install [yarn](https://yarnpkg.com/en/). Next, run
`yarn global add gulp-cli` and `yarn` to install Descent's dependencies.
Finally, run `gulp build` to build Descent's static files, and `yarn start` to
start Descent's server.

Descent's server listens on port 3000 by default, but this can be changed by
setting the `DESCENT_PORT` environment variable. It's recommended to use a
proxy, such as [NGINX](https://www.nginx.com/), in front of Descent's server.

Navigate to [`/`](https://descent.live/) to use Descent.

## API Requirements

### Spotify Images

Album cover and artist images and provided by the
[Spotify Web API](https://beta.developer.spotify.com/documentation/web-api/).
You will need to provide API authorization through a client ID and client
secret assigned by Spotify. Set your client ID as the `SPOTIFY_CLIENT`
environment variable, and your client secret as the `SPOTIFY_SECRET`
environment variable.

### Philips Hue Lights

Hue lights are controlled by the
[Philips Hue API](https://developers.meethue.com/). You must register an
application to provide a few required values. Set your app ID as the `HUE_ID`
environment variable, your client ID as the `HUE_CLIENT` environment variable,
and your client secret as the `HUE_SECRET` environment variable.

When setting up the API the callback URL should be: descentaddress/app/hue/authorize

### Last.fm Rate Limiting

To avoid Last.fm rate limiting, you can adjust the API polling interval. Set
the `LASTFM_POLL_INTERVAL` environment variable to an integer in milliseconds.
The default is `10000` (10 seconds), but a more reasonable value could be
`5000` (5 seconds). If API calls in the browser start failing, and playing data
isn't loading, increase the interval.

## User Preferences

### Descent Configuration

To configure the background, weather, and time displays, visit
[`/app/config`](https://descent.live/app/config). Dark Sky can
automatically determine weather units, but OpenWeatherMap cannot, so Descent
defaults to imperial units unless otherwise specified.

#### Descent Configuration Import

You can import settings through a POST request to
[`/app/config/set`](https://descent.live/app/config/set). Each post
parameter correponds to a cookie. Valid parameters and values are as follows:

**Background type**  
`background`: `artist`, `album`, `transparent`, `none`

**Background blurring**  
`blur`: `true`, `false`

**Default background image**  
`defaultBackground`: any valid image URL

**User to redirect to**  
`lastUser`: any valid Last.fm username

**Extended information display enabled**  
`extendedOn`: `true`, `false`

### Phillips Hue Configuration

To enable Phillips Hue control, visit
[`/app/hue`](https://descent.live/app/hue) and follow the setup
instructions. Light colors will be set according to the three most prominent
album art colors. If more than three lights are selected, the colors will be
reused.
