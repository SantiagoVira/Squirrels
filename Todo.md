## **Frontend:**

-   Remove "home" section of menu and put link in header "sqrrlz"
-   Show who owns each card
-   disable lots of functionalities on card link

**Performance**

-   Skeleton preloader
    - https://css-tricks.com/building-skeleton-screens-css-custom-properties/
-   Pagination for the API
-   Intersectionobservers on the cards
    - We could conditionally load cards instead of paging them
        - Check if there's a next log returned by the API, if not, go to the next page for content (or something to the same effect)
-   Preloading for components

## **Server:**

-   View for liked posts by user

## **If We Have Time**

-   #of posts links to a list of your posts
-   style finished hashtag in create form
-   buy Sqqrlz.com
    -   _Change django token in settings if we make the site live (major security flaw oopsies)_
-   styleize editing
-   Sort by topics with the links given by the server
    -   Update topic view to return squirrel logs better 
-   admins (view edit&delete post buttons, those functionalities)
-   limit homepage post num
-   gallery embeds and upvoting
-   make edit posts stay in database

## **Presentation:**
