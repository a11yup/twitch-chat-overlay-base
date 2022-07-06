# Twitch Chat Overlay Base

A base for customizable Twitch chat overlays.

## Usage

1. Add the overlay to your OBS as a browser source. Make sure that all of the files are in the same folder. And make sure the "Local File" option is checked.

2. Append query parameters to the URL to specify your twitch channel name and which chat mode you want (normal or chat strip).

So, for example if your twitch channel name is XYZ and you want the normal chat mode.

```
http://127.0.0.1:8080/?channelName=XYZ
```

If you want the chat strip mode.

```
http://127.0.0.1:8080/?channelName=XYZ&chatStrip=true
```
