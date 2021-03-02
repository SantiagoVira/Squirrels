**Performance**

-   Skeleton preloader
    -   https://css-tricks.com/building-skeleton-screens-css-custom-properties/
-   Pagination for the API
-   Intersectionobservers on the cards
    -   We could conditionally load cards instead of paging them
        -   Check if there's a next log returned by the API, if not, go to the next page for content (or something to the same effect)
-   Preloading for components
-   Examples of efficient websites
    -   Github: https://github.blog/2021-01-29-making-githubs-new-homepage-fast-and-performant/
    -   Random site idk: https://css-tricks.com/tour-performant-responsive-css-site/
    -   https://medium.com/front-end-weekly/progressive-image-loading-and-intersectionobserver-d0359b5d90cd

## **Frontend**

-   #of posts links to a list of your posts
-   Sort by topics with the links given by the server
    -   click on hashtag shows all posts with that hashtag
-   Gallery cards set votes doesnt work when update user is passed
-   styleize editing
-   fix the card going nono
    -   hashtags and text go over side this is bad plz fix k thx
-   Gallery embeds

## **Server:**

-   View for liked posts by user
-   Validation for usernames
-   Don't put user id 1 in squirrelogs view
-   Actual profile pictures
-   Update topic view to return squirrel logs better
-   Allow post updating (editing)
-   Save who liked a post

## **Other**

-   buy Sqqrlz.com
    -   _Change django token in settings if we make the site live (major security flaw oopsies)_
