# 📖 Bible Presenter  
**Presentaciones modernas para iglesias**  

Bible Presenter es una aplicación web moderna y minimalista diseñada para proyectar versículos bíblicos en iglesias de forma clara, ordenada y profesional. Está optimizada para pantallas grandes y compatible con múltiples traducciones, facilitando el seguimiento de la lectura durante cultos, predicaciones y estudios bíblicos.  

---

## 🚀 Características  
- **Interfaz moderna y minimalista** con modo oscuro y claro.  
- **Visualización optimizada** para proyectores y pantallas grandes.  
- **Búsqueda por referencia** (ej. “Génesis 1:1-5”).  
- **Vista limpia y legible** para la congregación, enfocada en el mensaje.  

---

## 🛠️ Tecnologías utilizadas  
- **React** – Biblioteca para la construcción de interfaces de usuario.  
- **TailwindCSS** – Framework CSS para un diseño rápido y responsive.  
- **API.Bible** – Fuente de datos bíblicos (requiere API Key).  

---

## 📦 Instalación y uso  

### 1) Clonar el repositorio  
```bash
git clone https://github.com/YamidDev/bible-presenter.git
cd bible-presenter
```

### 2) Instalar dependencias  
Asegúrate de tener **Node.js >= 18** instalado. Luego:  
```bash
npm install
```

### 3) Configurar variables de entorno  
Crea un archivo `.env` en la raíz del proyecto:  
```env
VITE_API_BIBLE_KEY=tu_api_key_de_apibible
```
Puedes obtener una API Key en https://scripture.api.bible

### 4) Ejecutar el proyecto en desarrollo  
```bash
npm run dev
```
Esto levantará un servidor local, usualmente en `http://localhost:5173`.

### 5) Construir para producción  
```bash
npm run build
```
Los archivos generados estarán en la carpeta `dist/`.

### 6) Despliegue  
Puedes desplegar en servicios como **Vercel**, **Netlify** o tu propio hosting.

---

## 📜 Licencia (Open Source)  

**MIT License**  

Copyright (c) 2025 Yamid Dev

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia de este software y de los archivos de documentación asociados (el "Software"), para usar el Software sin restricción, incluyendo sin limitación los derechos a **usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o vender** copias del Software, y a permitir a las personas a quienes se les proporcione el Software a hacerlo, sujeto a las siguientes condiciones:

El aviso de copyright anterior y este aviso de permiso deberán ser incluidos en **todas** las copias o partes sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", **SIN GARANTÍA DE NINGÚN TIPO**, EXPRESA O IMPLÍCITA, INCLUYENDO PERO NO LIMITADO A GARANTÍAS DE **COMERCIABILIDAD**, **IDONEIDAD PARA UN PROPÓSITO PARTICULAR** Y **NO INFRACCIÓN**. EN NINGÚN CASO LOS AUTORES O TITULARES DEL COPYRIGHT SERÁN RESPONSABLES POR **CUALQUIER RECLAMO, DAÑO O OTRA RESPONSABILIDAD**, YA SEA EN UNA ACCIÓN DE CONTRATO, AGRAVIO O CUALQUIER OTRA FORMA, DERIVADOS DE, O EN CONEXIÓN CON EL SOFTWARE O EL USO U OTROS TRATOS EN EL SOFTWARE.
