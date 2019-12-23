// hàm vẽ trục tọa độ
function draw0xy() {
    // vẽ trục tọa độ 0x
    ctx.beginPath(); 
    ctx.strokeStyle = "black";
    ctx.lineWidth = "1.2";
    ctx.moveTo(0,c.height / 2);
    ctx.lineTo(c.width, c.height/2);
    ctx.stroke();
    //vẽ trục tọa độ 0y
    ctx.beginPath(); 
    ctx.strokeStyle = "black";
    ctx.lineWidth = "1.2";
    ctx.moveTo(c.width / 2, 0);
    ctx.lineTo(c.width / 2, c.height);
    ctx.stroke();
    // điền gốc tọa độ 0 
    ctx.font = "15px Arial";
    ctx.textBaseline="top"
    ctx.fillText("0",c.width/2,c.height/2);
    // vẽ các đường thẳng tọa độ 
    // vẽ đường tọa độ dọc bên phải
    var a = Math.log10(xmax),
        b = Math.floor(a),
        z = Math.pow(10,a-b),
        d;
    if ((z/0.2>4) && (z/0.2<=10)) {
        d = z/0.2;
    } else if ((z/0.5>4) && (z/0.5<=10)) {
        d = z/0.5;
    } else if ((z>4) && (z<10)) {
        d = z;
    }
    ctx.beginPath();
    ctx.lineWidth = "0.2";
    ctx.strokeStyle = "black";
    for (var i=1;i<=d;i++) {
        ctx.moveTo(c.width/2+(i/d)*(c.width/2),0);
        ctx.lineTo(c.width/2+(i/d)*(c.width/2),c.height);
        ctx.font = "15px Arial";
        ctx.textBaseline = "top";
        ctx.fillText(Math.round((i/d)*xmax*1000000000)/1000000000,c.width/2+(i/d)*(c.width/2),c.height/2);
    }
    ctx.stroke();
    // vẽ đường tọa độ dọc bên trái 
    var u = Math.log10(Math.abs(xmin)),
        v = Math.floor(u),
        t = Math.pow(10,u-v),
        w;
    if ((t/0.2>4) && (t/0.2<=10)) {
        w = t/0.2;
    } else if ((t/0.5>4) && (t/0.5<=10)) {
        w = t/0.5;
    } else if ((t>4) && (t<10)) {
        w = t;
    }
    ctx.beginPath();
    ctx.lineWidth = "0.2";
    ctx.strokeStyle = "black";
    for (var j=1;j<=w;j++) {
        ctx.moveTo(c.width/2-(j/w)*(c.width/2),0);
        ctx.lineTo(c.width/2-(j/w)*(c.width/2),c.height);
        ctx.font = "15px Arial";
        ctx.textBaseline = "top";
        ctx.fillText(Math.round((j/w)*xmin*1000000000)/1000000000,c.width/2-(j/w)*(c.width/2),c.height/2);
    }
    ctx.stroke();

    // vẽ đường tọa độ ngang bên trên 
    var u1 = Math.log10(Math.abs(ymax)),
        v1 = Math.floor(u1),
        t1 = Math.pow(10,u1-v1),
        w1;
    if ((t1/0.2>2) && (t1/0.2<=5)) {
        w1 = t1/0.2;
    } else if ((t1/0.5>2) && (t1/0.5<=5)) {
        w1 = t1/0.5;
    } else if ((t1>2) && (t1<5)) {
        w1 = t1;
    } else if ((t1/2>2)&&(t1/2<5)){
        w1 =t1;
    }
    ctx.beginPath();
    ctx.lineWidth = "0.2";
    ctx.strokeStyle = "black";
    for (var j1=1;j1<=w1;j1++) {
        ctx.moveTo(0,c.height/2- (j1/w1)*(c.height/2) );
        ctx.lineTo(c.width,c.height/2- (j1/w1)*(c.height/2));
        ctx.font = "15px Arial";
        ctx.textBaseline = "top";
        ctx.fillText(Math.round((j1/w1)*ymax*1000000000)/1000000000,c.width/2,c.height/2- (j1/w1)*(c.height/2));
    }
    ctx.stroke();
    // vẽ đường tọa độ dọc bên dưới
    var u2 = Math.log10(Math.abs(ymin)),
    v2 = Math.floor(u2),
    t2 = Math.pow(10,u2-v2),
    w2;
    if ((t2/0.2>2) && (t2/0.2<=5)) {
    w2 = t2/0.2;
    } else if ((t2/0.5>2) && (t2/0.5<=5)) {
    w2 = t2/0.5;
    } else if ((t2>2) && (t2<5)) {
    w2 = t2;
    } else if ((t2/2>2)&&(t2/2<5)){
        w2 =t2;
    }
    ctx.beginPath();
    ctx.lineWidth = "0.2";
    ctx.strokeStyle = "black";
    for (var j2=1;j2<=w2;j2++) {
    ctx.moveTo(0,c.height/2+ (j2/w2)*(c.height/2) );
    ctx.lineTo(c.width,c.height/2+ (j2/w2)*(c.height/2));
    ctx.font = "15px Arial";
    ctx.textBaseline = "top";
    ctx.fillText(Math.round((j2/w2)*ymin*1000000000)/1000000000,c.width/2,c.height/2+ (j2/w2)*(c.height/2));
    }
    ctx.stroke();
} 

