# MedicLab Frontend

## Description
The MedicLab Frontend is a web application developed in Angular 17 to manage access to the MedicLab system. This application consumes data from the MedicLab API and provides an interface for users categorized as admin or employee.

## How to Start the Application

#### This section will guide users on how to start and run the Angular application locally.

### Prerequisites
- Node.js (version 20.x)
- Angular CLI (version 17)

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/medic_web.git

   ```

2. Install dependencies:

   ```
   npm install

   ```

3. Update environment configuration:

    - Open the src/environments/environment.development.ts file.
    - Update the API URL to point to your backend API:
    
    export const environment = {
      production: false,
      apiUrl: 'https://your-api-url.com'
    };

4. Start the development server:

  ```
  ng serve

  ```


## Deployment
The frontend application is available for testing at:
[MedicLab Web](https://medic-lab-web.azurewebsites.net/)

## Test User
- **Username:** admin
- **Password:** test

## Notes
- Sometimes you may experience a delay of 20-30 seconds for responses due to the Azure free web service limitations.

## License
This project is licensed under the MIT License.


