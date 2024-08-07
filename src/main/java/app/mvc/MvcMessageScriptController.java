package app.mvc;

import app.general.Product;
import app.i18n.MessageService;
import java.io.IOException;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/asset/message-script/{product-version}")
public class MvcMessageScriptController {
	private final Product product;
	private final MessageService messageService;

	@GetMapping(value = "/message-script-{locale-language}-{locale-country}.min.js", produces = "text/javascript")
	public ResponseEntity<String> script(
			@PathVariable("product-version") String productVersion,
			@PathVariable("locale-language") String localeLanguage,
			@PathVariable("locale-country") String localeCountry)
			throws IOException {
		if (productVersion.equals(product.getVersion())) {
			return ResponseEntity.ok(messageService.getScript(Locale.of(localeLanguage, localeCountry)));
		}
		return ResponseEntity.notFound().build();
	}
}
