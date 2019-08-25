# sms-management-API
A Simple SMS API that models sending and receiving messages between contacts.

The app is hosted on heroku [here](https://smsmgtapi.herokuapp.com/api)
The API is documented [here](https://documenter.getpostman.com/view/5092825/SVfMTVpJ)

## Made With
    * Nodejs for server-side logic
    * Babel for transpiling
    * Express for api routes implementation
    * Heroku for hosting services
    * PostgresSql for the App's database

## Installation.
  * Install [Nodejs](https://nodejs.org/en/download/)
  * Clone this repo ``` git clone https://github.com/d-beloved/sms-management-API.git ```
  * Run ```npm install``` to install the required dependencies
  * Navigate to http://localhost:3111

## Available APIs
<table>
  <tr>
      <th>HTTP REQUEST VERB</th>
      <th>API ENDPOINT/PATH</th>
      <th>ACTION</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/contacts</td>
      <td>Creates a new contact</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/contacts</td>
      <td>Get information about registered contacts</td>
  </tr>
  <tr>
      <td>DELETE</td>
      <td>/api/contacts/:id</td>
      <td>Deletes a contact</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/sms</td>
      <td>Send an SMS to a registered contact</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/sms/:smsId/read</td>
      <td>Read an SMS</td>
  </tr>
</table>

## License and Copyright
&copy; Moronkeji Ayodeji David

Licensed under the [MIT License](LICENSE).