

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const connection = await connect();
  id = req.query.id;
  console.log(id);
  if(id){
    query = "select first_name, last_name from users where id = ? and role = 'vendedor'";
    }else{
      query = "select first_name, last_name from users where role = 'vendedor'";
    }
      // query to database. Mysql and Oracle modules have different ways to query, this is why the if is needed.
    if (db === 'oracle') {
      try {
        const results = await connection.execute(query, []);
        res.send(results.rows);
      } catch (err) {
        console.log('Ouch!', err)
      } finally {
        if (connection) { // connection assignment worked, need to close
          await connection.close()
        }
      }
    } else {
      const request = connection.query(query, (error, results, fields) => {
        if (error) throw error;
        res.send(results);
      })
      console.log(request.sql)
    }
  });
  async function Connect() {
    const config = {
        user: 'SYSDBA',
        password: 'amorcito123',
        connectString: 'localhost:1521/orcl',
        privilege: oracledb.SYSDBA
    }
    let connection = await oracledb.getConnection(config);
    
return connection;
}

module.exports = router;
