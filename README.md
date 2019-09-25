# MusicFinder
Are you in the mood to get out and go to a concert? Perhaps you haven't been to a show in awhile and you aren't sure what to look for. MusicFinder has you covered- all you need to do is type in the name of your favorite band, and MusicFinder will provide a variety of suggestions to seach for events that may be of interest to you.

## Screenshots
<img width="764" alt="Screen Shot 2019-04-16 at 10 15 37 PM" src="https://user-images.githubusercontent.com/44355328/56261624-0021f900-6099-11e9-8ae1-fc9ef6abdad1.png">

<img width="929" alt="Screen Shot 2019-04-16 at 10 16 20 PM" src="https://user-images.githubusercontent.com/44355328/56261654-1c259a80-6099-11e9-80c1-fe0c7aabf434.png">

## Use this app
Enter the directory of where you'd like to download this app, then run the following command in your terminal: 
```
git clone https://github.com/francepack/MusicFinder.git
```
Enter the new folder and run terminal command:
```
npm install
```
once that completes, use the following command to view in your browser:
```
npm start
```

For effective use, 3 API keys are required, each available by request from the sites listed below.

## APIs
I draw from 3 APIs: 
- [TasteDive](https://tastedive.com/read/api) 
- [LastFm](https://www.last.fm/api) 
- [TicketMaster](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/)

To utilize API keys from these sites, within the ```src``` directory, create a directory called ```apiKey``` containing a file named ```key.js```
Within this file, you will need 3 lines of code exporting variables holding your keys. The lines of code should be formatted as follows:
```
export const lastfmKey = 'YOUR_API_KEY_STRING'
export const tastediveKey = 'YOUR_API_KEY_STRING'
export const ticketmasterKey = 'YOUR_API_KEY_STRING'
```

## Technology
- react/redux
- react-router
- jest/enzyme
- fetch API

## Learning Goals
This was created to fulfill requirements of passing module 3 of Turing School. As an individual project, we were required to draw upon everything we have learned about react, redux, and router, and combine that with fetch requests to an api, and test it all. We were allowed to create our own project, so keeping our ideas refined and executable, as well as paying attention to project management were key pieces of this project.
