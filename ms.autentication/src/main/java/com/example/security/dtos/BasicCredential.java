package com.example.security.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class BasicCredential {
	@NotBlank
	@Email
	private String username;
	@NotBlank
	@Pattern(
			regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8,}$",
			message="debe contener al menos 8 caracteres con letras mayúsculas, minúsculas, números y símbolos"
		)
	private String password;

	public String getUsername() {
		return username;
	}
	public void setUsername(String user) {
		this.username = user;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
}
