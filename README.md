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

## how to run

Install ```node.js``` on a server, it would be best to use a 24/7 server. For me in my experience, I just used an old DELL Inspiron laptop with an Intel Core i3 7th Generation, with a removed battery and Ubuntu installed

Then run the command ```node ./dhyt.mjs```

```Markdown
WARNING: WHEN RUNNING THE COMMAND, IT WILL SAY THAT IMPORTING JSON MODULE IS AN EXPERIMENTAL FEATURE, DO NOT WORRY, IF THIS MAKE THE CODE BREAK, CREATE AN ISSUE
```

```Markdown
WARNING: THIS SCRIPT POLLS THE SUBSCRIBER COUNT AND NEXT MILESTONE EVERY 10 SECONDS, THIS WAS MADE SO THAT IT DOESN'T OVERFLOW THE DAILY QUOTA
```
