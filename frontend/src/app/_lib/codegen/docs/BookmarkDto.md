
# BookmarkDto


## Properties

Name | Type
------------ | -------------
`postId` | string
`userId` | string
`post` | [PostDto](PostDto.md)

## Example

```typescript
import type { BookmarkDto } from ''

// TODO: Update the object below with actual values
const example = {
  "postId": null,
  "userId": null,
  "post": null,
} satisfies BookmarkDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BookmarkDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


