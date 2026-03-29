# UserApi

All URIs are relative to *https://localhost:52055*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiUserMeGet**](UserApi.md#apiusermeget) | **GET** /api/User/me |  |



## apiUserMeGet

> UserDto apiUserMeGet()



### Example

```ts
import {
  Configuration,
  UserApi,
} from '';
import type { ApiUserMeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UserApi();

  try {
    const data = await api.apiUserMeGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**UserDto**](UserDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **404** | Not Found |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

