package app.security;

import java.util.concurrent.TimeUnit;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.header.writers.CacheControlHeadersWriter;
import org.springframework.security.web.header.writers.DelegatingRequestMatcherHeaderWriter;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.NegatedRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		super.configure(auth);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		final var matcherStatic = new OrRequestMatcher(
			new AntPathRequestMatcher("/webjars/**"),
			new AntPathRequestMatcher("/asset/**"),
			new AntPathRequestMatcher("/image/**")
		);
		final var matcherNonStatic = new NegatedRequestMatcher(
			matcherStatic
		);
		final var cacheControlHeaderStatic = new DelegatingRequestMatcherHeaderWriter(
			matcherStatic,
			new StaticHeadersWriter(
				HttpHeaders.CACHE_CONTROL,
				CacheControl.maxAge(10, TimeUnit.MINUTES).getHeaderValue()
			)
		);
		final var cacheControlHeaderNonStatic = new DelegatingRequestMatcherHeaderWriter(
			matcherNonStatic,
			new CacheControlHeadersWriter()
		);
		http
		.headers()
			.frameOptions()
				.sameOrigin()
			.cacheControl()
				.disable()
				.addHeaderWriter(cacheControlHeaderStatic)
				.addHeaderWriter(cacheControlHeaderNonStatic)
			.and()
		.authorizeRequests()
			.requestMatchers(matcherStatic)
				.permitAll()
			.anyRequest()
				.authenticated()
			.and()
		.formLogin()
			.loginPage("/signin")
				.permitAll()
			.and()
		.logout()
			.logoutUrl("/signout")
			.logoutSuccessUrl("/signin")
				.permitAll();
	}
}
