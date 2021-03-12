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

-   Fix how the styling on liked posts works, basically we need to make the user load them, instead of individual cards
-   on screen too small cards overflow in the gallery
-   Little hover thing for icons
-   Liking color highlights
-   Favicon
-   hide go up button when you are not scrolling down

## **Server:**

-   Actual profile pictures
-   Nested serializer view for who liked a post
    -   Return username and relevant info so we don't have to get
-   topics/<int:pk>/uploads
    -   Or something to that effect

## **Other**

-   buy Sqqrlz.com
