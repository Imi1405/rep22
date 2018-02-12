
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyparser = require('body-parser');
const app = express();
const ObjectId = require('mongodb').ObjectID;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/app1db', (err, client) => {
        if (err) return console.log(err);
        let db = client.db('app1db');
        closure(db);
    })
}

app.get('/users', (req, res) => {
    connection(db => {
        db.collection('test').find().toArray((err, result) => {
            res.send(result);
        })
    })
});

app.get('/users/:id/:iTodo', (req, res) => {
    let userID = req.params.id;
    let indexTodo = req.params.iTodo;
    connection(db => {
        db.collection('test').findOne({ _id: ObjectId(userID) }, (err, result) => {
            if (err) throw err;
            res.send(result.todos[indexTodo]);

        })
    })

});

app.put('/users/:id/:iTodo', (req, res) => {
    let userId = req.params.id;
    let indexTodo = req.params.iTodo;
    console.log(req.body);
    connection(db => {
        db.collection('test').update({ _id: ObjectId(userId) },
            { $set: { "todos.1": req.body } },
            (err, result) => {
                res.send(result);
            })
    })
})

app.delete('/', (req, res) => {
    connection(db => {
        db.collection('pool').deleteOne(req.body, (err, result) => {

            if (err) throw err;
            res.send(result);
            console.log('1 document deleted');
            db.close();
        });
    });
});




app.put('/', (req, res) => {
    res.send({datareceived:req.body})
    // connection(db => {
    //     db.collection('test').insert(req.body, (err, result) => {
    //         if (err) throw err;
    //         res.send(result);
    //     })
    // })
});

console.log('hani nasma3 fik 3al port 3000');
app.listen(3000);
