/**
 * Chatbot con Claude API para Mi Mudanza
 * Este archivo maneja la interfaz y comunicación con la API de Anthropic
 */

class MiMudanzaChatbot {
    constructor() {
        // Elementos DOM
        this.toggleBtn = document.getElementById('chatbot-toggle');
        this.closeBtn = document.getElementById('chatbot-close');
        this.chatWindow = document.getElementById('chatbot-window');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.chatForm = document.getElementById('chatbot-form');
        this.chatInput = document.getElementById('chatbot-input');
        this.typingIndicator = document.getElementById('chatbot-typing');

        // Estado del chat
        this.conversationHistory = [];
        this.isProcessing = false;

        // Verificar configuración básica
        if (typeof CHATBOT_CONFIG === 'undefined') {
            console.error('CHATBOT_CONFIG no está definido.');
            this.showConfigError();
            return;
        }

        // Inicializar (ya no necesitamos API key aquí, se usa desde el servidor)
        this.init();
    }

    init() {
        // Event listeners
        this.toggleBtn.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());
        this.chatForm.addEventListener('submit', (e) => this.handleSubmit(e));

        // Quick action buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-action-btn')) {
                const message = e.target.getAttribute('data-message');
                if (message) {
                    this.chatInput.value = message;
                    this.handleSubmit(new Event('submit'));
                }
            }
        });

        console.log('Chatbot inicializado correctamente');
    }

    showConfigError() {
        // Mostrar mensaje de error en el chatbot
        const errorMessage = document.createElement('div');
        errorMessage.className = 'chatbot-message bot-message';
        errorMessage.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="message-content">
                <div class="error-message">
                    <p><strong>Configuración necesaria:</strong></p>
                    <p>Para usar el chatbot, necesitas:</p>
                    <ol style="margin: 0.5rem 0; padding-left: 1.5rem;">
                        <li>Copiar <code>chatbot-config.example.js</code> a <code>chatbot-config.js</code></li>
                        <li>Agregar tu API Key de Anthropic en el archivo</li>
                        <li>Obtén tu API key en: <a href="https://console.anthropic.com/" target="_blank">console.anthropic.com</a></li>
                    </ol>
                </div>
            </div>
        `;

        // Limpiar mensajes previos y agregar el error
        this.messagesContainer.innerHTML = '';
        this.messagesContainer.appendChild(errorMessage);

        // Deshabilitar el input
        if (this.chatInput) {
            this.chatInput.disabled = true;
            this.chatInput.placeholder = 'Configuración requerida...';
        }
    }

    toggleChat() {
        this.chatWindow.classList.toggle('active');
        if (this.chatWindow.classList.contains('active')) {
            this.chatInput.focus();
        }
    }

    closeChat() {
        this.chatWindow.classList.remove('active');
    }

    async handleSubmit(e) {
        e.preventDefault();

        const message = this.chatInput.value.trim();
        if (!message || this.isProcessing) return;

        // Limpiar input
        this.chatInput.value = '';

        // Mostrar mensaje del usuario
        this.addMessage(message, 'user');

        // Marcar como procesando
        this.isProcessing = true;
        this.showTypingIndicator();

        try {
            // Llamar a la API de Claude
            const response = await this.callClaudeAPI(message);

            // Ocultar indicador y mostrar respuesta
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
        } catch (error) {
            console.error('Error al comunicarse con Claude:', error);
            this.hideTypingIndicator();
            this.addMessage(
                'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta nuevamente o contactanos directamente por WhatsApp.',
                'bot',
                true
            );
        } finally {
            this.isProcessing = false;
        }
    }

    async callClaudeAPI(userMessage) {
        // Agregar mensaje del usuario al historial
        this.conversationHistory.push({
            role: 'user',
            content: userMessage
        });

        // Siempre llamar al backend /api/chat (funciona tanto en local como en Vercel)
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: this.conversationHistory,
                systemPrompt: CHATBOT_CONFIG.SYSTEM_PROMPT,
                model: CHATBOT_CONFIG.MODEL,
                maxTokens: CHATBOT_CONFIG.MAX_TOKENS
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API Error: ${response.status} - ${errorData.error || errorData.message || 'Unknown error'}`);
        }

        const data = await response.json();
        const assistantMessage = data.content[0].text;

        // Agregar respuesta del asistente al historial
        this.conversationHistory.push({
            role: 'assistant',
            content: assistantMessage
        });

        return assistantMessage;
    }

    addMessage(text, sender = 'bot', isError = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;

        const currentTime = new Date().toLocaleTimeString('es-AR', {
            hour: '2-digit',
            minute: '2-digit'
        });

        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="message-content">
                    <p>${this.escapeHtml(text)}</p>
                    <div class="message-time">${currentTime}</div>
                </div>
            `;
        } else {
            const contentClass = isError ? 'error-message' : '';
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="${contentClass}">
                        <p>${this.formatBotMessage(text)}</p>
                    </div>
                    <div class="message-time">${currentTime}</div>
                </div>
            `;
        }

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    formatBotMessage(text) {
        // Convertir URLs a links
        let formatted = text.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" rel="noopener">$1</a>'
        );

        // Convertir saltos de línea a <br>
        formatted = formatted.replace(/\n/g, '<br>');

        // Escapar HTML pero mantener los tags que agregamos
        return formatted;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showTypingIndicator() {
        this.typingIndicator.style.display = 'flex';
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.typingIndicator.style.display = 'none';
    }

    scrollToBottom() {
        setTimeout(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }, 100);
    }
}

// Inicializar el chatbot cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new MiMudanzaChatbot();
});
