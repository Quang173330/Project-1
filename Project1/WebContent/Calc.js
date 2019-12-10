//hàm phóng to 
function zoomin(){
	if(xmax>10){
	xmin=xmin/2;
	xmax=xmax/2;
	ymin=ymin/2;
	ymax=ymax/2;}
	var x=math.floor(xmax/5);
	ctx.clearRect(0, 0, c.width, c.height);
	drawxy();
	draw(expr);} 
// hàm thu nhỏ 
function zoomout(){
	xmin=xmin*2;
	xmax=xmax*2;
	ymin=ymin*2;
	ymax=ymax*2;
	ctx.clearRect(0, 0, c.width, c.height);
	drawxy();
	draw(expr);}
// hàm hander vẽ đồ thị
function f(){
	 expr = document.getElementById("function").value;
	 draw(expr);}
// hàm vẽ đồ thị 
function draw(expr){
	 ctx.clearRect(0, 0, c.width, c.height);
	 drawxy();
     var i, 
     // tọa độ x,y trên khung canvas
     xPixel, yPixel,
     percentX, percentY,
     // tọa độ x y toán học tương ứng
     mathX, mathY;
     ctx.beginPath();
     ctx.strokeStyle = "blue";
     ctx.lineWidth = "1";
     for(i = 0; i < n; i++) {
	 // vẽ n-1 đường thẳng với n điểm từ 0 tới n-1 
     percentX = i / (n - 1);
     mathX = percentX * (xmax - xmin) + xmin;
     mathY = evaluateMathExpr(mathX,expr);
     console.log(mathY);
     percentY = (mathY - ymin) / (ymax - ymin);
     percentY=1-percentY;
     xPixel = percentX * c.width;
     yPixel = percentY * c.height;
     ctx.lineTo(xPixel, yPixel);}
     ctx.stroke();}
// hàm tính giá trị của fx
function evaluateMathExpr(mathX,expr){
     scope.x = mathX;
     tree = math.parse(expr, scope);
     return tree.eval();}
// hàm vẽ hệ trục tọa độ 0xy
function drawxy(){
	 console.log("n");
	 // điền gốc tọa độ 0
	 ctx.font = "20px Georgia";
	 ctx.fillText("0",c.width/2,c.height/2);
	 // vẽ hệ trục tọa độ 0y
     ctx.beginPath(); 
     ctx.strokeStyle = "black";
     ctx.lineWidth = "1.2";
     ctx.moveTo(c.width / 2, 0);
     ctx.lineTo(c.width / 2, c.height);
     ctx.stroke();
     // vẽ hệ trục tọa độ 0x
     ctx.beginPath(); 
     ctx.strokeStyle = "black";
     ctx.lineWidth = "1.2";
     ctx.moveTo(0,c.height / 2);
     ctx.lineTo(c.width, c.height/2);
     ctx.stroke();
     //vẽ đường tọa độ dọc
     var a = math.floor(xmax/10);
	 ctx.beginPath();  
	 ctx.lineWidth = "0.2";
	 ctx.strokeStyle = "black";
     for (var i = 1; i<=10;i++){
	 ctx.moveTo(c.width/2+(i*a/xmax)*(c.width/2),0);
	 ctx.lineTo(c.width/2+(i*a/xmax)*(c.width/2),c.height);
	 ctx.font = "15px Arial";
	 ctx.textBaseline = "top"
	 ctx.fillText(a*i,c.width/2+(i*a/xmax)*(c.width/2),c.height/2);
	 ctx.fillText(-a*i,c.width/2-(i*a/xmax)*(c.width/2),c.height/2);}
     for (var i = 1; i<=10;i++){
	 ctx.moveTo(c.width/2-(i*a/xmax)*(c.width/2),0);
	 ctx.lineTo(c.width/2-(i*a/xmax)*(c.width/2),c.height);}
	 ctx.stroke();	
	 // vẽ đường tọa độ ngang 
  var b = math.floor(ymax/5);
	 console.log(b);
     ctx.beginPath();  
     ctx.lineWidth = "0.2";
     ctx.strokeStyle = "black";
  for (var j = 1; j<= 5;j++){
	 ctx.moveTo(0,c.height/2+(j*b/ymax)*(c.height/2));
	 ctx.lineTo(c.width,c.height/2+(j*b/ymax)*(c.height/2));}
  for (var j = 1; j<= 5;j++){
    	ctx.moveTo(0,c.height/2-(j*b/ymax)*(c.height/2));
    	ctx.lineTo(c.width,c.height/2-(j*b/ymax)*(c.height/2));
		ctx.font = "15px Arial";
		ctx.textBaseline = "middle";
		ctx.fillText(-b*j,c.width/2,c.height/2+(j*b/ymax)*(c.height/2));
		ctx.fillText(b*j,c.width/2,c.height/2-(j*b/ymax)*(c.height/2));
    }
    ctx.stroke();
    console.log("c");}
// hàm hander tính toán 
function calc(){
	var vl = document.getElementById("valuex").value;
        vl = Number(vl);
	var expr = document.getElementById("function").value;
	var fx= evaluateMathExpr(vl,expr);
	btx.clearRect(0, 0, box.width, box.height);
	btx.font = "12px Arial";

	btx.fillText(fx,0,box.height/1.5);}
