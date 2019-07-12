#To Develop
`npm run dev`

#To Deploy
`npm run build`<br>
`firebase deploy --except functions`<br>

#Product Goals

## Improve UX of recipe editing
1. Allow users to reorder ingredients and steps.
2. Removed empty steps and ingredients from array
3. Make a list component for all editable / reorderable lists
4. Make a cancel updates option

## Multiple User Updates
1. Filter out duplicate recipes in the all recipes view

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

#To Do

## Coding
- give alternate options for source of recipes in new recipe form
- style buttons on modal recipe
- make a logo for the site
- add more than just recipe name to the list of recipes

## Firebase Related
- set proper database security rules
- discover firebase functions


#Bugs to Fix
- Full screen view while cooking allows screen to go to sleep

# Developement improvement
- https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually
- https://codeburst.io/getting-started-with-react-router-5c978f70df91


#Historically helpful articles

[React with typescript and webpack boilerplate](https://hackernoon.com/react-with-typescript-and-webpack-654f93f34db6)

[User Authentication](https://css-tricks.com/firebase-react-part-2-user-authentication/)