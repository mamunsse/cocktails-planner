# Cocktail-planner web app

## Overview
The goal of this app is to help user to know which cocktails user can prepare out of those already stored ingredients. The app  provide options to add/update/remove ingredients including their expiry date. Based on the user inventory, app will automatically show a list of cocktail that can be prepared.

## Features
This web application backend has been built with Djnago REST framework which offers REST API services. If required, That can be used by other application. Application web interface has been developed using Reactjs.


## Installation
### Locally
- Clone this project (temporary git url: https://github.com/mamunsse/cocktails-planner.git)
- Install Python and ensure you have `venv` and `pip` packages installed
- Create new virtual environment with `python -m venv [env_name]` from your chosen location
- Activate the environment with `.\[env_name]\Scripts\activate` or `source .\[env_name]\Scripts\activate` depending of your chosen shell
- Navigate to the root of the project (`[project root directory]\backend`)
- Install project dependencies with `pip install -r requirements.txt`
- If required to remove all old data from database then run `python manage.py makemigrations` (optional)
- Migrate the database with `python manage.py migrate` (optional)

- navigate to `[project root directory]\gui` and ensure you have npm installed then Install node dependencies with `npm install`
- To generate optimized version of gui into backend run `npm run build`

- Navigate to the root of the project (`[project root directory]\backend`) and to Start development server on `http://127.0.0.1/:8000` or `http://localhost:8000/`  run `python manage.py runserver`

