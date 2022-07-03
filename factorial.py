n = int(input())
		
def factorial (n):
	resultado=1
	for i in range (1,n+1):
		resultado = resultado * i
	return resultado

print (f"{n}! = {factorial(n)}")
