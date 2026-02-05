# ✨ Orion Analytics

**Componente del Trabajo de Fin de Máster (TFM)** > *Máster en Ingeniería de Software y Sistemas Informáticos (MSSI)*

Este componente es la interfaz de usuario de la plataforma, desarrollada **con React.js**.

La aplicación actúa como una plataforma de Business Intelligence que centraliza datos internos del CRM y capas de información pública para el perfilado avanzado de clientes B2B. El sistema integra las siguientes dimensiones de análisis:

* Información financiera sobre el cliente.
* Indicadores de rendimiento sectorial.
* Noticias relacionadas.
* Registros operativos internos de la empresa.



## 🛠️ Stack

El frontend está desarrollado con las siguientes tecnologías:

* **React**: Construcción de la interfaz de usuario modular y reactiva.
* **Vite**: Empaquetador y servidor de desarrollo ultrarrápido, optimizado para React.
* **Tailwind**: Framework CSS utility-first para un desarrollo de diseño rápido y responsivo.

### Stack Tecnológico

| Componente | Herramienta | Función |
| :--- | :--- | :--- | 
| Framework | React | Construcción de la interfaz de usuario modular y reactiva. |
| Toolchain | Vite  | Empaquetador y servidor de desarrollo ultrarrápido, optimizado para React. |
| Estilizado | Tailwind CSS | Framework CSS utility-first para un desarrollo de diseño rápido y responsivo. | çç

## ⚡ Ejecución
Navega hasta el directorio raíz del proyecto y ejecuta el siguiente comando en tu terminal:

```bash
docker compose up --build -d
```
Una vez levantado el contenedor, la aplicación estará disponible en la siguiente dirección: http://localhost:3000/


## 📂 Estructura del Proyecto

```bash
orion-app/
├── public/                     # Activos estáticos públicos
├── src/                        # Código fuente de la aplicación
│   ├── assets/                 # Recursos multimedia (imágenes, iconos)
│   ├── basics/                 # Átomos y elementos mínimos de UI (RatioItem, NewsItem)
│   ├── components/             # Bloques funcionales reutilizables (FinanceCard, SideBar)
│   ├── pages/                  # Vistas principales y contenedores de ruta (HomePage, ClientDetailPage)
│   ├── app.css                 # Estilos globales de la aplicación
│   ├── App.jsx                 # Configuración de rutas y estados globales
│   └── main.jsx                # Punto de entrada de la aplicación y renderizado en el DOM
├── docker-compose.yml          # Orquestación del despliegue del frontend
├── Dockerfile                  # Definición de la imagen del contenedor (entorno de producción)
├── index.html                  # Plantilla HTML base del proyecto
├── package.json                # Gestión de scripts y dependencias de NPM
├── README.md                   # Documentación técnica del componente
└── vite.config.js              # Configuración del motor de construcción Vite
```





Paleta de colores:
#00204A Dark Blue
#FFD700 Golden
#1E90FF Blue Action
