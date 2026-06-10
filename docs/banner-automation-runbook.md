# Banner Automation Runbook (Assist Card)

## Objetivo
Automatizar la publicación del banner de Assist Card desde una carpeta de entrada compartida con la agencia.

## Flujo funcional
1. La agencia sube una imagen (cualquier nombre) en:
`/Users/oscar/Library/CloudStorage/GoogleDrive-it.integral.solution@gmail.com/Mi unidad/entornos/Promos con Magui a Disney/inbox-banner`
2. El proceso toma la imagen más nueva.
3. Publica el banner activo en:
`assets/img/ppal/assistcard-auto.jpg`
4. Guarda una copia con timestamp en:
`banner-inbox/`
5. Deja un máximo de 5 archivos en `banner-inbox/` (borra los más viejos).
6. Elimina el archivo original de `inbox-banner`.
7. Hace `git add`, `commit` y `push`.
8. Registra el resultado en:
`/Users/oscar/Library/CloudStorage/GoogleDrive-it.integral.solution@gmail.com/Mi unidad/entornos/Promos con Magui a Disney/banner-proceso.txt`

## Scripts y ejecución
- Script principal (versionado):
`scripts/banner_process_once.sh`
- Loop en segundo plano (local):
`~/.local/conmagui/conmagui-banner-loop.sh`
- Intervalo del loop: cada `60` segundos.

## Logs
- Proceso operativo (visible para negocio):
`/Users/oscar/Library/CloudStorage/GoogleDrive-it.integral.solution@gmail.com/Mi unidad/entornos/Promos con Magui a Disney/banner-proceso.txt`
- La entrada más reciente se escribe arriba, para ver el estado actual sin bajar al final del archivo.
- Logs técnicos del loop:
`~/Library/Logs/conmagui-banner-loop.out.log`
`~/Library/Logs/conmagui-banner-loop.err.log`

## Criterios de estado en banner-proceso.txt
- `OK`: archivo publicado correctamente.
- `ERROR`: fallo de ejecución (ver logs técnicos).

## Comandos de operación
Iniciar loop:
```bash
nohup /bin/bash ~/.local/conmagui/conmagui-banner-loop.sh > ~/Library/Logs/conmagui-banner-loop.out.log 2> ~/Library/Logs/conmagui-banner-loop.err.log < /dev/null &
```

Detener loop:
```bash
pkill -f conmagui-banner-loop.sh
```

Procesar una vez manual:
```bash
cd "/Users/oscar/Library/CloudStorage/GoogleDrive-it.integral.solution@gmail.com/Mi unidad/It Solutions/Proyectos web/con-magui-a-disney-web"
./scripts/banner_process_once.sh
```

## Reglas de negocio acordadas
- No usar carpetas ocultas de inbox (`.banner-inbox`).
- No usar carpetas `procesados` ni `banner-history`.
- Mantener un solo banner activo (`assistcard-auto.jpg`).
- Mantener historial visible solo en `banner-inbox/` con máximo de 5 archivos.
- Publicación obligatoria por ingreso: cada archivo nuevo en `inbox-banner` se publica y se registra, aunque el contenido esté repetido.
- La validación de contenido/fechas no forma parte del proceso técnico; la responsabilidad es procesar, publicar, versionar y auditar.
