---
description: Genera documentación y mensaje de commit atómico sin realizar cambios en git.
---

# Workflow: Generación de Commit Atómico

Sigue estas instrucciones para preparar y generar el mensaje de commit en español.

# Importante
- **NO ejecutar ningún comando de `git push` o `git add`**, solo generar el mensaje del commit a través de `git diff`, `git log` y `git status`.

## 1. Preparación del Cambio (Atomicidad)
1. **Verificar Nombre de Rama**:
   - Asegúrate de que el nombre de la rama donde se efectuará el cambio tenga el nombre apropiado.
   - Si es incorrecto: Retorna "El nombre de la rama es incorrecto, por favor crea una rama con el nombre apropiado" y **detén el proceso**.

2. **Verificar Errores**:
   - Asegúrate de que no haya errores en el código.
   - Si hay errores: Retorna "El código tiene errores, por favor corrige los errores" y **detén el proceso**.

3. **Verificar Atomicidad**:
   - Asegúrate de que tu cambio sea atómico: Debe representar una única modificación lógica o funcionalidad completa.

4. **Revisar Cambios**:
   - Utiliza `git diff` para confirmar exactamente qué archivos vas a incluir.
   - Utiliza `git log` para confirmar el historial reciente.
   - Utiliza `git status` para confirmar el estado actual.

## 2. Documentación del Commit
- Para mantener un registro, crea un archivo de documentación en la carpeta `docs/commits/`:
    - Crea un archivo `.md` dentro de `docs/commits/` con un nombre que refleje brevemente el cambio (ej: `docs/commits/feature-login.md`).
- **Especificaciones Clave**:
    - Dentro de este archivo, detalla lo siguiente, que servirá de input para la IA:
        - **Archivos Sugeridos**: Enumera los archivos que deben entrar en el commit.
        - **Descripción Atómica**: Confirma que el cambio es atómico (Un solo cambio lógico).
    - **Instrucciones para la IA**: Indica que debe generar el mensaje del commit en español siguiendo el formato estricto de la sección 3.

## 3. Generación del Mensaje con IA y Commit
El mensaje debe ser generado por la IA siguiendo el formato que se encuentra a continuación:

### Formato de Título:
`<emoji> <tipo>(<scope>): <descripcion>`

### Cuerpo Detallado:
El cuerpo del commit debe ser un checklist conciso con la descripción de los cambios:
```text
[
    - Descripción concisa del primer cambio.
    - Descripción concisa del segundo cambio.
    - ...
]
```

## ✅ Estructura de Documentación y Formato Final
El archivo de documentación en `(raiz del proyecto)/docs/commits/` debe seguir esta plantilla para la trazabilidad:

### Formato de Plantilla (.md)
```markdown
### Título: <titulo_descriptivo_del_cambio>
**Fecha del Commit:** <fecha>

### Archivos Afectados:
* <archivo_1>
* <archivo_2>
* ...

### Mensaje de Commit Generado:
(Aquí se insertará el mensaje generado siguiendo el formato de la sección 3)

Ejemplo:
✨ feat(auth): Implementa autenticación de usuario por token
- Implementa la generación de tokens JWT al iniciar sesión.
- Añade middleware para validar tokens en rutas protegidas.
- Crea endpoint para refrescar tokens de acceso.
```

---

## 📌 Guía de Emojis y Tipos (Conventional Commits)

Utiliza la siguiente tabla para clasificar el **tipo** y el **emoji** que la IA debe incluir en el mensaje.

| Emoji | Tipo | Descripción Rápida | Ejemplo de Cambio |
| :--- | :--- | :--- | :--- |
| **✨** | `feat` | **Nueva** funcionalidad o característica. | *Implementación de la autenticación por token.* |
| **🐛** | `fix` | **Corrección** de un *bug*. | *Corrige error de desbordamiento en la tabla de usuarios.* |
| **♻️** | `refactor` | **Refactorización** del código (cambios estructurales sin cambiar funcionalidad). | *Renombra variables y extrae lógica a un nuevo módulo.* |
| **🎨** | `style` | Cambios de **estilo** (*linter*, formato, espacios). | *Añade punto y coma faltante y corrige identación.* |
| **🧪** | `test` | Adición o modificación de **pruebas**. | *Añade pruebas unitarias para el servicio de pagos.* |
| **📚** | `docs` | Cambios en la **documentación** (*README*, manuales). | *Actualiza la sección de instalación en el README.* |
| **🔥** | `del` | **Eliminación** de código o archivos. (Alternativa a `chore` para eliminaciones grandes). | *Elimina el controlador obsoleto de la API v1.* |
| **🚀** | `perf` | Mejora de **rendimiento**. | *Optimiza la consulta SQL para reducir el tiempo de carga.* |
| **🔧** | `chore` | **Configuración**, *scripts* de *build*, tareas de mantenimiento. | *Actualiza el script de despliegue a producción.* |
| **📦** | `build` | Cambios que afectan el sistema de *build* o **dependencias**. | *Actualiza la versión de React a 18.2.* |
| **🚨** | `lint` | **Correcciones** automáticas del **linter**. | *Corrige todos los errores de estilo reportados por ESLint.* |
| **💄** | `ui` | Cambios en la **interfaz de usuario** (diseño, CSS, *assets*). | *Ajusta el espaciado del encabezado del menú principal.* |

---

## 🧠 Directrices Adicionales

* **Prefiere *commits* Atómicos:** Un **solo cambio lógico** por *commit*. Si tienes dos correcciones, haz dos *commits*.
* **Mensajes en Presente:** La descripción debe usar el **modo imperativo en presente** (ej: "**Agrega** validación", "**Corrige** el error", en lugar de "Agregué..." o "Corrigió...").
* **Evita lo Genérico:** Nunca uses descripciones vagas como "cambios", "actualización".
