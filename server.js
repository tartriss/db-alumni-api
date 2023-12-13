const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
var bodyParser = require('body-parser')
require('dotenv').config()
const app = express();
var jsonParser = bodyParser.json()

//MySQL Connection
app.use(cors())
app.use(express.json())
const db = mysql.createConnection(process.env.DATABASE_URL)



app.get("/getupdate/:id", async (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM alumni WHERE alumni_id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


app.get("/alumni", async (req, res) => {
    db.query("SELECT * FROM alumni", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/create', (req, res) => {
    const card_id = req.body.card_id;
    const email = req.body.email;
    const fname = req.body.fname;
    const midname = req.body.midname;
    const lname = req.body.lname;
    const faculty = req.body.faculty;
    const school = req.body.major;
    const tel = req.body.telnum;
    const address = req.body.address_line1;
    const district = req.body.district;
    const city = req.body.city;
    const province = req.body.province;
    const postcode = req.body.postcode;
    const certificates = req.body.certificates;
    const statuscareer = req.body.statuscareer;
    const career = req.body.career;
    const year = req.body.year;
    const salary = req.body.salary;

    db.query('INSERT INTO alumni (card_id, email, fname, midname, lname, faculty, major, telnum, address_line1, district, city, province, postcode, certificates, statuscareer, career, year, salary) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [card_id, email, fname, midname, lname, faculty, school, tel, address, district, city, province, postcode, certificates, statuscareer, career, year, salary], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })

})

//ReadSearch
app.get("/setalumni", async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const search = req.query.search;
    const sort_column = req.query.sort_column;
    const sort_direction = req.query.sort_direction;
    var params = [];
    var sql = 'SELECT * FROM alumni '
    if (search) {
        sql += ' WHERE CONCAT(fname, lname, faculty, major) LIKE ?'
        params.push('%' + search + '%')
    }
    if (sort_column) {
        sql += ' ORDER BY ' + sort_column + ' ' + sort_direction;
    }

    sql += ' LIMIT ?, ?'
    params.push(startIndex)
    params.push(limit)
    db.query(sql, params, (err, result) => {
        db.query('SELECT COUNT(alumni_id) as total FROM alumni', (err, counts, fields) => {
            const total = counts[0]['total'];
            const total_pages = Math.ceil(total / limit)
            res.json({
                page: page,
                limit: limit,
                total: total,
                total_pages: total_pages,
                data: result
            })
        })
    })
});

//ReadSearchDash
app.get("/setalumnidash", async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const search = req.query.search;
    const sort_column = req.query.sort_column;
    const sort_direction = req.query.sort_direction;
    var params = [];
    var sql = 'SELECT * FROM alumni '
    if (search) {
        sql += ' WHERE CONCAT(year, faculty, major) LIKE ?'
        params.push('%' + search + '%')
    }
    if (sort_column) {
        sql += ' ORDER BY ' + sort_column + ' ' + sort_direction;
    }

    sql += ' LIMIT ?, ?'
    params.push(startIndex)
    params.push(limit)
    db.query(sql, params, (err, result) => {
        db.query('SELECT COUNT(alumni_id) as total FROM alumni', (err, counts, fields) => {
            const total = counts[0]['total'];
            const total_pages = Math.ceil(total / limit)
            res.json({
                page: page,
                limit: limit,
                total: total,
                total_pages: total_pages,
                data: result
            })
        })
    })
});

//ReadSearchJobs
app.get("/setalumnijobs", async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const search = req.query.search;
    const sort_column = req.query.sort_column;
    const sort_direction = req.query.sort_direction;
    var params = [];
    var sql = 'SELECT * FROM alumni '
    if (search) {
        sql += ' WHERE CONCAT(year, faculty, major) LIKE ?'
        params.push('%' + search + '%')
    }
    if (sort_column) {
        sql += ' ORDER BY ' + sort_column + ' ' + sort_direction;
    }

    sql += ' LIMIT ?, ?'
    params.push(startIndex)
    params.push(limit)
    db.query(sql, params, (err, result) => {
        db.query('SELECT COUNT(alumni_id) as total FROM alumni', (err, counts, fields) => {
            const total = counts[0]['total'];
            const total_pages = Math.ceil(total / limit)
            res.json({
                page: page,
                limit: limit,
                total: total,
                total_pages: total_pages,
                data: result
            })
        })
    })
});




//Delete
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM alumni WHERE alumni_id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
            return
        } else {
            res.send(result);
        }
    });
});

