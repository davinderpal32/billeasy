const { Client} = require('pg');
const client = new Client({
  host: "ec2-52-70-205-234.compute-1.amazonaws.com",
  port:5432,
  username: "mlqibeaxaatqhs",
  password: "d22eef4d90f74dcca38b99a5e0b6510cc2389981b5c2fd0f4a0e2d2c9096ab51",
  database: "d76dgd98t5dgbi"
})

client.connect();

client.query(`select * from departments`, (err,result) => {
  if(!err) {
    console.log(result.rows);
  }
  client.end();
})
