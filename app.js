const http = require('http');
const url = require('url');
let gres =[];
http.createServer((request, response) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
    console.log('server work');
    if (request.method == 'GET') {
        // GET -> получить обработать
		let urlRequest = url.parse(request.url, true);   
		console.log('request.url');
        
		//response.end('id=' + id);
        if (urlRequest.query.id  > 0 && urlRequest.query.id  < 18) {
			console.log("id = " + urlRequest.query.id); 
			
			
			//console.log("start app2.js");
			const mysql = require('mysql');
			const conn = mysql.createConnection({
			host: "127.0.0.1",
			user: "root",
			database: "zen",
			password: ""
			});	


			conn.connect(function (err) {
			if (err) {
				return console.error("Ошибка: " + err.message);
			}
			else {
				console.log("update ok");
			}
			});

			let query="UPDATE `zen`.`modem reboot` SET `status`='1', `ip_bef` = '', `ip_new`='', `err`='' WHERE  `ID`=" + urlRequest.query.id;
			//console.log("MySQL UPDATE OK");
			conn.query(query, (err, result, field) =>{
			console.log("err: " + err);
			
			//console.log(result);
			conn.end();
			console.log("conn end");
			// console.log(field);
			});


			
            response.end('id=' + urlRequest.query.id);
			
        }
		else if ( urlRequest.query.askid  > 0 && urlRequest.query.askid  < 18){
			console.log("id = " + urlRequest.query.id); 
			console.log("askid = " + urlRequest.query.askid);
			const mysql = require('mysql');
			const conn = mysql.createConnection({
			host: "127.0.0.1",
			user: "root",
			database: "zen",
			password: ""
			});	


			conn.connect(function (err) {
			if (err) {
				return console.error("Ошибка: " + err.message);
			}
			else {
				console.log("SELECT OK");
			}
			})

			let query="SELECT * FROM `zen`.`modem reboot` WHERE `ID`=" + urlRequest.query.askid;
			console.log(query + " ---------- OK");
			conn.query(query, (err, result, field) =>{
				console.log("err: " + err);
				console.log("res: " + result);
				console.log(result);
				console.log("status= " + result[0].status);
				console.log("ip bef= " + result[0].ip_bef);
				console.log("ip new= " + result[0].ip_new);
				console.log("err= " + result[0].err);
				if (result[0].status==1) {
					response.end('status=1');
				}
				else if (result[0].status==2) {
					response.end('status=2');
					console.log("модемчик взят в работу");
				}				
				else if (result[0].status==3) {
					response.end('status=3');
					console.log("модемчик готов");
				}				
				else if (result[0].status==4) {
					response.end('status=4');
					console.log("модемчик выдал ошибку");
				}			
				else {
					response.end('status==5');
					console.log("я выдал ошибку");
				}
				
				conn.end();
				console.log("conn end");
			});
			
			
		}
		else {
		console.log('bad id');
        response.end('need id parametr > 0');
		}
    }


}).listen(3010);