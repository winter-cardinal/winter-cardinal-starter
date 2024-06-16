package app.mvc;

import app.general.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;

@ControllerAdvice
@RequiredArgsConstructor
public class MvcControllerAdvice {
	private final Product product;

	@ModelAttribute("product")
	public Product getProduct() {
		return product;
	}

	@ExceptionHandler(Exception.class)
	public String error(Exception e) {
		return "error";
	}
}
