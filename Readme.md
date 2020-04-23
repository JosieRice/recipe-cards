# Setup First

`download a service account key from your firebase console`<br>
name them as such
staging-service-account-key.json for staging.<br>
production-service-account-key.json for production.

# To Develop

`npm i`<br>
`npm run dev`<br>
go to localhost:3000
staging has to be deployed for it to work

# To Deploy App

`npm run build`<br>
`firebase deploy --except functions`<br>

# To Deploy Functions

firebase-tools must be installed globally

in functions directory
`npm i`<br>
`firebase login`<br>
`firebase use (staging-or OR production)`<br>
`npm run deploy`



# Product Goals

## Graphql Switch

update inputs to be controlled by graphql
drag and drop functionality with graphql in modal
add authorization and authentication to graphql server

## TODO Next

5. setup scrolling through multiple versions of recipe.
6. if original recipe has no photo, use the next updated photo.
7. Move image resize logic into cloud functions. https://firebase.google.com/docs/functions/use-cases
8. Make adding a recipe more of a guided experience. start with source.
9. Wake up web scrapper when the page loads to make it quicker to load.
10. Make image uploading a better experience.
11. Keep modal centered in screen.
12. Optimize recipe loading for lists and modals.
13. Route Logins from create new and my recipes to the correct page after login.
14. Make a logo
15. Update top nav.
16. Add loading state

## Improve Recipe Adding UX

1. Link to URL's and to books on Amazon

## Revenue Goals

1. Links to books on Amazon should be linked to a company Amazon account.

## Increase Addictiveness of OR

1. Add a point system for how many users have a copy of your recipe, extra points if it's unchanged, and extra points if the recipe has been cooked many times.

## Improve UX of recipe editing

1. clear blank arrays before checking for updates when opening confirmation modal.

## UI

- style buttons on modal recipe
- make a logo for the site

## Bugs to Fix (without a clear path)

- Full screen view while cooking allows screen to go to sleep (not sure if it's possible)
- Full screen modal not working on ipad and iphone (might need to create an app)

## UX

- Support mobile
- Support all browsers

# Developement improvement

- get react router to work in development HMR
- https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually
- https://codeburst.io/getting-started-with-react-router-5c978f70df91

# Historically helpful articles

[React with typescript and webpack boilerplate](https://hackernoon.com/react-with-typescript-and-webpack-654f93f34db6)

[User Authentication](https://css-tricks.com/firebase-react-part-2-user-authentication/)

[Setup Multiple Envs](https://firebase.googleblog.com/2017/04/easier-configuration-for-firebase-on-web.html)
