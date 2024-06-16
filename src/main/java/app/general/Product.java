package app.general;

import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Data
@Accessors(chain = true)
@Service
public class Product {
	private String name;
	private String description;
	private String version;

	public Product(
			@Value("${product.name:}") String name,
			@Value("${product.description}") String description,
			@Value("${product.version}") String version) {
		this.name = name;
		this.description = description;
		this.version = version;
	}
}
