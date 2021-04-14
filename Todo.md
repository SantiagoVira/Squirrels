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

-   show replies
    -   page similar to a single user's posts for all replies
        -   in Uploads.js, setBackVisible to true to show the back button
        -   set posts to the post's replies
    -   button to add replies in replies section
    -   button on card with number of replies

## **Server:**

-   Reply should say what it's replying to
-   Replies should be postable to the reply link
-   New posts going to the bottom (maybe server?)

## **Other**

-   PERFORMANCE
-   buy Sqqrlz.com
-   Communities

## **Watch Out For:**

-   Load Posts isn't happening every time the match is changed
-   we used window.location.href instead of history.push()
