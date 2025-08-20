---
title: "Ecuaciones Cuadráticas - Guía Completa"
author: "Prof. Matemáticas"
website: "www.matematicas.edu"
subject: "matemáticas"
showTOC: true
---

# Introducción a las Ecuaciones Cuadráticas

Las ecuaciones cuadráticas son polinomios de segundo grado que tienen la forma general:

$$ax^2 + bx + c = 0$$

donde $a \neq 0$.

## Métodos de Resolución

### 1. Factorización

Cuando es posible factorizar la ecuación, podemos escribir:

$$ax^2 + bx + c = a(x - r_1)(x - r_2) = 0$$

**Ejemplo:** Resolver $x^2 - 5x + 6 = 0$

Factorizando: $(x - 2)(x - 3) = 0$

Por lo tanto: $x = 2$ o $x = 3$

### 2. Fórmula Cuadrática

Para cualquier ecuación cuadrática $ax^2 + bx + c = 0$, las soluciones son:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

#### Discriminante

El discriminante $\Delta = b^2 - 4ac$ nos indica el tipo de soluciones:

- Si $\Delta > 0$: Dos soluciones reales distintas
- Si $\Delta = 0$: Una solución real (raíz doble)
- Si $\Delta < 0$: No hay soluciones reales

### 3. Completar el Cuadrado

Este método consiste en transformar la ecuación a la forma:

$$a(x - h)^2 + k = 0$$

**Ejemplo:** Resolver $x^2 + 6x + 5 = 0$

1. $x^2 + 6x = -5$
2. $x^2 + 6x + 9 = -5 + 9$
3. $(x + 3)^2 = 4$
4. $x + 3 = \pm 2$
5. $x = -3 \pm 2$

Por lo tanto: $x = -1$ o $x = -5$

## Aplicaciones

### Problema de Movimiento Projectil

La altura de un projectil lanzado hacia arriba está dada por:

$$h(t) = -16t^2 + v_0t + h_0$$

donde:
- $h(t)$ es la altura en el tiempo $t$
- $v_0$ es la velocidad inicial
- $h_0$ es la altura inicial

### Problema de Optimización

**Ejemplo:** Encontrar las dimensiones de un rectángulo con perímetro de 20 metros que tenga área máxima.

Sea $x$ el ancho y $y$ el largo del rectángulo.

- Restricción: $2x + 2y = 20$, entonces $y = 10 - x$
- Área: $A = xy = x(10 - x) = 10x - x^2$

Para maximizar el área, derivamos e igualamos a cero:
$$\frac{dA}{dx} = 10 - 2x = 0$$

Por lo tanto, $x = 5$ metros y $y = 5$ metros.

El rectángulo óptimo es un cuadrado de 5×5 metros con área de 25 m².

## Gráfica de Funciones Cuadráticas

La función $f(x) = ax^2 + bx + c$ es una parábola que:

- Abre hacia arriba si $a > 0$
- Abre hacia abajo si $a < 0$
- Tiene vértice en $x = -\frac{b}{2a}$

### Características importantes:

1. **Vértice:** $V = \left(-\frac{b}{2a}, f\left(-\frac{b}{2a}\right)\right)$
2. **Eje de simetría:** $x = -\frac{b}{2a}$
3. **Intersección con y:** $(0, c)$
4. **Intersecciones con x:** Soluciones de $ax^2 + bx + c = 0$

## Ejercicios Propuestos

1. Resolver $2x^2 - 7x + 3 = 0$
2. Encontrar el vértice de $f(x) = x^2 - 4x + 3$
3. Un objeto se lanza hacia arriba con velocidad inicial de 48 ft/s desde una altura de 6 ft. ¿Cuándo tocará el suelo?

## Conclusión

Las ecuaciones cuadráticas son fundamentales en matemáticas y tienen múltiples aplicaciones en física, ingeniería y economía. Dominar los diferentes métodos de resolución es esencial para el éxito en álgebra avanzada.
