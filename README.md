# MUDARTE.VIP - Relocalizaciones de Alta Gama

Página web premium para servicio de relocalizaciones residenciales y empresariales de lujo.

## ✨ Características

- **Diseño Ultra Premium**: Estética minimalista y sofisticada con tipografía serif elegante
- **Asistente IA con Claude**: Chatbot inteligente powered by Anthropic Claude AI
- **Animaciones Suaves**: Efectos parallax, fade-in y transiciones elegantes
- **Totalmente Responsive**: Optimizado para todos los dispositivos
- **Formulario de Contacto**: Con validación en tiempo real
- **Posicionamiento Premium**: Enfoque en calidad sobre precio

## 🚀 Estructura del Proyecto

```
mudarte.vip/
├── index.html          # Página principal
├── styles.css          # Estilos principales ultra premium
├── chatbot.css         # Estilos del asistente IA
├── script.js           # JavaScript principal
├── chatbot.js          # Lógica del chatbot con Claude
├── api/
│   └── chat.js         # Endpoint serverless para Claude API
└── README.md           # Este archivo
```

## ⚙️ Configuración del Chatbot IA

El chatbot usa **Claude AI de Anthropic**. Para configurarlo:

### Opción 1: Despliegue en Vercel (Recomendado)

1. **Instalar Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy inicial**
   ```bash
   cd mudarte.vip
   vercel
   ```
   Sigue las instrucciones en pantalla para vincular o crear un nuevo proyecto.

3. **Configurar variable de entorno en Vercel**

   **Opción A - Desde el Dashboard:**
   - Ve a tu proyecto en https://vercel.com/dashboard
   - Settings > Environment Variables
   - Agrega nueva variable:
     - Name: `ANTHROPIC_API_KEY`
     - Value: `tu-api-key-de-anthropic`
     - Environments: Production, Preview, Development
   - Click "Save"

   **Opción B - Desde CLI:**
   ```bash
   vercel env add ANTHROPIC_API_KEY
   # Pega la API key cuando te lo pida
   # Selecciona: Production, Preview, Development
   ```

4. **Redesplegar a producción**
   ```bash
   vercel --prod
   ```

5. **Verificar que funciona**
   - Abre tu sitio en el dominio de Vercel
   - Click en el botón del chatbot (esquina inferior derecha)
   - Envía un mensaje de prueba
   - Deberías recibir respuesta del asistente IA

**Troubleshooting:**
- Si el chatbot no responde, revisa los logs en Vercel Dashboard > Deployments > Functions
- Asegúrate de que la API key esté configurada en todos los environments
- Verifica que el endpoint `/api/chat` esté funcionando

### Opción 2: Servidor Local (Para desarrollo)

Si querés probar localmente con un servidor simple:

1. Crear archivo `.env` en la raíz:
   ```
   ANTHROPIC_API_KEY=tu-api-key-aqui
   ```

2. Usar un servidor local con soporte para serverless functions

## 🎨 Paleta de Colores Premium

- **Primary**: #1a1a1a (Negro elegante)
- **Accent**: #c9a45c (Dorado sofisticado)
- **Accent Dark**: #a88947
- **Background**: #ffffff / #fafaf8
- **Text**: #1a1a1a / #6b6b6b

## 📝 Personalización del Chatbot

El prompt del chatbot está en `index.html` línea 448. Características actuales:

- ✅ Tono elegante y sofisticado
- ✅ Enfatiza servicio PREMIUM
- ✅ Usa "relocalización" en lugar de "mudanza"
- ✅ Destaca calidad sobre precio
- ✅ Menciona todos los servicios premium

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Variables CSS, Grid, Flexbox, Animaciones
- **JavaScript ES6+**: Vanilla JS moderno
- **Claude AI**: Asistente conversacional inteligente
- **Font Awesome**: Iconografía
- **Google Fonts**: Playfair Display, Cormorant Garamond, Montserrat

## 📱 Características Premium Destacadas

### Diseño Visual
- Gradientes sutiles dorados
- Efectos glassmorphism
- Animaciones de parallax
- Transiciones suaves (cubic-bezier)
- Espaciado generoso (whitespace)

### Secciones Principales
1. **Hero**: Impacto inmediato con scroll indicator
2. **Value Proposition**: "Somos caros. Y hay una razón"
3. **Comparación**: vs. servicios económicos
4. **Servicios**: 6 servicios premium detallados
5. **Proceso**: Timeline metodológica de 5 fases
6. **Confianza**: Personal verificado
7. **Contacto**: Formulario elegante con validación

### Chatbot IA
- Botón flotante con animación de pulso
- Ventana elegant con glassmorphism
- Quick actions buttons
- Typing indicator animado
- Mensajes con timestamps
- Integración completa con Claude Sonnet 4

## 📞 Contacto

- **Email**: contacto@mudarte.vip
- **WhatsApp**: +54 9 11 3896-1652

## 📄 Licencia

© 2024 Mudarte.VIP. Todos los derechos reservados.

---

**Nota**: Para activar el chatbot necesitás configurar tu API key de Anthropic siguiendo las instrucciones arriba.
