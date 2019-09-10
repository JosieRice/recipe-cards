#To Develop
`npm run dev`

#To Deploy
`npm run build`<br />
`firebase deploy -P staging --only hosting`<br />
`firebase deploy -P production --only hosting`<br />
or<br />
`firebase deploy --except functions`<br />

#Product Goals

## TODO Next
1. setup staging version of functions
1. setup staging version of heroku deploy or webscraper.
2. get fullscreen modal working on ipad and iphone.
3. setup better homepage and better links to log in.
4. get functions separated for prod and staging.
5. setup scrolling through multiple versions of recipe.
6. if original recipe has no photo, use the next updated photo.
7. Move logic into cloud functions.

be able to close modal with esc

## Improve Recipe Adding UX
1. Link to URL's and to books on Amazon

## Revenue Goals
1. Links to books on Amazon should be linked to a company Amazon account.

## UX Upgrades
1. Make screen not sleep in full screen mode.

## From User Testing
1. Make the recipes easier to enter (copy the link and have it auto fill)

## Increase Addictiveness of OR
1. Add a point system for how many users have a copy of your recipe, extra points if it's unchanged, and extra points if the recipe has been cooked many times.

## Improve UX of recipe editing
1. clear blank arrays before checking for updates when opening confirmation modal.

## UI
- style buttons on modal recipe
- make a logo for the site
- add more than just recipe name to the list of recipes

## Firebase Related
- discover firebase functions

## Bugs to Fix
- Full screen view while cooking allows screen to go to sleep

## UX 
- Support mobile
- Support all browsers

# Developement improvement
- get react router to work in development HMR
- https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually
- https://codeburst.io/getting-started-with-react-router-5c978f70df91


#Historically helpful articles

[React with typescript and webpack boilerplate](https://hackernoon.com/react-with-typescript-and-webpack-654f93f34db6)

[User Authentication](https://css-tricks.com/firebase-react-part-2-user-authentication/)

[Setup Multiple Envs](https://firebase.googleblog.com/2017/04/easier-configuration-for-firebase-on-web.html)

`firebase database:set /_admin/env env.json` - not using anymore