CREATE USER test WITH PASSWORD 'postgres' CREATEDB;
CREATE DATABASE lib_quality_test
    WITH 
    OWNER = test
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;