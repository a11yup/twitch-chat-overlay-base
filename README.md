# Twitch Chat Overlay Base

A base for customizable Twitch chat overlays.

## Usage

Download the index.html and style.css and make sure that you keep them in the same folder.

First, add the overlay by adding a browser source in OBS. The URL needs to be file-based (not http-based) and looks like this:

```
file:///path/to/index.html
```

Append query parameters to the URL to specify your twitch channel name and which chat mode you want (normal or chat strip).

So, for example if your twitch channel name is XYZ and you want the normal chat mode.

```
file:///path/to/index.html?channel=XYZ
```

If you want the chat strip mode.

```
file:///path/to/index.html?channel=XYZ&chatStrip
```
