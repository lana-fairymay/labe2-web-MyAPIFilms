const express = require("express");
const jsonParser = express.json();
const fs = require("fs");
const {
    send
} = require("process");
const {
    Script
} = require("vm");
const filePath = './films.json';


//чтение файла
function ReadFile() {
    var users = fs.readFileSync(filePath, "utf8");
    if (users) {
        //если нет ошибок возвращаем распарсенный json файл
        return JSON.parse(users);
    } else {
        //если есть ошибка возвращаем массив
        let message = {
            status: 'error',
            code: 400,
            message: 'Ошибка'
        };
        return message;
    }
}

function FindByName(user_name, users) {
    var user = users.filter(item => item.country == user_name);
    return user;
}

function FindString(user_name, users) {
    let mass = new Array;
    for (let index = 0; index < users.length; index++) {
        if (users[index].country.indexOf(user_name) !== -1)
            mass.push(users[index]);
    }
    return mass;
}

function FindById(user_id, users) {
    user = users.find(item => item.id == user_id);
    return user;
}


const router = app => {
    app.get('/', (request, response) => {
        response.sendFile(__dirname + "/index.html");
    });

    app.get('/usersId', (request, response) => {
        let id = request.query.id;
        const users = ReadFile();
        let user = FindById(id, users);
        response.send(JSON.stringify(user));
    });

    app.get('/users', (request, response) => {
        const users = ReadFile();
        if (request.query.user_name == "") {
            response.send(JSON.stringify(users));
        } else {
            var user = FindString(request.query.user_name, users);
            response.send(JSON.stringify(user));
        }
    });
    app.post('/users', (request, response) => {
        const users = ReadFile();
        console.log(request.body)
        let user = users.reduce((acc, curr) => acc.id > curr.id ? acc : curr);
        let length = user.id + 1;
        request.body.id = length;
        users.push(request.body);
        let dat = JSON.stringify(users);
        fs.writeFileSync(filePath, dat);
        response.send(JSON.stringify(users));
    });

    app.put('/users', (request, response) => {
        const users = ReadFile();
        let user = request.body;
        for (let index = 0; index < users.length; index++) {
            if (users[index].id == user.id)

                users[index] = user;
        }

        let data = JSON.stringify(users);
        fs.writeFileSync(filePath, data);
        response.send(JSON.stringify(users));
    });
    app.delete('/users', (request, response) => {
        const users = ReadFile();
        let id_del = request.query.id;
        for (let index = 0; index < users.length; index++) {
            if (users[index].id == id_del)
                users.splice(index, 1);
        }

        let data = JSON.stringify(users);
        fs.writeFileSync(filePath, data);
        response.send(JSON.stringify(users));
    });
}
module.exports = router;