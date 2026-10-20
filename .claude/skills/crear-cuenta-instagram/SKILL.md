---
name: crear-cuenta-instagram
description: Guía la apertura de la cuenta de Instagram de un producto de Alejo Cloud y la deja configurada — profesional, bio, link, foto, categoría y conectada a la fanpage — usando productos/<slug>/marca/marca.json. Alejo crea la cuenta (Claude no crea cuentas); Claude prepara y configura con su OK. Paso 3 de activos-digitales.
---

# Cuenta de Instagram

> **Estado del método: sin validar.** Actualizar tras la primera corrida.

## Reparto
> Claude **no puede crear la cuenta** (crear cuentas y escribir contraseñas está fuera de lo que hace). Todo lo demás sí.
> Ojo: el Chrome de Alejo puede tener abierta la sesión de IG de otra persona — comprobar en /accounts/edit/ antes de configurar.
- **Alejo**: crea la cuenta y verifica email/teléfono. Recomendado desde la app del celular con
  "Agregar cuenta → Crear cuenta nueva" desde su IG personal, para que quede en su Centro de cuentas
  (una sola sesión, más fácil de conectar a la Página). Usa `handles.elegido`.
- **Claude**: deja todo listo para pegar y, cuando la cuenta exista, la configura desde Chrome con permiso.

## Pasos
1. **Antes**: mostrar a Alejo, listo para copiar: usuario (`handles.elegido`), nombre (`instagram.nombre`),
   bio (`instagram.bio`), link (`instagram.link`) y la foto `marca/perfil.png` (enviársela con SendUserFile para tenerla en el celular).
2. **Alejo crea la cuenta** y avisa en el chat.
3. **Comprobar**: abrir `https://www.instagram.com/<handle>/` y verificar que existe y que la sesión activa es esa cuenta.
4. **Configurar** (pedir un sí antes de empezar; cambiar a profesional es un cambio de cuenta):
   - Editar perfil (`https://www.instagram.com/accounts/edit/`): foto, nombre, bio, link.
   - Cambiar a **cuenta profesional → Creador o Empresa**, categoría `instagram.categoria`.
   - Conectar con la Página de Facebook (Centro de cuentas o Configuración de la Página → Cuentas vinculadas → Instagram).
     Necesario para anuncios y para el DM automático (`flujo-comentario-dm`).
5. **Registrar** en `marca.json`: `activos.instagram = { estado: "configurado", url, handle, conectada_a_pagina: true, fecha }`.
6. **Bitácora** en `activos-digitales/SKILL.md`.

## No hacer
Seguir cuentas, dar likes, comentar, publicar, activar anuncios o suscripciones de Meta Verified sin pedirlo Alejo.
