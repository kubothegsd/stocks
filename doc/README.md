## Requiremens clarification:

- The radar chart is nice to have
- Do not expect the data coming from the api to change.
- Using real_total_records to total_records
- Hardcode countries list in country filter
- Need to support responsive and theming

## Libraries:

- linter: eslint
- State management: Redux with redux toolkit
- Testing: Jest and react-tesing-library
- Mock server: msw
- UI library: chakra-ui
- chart (for radar chart): chartjs and react-chartjs-2

## Architecture

image

## Data Management - Data structures

I'm using Redux for data management. The most important data is put under `src/api/stock`.

### utils

Define a request construction to transform the fetch payload to the right request body

### data-type:

Define all the data shape of the request for the request construction and response shape

### Request state:

Store the state needed for the request, and the loading, error state. This data is used to make a request.

In render, this request state will be used to:

- Show the value of filter button
- Show loading or error of tile list
- Show loading of load more button

### Response state:

Store the response data and response meta. The data is used to show in the tile list, and the meta will be used in load more button.

In render, this response state will be used to:

- The tile grid
- Decide to show load more or not

## Data fetching:

Please look at the image.

The data will be fetched when the TileList is mounted for the first time.

It will be fetched with the next batch when user clicks to the load more

The data, meta and some request states: offset, size, loading, error will be resetted when user choose a new filter.

## Component grouping (How you organise your components into logical groups)

Please see the image above and a code in `src/components`

- The resuable component: FilterDropdown. It's reused for 2 filters: country and market cap
- The resuable hook: useFetchStock

## Rendering performance (Check for performance bottlenecks)

image

Right now, the performance on the mobile is poor, lighthouse score for mobile is 85. We can use the pre-render or SSR technique to improve it.

## Styling architecture (How you implement your styles)

I'm using chakra ui to do that. Basically, I implement the raw html first to make sure the data is correct, then apply chakra-ui to this.

Basically chakra-ui is like a design system with their rules. So I just need to config it to have the theming, responsiveness.

Some components that I used from chakra-ui are:

- Flex, Box: For page layout
- Heading, Text: For typo
- Button, MenuButton,...

## Testing practices

I'm using Jest and react-testing library for it.

- All the data logics should be tested. Here is the reducers, actions, selectors and utilities.
- The overall component (APP) should be tested using mock server to cover the basic full flow.
- All the imporant components with complicated logic should be tested.

## UI/ UX/ a11y checklist

- Theming works
- Responsive works.
- The UI does not break in 200%
- All controls work on mobile
- Supports colorblind, the page gives enough info in both dark and light theme in greyscale (Monochromacy / Achromatopsia)
- User can use the page with just only mouse. No unnessesary focus.
- Support the quick navigation by typing for the long dropdown menu.
- The state of system should be reflected on screen. Tested with loading, error and empty state

## Some improvements can be made later:

- Data integrity. Handle the data fetching in case the data is updated, to prevent outdated data and race condition.

- i18n

- Persist the filter state into localStorage

- Right now, the performance on the mobile is poor, lighthouse score for mobile is 85. We can use the pre-render or SSR technique to improve it.
