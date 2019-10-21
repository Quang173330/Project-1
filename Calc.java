import java.io.IOException;
import java.util.Stack;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Calc extends HttpServlet {
    
protected void processRequest(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");}

@Override
protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        processRequest(request, response);
        String Hamso= request.getParameter("Hamso");
        String X= request.getParameter("Bienx");
        Hamso = Hamso.replaceAll("x",X);
        Hamso = infixToPostfix(Hamso);
        float n = evaluatePostfix(Hamso);
        request.setAttribute("st", n);
        RequestDispatcher  rd =  request.getRequestDispatcher("index.jsp");
        rd.forward(request, response);}
public  static int Prec(char ch){ 
		switch (ch) { 
		case '+': 
		case '-': return 1; 
		case '*': 
		case '/': return 2; 
		case '^': return 3; } 
		return -1; } 
public  static String infixToPostfix(String exp) { 
    String result; 
    result = new String();
    Stack<Character> stack = new Stack<>(); 
    for (int i = 0; i<exp.length(); ++i) {  
        char c = exp.charAt(i); 
        if (Character.isLetterOrDigit(c)) 
	    result += c; 
	else if (c == '(') 
	    stack.push(c);  
	else if (c == ')') { 
	    while (!stack.isEmpty() && stack.peek() != '(') 
		result += stack.pop(); 
	    if (!stack.isEmpty() && stack.peek() != '(') 
		return "Invalid Expression";				 
            else stack.pop();} 
	else { 
	    while (!stack.isEmpty() && Prec(c) <= Prec(stack.peek())){ 
		if(stack.peek() == '(') 
		    return "Invalid Expression"; 
	        result += stack.pop(); } 
	    stack.push(c); } } 
    while (!stack.isEmpty()){ 
	if(stack.peek() == '('){
	    return "Invalid Expression";}
        result += stack.pop(); }
    return result; } 
public  static float evaluatePostfix(String exp){  
    Stack<Float> stack=new Stack<>(); 
    for(int i=0;i<exp.length();i++) { 
        char c=exp.charAt(i); 
        if(Character.isDigit(c)){
            int b = c-'0';
            float a;
            a = (float)b;
            stack.push(a);}
        else{ 
            float val1 = stack.pop(); 
            float val2 = stack.pop();       
            switch(c) { 
                case '+': 
                    stack.push(val2+val1); 
                    break;       
                case '-': 
                    stack.push(val2- val1); 
                    break;         
                case '/': 
                    stack.push((val2)/(val1)); 
                    break; 
                case '*': 
                    stack.push(val2*val1); 
                    break; 
                case '^':{
                    Float y= val2;
                    for(int z=1;z<val1;z++){
                        y=y*val2;}
                        stack.push(y);}
            }}} 
    return stack.pop(); } 
}
