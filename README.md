# abn-tv-maze


## Project Setup

```sh
npm install
```
To run the project:
```sh
npm run dev
```

To rtest the project:
```sh
npm run test
```

## Tech Stack
**Framework**: Vue 3, as per request for the assignment. Although I should mention that this app could also be built using Angular or React if needed. Vite was used as the bundler.

**Typescript**: I chose Typescript to add type safety to the project. In my opinion it prevents a lot of bugs in compile time instead of runtime. Vue supports Typescript as well. However, it increased the learning curve during development. I do recommend Typescript for scaled up projects, but smaller projects such as this assignment may slow down from the verbose syntax of Typescript (but not necessarily bad).

**Unit testing**: Used Vitest as the test runner with a mostly Jest-like syntax, although some complications due to typescript. Vue test utils were used to mount components and interact with the DOM.I tested props passed to child components, events, html attributes or text, and any implicit logic that is not directly public (tested via public events mostly).

**State management**: Initially added Pinia as the state manager to this project, but came to the conclusion that it was not neccessary within the scope of this project. Most state is managed through props (in some cases prop drilling), reactive data, computed data and event emitters. 

**Style**: Tailwind CSS and it's utility classes are used to style the components. It's easy to use with a small learning curve. However, the styles used in this project could have been written in plain CSS/SCSS, but for the purpose of this assignment it was nice to have some easily available utility classes available.

**Project structure**: Project structure is mostly what Vue cli initially creates. I seperated views (routing logic) and components in seperate folders. I created a services folder to move the API and API response mapping logic. 

**API**
The TV Maze API is used to fetch show data. Since the responses contain a lot of field that are not required in the FE views/components, the responses are mapped to simpler objects in the service layer.
The following endpoints were used:
- Show Search (find by name)
- Show lookup (get show detaills by id)
- Get schedule
- Get Web schedule

For performing API calls, the native Fetch API was used instead of a third party http client. 


## Features
For this project I created several views (for routing logic) and components (ui elements).
### Views
**SearchView**: search show by name. Up to 10 results are returned from the API. Shows are mapped to a list of summaries and passed to the ShowListComponent, where they can be ordered by name or rating.

**ExploreView**: fetches shows scheduled on regular tv as well as web shows. Both lists are combined, then deduplicated and mapped to a list of summaries. The summaries are passed to different ShowListComponents filtered by genre.

**ShowDetailsView**: Displays show details. Show id is passed through a query parameter.

### Reusable components
**ShowTile**: A tile containing a thumbnail of a show, a title, rating, and optionally the first listed genre. If a tile is clicked, user is navigated to the ShowDetailsView. 
**ShowList**: A horizontal lists that displays lists passed through an input. Renders ShowTiles.


