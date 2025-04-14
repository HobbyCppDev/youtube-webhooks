# youtube webhooks
This is the code used in the "Announcements" bot in the Gamy1es discord server.

This is made in Node.js and requires the use of a google cloud api.

## how to use

First you need to create a Google Cloud account (if you haven't already), go to the [Google Cloud Console](https://console.cloud.google.com/) and log in

Then make a new project, call it something related like discord-youtube-announcements or something like that

Go to the hamburger menu and click on ```APIs & Services```, then ```Enable APIs and services```. Then in the search bar type in ```Youtube Data API v3```, this will be the API that you'll use in the script, enable the API in your project

Then go to the ```Credentials``` section on the left and click on ```Create Credentials```, select ```API Key```.
Google will automatically generate an API key for you, copy it, you do not need to save it on a file (but it is preferred to) as Google has an option to show the API key after creation

__Our "API_KEY" variable in the script is now complete, now we only need the "CHANNEL_ID"__

Go to [Youtube](https://www.youTube.com) and click on your profile, then in the dropdown menu select ```View your channel```

Then in the url, it should say something like this

```https://www.youtube.com/channel/UC``` and then some numbers and letters

all that we need is the part after ```/channel/```

__Our "CHANNEL_ID" variable in the script is now complete! TADA!__
