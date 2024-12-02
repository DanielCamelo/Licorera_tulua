import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import steps from './steps'; // Asegúrate de que la ruta sea correcta

const Chat = () => {
  const [showChatBot, setShowChatBot] = useState(false);

  return (
    <div className="chat-container">
      {/* Botón flotante para mostrar/ocultar el Chatbot */}
      <button
        className="floating-button chat-bot-button"
        onClick={() => setShowChatBot(!showChatBot)}
      >
        💬
      </button>

      {/* Renderizar el ChatBot solo si está activo */}
      {showChatBot && (
        <div className="chat-bot">
          <ChatBot
            steps={steps} // Pasos definidos en steps.js
            cache={false} // Deshabilitar la caché para evitar duplicados
            clearOnTrigger={true} // Asegurar que no se acumulen respuestas
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
