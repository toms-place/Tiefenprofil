import numpy as np
from sympy import symbols, Eq, solve

x, y, z = symbols('x y z')

eq1 = Eq(z * 30 * 50, z*30)
eq2 = Eq(200 * 10 * 2, x*y)

sol_dict = solve((eq1,eq2), (x, y))
print(sol_dict)