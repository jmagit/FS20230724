package com.example;

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
public class AppSecurityConfig {
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

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.csrf().disable()
//            .authorizeRequests()
//                .antMatchers("/*").permitAll()
//                .antMatchers("/ciudades/**").authenticated()
//                .antMatchers("/actores/**").hasRole("MANAGER")
//                .antMatchers("/ajax/**").hasRole("ADMIN")
//            .and()
//                .formLogin()
//                .loginPage("/mylogin")
//                .permitAll()
//            .and()
//            	.logout()
//            	.logoutSuccessUrl("/")
//            	.permitAll();
//    }
}