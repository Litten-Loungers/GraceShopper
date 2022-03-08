# Code Review 03-08-2022

## Code Quality

- RequireToken middleware should be in one place, don't copy and paste code
- Don't leave commented out code in main. If you need to, leave clear `// TODO` comments about why it's being left
- AdminAllProducts/AllProducts has a lot of complex code inside the JSX in an onClick handler, this is really hard to read and should be moved into a function.
- I would like to have seen some more React Hooks components, it would probably make some of these larger components simpler. If you have time, every team member should pick one component and try to convert it to hooks.
- several components contain local state AND redux state for the same information, you only need state stored in one place.
- Add more comments, especially in places where there is complex logic happening

## Project Management

- I honestly don't see a lot of task cards, there's a lot of code, and only some of it is tracked by cards on the project board.
- The card titles are organized by User and Admin as the titles, in general tasks need to be focused pieces of work that can be done. Things like User and Admin are more like categories of tasks than actual task titles. More cards are better because it's easier to see the progress and keep track of what tasks everyone is working on.
- Use github issues as tasks because developers can be assigned to them and everyone can be aware of what everyone else is working on.

## Security

- Returning plain text password to user interface
- Signup form doesn't validate username and password, I can create a user with an empty username and password and then login with that user.

## Product

- Confused by the UI/UX in the sidebar. Is Filter By Type some future enhancement? I don't think In cart should be there, as it's in the nav bar already, and checkout is usually something you do after visiting the cart.

## Cart

- Add to cart fails with 'product is not defined'
- A custom useCart hook could help keep logic out of the components and keep
  you from having to duplicate code between components.
- you are repeatedly access localStorage, even during the render phase of your component (like fetching the token). This is an anti-pattern, and a side effect which is not good to do in render. It's also not necessary as you should be looking at the redux store's auth state to determine if someone is logged in or not.
- Ideally your local storage interactions should be in one place. A thunk can be used to update localStorage
- You can use the redux store to store state regardless of wether or not you are getting the data from a backend or storing it in localStorage.

## Styling

- 100vw doesn't do what you think it does, the body has padding and so the nav is inside of those, and doesn't take that padding into effect when calculating the width of the nav bar. (another way to think about it is that the navbar IS the width of the viewport, but it has padding on the sides as well).
- The nav doesn't need a width anyway, since it's a block element, it expands to fit the full width anyway.
- `* { box-sizing: border-box }` should also be used to help with sizing issues.
- Find a color pallete generator online and use it to generate a pallette of colors.
- The blue text on red background is headache inducing.
- Too big of an area of bright red color, limit bright colors to accent colors or smaller areas.
- Choose a more decorative font for the branding of the site, choose a name for your application and use that or a logo at the top.
- Font sizes seem to be very large.
- You should be able to see more movies on the product page. Consider creating a grid or list of movies instead of showing the posters full size. Full size should be relegated to the product detail pages.
- Optionally Pull in an icon library like react-icons/material-icons etc to add cart icons or other icons to buttons or links.
- you are reusing the singleProduct class on the product list. Consider modularizing your CSS so this can be styled separately without conflicting classes.