///Update
app.put("/update", (req, res) => {
    const id = req.body.alumni_id;
    const cardid = req.body.card_id;
    const email = req.body.email;
    const fname = req.body.fname;
    const midname = req.body.midname;
    const lname = req.body.lname;
    const faculty = req.body.faculty;
    const school = req.body.major;
    const tel = req.body.telnum;
    const address = req.body.address_line1;
    const district = req.body.district;
    const city = req.body.city;
    const province = req.body.province;
    const postcode = req.body.postcode;
    const certificates = req.body.certificates;
    const statuscareer = req.body.statuscareer;
    const career = req.body.career;
    const year = req.body.year;
    const salary = req.body.salary;


    db.query(
        "UPDATE alumni SET card_id = ?, email = ? , fname = ?,midname = ?,lname = ? ,faculty = ?,major = ?,telnum = ?,address_line1 = ?,district = ?,city = ?,province = ?,postcode = ? ,certificates = ? ,statuscareer = ? ,career = ? ,year = ? ,salary = ? WHERE alumni_id = ?",
        [cardid, email, fname, midname, lname, faculty, school, tel, address, district, city, province, postcode, certificates, statuscareer, career, year, salary, id],
        (err, result) => {
            if (err) {
                console.log(err);
                return
            } else {
                res.send(result);
            }
        }
    );
});

//GET EVENTS
app.get("/event", async (req, res) => {
    db.query("SELECT * FROM activity", (err, result) => {
        if (err) {
            console.log(err);
            return
        } else {
            res.send(result);
        }
    });
});

//GET EVENT PAGE
app.get("/setactivity", async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const search = req.query.search;
    const sort_column = req.query.sort_column;
    const sort_direction = req.query.sort_direction;
    var params = [];
    var sql = 'SELECT * FROM activity '
    if (search) {
        sql += ' WHERE CONCAT(activity_id, title, detail, start, end) LIKE ?'
        params.push('%' + search + '%')
    }
    if (sort_column) {
        sql += ' ORDER BY ' + sort_column + ' ' + sort_direction;
    }

    sql += ' LIMIT ?, ?'
    params.push(startIndex)
    params.push(limit)
    db.query(sql, params, (err, result) => {
        db.query('SELECT COUNT(activity_id) as total FROM activity', (err, counts, fields) => {
            const total = counts[0]['total'];
            const total_pages = Math.ceil(total / limit)
            res.json({
                page: page,
                limit: limit,
                total: total,
                total_pages: total_pages,
                data: result
            })
        })
    })
});


//CREATE EVENTS
app.post('/createevent', (req, res) => {
    const title = req.body.title;
    const detail = req.body.detail;
    const start = req.body.start;
    const end = req.body.end;

    db.query('INSERT INTO activity (title,detail,start,end) VALUES (?,?,?,?)',
        [title, detail, start, end], (err, result) => {
            if (err) {
                console.log(err)
                return
            } else {
                res.send(result)
            }
        })

})

//DELETE EVENTS
app.delete("/deleteevents/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM activity WHERE activity_id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
            return
        } else {
            res.send(result);
        }
    });
});

app.get("/getupdateactivity/:id", async (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM activity WHERE activity_id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
            return
        } else {
            res.send(result);
        }
    });
});

//UPDATE EVENTS
app.put("/updateactivity", (req, res) => {
    const id = req.body.activity_id;
    const title = req.body.title;
    const detail = req.body.detail;
    const start = req.body.start;
    const end = req.body.end;
    const all_people = req.body.all_people;
    const participants = req.body.participants;
    const noparticipants = req.body.noparticipants;

    db.query(
        "UPDATE activity SET title = ?, detail = ? , start = ?,end = ?, all_people = ?,participants = ?,noparticipants = ? WHERE activity_id = ?",
        [title, detail, start, end, all_people, participants, noparticipants, id],
        (err, result) => {
            if (err) {
                console.log(err);
                return
            } else {
                res.send(result);
            }
        }
    );
});



//ADMIN

const bcrypt = require('bcrypt');
const saltRounds = 10;


app.post('/register', jsonParser, (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    bcrypt.hash(password, saltRounds, function (err, hash) {
        db.query('INSERT INTO useradmin (user,password,fname,lname,email) VALUES (?,?,?,?,?)',
            [user, hash, fname, lname, email], (err, result) => {
                if (err) {
                    res.json({ err })
                    return
                } else {
                    res.send(result)
                }
            })
    });

})

