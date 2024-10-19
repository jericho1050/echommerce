# Echommerce

A web app echommerce :D


License: MIT

## Getting Started (Running Locally)

***Note: you must have your own running Postgre Database***

1. Clone Repository and change directory

    ```sh
    % git clone https://github.com/jericho1050/echommerce.git
    % cd echommerce
    ```

2. Set Up your virtual env and activate it

    ```sh
    % python -m venv env
    % source env/bin/activate
    ```

3. Download all the necessary dependencies

    ```sh
    (env) echommerce % pip install -r requirements/local.txt
    ```

4. Create the enviroment variables in root directory

    ```sh
    (env) echommerce % touch .env
    ```

    ```py
    # e.g format: postgresql://[user[:password]@][host][:port][/dbname][?param1=value1&...]
    DATABASE_URL="postgresql://postgres:123@localhost:5432/echommerce"
    VITE_API_URL="http://localhost:5173"

    # https://developer.paypal.com/dashboard/applications/sandbox
    # Create APP and Copy paste the credentials in here
    PAYPAL_CLIENT_ID="YOUR PAYPAL CLIENT ID"
    PAYPAL_CLIENT_SECRET="YOUR CLIENT SECRET"
    ```

    One more thing is to [create and use a test account](https://developer.paypal.com/dashboard/accounts) for the PayPal sandbox when mocking a paymentt.

5. Apply the database schema

    ```sh
    (env) echommerce % python manage.py migrate
    ```

6. Create an admin account / superuser

    ```sh
   (env) echommerce % python manage.py createsuperuser 
   ```

7. Run the backend server

    ```sh
    (env) echommerce % python manage.py runserver
    ```

    You should see something like this

    ```sh
    Starting development server at http://127.0.0.1:8000/
    ```

    You may now access the admin interface <http://127.0.0.1:8000/admin>
    also the generated rest api docs <http://127.0.0.1:8000/api/docs>

8. Create another `.env` in root `/frontend` directory

    ```py
    VITE_REST_API_URL=http://localhost:8000
    # I know know, it's a duplicate. just paste it
    VITE_PAYPAL_CLIENT_ID=YOUR_CLIENT_ID
    VITE_PAYPAL_CLIENT_SECRET=YOUR_CLIENT_SECRET
    ```

9. Open A New terminal then cd to frontend directory do these

    ```sh
     echommerce % cd frontend
     frontend % npm install --legacy-peer-deps
     frontend % npm run dev    
    ```

    Your frontend should also be now running

    ```sh
     Local:   http://localhost:5173/
     ```



## Settings

Moved to [settings](http://cookiecutter-django.readthedocs.io/en/latest/settings.html).

## Basic Commands

### Setting Up Your Users

- To create a **normal user account**, just go to Sign Up and fill out the form. Once you submit it, you'll see a "Verify Your E-mail Address" page. Go to your console to see a simulated email verification message. Copy the link into your browser. Now the user's email should be verified and ready to go.

- To create a **superuser account**, use this command:

    python manage.py createsuperuser

For convenience, you can keep your normal user logged in on Chrome and your superuser logged in on Firefox (or similar), so that you can see how the site behaves for both kinds of users.

### Type checks

Running type checks with mypy:

    mypy echommerce

### Test coverage

To run the tests, check your test coverage, and generate an HTML coverage report:

    coverage run -m pytest
    coverage html
    open htmlcov/index.html

#### Running tests with pytest

    pytest

### Live reloading and Sass CSS compilation

Moved to [Live reloading and SASS compilation](https://cookiecutter-django.readthedocs.io/en/latest/developing-locally.html#sass-compilation-live-reloading).

## Deployment

The following details how to deploy this application.
