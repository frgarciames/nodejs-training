## Objectives

- Create authentication entities.
- Authentication way (jwt)

## Problems

- Creation of the authentication entities isolated from the domain.

## Solutions

- Creation of Auth and Role entity.
- Create relations for User/Client with Auth (one-to-one) and Role (many-to-many).
- Create repository for Auth and Role.
