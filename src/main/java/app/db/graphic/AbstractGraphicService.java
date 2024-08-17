package app.db.graphic;

import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public abstract class AbstractGraphicService<T extends AbstractGraphic> {
	private final AbstractGraphicRepository<T> repository;

	public List<GraphicFound> search(String name) {
		return repository.findAllByNameStartsWith(name);
	}

	public Optional<T> find(Long id) {
		return repository.findById(id);
	}

	public Optional<T> find(String name) {
		return repository.findByName(name);
	}

	public T save(final T graphic) {
		return repository.save(graphic);
	}

	public void delete(final Long id) {
		repository.deleteById(id);
	}
}
