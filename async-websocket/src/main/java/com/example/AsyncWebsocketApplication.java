package com.example;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Timer;
import java.util.TimerTask;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import com.example.dto.MessageDto;
import com.example.service.SocketService;

@SpringBootApplication
public class AsyncWebsocketApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(AsyncWebsocketApplication.class, args);
	}

	private static final String STOMP_SERVER_URL = "ws://localhost:8061/chat";

	@Autowired
	private SocketService clientes;

	private WebSocketStompClient stompClient;

	@Override
	public void run(String... args) throws Exception {
//		new Timer().scheduleAtFixedRate(new TimerTask(){
//		    @Override
//		    public void run(){
//		    	try {
//		    		clientes.broadcast("Servidor: A Kiss every 5 seconds");
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//		    }
//		},0,5000);

		WebSocketClient client = new StandardWebSocketClient();
		stompClient = new WebSocketStompClient(client);
		stompClient.setMessageConverter(new MappingJackson2MessageConverter());
		stompClient.connectAsync(STOMP_SERVER_URL, new StompSessionHandlerAdapter() {
			private static final Logger log = LoggerFactory.getLogger("StompSessionHandlerAdapter");

			@Override
			public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
				session.subscribe("/topic/messages", this);
				session.send("/example/chat", new MessageDto("[REMOTE]", "Me he conectado!!!"));
			}

			@Override
			public void handleException(StompSession session, StompCommand command, StompHeaders headers,
					byte[] payload, Throwable exception) {
				log.error("Got an exception", exception);
			}

			@Override
			public Type getPayloadType(StompHeaders headers) {
				return MessageDto.class;
			}

			@Override
			public void handleFrame(StompHeaders headers, Object payload) {
				MessageDto msg = (MessageDto) payload;
				try {
					clientes.broadcast("[STOMP " + msg.getName() + "]: " + msg.getText());
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		});
	}
}
