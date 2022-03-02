# Litten Loungers Code Review

## Schema Review

- Cart table is confusing. What entity does it represent? What is a Cart? What does each row
  in the cart table represent? If it's an Item in a particular user's cart, then this table might be better named as "CartItem" or "LineItem"
- Admins are just users, there's no need for a separate table (Roles table is a good way to solve this)
- Product table has an available which is a boolean. If this is future proofing for the inventory management of Tier 4, then you probably want a column to record you how many you had in stock, not just a boolean available/unavailable.  
- Where are you storing the product image URLs?
- Is Purchase History what happens when someone "Orders" ? If so you'll want to record the following information:
  - The product (What happens if an admin removes the product?)
  - The product's price at time of sale
  - the user who made the order
  - The quantity of the product they ordered
- I'm not seeing all the relationships being defined in the Schema.

Food for thought:
  One thing to remember: An a cart is an order that’s not fulfilled. So, you can have a boolean or a status in your Order table to indicate the various states of an order

## Model Review

### Products

- price: should probably be a number type not a string (we will have to sum up the totals when someone orders)
- imageURL: not in schema docs, but this should be longer than a regular STRING, urls can be very long.
- available: See notes above

### Cart

- Right now this is a through table for Users and Products
- Consider creating an Orders table.
- There would be a through table between Orders and Products, and another through table between Orders and Users
- The order table is just a cart that hasn't been checked out yet. So you can have a field to determine if the user has completed the order or not. This can also take care of the PurchaseHistory bit, as you can just put the historical price and quantity in the Order table.
- From an e-commerce perspective, when someone adds something to their "Cart" you are starting and order for that user, and then when they checkout, you are 'completing' that order.

### User

This looks to be the default. So think to yourself, 'What would i need to add to have two different types of users?' (Admin and Shopper)  Would you copy and paste this model into another file duplicating the code?  Or could you use a database relationship and more tables to solve this?

## Routes review

Not much here yet, but I would add documentation to the routes, and clean up any comments
you might have copy and pasted from the user routes.

## Frontend Review

Again, not a lot to look at right now but there is an AllProducts component.

### `<AllProducts>`

- Consider using React Hooks to build your components, it will simplify this component a lot.
- Consider making a `<Product>` component to render inside of your `products.map`. What props would you pass it?

### Error handling

- What happens if the call to fetch the products fails? Your site should do something graceful for the end user, like displaying some user-friendly message. (In this case it might be as simple as "I'm sorry I can't get the list of products right now, try again later).

## Other thoughts

- Take some time to flesh out more of the wire-frames, they are a good start, but if you flesh them out as you go it should give you a better plan.
- Take some time to create a document showing your backend routes. This can serve as documentation for your API and it also gives you a blueprint of what routes you need to make.
- On the wire-frames, add the frontend route (URL) to each wire-frame. What is the URL when I'm looking at this particular view?
- Perhaps you should change the database name from grace-shopper to whatever the name of your site is