### Хэрхэн ажилладаг вэ? How it works?

1. Хэрэглэгч бүртгүүлнэ. (Users collection)
2. Групп үүсгэнэ. (Groups collection)
3. Гишүүд группдээ нэмнэ. (Groups collection)
4. Тухайн өдрийн зардлаа оруулна. (Expenses collection)
5. Хэн хэнийг зардалд оруулахаа сонгоно. (Debts collection)
6. Баланс дээр дарахад хэрэглэгч тус бүрийн хэн хэндээ хэдийн өртэйг нь тооцоолно.
7. Settle debt буюу өрийг тэглэнэ. (Debts collection)
8. Бүх өр төлөгдсөн бол зардлын бүртгэлийг устгана. (Expenses collection)

### Backend cервэрийг ажиллуулах. Running the Server

1. Open a terminal window.
2. Ensure that you're in the root directory: `mezorn-task-nodejs`
3. Navigate to the server directory: `cd server`
4. Install dependencies: `npm install`
5. Run the server: `npm start`

## API Endpoints

Дараах endpoint ашиглагдана.

### 1. Group endpoints

### GET

http://localhost:PORT/group `Get groups`
<br/>

### POST

http://localhost:PORT/group `Create a group`
<br/>

### PUT

http://localhost:PORT/group/id `Update a group`

<br/>

### DELETE

http://localhost:PORT/group/id `Delete a group`

<br/>

#### RESPONSE example

```bash
[
  {
    id: '21d0a5e9eb451b3b25ea',
    name: 'My group',
    group_link: 'http://localhost:PORT/group/21d0a5e9eb451b3b25ea',
    members: ['Ganzo'],
    admin: 'Ganzo',
    created: 1684408285646,
  },
  {
    id: '21d0a5e9eb451b3b25ea',
    name: 'My group',
    group_link: 'http://localhost:PORT/group/21d0a5e9eb451b3b25ea',
    members: ['Ganzo'],
    admin: 'Ganzo',
    created: 1684408285646,
  },
];
```

### 2. User endpoints

### GET

http://localhost:PORT/group/id/users `Get users`
<br/>

### POST

http://localhost:PORT/group/id/users `Create a user`
<br/>

### PUT

http://localhost:PORT/group/id/users/id `Update a user, delete a group`
<br/>

### DELETE

http://localhost:PORT/group/id/users/id `Delete a user`
<br/>

#### RESPONSE example

```bash
[
  {
    id: 'be90e6a756d4a3ebe8d1f547dc401abe',
    name: 'Ganzo',
    email: 'ganzo@gmail.com',
    password: '123456',
    phone: '123456',
    netDebt: -14,
  },
];
```

### 3. Debts endpoints

### GET

http://localhost:PORT/group/id/debts `Get debts`
<br/>

http://localhost:PORT/group/id/debts/from/to `Get debts between users`
<br/>

### POST

http://localhost:PORT/group/id/debts/add `Create a debt (өр үүсгэх)`
<br/>

### PUT

http://localhost:PORT/group/id/debts/settle `Sett debt between users (өр тэглэх)`
<br/>

### RESPONSE example

```bash
[
  {
    id: '428583b145af80862fcd12cfd2d3aeda',
    from: 'Bilgun',
    to: 'Ganzo',
    amount: 14,
  },
];
```

### 4. Expenses endpoints

### GET

http://localhost:PORT/group/id/expenses `Get expenses, create a expense (тухайн өдрийн зардал үүсгэх)`
<br/>

### DELETE

http://localhost:PORT/group/id/expenses/id `Delete a expense`
<br/>

### RESPONSE example

```bash
[
  {
    id: '1ea2e128e6de554c9f50',
    name: 'kino',
    who_paid: 'Ganzo',
    who_must_pay: [{ name: 'Bilgun', amount: 5 }],
    amount: 15,
    expense_date: 1684423276529,
    group_id: 1,
  },
];
```
