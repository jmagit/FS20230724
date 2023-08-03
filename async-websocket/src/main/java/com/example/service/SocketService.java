package com.example.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import lombok.Value;

@Component
public class SocketService {
	@Value
	public static class Session {
		private String name;
		private WebSocketSession session;
	}
	  private Map<String, Session> sesiones = new HashMap<>();

	public List<WebSocketSession> getAll() {
		return sesiones.values().stream().map(i -> i.getSession()).toList();
	}

	public void add(String name, WebSocketSession session) {
		sesiones.put(session.getId(), new Session(name, session));
	}

	public void remove(WebSocketSession session) {
		sesiones.remove(session.getId());
	}
	public String getName(WebSocketSession session) {
		return sesiones.get(session.getId()).getName();
	}
	public void broadcast(String message)throws IOException {
		for (WebSocketSession client : getAll()) {
			client.sendMessage(new TextMessage(message));
		}
	}
}
