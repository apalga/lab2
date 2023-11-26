# lab2

Socket OK
Aplicacion OK
MongnDB OK
Redis OK

![image](https://github.com/apalga/lab2/assets/14065010/79b25877-4ac2-412d-8f2b-5c41ff59da58)




laboratorio practico 1
###REGLAS

## Reglas pretierrrc

1. **commentLineLength: 80**
Limita la longitud de las líneas en comentarios a 80 caracteres.

2. **sortImports: true**
Ordena las importaciones de módulos alfabéticamente.

3. **alignObjectProperties: true**
Alinea propiedades de objetos en múltiples líneas para mejorar la legibilidad en objetos largos.

## Reglas de ESLint Configuradas

1. **"no-alert": "error"**
Evita el uso de ventanas emergentes como `alert`, `confirm`, y `prompt` en el código de producción.

2. **"no-unused-vars": "warn"**
Detecta variables declaradas pero no utilizadas en el código y muestra advertencias.

3. **"no-var": "error"**
Fomenta el uso de `const` y `let` en lugar de `var`.


## Reglas de TSconfig Configuradas

1. **"strictNullChecks": true**
Activa comprobaciones estrictas para valores `null` y `undefined`. Esto garantiza que no se puedan acceder a propiedades en valores potencialmente nulos o indefinidos sin verificarlos primero. 
  
2. **"strictPropertyInitialization": true**
Requiere que todas las propiedades de las clases tengan un valor inicial o se inicialicen en el constructor. Esto puede evitar problemas con propiedades no inicializadas.
   
3. **"noImplicitThis": true**
Esta regla requiere que se especifique el tipo de `this` en las funciones. Esto puede ayudar a evitar errores comunes relacionados con el uso de `this` en TypeScript.
  
## Reglas de nodemonjs

1. **"watchExtensions": ["ts", "json", "md"]**
   Especifica las extensiones de archivo a vigilar


	 
