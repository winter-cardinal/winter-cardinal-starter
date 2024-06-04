package app.i18n;

import java.util.HashSet;
import java.util.Locale;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.support.ResourcePatternUtils;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.FixedLocaleResolver;
import org.wcardinal.util.message.ExposableReloadableResourceBundleMessageSource;

@Configuration
public class MessageSourceConfig {
	@Bean
	public LocaleResolver localeResolver(){
		return new FixedLocaleResolver(getDefaultLocale());
	}

	@Bean
	public MessageSource messageSource() {
		final var result = new ExposableReloadableResourceBundleMessageSource();
		result.setBasenames(getMessageSourceBasenames());
		result.setDefaultEncoding("UTF-8");
		result.setDefaultLocale(getDefaultLocale());
		return result;
	}

	private Locale getDefaultLocale() {
		return Locale.JAPAN;
	}

	private String[] getMessageSourceBasenames() {
		final var basenames = new HashSet<String>();
		try {
			for (final var resource: ResourcePatternUtils.getResourcePatternResolver(new DefaultResourceLoader()).getResources("classpath*:/i18n/**/*.properties")) {
				final var url = resource.getURL().toExternalForm();
				final var index0 = url.indexOf("/i18n/");
				final var index1 = url.lastIndexOf("_");
				if (0 <= index0 && 0 <= index1) {
					basenames.add("classpath:" + url.substring(index0, index1));
				}
			}
		} catch (Exception e) {
			// DO NOTHING
		}
		return basenames.toArray(new String[basenames.size()]);
	}
}
