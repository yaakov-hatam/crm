# The stack
## The client
TBD

## The Server
Node.js

## The web server
express

server -> endpoints

endpoint -> controller, db

controller -> VERBS (post, get, put, delete)

db -> CRUD (Create, Read, Update, Delete)

## The objects
### Contact
Contact (id: number, name: string, email, phone: string, company_id: number)

### Company
Company (id: number, name: string, country: string)

### Quote
Quote (id: number, name: string, rows: [], total: number)


## EX1
- if the user call to endpoint with **querystring** depth=true (http://localhost:14700/contact/1?depth=true)
the server returns the contact object with foreign objects.
response example:
```json
{
    "id": 1,
    "name": "Contact name",
    "email": "contact@email.com",
    "phone": "054-2342342",
    "company_id": 1,
    "company_idModel": {
        "id": 1,
        "name": "The company",
        "country": "UK"
    }
} 
```