// hàm vẽ đồ thị hàm số
function draw(expr){
	ctx.clearRect(0, 0, c.width, c.height);
	draw0xy();
    console.log(xmin);
    console.log(xmax);
    console.log(ymin);
    console.log(ymax);
    console.log(expr);
    
    var i, 
    // tọa độ x,y trên khung canvas
    xPixel, yPixel,
    percentX, percentY,
    // tọa độ x y toán học tương ứng
    mathX, mathY;
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = "1.5";
    
    for(i = 0; i < n; i++) {
        percentX = i / (n - 1);
        mathX = percentX * (Math.abs(xmin)) + xmin;
        mathY = evalueMathExpr(mathX,expr);
        if(mathY>0){
            percentY = (ymax-mathY) / ymax;
            xPixel = percentX * (c.width/2);
            yPixel = percentY * (c.height/2);
        } else {
            percentY = mathY / ymin;
            xPixel = percentX * (c.width/2);
            yPixel = c.height/2+percentY * (c.height/2);
            console.log(xPixel);
            console.log(yPixel);
        }
    
        ctx.lineTo(xPixel, yPixel);
    }
    for(i = 0; i < n; i++) {
        percentX = i / (n - 1);
        mathX = percentX*xmax;
        mathY = evalueMathExpr(mathX,expr);
        if(mathY>0){
            percentY = (ymax-mathY) / ymax;
            xPixel = c.width/2+ percentX * (c.width/2);
            yPixel = percentY * (c.height/2);
        } else {
            percentY = mathY / ymin;
            xPixel = c.width/2+ percentX * (c.width/2);
            yPixel = c.height/2+percentY * (c.height/2);
            console.log(xPixel);
            console.log(yPixel);
        }
    
        ctx.lineTo(xPixel, yPixel);
    }
    ctx.stroke();
    console.log(xmin);
    console.log(xmax);
    console.log(ymin);
    console.log(ymax);
}

// hàm set giá trị xmin xmax ymin ymax
function setvalue(){
    var xxmin=document.getElementById("xmin").value,
        xxmax=document.getElementById("xmax").value,
        yymin=document.getElementById("ymin").value,
        yymax=document.getElementById("ymax").value;
    
    if (xxmin!='' && xxmax!='' ){
	    xmin= Number(xxmin);
	    xmax=Number(xxmax);
    }
    if (yymin!='' && yymax!='' ){
	    ymin= Number(yymin);
	    ymax=Number(yymax);
    }
}

//hàm phóng to 
function zoomin(){
	xmin=xmin/2;
	xmax=xmax/2;
	ymin=ymin/2;
	ymax=ymax/2;
    ctx.clearRect(0, 0, c.width, c.height);
    console.log(xmin);
    console.log(xmax);
	draw0xy();
	draw(expr);
}

// hàm thu nhỏ 
function zoomout(){
    xmin=xmin*2;
    console.log(xmin);
	xmax=xmax*2;
	ymin=ymin*2;
	ymax=ymax*2;
    ctx.clearRect(0, 0, c.width, c.height);
    console.log(xmin);
    console.log(xmax);
    draw0xy();
    console.log(xmin);
    console.log(xmax);
	draw(expr);
}

// hàm  vẽ đồ thị
function f(){
     expr = document.getElementById("function").value;
     setvalue();
	 draw(expr);
}

// hàm tính giá trị của fx
function evalueMathExpr(mathX,expr){
     scope.x = mathX;
     tree = math.parse(expr, scope);
     return tree.eval();
}

