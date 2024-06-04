package app.mvc;

import java.util.Locale;

import javax.servlet.http.HttpSession;

import org.springframework.security.web.WebAttributes;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import app.i18n.MessageService;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class MvcSigninController {
	private final MessageService messageService;

	@GetMapping("/signin")
	public ModelAndView signin(
		@RequestParam(value = "error", required = false) String error,
		@RequestParam(value = "logout", required = false) String logout,
		HttpSession session,
		Locale locale
	) {
		final var result = new ModelAndView("signin");
		result.addObject("message", toMessage(error, logout, session, locale));
		return result;
	}

	private String toMessage(
		@RequestParam(value="error", required=false) String error,
		@RequestParam(value="logout", required=false) String logout,
		HttpSession session,
		Locale locale
	) {
		if (error != null && session != null) {
			final var e = session.getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
			if (e != null) {
				return messageService.get("signin.error.invalid-username-or-password", locale);
			}
		}
		return null;
	}
}
