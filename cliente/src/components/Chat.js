import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import steps from './steps';

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
            cache={false} // Deshabilitar la caché
            clearOnTrigger={false} // No limpiar pasos automáticamente
            placeholder="Escribe tu mensaje aquí..." // Mensaje en el input
            handleEnd={() => console.log('Chat finalizado')} // Registro al final del chat
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