const jwt = require('jsonwebtoken');
const secret = 'Login-aaa-aaa';

app.post('/login', jsonParser, (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    db.query('SELECT * FROM useradmin WHERE user = ?',
        [user], (err, users) => {
            if (err) {
                res.json({ err })
                return
            }
            if (users.length == 0) {
                res.json({ message: 'No User found' })
                return
            }
            bcrypt.compare(password, users[0].password, function (err, isLogin) {
                if (isLogin) {
                    var token = jwt.sign({
                        user: users[0].user,
                    },
                        secret, { expiresIn: '2h' });
                    res.json({
                        status: 'ok', message: 'login success', token, userid: {
                            id: users[0].id,
                            user: users[0].user,
                            password: users[0].password,
                            fname: users[0].fname,
                            lname: users[0].lname,
                            email: users[0].email,
                            role: users[0].role
                        }
                    })
                } else {
                    res.json({ status: 'err', message: 'login failed' })
                }
            });
        })
})


app.post('/authen', jsonParser, (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, secret);
        res.json({ status: 'ok', decoded })
    } catch (err) {
        res.json({ status: 'err', message: err.message })
    }
})

app.put("/updateaccountnew", (req, res) => {
    const id = req.body.id;
    const user = req.body.user;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const role = req.body.role;
    bcrypt.hash(password, saltRounds, function (err, hash) {
        db.query(
            "UPDATE useradmin SET user = ?, password = ? , fname = ?,lname = ?,email = ?,role = ?  WHERE id = ?",
            [user, hash, fname, lname, email, role, id],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return
                } else {
                    res.send(result);
                }
            }
        );
    })
});

app.put("/updateaccount", (req, res) => {
    const id = req.body.id;
    const user = req.body.user;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const role = req.body.role;
    db.query(
        "UPDATE useradmin SET user = ?, fname = ?,lname = ?,email = ?,role = ?  WHERE id = ?",
        [user, fname, lname, email, role, id],
        (err, result) => {
            if (err) {
                console.log(err);
                return
            } else {
                res.send(result);
            }
        }
    );
});





//ReadSearchDash
app.get("/exportalumni", async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10000000;
    const startIndex = (page - 1) * limit;
    const search = req.query.search;
    const sort_column = req.query.sort_column;
    const sort_direction = req.query.sort_direction;
    var params = [];
    var sql = 'SELECT * FROM alumni'
    if (search) {
        sql += ' WHERE CONCAT(id, fname, lname) LIKE ?'
        params.push('%' + search + '%')
    }
    if (sort_column) {
        sql += ' ORDER BY ' + sort_column + ' ' + sort_direction;
    }


    sql += ' LIMIT ?, ?'
    params.push(startIndex)
    params.push(limit)
    db.query(sql, params, (err, result) => {
        db.query('SELECT COUNT(id) as total FROM useradmin', (err, counts, fields) => {
            const total = counts[0]['total'];
            const total_pages = Math.ceil(total / limit)
            res.json({
                page: page,
                limit: limit,
                total: total,
                total_pages: total_pages,
                data: result
            })
        })
    })
});

app.get("/editaccount/:id", async (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM useradmin WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.delete("/deleteaccount/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM useradmin WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
            return
        } else {
            res.send(result);
        }
    });
});

app.post('/upload', (req, res) => {
    const fileValues = req.body.map((values) => [
        values.card_id,
        values.email,
        values.fname,
        values.midname,
        values.lname,
        values.faculty,
        values.major,
        values.telnum,
        values.address_line1,
        values.district,
        values.city,
        values.province,
        values.postcode,
        values.certificates,
        values.statuscareer,
        values.career,
        values.year,
        values.salary
      ]);
db.query('INSERT INTO alumni (card_id, email, fname, midname, lname, faculty, major, telnum, address_line1, district, city, province, postcode, certificates, statuscareer, career, year, salary) VALUES ?',
    [fileValues], (err, result) => {
        if (err) {
            console.log(err)
            return
        } else {
            res.send(result)
        }
    })

})

app.get("/exportalumni", async (req, res) => {
    const search = req.query.search;
    var params = [];
    var sql = 'SELECT * FROM alumni '
    if (search) {
        sql += ' WHERE CONCAT(id, fname, lname) LIKE ?'
        params.push('%' + search + '%')
    }

    console.log(params)
    db.query(sql, params, (err, result) => {
            res.json({
                data: result
            })
        })
    });


app.listen(process.env.PORT, jsonParser, () => {
    console.log('RUN PORT 3000')
})