package app.i18n;

import java.util.Locale;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.wcardinal.util.message.ExposableMessages;

@Service
@RequiredArgsConstructor
public class MessageService {
	private final MessageSource messageSource;
	private final ExposableMessages messages;

	public String get(String id, Locale locale) {
		return messageSource.getMessage(id, null, locale);
	}

	public String getScript(Locale locale) {
		return messages.getScript(locale);
	}
}
