package com.example.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class SecurityConfiguration {
    @Bean 
    public PasswordEncoder passwordEncoder() { 
		return new BCryptPasswordEncoder(); 
    }

    @Bean
    public HttpFirewall getHttpFirewall() {
        return new DefaultHttpFirewall();
    }
    
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors(Customizer.withDefaults())
                .csrf((csrf) -> csrf.disable())
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(requests -> requests
                    .requestMatchers(HttpMethod.GET, "/*.*", "/").permitAll()
                    .requestMatchers("/error").permitAll()
                    .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                    .requestMatchers("/actuator/**").permitAll()
                    .requestMatchers("/login/**").permitAll()
                    .requestMatchers("/hmac/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/solo-admin").hasRole("ADMINISTRADORES")
                    .anyRequest().permitAll()
                 )
                .formLogin(login -> login
                        .loginPage("/mylogin")
                        .permitAll())
                .build();
	}

//	@Bean
//    public SecurityFilterChain filterChain2(HttpSecurity http) throws Exception {
//        http.csrf(withDefaults()).disable()
//                .authorizeRequests(requests -> requests
//                        .requestMatchers("/actores/**").hasRole("ADMIN")
////				.requestMatchers("/ajax/**").authenticated()
//                        .anyRequest().permitAll())
//                .formLogin(login -> login
//                        .loginPage("/mylogin")
//                        .permitAll())
//                .logout(logout -> logout
//                        .logoutSuccessUrl("/")
//                        .permitAll());
//
//		return http.build();
//	}
}