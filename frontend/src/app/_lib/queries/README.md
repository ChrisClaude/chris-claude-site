# Guide to adding new queries

There is a bit of boiler plate to add a new query. These benefits for leveraging RTK Query on top of the generated code by open api (under the codegen folder) are as follows:

- Tracking loading state in order to show UI spinners
- Avoiding duplicate requests for the same data
- Optimistic updates to make the UI feel faster
- Auto management of cache lifetimes as the user interacts with the UI

 This is a guide to help you add a new query.

1. Generate the api client code using the openapi-generator-cli. This will generate the code under the codegen folder. You can wrap it into a service e.g: `booking.service.ts`.

2. Add the query to the `customBaseQuery` in `customBaseQuery.ts`. This is where you will call the generated api client code or the service.

3. Add the query to the `rtk.types.ts` file. This is where you will define the type of the query.

4. Add the query to the `index.ts` file. This is where you will define the query and export the hook.

5. Use the hook in your component.