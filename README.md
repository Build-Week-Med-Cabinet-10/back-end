# back-end

The host URL is https://med-cabinet-backend.herokuapp.com/

Below is a table with the API urls. Concat it to the host URL and include the required keys and their values in the body of the request.

| REST Method | API url  | required keys | returned values | token required? |
| ------------- | ------------- | ------------- | ------------- |  ------------- |
| POST | api/auth/register  | username, email, password  | username, email | no |
| POST | api/auth/login  | email, password  | username, email, token | no |
| POST | api/auth/logout  |   |  | yes |
| POST | api/auth/cannabis  | strain, type, effect, flavor, description  | Array of { id, strain, type, effect, flavor, description } | yes |
| GET | api/auth/cannabis  |   | Array of { id, strain, type, effect, flavor, description } | yes |
| DELETE | api/auth/cannabis/:cannabis_id  |   | Array of { id, strain, type, effect, flavor, description } | yes |
