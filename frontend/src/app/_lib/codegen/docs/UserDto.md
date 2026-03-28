
# UserDto


## Properties

Name | Type
------------ | -------------
`id` | string
`email` | string
`name` | string
`surname` | string
`image` | string
`userRoles` | [Array&lt;UserRoleDto&gt;](UserRoleDto.md)
`bookmarks` | [Array&lt;BookmarkDto&gt;](BookmarkDto.md)
`postReactions` | [Array&lt;PostReactionDto&gt;](PostReactionDto.md)
`comments` | [Array&lt;CommentDto&gt;](CommentDto.md)
`posts` | [Array&lt;PostDto2&gt;](PostDto2.md)

## Example

```typescript
import type { UserDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "email": null,
  "name": null,
  "surname": null,
  "image": null,
  "userRoles": null,
  "bookmarks": null,
  "postReactions": null,
  "comments": null,
  "posts": null,
} satisfies UserDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


