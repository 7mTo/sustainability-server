drop database if exists sustainability;
create database sustainability;

\c sustainability;

create table member(
  token text primary key,
  name text,
  created timestamp,
  auth text
);

create table scan(
  token text references member(token),
  created timestamp,
  location text,
  type text,
  unique(created, location),
  primary key(token, created, location)
);
