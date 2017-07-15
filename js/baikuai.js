			var clock = null;//定时器
			var state = 0;//0初始化，1进行中，2暂停，3失败
			var speed = 2;
			var val = 1;
			var oSur=document.getElementById("surrender");
			var oRestart=document.getElementById("restart");
			var oAlert=document.getElementById("alert");

			/*
			初始化
			*/oSur.onclick=function()
				{
				oAlert.style.display="none";
				};
				oRestart.onclick=function()
				{
				window.location.reload();
				};
		function init(){
				for(var i=0;i<4;i++){
						crow();
				}
				g('main').onclick = function(ev){
					judge(ev);
					
				}
			}
			function judge(ev) {
				if(state==3){
					return;
				}
				if(ev.target.className.indexOf('black')==-1){
						fail();
					}else{
						ev.target.className='cell';
						ev.target.parentNode.pass=1;//黑块碰到边缘失败
						score();
					}
			}
			/*启动按钮*/
		

			/*
			启动
			*/
			function start(){
				if(val){
				clock=window.setInterval('move()',30); 
				//window.setInterval在window.onload下面没有用
				val = 0;
				}
			}
			/*
			动画
			*/
			function move(){
				var con = g('container');
				var top = parseInt(window.getComputedStyle(con,null)['top']);
				if (top+speed>0) {
					top=0;
				}else{
					top+=speed;
					con.style.top=top+'px';
				}
				if (top==0) {
					crow();
					con.style.top = '-100px';
					drow();
				}else if(top == -98){
					var rows=con.childNodes;
					if((rows.length == 5)&&(rows[rows.length-1].pass !== 1)){
					fail();
					}
				}
			}
			
			/*
			加速
			*/
			function jiasu(){
				speed+=1;
			if (speed==16) {
				clearInterval(clock);
				alert('通关');
				}
			}
			/*
			fail 输
			*/
			function fail(){
				clearInterval(clock);
				val = 0;
				state = 3;
				oAlert.style.display="block";
			}
			/*暂停*/
			/*function pause(){
				clearInterval(clock);
				val = 0;
				alert('暂停');
			}*/
			/*
			计分
			*/
			function score(){
			var note=parseInt(g('score').innerHTML)+1;
			g('score').innerHTML=note;
				if(note % 5 == 0){
					jiasu();
				}
			}

			/*
			创建div.row
			*/

			function crow(){
				var con = g('container');
				var row = cdiv('row');
				var classes = createSn();
				for (var i = 0; i < 4.; i++) {
					row.appendChild(cdiv(classes[i]));
				}

				if (con.firstChild==null) {
					con.appendChild(row);
				}else{
					con.insertBefore(row,con.firstChild);
				}		

			}
			/*
			删除最后一行
			*/
			function drow(){
				var con = g('container');
				if(con.chilNodes.length == 6){
				con.removeChild(con.lastChild);
				}

			}
			/*
			创建div，className是其类名
			*/
			function cdiv(className){
				var div = document.createElement('div');
				div.className=className;
				return div;
			}
			/*
			返回一个数组，其中随机一个单元值为cell black ，其他三个，皆为cell
			*/
			function createSn(){
				var arr = ['cell','cell','cell','cell'];
				var i = Math.floor(Math.random()*4);
				arr[i] = 'cell black';
				return arr;
			}
			function reload(){	
				window.location.reload();
			}
				
			/*
			按照id获取对象
			*/
			function g(id){
				return document.getElementById(id);
			}
			start();
			init();
