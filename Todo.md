**Performance**

-   Skeleton preloader
    -   https://css-tricks.com/building-skeleton-screens-css-custom-properties/
-   Intersectionobservers on the cards
    -   We could conditionally load cards instead of paging them
        -   Check if there's a next log returned by the API, if not, go to the next page for content (or something to the same effect)
-   Preloading for components
-   Examples of efficient websites
    -   Github: https://github.blog/2021-01-29-making-githubs-new-homepage-fast-and-performant/
    -   Random site idk: https://css-tricks.com/tour-performant-responsive-css-site/
    -   https://medium.com/front-end-weekly/progressive-image-loading-and-intersectionobserver-d0359b5d90cd

## **Frontend**

-   post button gets half cutoff by footer on create
-   make search bar smaller not dissapear on small screen
-   menu underline goes to home page when reload
-   Use RegEx to make links clickable in messages
-   Show search bar in archive on mobile, just make it smaller
-   Hide the footer on mobile
-   On mobile the title “Sqrrlz” just sits on top of other elements and covers other things
-   “Total Votes” -> “Total Likes”
-   If Hashtags are too long they just overflow
-   ^ Same for text
-   Make username & pfp on a reply link to user’s posts

## **Server:**

-   searching by hashtags doesnt search entire database
-   Maybe a notification center

## **Other**

-   PERFORMANCE
-   buy Sqqrlz.com
-   Communities

## **Watch Out For:**

-   Load Posts isn't happening every time the match is changed
-   we used window.location.href instead of history.push()
