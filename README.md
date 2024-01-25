# Astro WordPress Starter Evolution

This project is meant to be a flexible starting point for people interested in using [Astro](https://astro.build/) with WordPress as a headless CMS. If you want some additional resources to help get you started, check out the blog post and video linked below.

It's a continuation of the original [Astro WordPress Starter](https://astro.build/themes/details/astro-wordpress-starter/)

[✍️ Read the step-by-step tutorial](https://developers.wpengine.com/blog/building-a-headless-wordpress-site-with-astro)
[📹 Watch the video](https://www.youtube.com/watch?v=BcoxZZIfESI)

I added an authentication to make things more secure, check the links below.

## Requirements
- [WordPress](https://wordpress.org/)
- [WPGraphQL](https://www.wpgraphql.com/docs/introduction)
- [Generating Application Passwords in WordPress](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/)
- [Testing Basic Auth Headers in Postman](https://www.postman.com/raimonika/workspace/postman-learning/request/17776042-4fa53ce5-548e-4db1-82e6-188fc5a0dec7)
- Environment Variables

Add a variable to your `.env` and then hit `npm run dev`:

`GRAPHQL_URL = https://yoursitename.com/graphql`

`GRAPHQL_PASSWORD = yoursupersecurepassword`

### Routing and Templates

This starter project leans into the WordPress CMS routing capabilities and uses a `getNodeByUri` query in WPGraphQL to handle any route path that WordPress knows about. This allows you to handle all WordPress content types using the `[...uri].astro` component. From there, Astro parses the `uri` and uses that to call `getNodeByURI` from `api.js` to fetch data about that resource from the CMS. Once data is returned, we look at the content type and then dynamically resolve a content template from the `templates` directory.

#### Adding Content Types

This project comes with built in support for Post, Page, Tag, and Category types, but could easily be extended for custom post types or other native content types. To add support for a custom post type you would do the following:
1. Add a GraphQL fragment for your post type to `getNodeByURI` from `api.js`
2. Add an Astro component as a template
3. Add a case to the switch statement in `[...uri].astro` to catch the content type and resolve the template

#### Overriding Default Routing

Since routes using [rest parameters in Astro](https://docs.astro.build/en/core-concepts/routing/#rest-parameters) come last in the [route priority order](https://docs.astro.build/en/core-concepts/routing/#route-priority-order), you can easily override this catch-all routing pattern by creating a more specific route to handle a given path.

For example, if you want the path `/category/food-trucks` to be handled by a different Astro component, you can add a corresponding file to the `pages` directory to override the default `...uri` route.


### Menus

By default, the menus were replaced by a custom query of static pages for navigation, default behavior in a clean instalation of WordPress, at least in [LocalWP](https://localwp.com/).

### Rendering and Serving

This project is using the new [hybrid rendering model](https://docs.astro.build/en/guides/server-side-rendering/#hybrid-rendering) available in Astro v2. To pre-render any routes you add, make sure to include the following export in your Astro component's frontmatter:

`export const prerender = true;`

All of the current routes are being pre-rendered to HTML and served using the [standalone node adapter](https://docs.astro.build/en/guides/integrations-guide/node/). This offers users the flexibility to create additional SSR functionality if desired while still optimizing content pages using pre-rendered HTML.

## Headless WordPress Hosting with Atlas

WP Engine's Atlas platform provides a performant and user-friendly hosting platform for headless WordPress and Node-based JavaScript apps. [Create a free sandbox account](https://wpengine.com/atlas/) to try the platform, and check out our Astro deployment guide for instruction to deploy to the platform.

## Notes

Almost all README from the original project was preserved, after all I just create a different theme, just a shell of the great work done before.

The dates were set to Brazilian Portuguese locale, it's very simple to set to any locale, just use yours with appropriate string, like `toLocaleDateString('en-US', options)`. The options are very easy to understand as well, `options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}`.

### Quick install

A fresh instance of WordPress with [LocalWP](https://localwp.com/), just this [WPGraphQL](https://www.wpgraphql.com/docs/introduction) plugin installed.

The env variables could be commented until the authentication is ready.
