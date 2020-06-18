# back-end

The host URL is https://med-cabinet-backend.herokuapp.com/

Below is a table with the API urls. Concat it to the host URL and include the required keys and their values in the body of the request.

| REST Method | API url  | required keys | returned values |
| ------------- | ------------- | ------------- | ------------- |
| POST | api/auth/register  | username, email, password  | username, token |
| POST | api/auth/login  | email, password  | username, token |
