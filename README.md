# JWT Authentication (NodeJS, Express, PostgreSQL)

### Folder Structure

    src
    ├── api                   # Api
    │   ├── controllers          # Express route controllers for  [Controller Layer]
    │   ├── routes               # Express routes 
    │   ├── middlewares          # Express middlewares
    │   ├── utils                # Helper functions
    │   └── routers.js           # All business Routes
    ├── data                  # Database workers/services [Service and Data Access Layer]
    ├── db                    # Database configuration and scripts
    ├── app.js                # Server and App entry point
    └── README.md


### Installing

Run docker container with PostgreSQL, replace <YOURPASSWORD> with the password you want and update .env file accordingly
```
docker run --name my-postgres -e POSTGRES_PASSWORD=<YOURPASSWORD> -d -p 5432:5432 postgres
```

Create database (using pgadmin or in the container)
```
CREATE DATABASE "AuthManager"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
```

Create table
```
CREATE TABLE Users(
	userid SERIAL PRIMARY KEY,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	creationdate TIMESTAMP NOT NULL,
	alterdate TIMESTAMP NOT NULL,
	CONSTRAINT email_unique UNIQUE(email)
)
```

Start application
```
npm install
npm run start
```

## Authors
* **João André Coelho** - *JWT Authentication (NodeJS, Express, PostgreSQL)* - [joaomcoelho](https://github.com/joaomcoelho)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
