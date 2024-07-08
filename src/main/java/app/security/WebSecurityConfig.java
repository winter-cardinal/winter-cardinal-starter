package app.security;

import java.util.concurrent.TimeUnit;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.CacheControlHeadersWriter;
import org.springframework.security.web.header.writers.DelegatingRequestMatcherHeaderWriter;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.NegatedRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		final var matcherStatic = new OrRequestMatcher(
				new AntPathRequestMatcher("/webjars/**/*.js"),
				new AntPathRequestMatcher("/webjars/**/*.js.map"),
				new AntPathRequestMatcher("/asset/**"),
				new AntPathRequestMatcher("/image/**"));
		final var matcherNotStatic = new NegatedRequestMatcher(matcherStatic);
		final var cacheControlHeaderStatic = new DelegatingRequestMatcherHeaderWriter(
				matcherStatic,
				new StaticHeadersWriter(
						HttpHeaders.CACHE_CONTROL,
						CacheControl.maxAge(10, TimeUnit.MINUTES).getHeaderValue()));
		final var cacheControlHeaderNonStatic =
				new DelegatingRequestMatcherHeaderWriter(matcherNotStatic, new CacheControlHeadersWriter());
		// spotless:off
		http.headers(headers ->
			headers.frameOptions(options ->
				options.sameOrigin()
			)
			.cacheControl(control ->
				control.disable()
					.addHeaderWriter(cacheControlHeaderStatic)
					.addHeaderWriter(cacheControlHeaderNonStatic)
			)
		)
		.authorizeHttpRequests(requests ->
			requests.requestMatchers(matcherStatic)
					.permitAll()
				.anyRequest()
					.authenticated()
		)
		.formLogin(login ->
			login.loginPage("/signin")
				.permitAll()
		)
		.logout(logout ->
			logout.logoutUrl("/signout")
				.logoutSuccessUrl("/signin")
				.permitAll()
		);
		// spotless:on
		return http.build();
	}
}
